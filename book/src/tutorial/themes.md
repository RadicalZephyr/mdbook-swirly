# Themes

Find the paint roller in the toolbar at the top of this page and switch to
Coal or Ayu. The diagram below changes with it:

```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |
to = 5

> s |     | 'b' |     | 'c' |     |
```

Your own book does the same. Switch themes in the browser tab you left running
and the diagram you just drew will follow.

This is worth a moment, because it should not be possible. The SVG was rendered
once, when the book was built, long before anyone chose a theme. It cannot know
what colours the page is using.

## How it does it

The trick is to not name any colours. The default theme, `adaptive`, draws
every stroke and every glyph in `currentColor` — a CSS keyword meaning
"whatever the surrounding text colour is" — and paints no background at all.
The stylesheet `mdbook-swirly install` dropped in your `assets/` directory is
what supplies that colour, and it does so from mdBook's own variables:

```css
svg.swirly      { color: var(--fg); }
svg.swirly rect { fill: var(--bg); }
```

Those two variables are how mdBook itself paints every page, so the diagram is
now using the same palette as the prose around it. Custom themes work too, as
long as they set `--fg` and `--bg`.

The second rule is why cell boxes stay opaque: without it the dashed grid would
show straight through them.

## Picking a different one

If you would rather have a fixed look, set it in `book.toml`:

```toml
[preprocessor.swirly]
theme = "sodium"
```

`sodium` is black-on-white line art, matching the printed figures in the
*Functional Reactive Programming* book:

```swirly theme=sodium
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |
to = 5

> s |     | 'b' |     | 'c' |     |
```

It stays black on white whatever the reader picks, which is right for print and
wrong for a reader using Coal — try switching now and see. That is the trade:
`adaptive` follows the page, the others are fixed.

You can also override a single diagram without changing the book default, which
is what produced the one above:

~~~markdown
```swirly theme=sodium
@ t | 0 | 1
```
~~~

The full list is in [Themes and styles](../reference/themes.md).

## Done

You have a book that renders diagrams, you can draw streams and cells, and you
know why the colours behave the way they do.

From here:

- The [how-to guides](../how-to/index.md) cover adding this to a book you
  already have, keeping diagrams in separate files, and building in CI.
- The [syntax reference](../reference/syntax.md) has the forms this tutorial
  skipped.
- The [examples](../examples/index.md) are every diagram in the Swirly
  repository, which is the fastest way to see what the notation can do.
