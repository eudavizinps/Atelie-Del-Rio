"""Frame white-background round panels as square catalog images."""

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


# Panels whose complete printed circle is clearer with a geometric cutout.
GEOMETRIC_PANEL_BOUNDS = {
    7202: (0, 0, 960, 960),
    7207: (0, 0, 1080, 1080),
    7217: (0, 95, 955, 1080),
    7221: (0, 0, 1080, 1080),
    7228: (0, 90, 720, 830),
    7229: (0, 0, 1080, 1080),
    7239: (0, 0, 960, 960),
    7247: (16, 70, 698, 760),
    7251: (0, 0, 999, 999),
    7252: (0, 0, 1022, 1021),
    7258: (10, 170, 710, 870),
}


def cut_round_panel(image: Image.Image, bounds: tuple[int, int, int, int]) -> Image.Image:
    panel = image.convert("RGB").crop(bounds)
    width, height = panel.size
    scale = 4
    mask = Image.new("L", (width * scale, height * scale))
    ImageDraw.Draw(mask).ellipse((0, 0, width * scale - 1, height * scale - 1), fill=255)
    mask = mask.resize(panel.size, Image.Resampling.LANCZOS)
    margin = max(16, round(max(width, height) * 0.06))
    side = max(width, height) + margin * 2
    result = Image.new("RGB", (side, side), "white")
    result.paste(panel, ((side - width) // 2, (side - height) // 2), mask)
    return result


def frame_image(image: Image.Image) -> Image.Image:
    image = image.convert("RGB")
    difference = ImageChops.difference(image, Image.new("RGB", image.size, "white"))
    visible = difference.convert("L").point(lambda value: 255 if value > 20 else 0)
    bounds = visible.getbbox()
    if not bounds:
        return image

    left, top, right, _ = bounds
    diameter = right - left
    margin = max(16, round(diameter * 0.06))
    side = diameter + margin * 2
    square = Image.new("RGB", (side, side), "white")
    crop_left, crop_top = left - margin, top - margin
    source_box = (
        max(0, crop_left),
        max(0, crop_top),
        min(image.width, crop_left + side),
        min(image.height, crop_top + side),
    )
    if source_box[2] > source_box[0] and source_box[3] > source_box[1]:
        square.paste(image.crop(source_box), (source_box[0] - crop_left, source_box[1] - crop_top))
    return square


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--geometric", action="store_true", help="Rebuild only the geometric overrides")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1] / "public/products"
    folder = root / "white/paineis-redondos"
    if args.geometric:
        for id, bounds in GEOMETRIC_PANEL_BOUNDS.items():
            with Image.open(root / f"paineis-redondos/img-{id}.webp") as loaded:
                result = cut_round_panel(loaded, bounds)
            result.save(folder / f"img-{id}.webp", "WEBP", quality=88, method=6)
        print(f"Rebuilt {len(GEOMETRIC_PANEL_BOUNDS)} round panels")
    else:
        photos = sorted(folder.glob("*.webp"))
        if len(photos) != 59:
            raise SystemExit(f"Expected 59 panel photos, found {len(photos)}")
        for photo in photos:
            with Image.open(photo) as loaded:
                framed = frame_image(loaded)
            framed.save(photo, "WEBP", quality=88, method=6)
        print(f"Framed {len(photos)} panels")
