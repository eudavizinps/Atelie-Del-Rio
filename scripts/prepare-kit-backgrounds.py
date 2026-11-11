"""Place selected table-party-kit photos on white using a local foreground mask.

The source JPGs remain untouched. Use --files to process specific filenames.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "products" / "kits-festas-de-mesa"
OUTPUT = ROOT / "public" / "products" / "white" / "kits-festas-de-mesa"


def prepare(source: Path, destination: Path, session: object) -> None:
    with Image.open(source) as loaded:
        original = loaded.convert("RGB")

    alpha = remove(original, session=session, only_mask=True).convert("L")
    bounds = alpha.point(lambda value: 255 if value > 20 else 0).getbbox()
    if bounds is None:
        raise ValueError(f"No foreground detected in {source.name}")

    # Center the detected kit with consistent space around it. This also keeps
    # white table fronts from leaving the visible pieces tiny in a product card.
    foreground = original.crop(bounds)
    mask = alpha.crop(bounds)
    scale = min(1000 / foreground.width, 1000 / foreground.height)
    size = (round(foreground.width * scale), round(foreground.height * scale))
    foreground = foreground.resize(size, Image.Resampling.LANCZOS)
    mask = mask.resize(size, Image.Resampling.LANCZOS)
    position = ((1200 - size[0]) // 2, (1200 - size[1]) // 2)

    product = foreground.convert("RGBA")
    product.putalpha(mask)
    white = Image.new("RGBA", (1200, 1200), "white")
    shadow = Image.new("RGBA", (1200, 1200), (50, 42, 40, 0))
    shadow_mask = Image.new("L", (1200, 1200))
    shadow_mask.paste(mask, position)
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(radius=12))
    shadow.putalpha(shadow_mask.point(lambda value: round(value * 0.07)))
    white.alpha_composite(shadow, (0, 6))
    white.alpha_composite(product, position)

    destination.parent.mkdir(parents=True, exist_ok=True)
    white.convert("RGB").save(destination, "WEBP", quality=92, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--files", nargs="+", required=True)
    parser.add_argument("--model", default="birefnet-general-lite")
    args = parser.parse_args()

    session = new_session(args.model)
    for filename in args.files:
        source = SOURCE / filename
        if not source.is_file() or source.parent != SOURCE:
            raise SystemExit(f"Kit photo not found: {filename}")
        destination = OUTPUT / f"{source.stem}.webp"
        prepare(source, destination, session)
        print(destination.name, flush=True)


if __name__ == "__main__":
    main()
