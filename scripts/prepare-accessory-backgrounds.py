"""Place the accessory catalog on white using masks, preserving source pixels.

The numbered JPGs in public/products/acessorios are the unmodified originals.
Run with `--ids 7301 7302` for a pilot or omit --ids for the full set.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "products" / "acessorios"
OUTPUT = ROOT / "public" / "products" / "white" / "acessorios"


def prepare(source: Path, destination: Path, session: object) -> None:
    with Image.open(source) as loaded:
        original = loaded.convert("RGB")

    # The segmentation model supplies only the mask. Product color and detail
    # always come from the original photograph, never a generated replacement.
    alpha = remove(original, session=session, only_mask=True).convert("L")
    product = original.convert("RGBA")
    product.putalpha(alpha)

    white = Image.new("RGBA", original.size, "white")
    shadow = Image.new("RGBA", original.size, (50, 42, 40, 0))
    shadow_mask = alpha.filter(ImageFilter.GaussianBlur(radius=12))
    shadow.putalpha(shadow_mask.point(lambda value: round(value * 0.07)))
    white.alpha_composite(shadow, (0, 6))
    white.alpha_composite(product)

    destination.parent.mkdir(parents=True, exist_ok=True)
    white.convert("RGB").save(destination, "WEBP", quality=92, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ids", type=int, nargs="*", help="Process only these catalog IDs")
    parser.add_argument("--model", default="birefnet-general-lite")
    args = parser.parse_args()

    photos = sorted(SOURCE.glob("img-*.jpg"))
    if args.ids:
        wanted = set(args.ids)
        photos = [photo for photo in photos if int(photo.stem[4:]) in wanted]
        if len(photos) != len(wanted):
            raise SystemExit("Some requested accessory IDs have no source photo")
    if not photos:
        raise SystemExit("No accessory photos found")

    session = new_session(args.model)
    for index, source in enumerate(photos, 1):
        destination = OUTPUT / f"{source.stem}.webp"
        prepare(source, destination, session)
        print(f"{index}/{len(photos)} {destination.name}", flush=True)


if __name__ == "__main__":
    main()
