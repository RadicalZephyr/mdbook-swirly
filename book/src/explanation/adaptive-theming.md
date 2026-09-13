# How adaptive theming works

A diagram is rendered once, when the book is built. The reader picks a theme
later, in the browser, and can change it at any time. Those two facts look
irreconcilable: the renderer cannot know what colours the page will be using.

Here is the diagram from the tutorial. Switch themes with the paint roller and
watch it follow:

```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |
to = 5

> s |     | 'b' |     | 'c' |     |
```

## The move

Do not name any colours.

Every stroke and glyph is drawn in `currentColor`, a CSS keyword meaning
"whatever the surrounding text colour happens to be". No background rectangle
is drawn at all. The result is a diagram with no opinion about its own palette
— it inherits one from wherever it lands.

The stylesheet then supplies that colour from mdBook's own variables:

```css
svg.swirly      { color: var(--fg); }
svg.swirly rect { fill: var(--bg); }
```

`--fg` and `--bg` are what mdBook paints every page with, and each built-in
theme redefines them. So the diagram is not following *our* idea of what Coal
looks like; it is using the same two values the prose around it is using. A
custom theme that defines them works with no further effort.

## Why it is a theme, not a feature

`adaptive` is not special-cased anywhere in the renderer. It is an ordinary
Swirly theme whose colour values happen to all be the string `currentColor`:

```js
const ink = Object.fromEntries(
  Object.keys(base)
    .filter((key) => /_color$/.test(key) && key !== 'background_color')
    .map((key) => [key, 'currentColor'])
)
```

Twenty-two colour keys, rewritten mechanically. The renderer writes them into
the SVG exactly as it would write `#333`, and the browser resolves them. No
renderer change was needed to make any of this work, which is a good sign that
`currentColor` is the right level to be solving the problem at.

## The one thing that cannot be currentColor

A cell box has to be *opaque*, so the dashed transaction grid stops at its
edges rather than showing through. Opaque means the page background — which is
the one colour that is emphatically not the ink colour.

That is what the second CSS rule is for. The `<rect>` carries a literal `#fff`
as a presentation attribute, and the stylesheet overrides it with `var(--bg)`.
A CSS rule beats a presentation attribute in the cascade, so the rule wins
whenever the stylesheet is loaded, and the literal is what you fall back to if
it is not.

You might reasonably ask why the attribute is not `var(--bg)` directly. It
could be: `var()` does resolve inside presentation attributes in current
browsers. But that support arrived late and unevenly, whereas `var()` in an
ordinary CSS rule has been universal for years. Putting the variable in the
stylesheet and a plain colour in the attribute means the diagram degrades to
*legible* rather than to *invisible*.

## What it costs

`adaptive` is monochrome. It has exactly one ink colour, because
`currentColor` is exactly one colour.

For grid diagrams that is free — they were line art to begin with. For marble
diagrams it is a real loss: Swirly's `light` theme gives each value its own
marble colour, derived from a hash of the value, and that is genuinely useful
when a diagram has a dozen distinct events. `adaptive` renders those as
outlines.

If a particular diagram needs colour, tag it:

~~~markdown
```swirly theme=light
--a--b--c--|
```
~~~

and accept that it will look like a light-theme diagram sitting in a dark page.
The book default and the per-block override exist precisely so you can make
that trade one diagram at a time.
