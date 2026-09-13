# Configuration

## `book.toml`

```toml
[preprocessor.swirly]
command = "mdbook-swirly"
after = ["links"]
theme = "adaptive"
on-error = "fail"

[output.html]
additional-css = ["./assets/swirly.css"]
```

`mdbook-swirly install` writes all of this.

### Preprocessor keys

| Key | Values | Default | Meaning |
| --- | --- | --- | --- |
| `theme` | `adaptive`, `sodium`, `light`, `dark` | `adaptive` | palette for every diagram in the book |
| `on-error` | `fail`, `warn` | `fail` | what to do when a diagram will not render |

`on_error` is accepted as a spelling of `on-error`.

An unrecognised theme name stops the build and lists the valid ones. An
unrecognised value for `on-error` does the same.

### mdBook keys that matter

| Key | Why |
| --- | --- |
| `command` | how mdBook invokes the preprocessor |
| `after = ["links"]` | makes `{{#include}}` expand before we look for diagrams |
| `additional-css` | loads the stylesheet the `adaptive` theme needs |

`after` is an ordering declaration, not a dependency: if the `links`
preprocessor is disabled, ours still runs, but `{{#include}}` will not have been
expanded.

## Per-block options

Options go in the fence's info string, after the word `swirly`:

~~~markdown
```swirly theme=sodium
@ t | 0 | 1
```
~~~

| Option | Values | Meaning |
| --- | --- | --- |
| `theme` | a theme name | overrides the book default for this block |

An unrecognised option is an error rather than being ignored, so a typo does
not silently do nothing.

The first word of the info string must be exactly `swirly`. A block tagged
`swirlyish` or `rust` is left alone.

## Per-diagram styles

Geometry is decided when the SVG is generated, so it cannot be changed with
CSS. Use a `[styles]` block inside the diagram:

```text
[styles]
axis_column_sizing = fixed
axis_column_width = 160
```

See [Themes and styles](themes.md) for the full key list.

## Precedence

For a given diagram, lowest to highest:

1. the theme's defaults,
2. the book's `theme` in `book.toml`,
3. the block's `theme=` in the info string,
4. a `[styles]` block inside the diagram.

CSS applies over all of it for anything colour-related, because a CSS rule
beats a presentation attribute on the element.
