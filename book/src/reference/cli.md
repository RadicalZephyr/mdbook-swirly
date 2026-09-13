# Command line

```text
mdbook-swirly                      run as a preprocessor (mdBook does this)
mdbook-swirly install [DIR]        add the preprocessor to a book
mdbook-swirly render [FILE]        render one specification to stdout
mdbook-swirly supports <RENDERER>  preprocessor protocol handshake
mdbook-swirly --help
mdbook-swirly --version
```

## No arguments — preprocess

Reads the mdBook preprocessor payload (`[context, book]` as JSON) on stdin and
writes the modified book on stdout. mdBook invokes this; you would not normally
run it yourself, and it reports as much if you do.

Exits non-zero if a diagram fails to render, unless `on-error = "warn"`.

## `supports <renderer>`

Exits 0 for every renderer. mdBook asks this before each build.

Answering anything but a clean exit 0 makes mdBook skip the preprocessor
**without reporting anything**, so this arm is deliberately incapable of
failing — it returns before reading configuration, starting the engine, or
touching stdin.

## `install [DIR]`

Writes `assets/swirly.css` and adds the `[preprocessor.swirly]` and
`additional-css` entries to `book.toml`. `DIR` defaults to the current
directory and must contain a `book.toml`.

| Flag | Effect |
| --- | --- |
| `--force` | replace `assets/swirly.css` if it already exists |
| `--print` | write the resulting `book.toml` and stylesheet to stdout, change nothing |
| `--dry-run` | same as `--print` |

Additive and idempotent. Comments, key order and existing `additional-css`
entries are preserved; the previous `book.toml` is kept as `book.toml.bak`. A
`command` you have already set is left alone, so pointing it at a local build
survives a re-run.

## `render [FILE]`

Renders one specification to SVG on stdout. Reads stdin if `FILE` is omitted.

| Flag | Effect |
| --- | --- |
| `--theme <NAME>` | `adaptive` (default), `sodium`, `light` or `dark` |

```bash
mdbook-swirly render diagram.txt > diagram.svg
mdbook-swirly render --theme sodium diagram.txt
echo '@ t | 0 | 1' | mdbook-swirly render
```

The SVG carries `class="swirly"`, so dropping it into a page that has
`swirly.css` loaded gives the same theme-following behaviour as inside a book.
Without that stylesheet an `adaptive` rendering inherits whatever `color` is in
effect where you put it.

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | success |
| 1 | anything else — the message is on stderr, prefixed `mdbook-swirly:` |
