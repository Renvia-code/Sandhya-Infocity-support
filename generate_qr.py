#!/usr/bin/env python3
"""
QR generator for the Sandhya Infocity campus support site.

For each target below it writes an SVG for print and a high-resolution PNG for
screens and small labels. Modules are SIL deep green on white with the swirl
mark centred; error correction is H (30 percent recovery), which is what lets
the mark sit over the code without breaking a scan.

    python3 -m venv .venv && .venv/bin/pip install segno pillow
    .venv/bin/python generate_qr.py

Every URL carries ?src=... so GoatCounter attributes the scan; app.js reads it
and records a visit_<src> event.
"""

import os
import segno
from PIL import Image

DOMAIN = "sandhyainfocity.support"
GREEN = "#16482F"          # design-system/tokens/colors.css --green-800
MARK = "sandhya-infocity.png"
OUT = "qr"

TARGETS = [
    # slug,            path,          src tag,   what it is for
    ("campus-access",  "/",           "qr",      "Campus access guide, the main page"),
    ("walking-track",  "/walk.html",  "qr-walk", "HCL 50 walking track, for the start-point poster"),
]

PNG_PX = 1400              # long edge; clean at A4 print size
MARK_RATIO = 0.20          # share of the QR width the centred mark covers


def build(slug, path, src, note):
    url = "https://{}{}?src={}".format(DOMAIN, path, src)
    qr = segno.make(url, error="h")

    svg_path = os.path.join(OUT, "qr-{}.svg".format(slug))
    qr.save(svg_path, scale=10, dark=GREEN, light="#FFFFFF", border=3)

    tmp = os.path.join(OUT, "_tmp.png")
    qr.save(tmp, scale=24, dark=GREEN, light="#FFFFFF", border=3)
    img = Image.open(tmp).convert("RGBA").resize((PNG_PX, PNG_PX), Image.LANCZOS)

    if os.path.exists(MARK):
        side = int(PNG_PX * MARK_RATIO)
        pad = int(side * 0.14)
        plate = Image.new("RGBA", (side + pad * 2, side + pad * 2), (255, 255, 255, 255))
        mark = Image.open(MARK).convert("RGBA").resize((side, side), Image.LANCZOS)
        plate.paste(mark, (pad, pad), mark)
        img.paste(plate, ((PNG_PX - plate.width) // 2, (PNG_PX - plate.height) // 2), plate)

    png_path = os.path.join(OUT, "qr-{}.png".format(slug))
    img.convert("RGB").save(png_path, "PNG", optimize=True)
    os.remove(tmp)

    print("{:<15} {}".format(slug, url))
    print("{:<15} {} | {}".format("", png_path, svg_path))
    print("{:<15} {}\n".format("", note))


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for t in TARGETS:
        build(*t)
    print("Print at 30 mm square or larger. Keep the white border; do not crop it.")
