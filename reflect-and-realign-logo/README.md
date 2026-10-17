# Reflect and Realign — logo assets

Four logo directions, each supplied as a wordmark, an app icon, a monogram and a
horizontal lockup. Open `index.html` to see everything rendered with usage notes.

## Why these files are different from the design canvas

The canvas versions set the script as live webfont text. These don't — every
glyph has been converted to vector outlines, so the logo renders identically
whether or not a font loads, and nobody needs the typeface installed to use it.

## Folder

| Path | What it is |
| --- | --- |
| `wordmark/` | Full name, transparent ground, painted with `currentColor` |
| `icon/` | 512 × 512 app icons, with their background plates |
| `monogram/` | R&R letters alone, transparent — badges, avatars, stamps |
| `lockup/` | Icon beside the name, for headers and footers |
| `png/` | Raster icon exports at 1024, 512 and 180 |
| `logo.css` | Palette tokens and sizing helpers |
| `index.html` | Preview page and usage guide |

Each comes in four styles: `negative-space`, `geometric`, `minimal`, `lineart`.

## Colouring

Wordmarks, monograms and lockups use `fill="currentColor"`. An `<img>` tag
**cannot** inherit that — the browser renders the SVG in an isolated document,
and it will come out black. Two ways round it:

```html
<!-- Inline the markup -->
<span style="color: var(--rr-clay)">
  <svg viewBox="..."><path fill="currentColor" d="..."/></svg>
</span>
```

```css
/* Or mask it, keeping the file external */
.wordmark {
  width: 240px; height: 42px;
  background: var(--rr-clay);
  mask: url(wordmark/wordmark-minimal.svg) center / contain no-repeat;
  -webkit-mask: url(wordmark/wordmark-minimal.svg) center / contain no-repeat;
}
```

App icons have their colours baked in, since the plate is part of the design.

## Sizing and clear space

- **Wordmark:** don't go below 160px wide. Script connections break up under that.
- **Icon:** 32px floor. Keep clear space of at least 25% of the mark's height on
  all sides.
- The icon SVGs use a 22.3% corner radius, matching the iOS/Android plate, so
  they sit correctly without extra clipping.

## Small-size warning

Script faces are fragile at icon sizes. Tested at 60px (home screen) and 32px
(favicon):

- **Minimalist** and **negative space** stay legible.
- **Geometric** (tick marks, mirrored ghost) and **line art** (fine flourish)
  turn to mush below roughly 64px.

If you choose either of the latter two, they need a simplified small-size
variant with the fine detail removed. That's normal for an icon set — most
brands ship two or three cuts of a mark for different sizes.

## Known issue: the ampersand in the negative-space style

Pinyon Script's ampersand is an unusual stylised form, and at icon size "R&R"
can read as "R v R". If you go with that direction, the fix is to substitute an
ampersand from one of the other faces, or draw a custom one. Worth deciding
before anything gets printed.

## Typefaces

The lettering is drawn from four Google Fonts, all under the SIL Open Font
License 1.1, which permits use in a logo and permits converting glyphs to
outlines:

| Style | Typeface |
| --- | --- |
| Negative space | Pinyon Script |
| Geometric | Italianno |
| Minimalist | Great Vibes |
| Line art | Parisienne |

Because the outlines are embedded rather than the font files, you don't need to
redistribute the fonts or ship an OFL notice with your app. If you later edit
these marks and want the live fonts, get them from Google Fonts.

One caveat worth knowing: using an off-the-shelf typeface means your wordmark is
reproducible by anyone with the same font. That's fine for launch, and it's how
plenty of brands start, but a distinctive mark usually means customising the
letterforms — adjusting a terminal, redrawing the ampersand, tightening a join.
That's the natural next step once you've settled on a direction.

## Regenerating

The assets are generated, not hand-drawn, so they can be rebuilt at any size or
colour. The build scripts are `textpath.py` (shapes text through HarfBuzz and
extracts outlines via fontTools) and `make_assets.py` (composes the marks).
They need `fonttools`, `uharfbuzz` and `cairosvg`, plus the four TTFs.
