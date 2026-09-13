# mdbook-swirly

An [mdBook](https://rust-lang.github.io/mdBook/) preprocessor that renders
[Swirly](https://github.com/timdp/swirly) marble and grid diagrams to SVG at
build time.

Write a diagram in a fenced block:

~~~markdown
```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |  |
to = 5

> s1 |     | 'b' |     | 'c' |     |  |
```
~~~

and the book gets an SVG in its place — no client-side JavaScript, no image
files to manage, and no network requests when the page loads.

## Install

```bash
cargo install mdbook-swirly
cd my-book
mdbook-swirly install
```

`install` writes `assets/swirly.css` and adds two entries to `book.toml`:

```toml
[preprocessor.swirly]
command = "mdbook-swirly"
after = ["links"]

[output.html]
additional-css = ["./assets/swirly.css"]
```

It is additive and idempotent — comments, key order and any existing
`additional-css` entries are preserved, and the previous `book.toml` is kept
as `book.toml.bak`. Use `--print` to see the changes without making them.

## Themes

Diagrams are rendered once, at build time, but mdBook lets the reader switch
theme in the browser. The default `adaptive` theme solves this by emitting
every colour as `currentColor` and no background, so a single rendering
inherits whatever palette the page is using — including custom themes, as long
as they define mdBook's standard `--fg` and `--bg` variables. That is what
`assets/swirly.css` wires up, and it is why the stylesheet is not optional.

| Theme | |
| --- | --- |
| `adaptive` | follows the reader's mdBook theme (default) |
| `sodium` | black on white line art |
| `light`, `dark` | Swirly's built-in themes |

Set the default in `book.toml`:

```toml
[preprocessor.swirly]
theme = "adaptive"
```

or override it for one block:

~~~markdown
```swirly theme=sodium
@ t | 0 | 1
```
~~~

## Errors

A diagram that fails to render stops the build, with the chapter and line in
the message. A diagram that silently vanishes from a book is worse than a build
that stops and says why. To carry on instead, leaving the source block in place
and warning on stderr:

```toml
[preprocessor.swirly]
on-error = "warn"
```

## Checking one diagram

```bash
mdbook-swirly render diagram.txt > diagram.svg
mdbook-swirly render --theme sodium diagram.txt
echo '@ t | 0 | 1' | mdbook-swirly render
```

## How it works

Swirly is JavaScript, so something has to run it. What this needs from it is a
pure, synchronous `string -> string` function with no I/O, no timers and no
module loading — so the parser, renderer and themes are bundled into one file
and evaluated by [QuickJS](https://bellard.org/quickjs/), about a megabyte of
engine, rather than by an embedded JavaScript runtime. Rust owns the CLI,
stdin/stdout and `book.toml`, which is also what makes `toml_edit` available
for a well-behaved `install`.

The result is a ~2 MB self-contained binary with no runtime dependencies. You
do not need Node to use this, only to rebuild the bundle.

## Rebuilding the bundle

`src/swirly-bundle.js` is generated and committed. It is built from the Swirly
submodule in `vendor/`, whose commit pointer is what pins the version this crate
embeds:

```bash
git submodule update --init
(cd vendor/swirly && yarn --frozen-lockfile && yarn build)
./js/build.sh                 # or SWIRLY=/path/to/swirly ./js/build.sh
```

CI regenerates the bundle from the submodule and fails if the result differs
from the committed one, so the two cannot drift apart silently.

## Licence

MIT
