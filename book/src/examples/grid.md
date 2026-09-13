# Grid diagrams

The transaction-aligned species: rows sharing one discrete, labelled time axis,
mixing event streams with held-value cells. See the
[syntax reference](../reference/syntax.md) for the notation.

Each diagram below is rendered from the file named beneath it, pulled straight
out of the Swirly submodule.


## gridAxis

The apparatus on its own: a labelled transaction axis, a dashed boundary opening each column, and a stream that never fires.

```swirly
{{#include ../../../vendor/swirly/examples/gridAxis.txt}}
```

<details><summary><code>examples/gridAxis.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/gridAxis.txt}}
```

</details>


## gridStreams

Three streams sharing one axis. Where two of them fire in the same transaction, that is a single column, so you can see it at a glance.

```swirly
{{#include ../../../vendor/swirly/examples/gridStreams.txt}}
```

<details><summary><code>examples/gridStreams.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/gridStreams.txt}}
```

</details>


## gridCell

A cell holds a value until something replaces it. The dividers are derived from the slots, falling wherever a slot carries a value.

```swirly
{{#include ../../../vendor/swirly/examples/gridCell.txt}}
```

<details><summary><code>examples/gridCell.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/gridCell.txt}}
```

</details>


## gridHold

`hold` turns a stream into a cell, one transaction behind, and `to` closes the box before the axis ends.

```swirly
{{#include ../../../vendor/swirly/examples/gridHold.txt}}
```

<details><summary><code>examples/gridHold.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/gridHold.txt}}
```

</details>


## gridSwitch

`switch`: a slot naming another row refers to that row rather than being a literal, so `c3` holds first `c1` and then `c2`.

```swirly
{{#include ../../../vendor/swirly/examples/gridSwitch.txt}}
```

<details><summary><code>examples/gridSwitch.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/gridSwitch.txt}}
```

</details>


## gridAnnotations

Annotation rows address the same columns as everything else but draw no line, for commenting on a transaction.

```swirly
{{#include ../../../vendor/swirly/examples/gridAnnotations.txt}}
```

<details><summary><code>examples/gridAnnotations.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/gridAnnotations.txt}}
```

</details>


## gridNested

Split transactions. A column label can name a nested transaction, and each level of nesting lightens the line that opens it.

```swirly
{{#include ../../../vendor/swirly/examples/gridNested.txt}}
```

<details><summary><code>examples/gridNested.txt</code></summary>

```text
{{#include ../../../vendor/swirly/examples/gridNested.txt}}
```

</details>
