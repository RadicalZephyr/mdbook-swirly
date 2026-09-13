# Restyle diagrams

There are two levels to reach for, and they solve different problems.

## Level 1: CSS, for anything about colour

`assets/swirly.css` is yours to edit — `install` will not overwrite it unless
you pass `--force`. Every diagram carries `class="swirly"` on its `<svg>`, so
you have a handle on all of them at once.

The stylesheet as installed is only a few rules:

```css
svg.swirly {
  display: block;
  margin: 1.25em auto;
  max-width: 100%;
  height: auto;
  color: var(--fg);
}

svg.swirly rect {
  fill: var(--bg);
}
```

CSS rules beat the presentation attributes on the elements, so you can override
anything the renderer emitted. To tint diagrams away from the body text colour:

```css
svg.swirly { color: var(--links); }
```

To make them full-bleed rather than centred:

```css
svg.swirly { margin-inline: 0; max-width: none; }
```

To leave cell boxes transparent, so the transaction grid shows through:

```css
svg.swirly rect { fill: none; }
```

This level only works with the `adaptive` theme, which emits `currentColor`
rather than literal colours. The fixed themes bake their palette into the SVG,
and while you can still override it with CSS, you are then fighting the theme
rather than using it.

## Level 2: style keys, for anything about geometry

Sizes, spacings, stroke widths, fonts and column sizing are decided when the
SVG is generated, so CSS cannot reach them. Those come from Swirly's style
keys, set in a `[styles]` block inside the diagram itself:

```swirly
@ t | 0 | 1 | 2

> s | 'a' | 'b' | 'c'

[styles]
axis_column_width = 160
axis_column_sizing = fixed
grid_row_height = 56
```

That block applies to the diagram it appears in. The full list of keys is in
[Themes and styles](../reference/themes.md).

Common ones:

| Key | Does |
| --- | --- |
| `axis_column_sizing` | `uniform` (default), `content` or `fixed` |
| `axis_column_width` | column width when sizing is `fixed` |
| `axis_column_min_width` | floor for measured columns |
| `grid_row_height` | height of a stream row |
| `grid_cell_height` | height of a cell box |
| `row_label_width` | minimum gutter width |

## Which level

If you are changing a colour, use CSS — it survives a theme switch and applies
to the whole book at once. If you are changing a size, use style keys. If you
find yourself setting the same style keys on every diagram, that is a sign the
book wants its own theme, which is a Swirly-side change rather than one you can
make from here.
