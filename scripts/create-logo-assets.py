#!/usr/bin/env python3
"""Generate Swapio logo assets matching Riot Shop size and corner treatment."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "Swapio Logo.png"
OUT_DIR = ROOT / "assets"
RIOT_REF = ROOT.parent / "Riot Shop" / "assets" / "Riot Shop Logo.png"
RIOT_PROCESSED = ROOT.parent / "Riot Shop" / "assets" / "logo.png"

# Measured from Riot Shop logo.png (1080px master).
CORNER_RATIO = 227 / 1080
ICON_FILL_RATIO = 641 / 1080
MASTER_SIZE = 1080
SIZES = {
    "logo.png": 1080,
    "logo-512.png": 512,
    "logo-180.png": 180,
    "logo-32.png": 32,
}


def rounded_mask(size: int, corner_ratio: float = CORNER_RATIO) -> Image.Image:
    radius = max(2, int(size * corner_ratio))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    return mask


def symbol_bbox(img: Image.Image, bg_color: tuple[int, int, int], tolerance: int = 40) -> tuple[int, int, int, int]:
    px = img.load()
    w, h = img.size
    coords = []
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y][:3]
            if abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2]) > tolerance:
                coords.append((x, y))
    if not coords:
        return (0, 0, w - 1, h - 1)
    xs = [c[0] for c in coords]
    ys = [c[1] for c in coords]
    return min(xs), min(ys), max(xs), max(ys)


def background_color(img: Image.Image) -> tuple[int, int, int]:
    px = img.load()
    w, h = img.size
    samples = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    opaque = [color[:3] for color in samples if color[3] > 128]
    return opaque[0] if opaque else px[w // 2, h // 2][:3]


def riot_corner_ratio() -> float:
    if not RIOT_PROCESSED.exists():
        return CORNER_RATIO
    img = Image.open(RIOT_PROCESSED).convert("RGBA")
    px = img.load()
    top_first = next((x for x in range(img.size[0]) if px[x, 0][3] > 128), None)
    return top_first / img.size[0] if top_first else CORNER_RATIO


def riot_symbol_fill_ratio() -> float:
    if RIOT_REF.exists():
        img = Image.open(RIOT_REF).convert("RGBA")
        bg = background_color(img)
        min_x, min_y, max_x, max_y = symbol_bbox(img, bg, tolerance=80)
        return (max_x - min_x + 1) / img.size[0]
    return ICON_FILL_RATIO


def build_master() -> Image.Image:
    src = Image.open(SRC).convert("RGBA")
    bg_color = background_color(src)
    min_x, min_y, max_x, max_y = symbol_bbox(src, bg_color)
    symbol = src.crop((min_x, min_y, max_x + 1, max_y + 1))

    target_fill = riot_symbol_fill_ratio()
    target_width = int(round(MASTER_SIZE * target_fill))
    scale = target_width / symbol.width
    target_height = max(1, int(round(symbol.height * scale)))
    symbol = symbol.resize((target_width, target_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (MASTER_SIZE, MASTER_SIZE), (*bg_color, 255))
    offset = ((MASTER_SIZE - symbol.width) // 2, (MASTER_SIZE - symbol.height) // 2)
    canvas.paste(symbol, offset, symbol)
    return canvas


def export_logo(master: Image.Image, size: int) -> Image.Image:
    resized = master.resize((size, size), Image.Resampling.LANCZOS)
    mask = rounded_mask(size, riot_corner_ratio())
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(resized, (0, 0), mask)
    return out


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source logo: {SRC}")

    master = build_master()
    for filename, size in SIZES.items():
        logo = export_logo(master, size)
        out_path = OUT_DIR / filename
        logo.save(out_path, "PNG", optimize=True)
        print(f"OK {out_path} ({size}x{size})")


if __name__ == "__main__":
    main()