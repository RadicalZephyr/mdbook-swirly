# Setting up

We need two programs: mdBook itself, and this preprocessor.

```bash
cargo install mdbook
cargo install mdbook-swirly
```

Now make a book to put diagrams in:

```bash
mdbook init frp-notes --title "FRP notes"
cd frp-notes
```

Answer `n` when it offers to create a `.gitignore`, and `y` to the title it
suggests. You should have a directory holding `book.toml` and a `src/` with two
markdown files in it.

Check it works before we change anything:

```bash
mdbook serve --open
```

That builds the book and opens it in a browser, and it keeps running — it will
rebuild every time you save a file. Leave it going; we will lean on that for
the rest of the tutorial.

## Wiring in the preprocessor

In a second terminal, from the same directory:

```bash
mdbook-swirly install
```

It prints what it did:

```text
Wrote ./assets/swirly.css
Updated ./book.toml (previous copy at ./book.toml.bak)
```

Two things happened. `book.toml` gained the entries that make mdBook run us:

```toml
[preprocessor.swirly]
command = "mdbook-swirly"
after = ["links"]

[output.html]
additional-css = ["./assets/swirly.css"]
```

And a stylesheet appeared in `assets/`. That stylesheet is not decoration — it
is what lets a diagram follow the reader's theme. We come back to it in
[Themes](themes.md).

The `after = ["links"]` is there so that mdBook expands any `{{#include}}`
before we go looking for diagrams. It matters later, when you want to keep a
diagram in its own file.

## Checking it took

Open `src/chapter_1.md` and replace its contents with:

~~~markdown
# Chapter 1

```swirly
@ t | 0 | 1 | 2

> s |  |  |  |
```
~~~

Save. The browser should reload and show a line with three dashed dividers
crossing it:

```swirly
@ t | 0 | 1 | 2

> s |  |  |  |
```

If you see that, everything is connected. If you still see the source text in a
grey code box, the preprocessor is not running — check that
`mdbook-swirly --version` works and that `book.toml` has the
`[preprocessor.swirly]` section.

That diagram is an SVG in the page. View source and you will find it inline: no
image file was written, and nothing is fetched when the page loads.

Next: [what that diagram actually says](a-stream.md).
