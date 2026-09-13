# Themes and styles

## Themes

| Name | Colours | Background | Column sizing |
| --- | --- | --- | --- |
| `adaptive` | `currentColor` throughout | none | uniform |
| `sodium` | black, everything italic | white | content |
| `light` | Swirly's light palette | white | uniform |
| `dark` | Swirly's dark palette | black | uniform |

`adaptive` is the default. It is derived from `sodium` by replacing every
colour with `currentColor` and dropping the background, which is what lets one
rendering follow the reader's mdBook theme — see
[How adaptive theming works](../explanation/adaptive-theming.md).

## The stylesheet

`mdbook-swirly install` writes `assets/swirly.css`:

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

@media print {
  svg.swirly { color: #000; }
  svg.swirly rect { fill: #fff; }
}
```

`--fg` and `--bg` are mdBook's own variables, defined by every built-in theme.
The `rect` rule keeps cell boxes opaque so the dashed grid stops at their edges;
without it the grid shows through.

The file is yours to edit and is not overwritten unless you pass `--force`.

## Style keys

Set in a `[styles]` block inside a diagram. Values are numbers, colours or
font values, depending on the key.

Naming is regular: a key is `<group>_<property>`. These are the groups a grid
diagram uses.

### Axis and columns — `axis_`

| Key | |
| --- | --- |
| `axis_column_sizing` | `uniform` (default), `content` or `fixed` |
| `axis_column_width` | the width used when sizing is `fixed` |
| `axis_column_min_width` | floor for a measured column |
| `axis_column_padding` | added to measured content to give the column width |
| `axis_header_height` | height of the label row |
| `axis_label_color`, `axis_label_font_{family,size,style,weight}` | the column labels |

Sizing decides how a column's width is found. `uniform` measures every
column's contents and gives them all the widest; `content` gives each its own,
which is what varies column widths within one diagram; `fixed` ignores the
measurements.

### Grid lines — `grid_line_`

`grid_line_color`, `grid_line_stroke_width`, `grid_line_dash_width`,
`grid_line_bleed`, `grid_line_depth_stroke_width_step`

`bleed` is how far the dashes extend past the first and last row.
`depth_stroke_width_step` thins the line for each level of column nesting.

### Stream rows — `grid_row_`

`grid_row_height`, `grid_row_lead`, `grid_row_tail`, `grid_row_value_color`,
`grid_row_value_font_{family,size,style,weight}`

`lead` and `tail` are how far the line runs before the first column boundary
and past the last.

### Cell rows — `grid_cell_`

`grid_cell_height`, `grid_cell_overhang`, `grid_cell_fill_color`,
`grid_cell_stroke_color`, `grid_cell_stroke_width`,
`grid_cell_divider_stroke_width`, `grid_cell_value_padding`,
`grid_cell_value_color`, `grid_cell_value_font_{family,size,style,weight}`

`overhang` is how far the box extends past the last column when `to` is unset.
`value_padding` insets a held value from the edge of its run.

### Annotation rows — `grid_annotation_`

`grid_annotation_height`, `grid_annotation_value_color`,
`grid_annotation_value_font_{family,size,style,weight}`

### Row labels — `row_label_`

`row_label_width`, `row_label_gap`, `row_label_color`,
`row_label_font_{family,size,style,weight}`

`width` is a *minimum*: the gutter grows to fit the widest label.

### Frame-mode groups

Marble diagrams use `arrow_`, `event_`, `operator_`, `stream_`, `range_`,
`barrier_`, `completion_` and `error_`, plus `frame_width`, `stacking_height`,
`higher_order_angle` and `ghost_opacity`.

### Diagram-wide

`background_color`, `canvas_padding`, `minimum_width`, `minimum_height`

Setting `background_color` to an empty string suppresses the background
rectangle entirely, which is what `adaptive` does.

## Getting the exhaustive list

There are 103 keys. They are the fields of `DiagramStyles` in the Swirly
sources, which is the only place guaranteed to be current:

```bash
git submodule update --init
awk '/^export type DiagramStyles = \{/,/^\}/' \
  vendor/swirly/packages/swirly-types/src/styles.ts \
  | grep -oE '^  [a-z_]+' | tr -d ' ' | sort
```

The `awk` range matters: the same file declares a smaller type per style group,
and a plain `grep` over the whole file returns those too.
