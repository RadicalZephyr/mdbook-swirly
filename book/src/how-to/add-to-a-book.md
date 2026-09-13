# Add diagrams to an existing book

## Install into the book

From the book's root — the directory holding `book.toml`:

```bash
mdbook-swirly install
```

Or name the directory:

```bash
mdbook-swirly install path/to/book
```

This writes `assets/swirly.css` and adds two sections to `book.toml`. It is
additive and safe to re-run: comments, key order and any existing
`additional-css` entries survive, an existing stylesheet is left alone unless
you pass `--force`, and the previous `book.toml` is kept as `book.toml.bak`.

To see the changes without making them:

```bash
mdbook-swirly install --print
```

## If your book disables the default preprocessors

A book with

```toml
[build]
use-default-preprocessors = false
```

must list every preprocessor it wants, including `links` — the one that handles
`\{{#include}}`. `install` adds `after = ["links"]` to our section, which is a
declaration of ordering, not a dependency: if `links` is not enabled, ours
simply runs whenever it likes. But `\{{#include}}` will not be expanded at all,
so the technique below will not work.

## Including a diagram from a file

Keeping a diagram in its own file means you can render it with the CLI, keep it
under test, or share it between books. Point `\{{#include}}` at it from inside
a `swirly` fence:

~~~markdown
```swirly
\{{#include ../diagrams/hold.txt}}
```
~~~

Paths are relative to the markdown file doing the including, and they may reach
outside `src/`.

The ordering is what makes this work. mdBook runs `links` first, which replaces
the `\{{#include}}` with the file's contents; by the time we look at the
chapter, the fence contains a diagram specification. That is exactly what
`after = ["links"]` buys you, and it is why `install` sets it.

You can show the same file as source *and* as a picture by including it twice:

~~~markdown
```swirly
\{{#include ../diagrams/hold.txt}}
```

```text
\{{#include ../diagrams/hold.txt}}
```
~~~

Every page under [Examples](../examples/index.md) is built this way, from files
in the Swirly repository.

## Migrating from images

If the book currently has diagrams as checked-in PNGs or SVGs, you can replace
them one at a time — there is no flag day. A `swirly` block and an
`![](image.png)` can sit in the same chapter indefinitely.

What you get for converting: the diagram is diffable, it follows the reader's
theme, and it cannot fall out of step with the prose without the build noticing.
