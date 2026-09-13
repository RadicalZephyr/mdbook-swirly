# Build a book in CI

`mdbook-swirly` is a single self-contained binary with no runtime
dependencies, so CI needs the binary and nothing else. No Node, no browser, no
network access at build time.

## GitHub Actions

```yaml
name: Book

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install mdBook and the preprocessor
        run: |
          cargo install mdbook --locked
          cargo install mdbook-swirly --locked

      - run: mdbook build
```

`cargo install` compiles from source, which is slow on a cold runner. Two ways
to avoid that.

**Prebuilt binaries.** Every release ships binaries for Linux, macOS and
Windows:

```yaml
      - name: Install mdbook-swirly
        run: |
          VERSION=0.1.0
          curl -sSL "https://github.com/zefs/mdbook-swirly/releases/download/v${VERSION}/mdbook-swirly-v${VERSION}-x86_64-unknown-linux-gnu.tar.gz" \
            | tar xz --strip-components=1 -C /usr/local/bin --wildcards '*/mdbook-swirly'
```

**Or cache the cargo install:**

```yaml
      - uses: Swatinem/rust-cache@v2
      - uses: taiki-e/install-action@v2
        with:
          tool: mdbook,mdbook-swirly
```

## Failing the build on a broken diagram

This is the default and you should keep it. A broken diagram exits non-zero
with the chapter and line in the message, so CI catches a diagram that stopped
parsing the same way it catches a broken link.

If you have set `on-error = "warn"` for local work, make sure CI does not
inherit it.

## Diagrams in a submodule

If your diagram files live in another repository pulled in as a submodule —
which is how [the examples in this book](../examples/index.md) work — CI needs
to check it out:

```yaml
      - uses: actions/checkout@v4
        with:
          submodules: true
```

Without that, `\{{#include}}` finds an empty directory, and mdBook reports a
missing file rather than a missing submodule, which is a confusing five minutes.

## Publishing to GitHub Pages

The workflow this book is built with is in
[`.github/workflows/pages.yml`](https://github.com/zefs/mdbook-swirly/blob/main/.github/workflows/pages.yml)
and is a working example of all of the above: submodule checkout, a cached
build of the preprocessor, and deployment to Pages.
