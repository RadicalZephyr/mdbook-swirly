# Diagram syntax

A specification is a sequence of **blocks** separated by blank lines. A line
beginning with `%` is a comment and is discarded before parsing.

The first line of a block decides what it is. Blocks are matched in this order,
and the first match wins:

| First line matches | Block is |
| --- | --- |
| `[styles]` | [diagram styles](#diagram-styles) |
| `[styles.X]` | [message styles](#message-styles) |
| `@` followed by space or end of line | a [time axis](#time-axis) |
| `>`, `=` or `.`, a single-token label, then `\|` | a [grid row](#grid-rows) |
| `>` | an [operator](#operators) |
| anything else | a [marble stream](#marble-streams) |

Lines after the first in a block are **configuration**, written `key = value`.

## Two modes

A diagram containing a time axis is in **grid mode**; one without it is in
**frame mode**. The difference is what a horizontal position means: grid mode
looks up a discrete labelled column shared by every row, frame mode scales a
continuous frame number.

Marble rows are rejected in grid mode rather than half-parsed, so you cannot mix
the two by accident.

## Time axis

```text
@ <label> | <column> | <column> | ...
```

```swirly
@ t | 0 | 1 | 2
```

The segment before the first `|` is the gutter label and may be empty. Each
segment after it is one column — one transaction. A trailing `|` closes the
last column rather than opening an empty one.

A column label may be prefixed with one `>` per level of nesting, for diagrams
that split a transaction:

```text
@ t | [0] | >[0,0] | >[0,1] | [1]
```

```swirly
@ t | [0] | >[0,0] | >[0,1] | [1]
```

Nesting lightens the grid line that opens the column.

A diagram may declare at most one axis, and it need not come first.

**Configuration:** `title` overrides the gutter label.

## Grid rows

All three kinds share a shape: a sigil, a single-token label, then one slot per
column.

```text
<sigil> <label> | <slot> | <slot> | ...
```

Slots are trimmed, so you may pad them to line up with the axis. A slot's text
is drawn verbatim — the quotes in `'a'` are yours, not the notation's.

**Every row must have exactly as many slots as the axis has columns.** A
mismatch stops the build.

### Stream rows — `>`

A line running the width of the axis, ending in an arrowhead. An empty slot
means the stream did not fire in that transaction.

```text
> s1 | 'a' |  | 'b' |
```

```swirly
@ t | 0 | 1 | 2

> s1 | 'a' |  | 'b' |
```

### Cell rows — `=`

A box holding a value across an interval. A non-empty slot changes the held
value; an empty one keeps it. Dividers are derived from that, not written.

```text
= c | 'a' |  | 'b' |
```

```swirly
@ t | 0 | 1 | 2

= c | 'a' |  | 'b' |
```

**Configuration:**

| Key | Meaning |
| --- | --- |
| `from` | column label whose opening boundary the box starts at. Default: before column 0 |
| `to` | column label whose opening boundary the box closes at. Default: after the last column |

Both take a column *label*, not an index.

```swirly
@ t | 0 | 1 | 2 | 3 | 4

= c |  | 'a' |  | 'b' |  |
from = 1
to = 4
```

### Annotation rows — `.`

A label and values with no line of their own, for commenting on a transaction.

```text
. a1 |  | 'a' |  |
```

```swirly
@ t | 0 | 1 | 2

= c | 'a' |  | 'b' |

. a1 |  | 'a' |  |
```

### References

A slot whose text matches another row's label is a **reference** to that row
rather than a literal — the `switch` case, where a cell holds another cell or a
stream.

```swirly
@ t | 0 | 1 | 2 | 3

> s1 | 'a' | 'b' | 'c' | 'd' |

> s2 | 'W' | 'X' | 'Y' | 'Z' |

=  c | s1  |     | s2  |     |
```

Resolution happens after the whole diagram is parsed, so the row being named
does not have to be declared first. A row naming itself stays a literal.

## Marble streams

Frame mode uses [RxJS marble-testing
syntax](https://rxjs.dev/guide/testing/marble-testing) — `-` for a frame of
time, a letter or digit for a value, `|` for completion, `#` for an error, and
`()` to group events into one frame.

```text
--a--b--|
```

**Configuration:**

| Key | Meaning |
| --- | --- |
| `title` | the label drawn to the left of the line |
| `ghosts` | comma-separated value names to draw faded |
| `X := value` | draw marble `X` with this text instead of `X` |

Leading whitespace offsets the stream in time.

### Named streams

A block of the form `x = <marbles>`, where `x` is one character, defines a
stream instead of drawing one. Using that character in a later marble line
nests the stream inside the event, which is how higher-order diagrams are
drawn:

```text
x = --a--b--|

-x----|
```

## Operators

A line beginning with `>` that is *not* a grid row — that is, one without a
pipe right after its first word — is an operator band:

```text
> concatAll
```

Backticks inside the title embed a marble diagram in it:

```text
> debounce(() => `--|`)
```

**Configuration:** `X := value`, as for marble streams.

## Diagram styles

```text
[styles]
axis_column_sizing = fixed
axis_column_width = 160
```

Applies to the diagram it appears in. See
[Themes and styles](themes.md) for the keys.

## Message styles

```text
[styles.a]
fill_color = red
```

Applies to one marble value — the single character after the dot — in frame
mode.
