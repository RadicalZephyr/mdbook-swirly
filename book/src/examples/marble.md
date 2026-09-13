# Marble diagrams

The RxJS-style timelines Swirly started as. These use
[marble-testing syntax](https://rxjs.dev/guide/testing/marble-testing) with a
few additions of Swirly's own -- named streams, operator bands, value
substitutions -- described in the
[syntax reference](../reference/syntax.md#marble-streams).

They are drawn here with the `adaptive` theme, so they are monochrome. Swirly's
`light` theme gives every value its own marble colour, which reads better when
a diagram has many distinct events; see [Choose a theme](../how-to/choose-a-theme.md).


## concatAll

Higher-order: each event on the outer stream is itself a stream, drawn skewed, and `concatAll` plays them one after another.

```swirly
{{#include ../../../vendor/swirly/examples/concatAll.txt}}
```

<details><summary><code>examples/concatAll.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/concatAll.txt}}
```

</details>


## debounce

An operator whose title carries a marble diagram of its own, written in backticks.

```swirly
{{#include ../../../vendor/swirly/examples/debounce.txt}}
```

<details><summary><code>examples/debounce.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/debounce.txt}}
```

</details>


## exhaustAll

Events dropped while an inner stream is still running are drawn faded, via the `ghosts` configuration key.

```swirly
{{#include ../../../vendor/swirly/examples/exhaustAll.txt}}
```

<details><summary><code>examples/exhaustAll.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/exhaustAll.txt}}
```

</details>


## onErrorResumeNext

`#` marks an error. The `title` key labels each input line.

```swirly
{{#include ../../../vendor/swirly/examples/onErrorResumeNext.txt}}
```

<details><summary><code>examples/onErrorResumeNext.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/onErrorResumeNext.txt}}
```

</details>


## pluck

Values given longer names with `:=`, so a marble can display something wider than one character.

```swirly
{{#include ../../../vendor/swirly/examples/pluck.txt}}
```

<details><summary><code>examples/pluck.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/pluck.txt}}
```

</details>


## skipUntil

Two inputs and one output, with the second stream deciding when the first starts passing through.

```swirly
{{#include ../../../vendor/swirly/examples/skipUntil.txt}}
```

<details><summary><code>examples/skipUntil.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/skipUntil.txt}}
```

</details>


## zipAll

Named streams defined with `x = ...` and nested into the outer line, then combined pairwise.

```swirly
{{#include ../../../vendor/swirly/examples/zipAll.txt}}
```

<details><summary><code>examples/zipAll.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/zipAll.txt}}
```

</details>
