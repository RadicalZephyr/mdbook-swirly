# Architecture

Swirly is JavaScript. mdBook preprocessors are programs that speak JSON on
stdin and stdout. Getting from one to the other is most of what this tool is.

```text
mdBook ──[context, book] as JSON──> mdbook-swirly (Rust)
                                       │
                                       ├── pulldown-cmark: find `swirly` fences
                                       ├── QuickJS: evaluate the Swirly bundle
                                       │     └── swirlyRender(spec, theme) -> SVG
                                       └── splice the SVG back into the markdown
                                       │
       <──────── modified book ────────┘
```

## Rust outside, JavaScript inside

The split is: Rust owns the command line, the preprocessor protocol, the
markdown and `book.toml`; JavaScript owns turning a specification into an SVG.

That boundary is chosen so the JavaScript side is a **pure, synchronous
`string -> string` function**. It does no I/O, starts no timers, loads no
modules and reads no arguments. Everything stateful is on the Rust side.

This matters more than it sounds, because it decides what has to run the
JavaScript.

## Why QuickJS and not a JavaScript runtime

The obvious move is to embed a runtime — Node, or Deno as a library. Both were
measured before this was built:

| | `deno compile` | Rust + QuickJS |
| --- | --- | --- |
| Binary | 81.3 MB | **1.7 MB** |
| Startup and render | 88 ms | **46 ms** |

A runtime's value is its event loop, module system, Node compatibility,
permissions and networking. A pure function needs none of that. Embedding Deno
would have meant shipping eighty megabytes of infrastructure to call one
function that does not use any of it — and, because the function is
synchronous, would not have been faster either.

QuickJS is about a megabyte of C implementing ES2020, which is precisely the
job. The bundle is evaluated once when the preprocessor starts and the engine
is kept warm, so a book with twenty diagrams pays for the engine once.

## The bundle

`src/swirly-bundle.js` is Swirly's parser, renderer and themes compiled by
esbuild into one file with no imports and no Node built-ins, embedded into the
binary with `include_str!`. It needs exactly one thing from its host —
`globalThis.self` — which Rust supplies in a one-line shim before evaluating
it.

It is a generated file that is committed, which is a trade: users get
`cargo install` with no Node anywhere, at the cost of an artifact that can go
stale. Two things guard it. The Swirly submodule in `vendor/` pins the exact
revision it was built from, and CI rebuilds it there and fails if the result
differs byte for byte.

Making that check possible required the bundle to be *reproducible*, which it
initially was not: unminified esbuild output records each module's path as a
comment, so the bytes depended on where the Swirly checkout happened to sit.
Minifying removes the paths — and takes the bundle from 286 KB to 111 KB.

## Finding the diagrams

Fences are located with [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark),
the same CommonMark parser mdBook itself uses, rather than a regular
expression. Tilde fences, indented fences inside list items, and longer fences
containing shorter ones all then behave the way mdBook will treat them, because
it is the same code making the decision.

Replacements are spliced back in from the end of the chapter forwards, so each
byte range stays valid as earlier ones are rewritten.

## Walking the book

The book payload is traversed as generic JSON, looking for objects with a
`Chapter` key, rather than deserialised into typed models. mdBook renamed the
root collection from `sections` to `items` in 0.5 and has added chapter fields
over time; walking structurally means both spellings work and unknown fields
are carried through untouched.

## The handshake

mdBook runs `mdbook-swirly supports <renderer>` before each build. If that
exits non-zero it skips the preprocessor **and says nothing** — the book builds
successfully with every diagram missing.

Because the cost of getting this wrong is silent and the benefit of nuance is
nil, the `supports` arm is the first thing `main` matches and it returns before
reading configuration, starting the engine or touching stdin. There is nothing
in it that can fail.
