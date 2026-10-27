"""Place the photographed LED signs on white without redrawing their lettering.

LEDs photographed against black lose their lettering if the dark area behind the
light is removed entirely. A soft, local dark backing preserves the original
light and glow pixels while the surrounding catalog image becomes white.
The JPG sources in public/products/leds are kept intact.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps
from scipy import ndimage


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "products" / "leds"
OUTPUT = ROOT / "public" / "products" / "white" / "leds"

# Tight framing keeps the actual illuminated piece large in the catalog card.
CROPS = {
    7501: (145, 0, 1430, 899),
    7502: (55, 300, 1450, 1080),
    7503: (45, 265, 1190, 1165),
    7504: (220, 65, 1570, 1190),
    7505: (100, 235, 750, 1110),
    7506: (95, 230, 755, 1020),
    7507: (50, 0, 1560, 1067),
}


def white_background(original: Image.Image, product_id: int) -> Image.Image:
    crop = original.crop(CROPS[product_id])
    if product_id == 7504:
        # The sign is photographed on a woven arch. Keep the arch and light
        # together, while fading the event surroundings to white.
        alpha = Image.new("L", crop.size)
        drawing = ImageDraw.Draw(alpha)
        drawing.ellipse((30, 0, crop.width - 15, crop.height + 110), fill=255)
        alpha = alpha.filter(ImageFilter.GaussianBlur(65))
    else:
        if product_id == 7507:
            pixels = np.asarray(crop, dtype=np.int16)
            brightest = pixels.max(axis=2)
            saturation = brightest - pixels.min(axis=2)
            # Isolate the bright colored tubes, rather than the leafy wall.
            colored_lights = (brightest >= 155) & (saturation >= 75)
            white_lights = pixels.min(axis=2) >= 225
            mask = Image.fromarray(np.uint8(colored_lights | white_lights) * 255, "L")
            small = np.asarray(mask.resize((crop.width // 4, crop.height // 4))) > 80
            small = ndimage.binary_dilation(small, iterations=3)
            small = ndimage.binary_fill_holes(small)
            small = ndimage.binary_dilation(small, iterations=4)
            alpha = Image.fromarray(np.uint8(small) * 255, "L")
            alpha = alpha.resize(crop.size, Image.Resampling.BILINEAR)
            alpha = alpha.filter(ImageFilter.GaussianBlur(14))
        else:
            light = ImageOps.grayscale(crop)
            mask = light.point(lambda value: 255 if value >= 135 else 0)
            # A broad mask joins the lettering and its acrylic support into
            # one localized backing. Original pixels supply the sign and glow.
            small = mask.resize((max(1, crop.width // 8), max(1, crop.height // 8)))
            alpha = small.filter(ImageFilter.MaxFilter(23))
            alpha = alpha.resize(crop.size, Image.Resampling.BILINEAR)
            alpha = alpha.filter(ImageFilter.GaussianBlur(32))

    foreground = crop.convert("RGBA")
    foreground.putalpha(alpha)
    margin = round(max(crop.size) * 0.07)
    canvas = Image.new("RGBA", (crop.width + 2 * margin, crop.height + 2 * margin), "white")
    canvas.alpha_composite(foreground, (margin, margin))
    return canvas.convert("RGB")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    sources = sorted(SOURCE.glob("img-*.jpg"))
    if len(sources) != len(CROPS):
        raise SystemExit(f"Expected {len(CROPS)} LED photos; found {len(sources)}")
    for source in sources:
        product_id = int(source.stem[4:])
        with Image.open(source) as loaded:
            original = loaded.convert("RGB")
        processed = white_background(original, product_id)
        destination = OUTPUT / f"img-{product_id}.webp"
        processed.save(destination, "WEBP", quality=93, method=6)
        print(destination.relative_to(ROOT), flush=True)


if __name__ == "__main__":
    main()
