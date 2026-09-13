# mdbook-swirly

An [mdBook](https://rust-lang.github.io/mdBook/) preprocessor that renders
[Swirly](https://github.com/RadicalZephyr/swirly) diagrams to SVG while your
book builds.

Write a diagram in a fenced block tagged `swirly`:

~~~markdown
```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |  |
to = 5

> s1 |     | 'b' |     | 'c' |     |  |
```
~~~

and the page gets this in its place:

```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |  |
to = 5

> s1 |     | 'b' |     | 'c' |     |  |
```

No client-side JavaScript, no image files to keep in step with the prose, and
nothing fetched when the page loads. The diagram above is an SVG that was
rendered when this page was built — and it follows your theme, so try the paint
roller in the toolbar.

## What Swirly draws

Swirly has two diagram species:

- **Marble diagrams** — the familiar timeline of events flowing through an
  operator, from the [RxJS](https://rxjs.dev) tradition.
- **Grid diagrams** — rows sharing one discrete, labelled transaction axis,
  mixing event streams with held-value cells. These are the diagrams the
  *Functional Reactive Programming* book uses, and the reason this fork exists.

Both are written as plain text you can diff, review and edit in place.

## Where to start

This documentation follows [Diátaxis](https://diataxis.fr/), which sorts
documentation by what you are trying to do:

| | |
| --- | --- |
| **[Tutorial](tutorial/index.md)** | Never used it? Start here and build a book with a diagram in it. |
| **[How-to guides](how-to/index.md)** | You know what you want; these are the recipes. |
| **[Reference](reference/index.md)** | Every syntax form, configuration key and command. |
| **[Explanation](explanation/index.md)** | Why it works the way it does. |
| **[Examples](examples/index.md)** | Every example in the Swirly repository, rendered. |

## Install

```bash
cargo install mdbook-swirly
cd my-book
mdbook-swirly install
```

The [tutorial](tutorial/setting-up.md) walks through that from an empty
directory.
