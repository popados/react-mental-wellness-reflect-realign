"""Convert a string set in a TTF into a single outlined SVG path.

Shaping goes through HarfBuzz so kerning and any ligatures the script faces
rely on are applied; the outlines then come from fontTools. The result is a
plain `d` string in a y-down SVG coordinate space with the baseline at y=0.
"""

import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
from fontTools.pens.boundsPen import BoundsPen


class ScriptFont:
    def __init__(self, path):
        self.path = path
        with open(path, "rb") as fh:
            self.data = fh.read()
        self.hb_face = hb.Face(self.data)
        self.hb_font = hb.Font(self.hb_face)
        self.tt = TTFont(path)
        self.upem = self.tt["head"].unitsPerEm
        self.glyph_set = self.tt.getGlyphSet()
        self.glyph_order = self.tt.getGlyphOrder()

    def shape(self, text):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb_font, buf, {"kern": True, "liga": True})
        return buf.glyph_infos, buf.glyph_positions

    def _draw(self, pen, text, size, origin):
        """Draw the shaped run into `pen`, scaled, y-flipped and offset."""
        scale = size / self.upem
        ox, oy = origin
        x = y = 0.0
        for info, pos in zip(*self.shape(text)):
            name = self.glyph_order[info.codepoint]
            t = Transform(scale, 0, 0, -scale,
                          ox + (x + pos.x_offset) * scale,
                          oy - (y + pos.y_offset) * scale)
            self.glyph_set[name].draw(TransformPen(pen, t))
            x += pos.x_advance
            y += pos.y_advance
        return x * scale

    def text_path(self, text, size, origin=(0, 0), decimals=2):
        """Return (d, advance, (xmin, ymin, xmax, ymax)) at the given size.

        Coordinates are y-down with the baseline at `origin`, so the offset is
        baked into the outline itself and the path needs no SVG transform.
        """
        pen = SVGPathPen(self.glyph_set, ntos=lambda v: f"{round(v, decimals):g}")
        advance = self._draw(pen, text, size, origin)
        bounds_pen = BoundsPen(self.glyph_set)
        self._draw(bounds_pen, text, size, origin)
        return pen.getCommands(), advance, bounds_pen.bounds

    def centered(self, text, size, cx, cy):
        """Path data for `text` centred on its visual bounds at (cx, cy)."""
        _d, _adv, (x0, y0, x1, y1) = self.text_path(text, size)
        d, _adv, bounds = self.text_path(
            text, size, origin=(cx - (x0 + x1) / 2, cy - (y0 + y1) / 2))
        return d, bounds


if __name__ == "__main__":
    for name in ("PinyonScript", "Italianno", "GreatVibes", "Parisienne"):
        f = ScriptFont(f"/home/claude/rr/fonts/{name}-Regular.ttf")
        d, adv, bounds = f.text_path("R&R", 100)
        print(f"{name:14} upem={f.upem:5} adv={adv:7.2f} bounds={tuple(round(b,1) for b in bounds)} len(d)={len(d)}")
