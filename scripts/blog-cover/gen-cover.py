#!/usr/bin/env python3
"""Gera capas de blog no estilo ilustrativo da marca QARA.

Uso: python3 scripts/blog-cover/gen-cover.py "Título do artigo" nome-do-arquivo.webp
Saída em public/images/blog/<nome-do-arquivo>.
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FONT = Path(__file__).resolve().parent / "Telegraf-Regular.otf"
OUT_DIR = ROOT / "public/images/blog"
W, H = 1400, 788
TL, BR = (241, 241, 241), (251, 230, 219)  # gradiente amostrado das capas originais
CIRCLE, TEXT, CHIP_TEXT = (138, 122, 112), (111, 101, 94), (90, 84, 79)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_cover(title: str, filename: str) -> Path:
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        for x in range(W):
            px[x, y] = lerp(TL, BR, (x / W + y / H) / 2)
    d = ImageDraw.Draw(img)
    d.ellipse([W - 360, -260, W + 260, 360], outline=CIRCLE, width=2)
    d.ellipse([-180, H - 200, 240, H + 220], outline=CIRCLE, width=2)

    font_big = ImageFont.truetype(str(FONT), 62)
    font_chip = ImageFont.truetype(str(FONT), 26)
    tb = d.textbbox((0, 0), title, font=font_big)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    tx, ty = (W - tw) / 2, H * 0.42 - th / 2
    d.text((tx, ty), title, font=font_big, fill=TEXT)

    chip = "Imagem ilustrativa"
    cb = d.textbbox((0, 0), chip, font=font_chip)
    cw, ch = cb[2] - cb[0], cb[3] - cb[1]
    cx, cy = (W - cw) / 2, ty + th + 58
    d.rectangle([cx - 22, cy - 14, cx + cw + 22, cy + ch + 14], fill=(255, 255, 255))
    d.text((cx, cy - cb[1] / 2), chip, font=font_chip, fill=CHIP_TEXT)

    out = OUT_DIR / filename
    img.save(out, "WEBP", quality=82)
    return out


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    print("salvo:", make_cover(sys.argv[1], sys.argv[2]))
