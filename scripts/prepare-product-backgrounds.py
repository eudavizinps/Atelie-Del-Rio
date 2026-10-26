"""Prepare white-background catalog photos while preserving original product pixels.

Install scripts/requirements-backgrounds.txt, then run with --pilot to inspect
representative photos or with all to rebuild the catalog. Models download on
first use. Originals are never modified.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "products"
PILOT_OUTPUT = ROOT / "work" / "white-background-pilot"
CATALOG_OUTPUT = SOURCE / "white"

# Completed event decorations keep their full scene. IMG_3876 also needs a
# better source because automated cutouts include a person and other objects.
ORIGINAL_BACKGROUND_PHOTOS = {
    "mesas-decorativos/img-3876.webp",
}

PILOT_PHOTOS = (
    "mesas-decorativos/img-3916.webp",
    "bonecos-pelucias/img-4334.webp",
    "paineis-comodas/img-4439.webp",
    "mesas-decorativos/img-3867.webp",
)

# Thin table frames and a few busy storage-room photos need a stronger mask.
MODEL_OVERRIDES = {
    "bonecos-pelucias/img-4250.webp": "u2net",
    "bonecos-pelucias/img-4258.webp": "birefnet-general-lite",
    **{
        f"mesas-decorativos/img-{id}.webp": "birefnet-general-lite"
        for id in (3867, 3871, 3872, 3879, 3891, 3906, 3909, 3913, 3915, 3916)
    },
}


def prepare_photo(source: Path, destination: Path, session: object) -> None:
    with Image.open(source) as loaded:
        original = loaded.convert("RGB")

    cutout = remove(original, session=session).convert("RGBA")
    alpha = cutout.getchannel("A")

    # Use the source's RGB values; the model only supplies the transparency mask.
    product = original.convert("RGBA")
    product.putalpha(alpha)

    white = Image.new("RGBA", original.size, "white")
    shadow = Image.new("RGBA", original.size, (50, 42, 40, 0))
    shadow_mask = alpha.filter(ImageFilter.GaussianBlur(radius=14))
    shadow_mask = shadow_mask.point(lambda value: round(value * 0.1))
    shadow.putalpha(shadow_mask)
    white.alpha_composite(shadow, (0, 8))
    white.alpha_composite(product)

    if source.relative_to(SOURCE).as_posix() == "bonecos-pelucias/img-4258.webp":
        # Remove a detached sliver of the display stand below the plush toy.
        ImageDraw.Draw(white).rectangle((0, 740, 180, original.height), fill="white")

    destination.parent.mkdir(parents=True, exist_ok=True)
    white.convert("RGB").save(destination, "WEBP", quality=88, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=("pilot", "all"))
    parser.add_argument("--model", default="isnet-general-use")
    parser.add_argument("--photo", action="append", help="Photo path relative to public/products (pilot only)")
    args = parser.parse_args()

    if args.mode == "pilot":
        photos = [SOURCE / path for path in (args.photo or PILOT_PHOTOS)]
        output = PILOT_OUTPUT
    else:
        if args.photo:
            parser.error("--photo can only be used with pilot")
        photos = sorted(
            path for path in SOURCE.glob("*/*.webp")
            if path.parent.name != "decoracoes"
            and path.relative_to(SOURCE).as_posix() not in ORIGINAL_BACKGROUND_PHOTOS
        )
        output = CATALOG_OUTPUT
        if len(photos) != 116:
            raise SystemExit(f"Expected 116 catalog photos, found {len(photos)}")

    print(f"Processing {len(photos)} photos", flush=True)
    sessions = {}
    for index, source in enumerate(photos, start=1):
        relative = source.relative_to(SOURCE)
        destination = output / relative
        model = (MODEL_OVERRIDES.get(relative.as_posix(), args.model)
                 if args.mode == "all" else args.model)
        if model not in sessions:
            print(f"Loading model {model}", flush=True)
            sessions[model] = new_session(model)
        prepare_photo(source, destination, sessions[model])
        print(f"{index}/{len(photos)} {relative} [{model}]", flush=True)


if __name__ == "__main__":
    main()
