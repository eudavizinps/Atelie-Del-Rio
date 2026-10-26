"""Prepare newly supplied table photos for the white catalog background.

The numbered JPG/PNG files in public/products/mesas-novas are kept intact.
The segmentation model supplies only an alpha mask; table pixels come from
the source photo.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "products" / "mesas-novas"
OUTPUT = ROOT / "public" / "products" / "white" / "mesas-novas"

# Crop around the photographed tables before segmentation so stored backdrops
# and boards do not become part of the foreground mask.
TABLE_BOUNDS = {
    7401: (0, 550, 720, 1010),
    7402: (0, 1480, 2340, 3100),
    7403: (0, 1640, 2340, 3220),
    7405: (0, 1550, 2340, 3150),
    7406: (0, 1550, 2340, 3350),
    7407: (0, 1550, 2340, 3350),
    7408: (0, 1550, 2340, 3350),
    7409: (0, 1480, 2340, 3100),
    7410: (0, 1550, 2340, 3150),
    7411: (0, 1250, 2340, 3000),
    7412: (0, 380, 960, 1274),
}

MODEL_OVERRIDES = {
    7406: "isnet-general-use",
    7407: "isnet-general-use",
    7408: "isnet-general-use",
    7412: "isnet-general-use",
}


def prepare(source: Path, destination: Path, session: object) -> None:
    with Image.open(source) as loaded:
        original = loaded.convert("RGB")
    bounds = TABLE_BOUNDS.get(int(source.stem[4:]))
    if bounds:
        original = original.crop(bounds)

    if source.stem == "img-7404":
        # This supplied photo is already an isolated table on white.
        result = original
    else:
        alpha = remove(original, session=session, only_mask=True).convert("L")
        if source.stem == "img-7401":
            # A loose wicker ball sits behind the oval table, between its legs.
            # Keep the white foot that overlaps the ball in the photograph.
            pixels = original.load()
            mask_pixels = alpha.load()
            for y in range(150, 300):
                for x in range(215, 405):
                    red, green, blue = pixels[x, y]
                    is_white_foot = y >= 265 and x <= 300 and min(red, green, blue) > 180
                    if not is_white_foot:
                        mask_pixels[x, y] = 0
        product = original.convert("RGBA")
        product.putalpha(alpha)

        white = Image.new("RGBA", original.size, "white")
        shadow = Image.new("RGBA", original.size, (50, 42, 40, 0))
        shadow_mask = alpha.filter(ImageFilter.GaussianBlur(radius=14))
        shadow.putalpha(shadow_mask.point(lambda value: round(value * 0.08)))
        white.alpha_composite(shadow, (0, 8))
        white.alpha_composite(product)
        result = white.convert("RGB")

    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, "WEBP", quality=92, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ids", type=int, nargs="*", help="Process only these catalog IDs")
    parser.add_argument("--model", default="birefnet-general-lite")
    parser.add_argument("--output", type=Path, default=OUTPUT)
    args = parser.parse_args()

    photos = sorted([*SOURCE.glob("img-*.jpg"), *SOURCE.glob("img-*.png")])
    if args.ids:
        wanted = set(args.ids)
        photos = [photo for photo in photos if int(photo.stem[4:]) in wanted]
        if len(photos) != len(wanted):
            raise SystemExit("Some requested table IDs have no source photo")
    if not photos:
        raise SystemExit("No table photos found")

    sessions = {}
    for index, source in enumerate(photos, 1):
        destination = args.output / f"{source.stem}.webp"
        model = MODEL_OVERRIDES.get(int(source.stem[4:]), args.model)
        if model not in sessions:
            sessions[model] = new_session(model)
        prepare(source, destination, sessions[model])
        print(f"{index}/{len(photos)} {destination.name}", flush=True)


if __name__ == "__main__":
    main()
