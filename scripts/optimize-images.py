"""
Generate responsive web images (WebP + JPEG fallback) from source photos.

Usage:
    python scripts/optimize-images.py <source-dir-or-file> [more files...]

Reads every JPG/PNG/WEBP given, honors EXIF rotation, and writes into images/:
    <name>-<width>.webp and <name>-<width>.jpg for each width in WIDTHS
    (skips widths larger than the original; always writes the largest that fits).
Names are taken from the source filename, lower-cased, spaces -> dashes.
Requires Pillow:  pip install pillow
"""
import os, sys
from PIL import Image, ImageOps

WIDTHS = [640, 1024, 1600, 2200]
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "images")

def slug(name):
    base = os.path.splitext(os.path.basename(name))[0]
    return base.strip().lower().replace(" ", "-").replace("_", "-")

def process(path, name=None):
    name = name or slug(path)
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        w, h = im.size
        targets = [x for x in WIDTHS if x < w] + [min(w, WIDTHS[-1])]
        targets = sorted(set(targets))
        for tw in targets:
            th = round(h * tw / w)
            r = im.resize((tw, th), Image.LANCZOS)
            r.save(os.path.join(OUT, f"{name}-{tw}.webp"), "WEBP", quality=82, method=6)
            r.save(os.path.join(OUT, f"{name}-{tw}.jpg"), "JPEG", quality=82, optimize=True, progressive=True)
            print(f"{name}-{tw}  ({tw}x{th})")
    return targets

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    args = sys.argv[1:]
    files = []
    for a in args:
        if os.path.isdir(a):
            files += [os.path.join(a, f) for f in sorted(os.listdir(a)) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
        else:
            files.append(a)
    for f in files:
        process(f)
