# Diagnose a failing diagram

## The build stopped

A diagram that cannot be rendered stops the build by default, naming the
chapter and the line the fence starts on:

```text
mdbook-swirly: a swirly diagram failed to render (set on-error = "warn" to continue): appendix/semantics.md:42: Grid row `s1` has 5 slot(s) but the axis has 6 column(s); they must correspond one to one.
```

This is deliberate. The alternative — dropping the diagram and carrying on —
produces a book that builds green with a figure silently missing, which is a
worse day than a failed build.

To keep going anyway, leaving the block as source and warning on stderr:

```toml
[preprocessor.swirly]
on-error = "warn"
```

That is useful while converting a pile of diagrams at once, when you want to
see all the failures rather than the first.

## Common causes

**Slot count.** The most frequent by far. Every row must have exactly one slot
per axis column. Count the pipes: with three columns you want
`> s | a | b | c |` — three slots, with the trailing pipe closing the last one
rather than opening a fourth.

**`from` or `to` naming a column that does not exist.** These take a column
*label*, not an index. If your axis is `@ t | zero | one`, then `to = 1` is an
error and `to = one` is what you meant.

**A marble row in a grid diagram.** A block containing an `@` axis puts the
whole diagram in grid mode, where `--a--b--|` has no meaning and is rejected
rather than half-parsed.

**A theme name typo.** Caught before any rendering starts, with the valid names
listed.

## Rendering one diagram on its own

The fastest way to iterate is to take mdBook out of the loop:

```bash
mdbook-swirly render diagram.txt > /tmp/out.svg
```

It reads stdin if you give it no file, so you can paste a block straight in:

```bash
mdbook-swirly render <<'EOF'
@ t | 0 | 1 | 2

> s | 'a' |  | 'b' |
EOF
```

Add `--theme` to check how it looks under a different palette.

## The diagram did not render, but nothing failed

If a `swirly` block comes out as a grey code box, the preprocessor never ran.
Check, in order:

1. `book.toml` has a `[preprocessor.swirly]` section.
2. The `command` in it resolves — try running it by hand.
3. The command answers the handshake: `mdbook-swirly supports html` must exit
   0. mdBook asks this before every build, and **if the answer is anything but
   a clean exit 0 it skips the preprocessor without saying so.** A wrapper
   script that prints a banner, or a `cargo run` that emits a warning, will do
   this to you.

That last one is the failure mode worth remembering, because the symptom is
silence.

## The diagram rendered but looks wrong on a dark theme

The stylesheet is missing. Check that `book.toml` has

```toml
[output.html]
additional-css = ["./assets/swirly.css"]
```

and that the file exists. Without it, `adaptive` diagrams fall back to black
ink on a white box. Re-run `mdbook-swirly install` to restore it.
