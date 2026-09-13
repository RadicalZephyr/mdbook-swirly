# Choose a theme

## Set the book's default

```toml
[preprocessor.swirly]
theme = "adaptive"
```

| Theme | Looks like | Use it when |
| --- | --- | --- |
| `adaptive` | follows the page | the default; the reader can switch mdBook themes |
| `sodium` | black on white line art | you want the printed-book look, fixed |
| `light` | Swirly's light palette, coloured marbles | marble diagrams where colour distinguishes values |
| `dark` | Swirly's dark palette | a book that is only ever dark |

An unknown name stops the build and lists the valid ones, so a typo cannot
quietly give you the default.

## Override one diagram

Put the option in the fence's info string:

~~~markdown
```swirly theme=sodium
@ t | 0 | 1
```
~~~

This wins over the book default for that block only. It is useful when most of
a book is `adaptive` but one figure is meant to match a printed original.

## Which to pick

Use `adaptive` unless you have a reason not to. It is the only one that stays
legible when a reader switches to Coal or Ayu, and it is the only one that
follows a custom theme.

Its one limitation is that it is monochrome. It renders every stroke and glyph
in the page's text colour, so it cannot distinguish values by colour the way
`light` does with marble diagrams. For grid diagrams that costs you nothing —
they are line art either way. For marble diagrams with many distinct values,
`light` may read better, at the price of looking wrong on dark themes.

You can have both: set `theme = "adaptive"` as the book default and tag the few
marble diagrams that need colour with `theme=light`.

## Making adaptive match a custom mdBook theme

`adaptive` reads two CSS variables, `--fg` and `--bg`, which every built-in
mdBook theme defines. If you ship a custom theme that defines them too, the
diagrams follow it with no further work. If it uses different variable names,
override the rules in `assets/swirly.css` — see
[Restyle diagrams](restyle-diagrams.md).
