"""Generate the Reflect and Realign logo asset set as outlined SVGs.

Every mark ships as vector outlines, so none of the files depend on a webfont
being present at render time.
"""

import os
from textpath import ScriptFont

FONT_DIR = "/home/claude/rr/fonts"
OUT = "/home/claude/rr/dist"

INK = "#2B2A28"
PAPER = "#EDE6D6"
PAPER_LIGHT = "#FBF8F1"
LINE = "#DCD2BE"
CLAY = "#A85C42"
CLAY_LIGHT = "#C06A4C"
MOSS = "#56624A"

NAME = "Reflect and Realign"
SHORT = "R&R"

STYLES = {
    "negative-space": {"font": "PinyonScript", "accent": CLAY_LIGHT},
    "geometric": {"font": "Italianno", "accent": CLAY_LIGHT},
    "minimal": {"font": "GreatVibes", "accent": CLAY},
    "lineart": {"font": "Parisienne", "accent": MOSS},
}

fonts = {n: ScriptFont(f"{FONT_DIR}/{n}-Regular.ttf")
         for n in {s["font"] for s in STYLES.values()}}

S = 512          # icon artboard
R = 114          # icon corner radius


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def rounded_rect(x, y, w, h, r):
    return (f"M{x + r},{y} H{x + w - r} A{r},{r} 0 0 1 {x + w},{y + r} "
            f"V{y + h - r} A{r},{r} 0 0 1 {x + w - r},{y + h} "
            f"H{x + r} A{r},{r} 0 0 1 {x},{y + h - r} "
            f"V{y + r} A{r},{r} 0 0 1 {x + r},{y} Z")


def fit(font, text, target_w, cx, cy, max_h=None):
    """Outline `text` scaled to `target_w` wide (capped by `max_h`), centred."""
    _d, _adv, (x0, y0, x1, y1) = font.text_path(text, 100)
    size = 100 * target_w / (x1 - x0)
    if max_h is not None:
        h = (y1 - y0) * size / 100
        if h > max_h:
            size *= max_h / h
    return font.centered(text, size, cx, cy)


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" role="img" aria-label="{esc(title)}">\n'
            f'  <title>{esc(title)}</title>\n{body}</svg>\n')


def write(path, content):
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w") as fh:
        fh.write(content)
    print(f"  {path:46} {len(content):>7,} bytes")


# ---------------------------------------------------------------- wordmarks
def wordmark(style):
    """Name lettering alone on a transparent ground, in currentColor."""
    font = fonts[STYLES[style]["font"]]
    size = 200
    _d, _adv, (x0, y0, x1, y1) = font.text_path(NAME, size)
    pad = size * 0.10
    w, h = (x1 - x0) + pad * 2, (y1 - y0) + pad * 2
    d, _ = font.centered(NAME, size, w / 2, h / 2)
    body = f'  <path fill="currentColor" d="{d}"/>\n'
    return svg(round(w), round(h), body, f"{NAME} wordmark")


def lockup(style):
    """Icon beside the name, the horizontal lockup for headers and footers."""
    font = fonts[STYLES[style]["font"]]
    icon_px, gap, pad = 128, 36, 16
    size = 112
    _d, _adv, (x0, y0, x1, y1) = font.text_path(NAME, size)
    text_w, text_h = x1 - x0, y1 - y0
    w = pad + icon_px + gap + text_w + pad
    h = pad * 2 + icon_px
    d, _ = font.centered(NAME, size,
                         pad + icon_px + gap + text_w / 2, h / 2)
    inner = ICONS[style](style, inner_only=True)
    scale = icon_px / S
    body = (f'  <g transform="translate({pad},{pad}) scale({scale:.5f})">\n'
            f'{inner}  </g>\n'
            f'  <path fill="currentColor" d="{d}"/>\n')
    return svg(round(w), round(h), body, f"{NAME} logo lockup")


# -------------------------------------------------------------------- icons
def icon_negative(style, inner_only=False):
    font = fonts[STYLES[style]["font"]]
    accent = STYLES[style]["accent"]
    d, _ = fit(font, SHORT, 386, S / 2, S / 2, max_h=300)
    plate = rounded_rect(0, 0, S, S, R)
    # plate and lettering share one path: even-odd knocks the letters out so
    # the dark ground reads through them, and puts each counter back in clay
    body = (f'  <path fill="{INK}" d="{plate}"/>\n'
            f'  <path fill="{accent}" fill-rule="evenodd" d="{plate} {d}"/>\n')
    return body if inner_only else svg(S, S, body, f"{NAME} app icon, negative space")


def icon_geometric(style, inner_only=False):
    font = fonts[STYLES[style]["font"]]
    accent = STYLES[style]["accent"]
    d, _ = fit(font, SHORT, 250, S / 2, S / 2 - 26, max_h=150)
    ticks = "\n      ".join(
        f'<line x1="256" y1="54" x2="256" y2="{54 + (28 if i % 2 == 0 else 22)}" '
        f'transform="rotate({ang} 256 256)"/>'
        for i, ang in enumerate(range(0, 360, 45)))
    body = (f'  <path fill="{INK}" d="{rounded_rect(0, 0, S, S, R)}"/>\n'
            f'  <g fill="none" stroke="{accent}">\n'
            f'    <circle cx="256" cy="256" r="186" stroke-width="2.6" opacity="0.65"/>\n'
            f'    <circle cx="256" cy="256" r="154" stroke-width="1.8" opacity="0.28"/>\n'
            f'    <g stroke-width="2.6" stroke-linecap="round" opacity="0.7">\n'
            f'      {ticks}\n    </g>\n'
            f'    <line x1="92" y1="256" x2="420" y2="256" stroke-width="1.8" opacity="0.45"/>\n'
            f'  </g>\n'
            f'  <path fill="{PAPER}" d="{d}"/>\n'
            f'  <path fill="{PAPER}" opacity="0.26" d="{d}" '
            f'transform="translate(0,512) scale(1,-1)"/>\n')
    return body if inner_only else svg(S, S, body, f"{NAME} app icon, geometric")


def icon_minimal(style, inner_only=False):
    font = fonts[STYLES[style]["font"]]
    accent = STYLES[style]["accent"]
    d, _ = fit(font, SHORT, 268, S / 2, S / 2 + 22, max_h=190)
    body = (f'  <path fill="{PAPER_LIGHT}" d="{rounded_rect(0, 0, S, S, R)}"/>\n'
            f'  <path fill="none" stroke="{LINE}" stroke-width="2" '
            f'd="{rounded_rect(1, 1, S - 2, S - 2, R - 1)}"/>\n'
            f'  <circle cx="256" cy="150" r="9" fill="{accent}"/>\n'
            f'  <path fill="{INK}" d="{d}"/>\n')
    return body if inner_only else svg(S, S, body, f"{NAME} app icon, minimalist")


def icon_lineart(style, inner_only=False):
    font = fonts[STYLES[style]["font"]]
    accent = STYLES[style]["accent"]
    d, _ = fit(font, SHORT, 268, S / 2, S / 2 - 18, max_h=175)
    body = (f'  <path fill="#F3EEE2" d="{rounded_rect(0, 0, S, S, R)}"/>\n'
            f'  <path fill="none" stroke="{accent}" stroke-width="2.6" opacity="0.45" '
            f'd="{rounded_rect(1.5, 1.5, S - 3, S - 3, R - 1.5)}"/>\n'
            f'  <g fill="none" stroke="{accent}" stroke-width="2.8" '
            f'stroke-linecap="round" opacity="0.85">\n'
            f'    <path d="M114 342 C 170 388, 342 388, 398 342"/>\n'
            f'    <path d="M398 342 C 427 320, 423 285, 395 281 C 370 278, 359 306, 384 320 '
            f'C 402 330, 427 327, 445 313"/>\n'
            f'    <path d="M114 342 C 96 331, 85 317, 82 299"/>\n'
            f'    <path d="M128 176 C 200 147, 312 147, 384 176" opacity="0.4"/>\n'
            f'  </g>\n'
            f'  <path fill="{INK}" d="{d}"/>\n')
    return body if inner_only else svg(S, S, body, f"{NAME} app icon, line art")


ICONS = {
    "negative-space": icon_negative,
    "geometric": icon_geometric,
    "minimal": icon_minimal,
    "lineart": icon_lineart,
}


def monogram(style):
    """R&R letters alone, currentColor, transparent — for favicons and stamps."""
    font = fonts[STYLES[style]["font"]]
    d, (x0, y0, x1, y1) = fit(font, SHORT, 400, S / 2, S / 2, max_h=400)
    body = f'  <path fill="currentColor" d="{d}"/>\n'
    return svg(S, S, body, f"{NAME} monogram")


if __name__ == "__main__":
    print("Wordmarks (transparent, currentColor)")
    for style in STYLES:
        write(f"wordmark/wordmark-{style}.svg", wordmark(style))
    print("\nApp icons (512 x 512, full colour)")
    for style in STYLES:
        write(f"icon/icon-{style}.svg", ICONS[style](style))
    print("\nMonograms (transparent, currentColor)")
    for style in STYLES:
        write(f"monogram/monogram-{style}.svg", monogram(style))
    print("\nLockups (icon + name)")
    for style in STYLES:
        write(f"lockup/lockup-{style}.svg", lockup(style))
