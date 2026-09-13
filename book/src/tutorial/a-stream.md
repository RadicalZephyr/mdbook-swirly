# A stream

The diagram you just made has two lines in it, and each one does a different
job. Here it is again with the pieces named:

```text
@ t | 0 | 1 | 2        <- the axis: what the columns are
                          (blank line separates blocks)
> s |  |  |  |          <- a stream row
```

Every block is separated by a blank line, the way paragraphs are. That is how
Swirly knows where one row ends and the next begins.

## The axis

```text
@ t | 0 | 1 | 2
```

`@` declares the time axis. The first cell, `t`, is the label that appears in
the gutter on the left. Everything after it is a column, and each column is one
**transaction** — a single instant in which the whole system updates at once.

This is the part that makes a grid diagram different from a marble diagram.
Time is not a continuous line each row measures for itself; it is a set of
labelled columns that every row shares. Read a column downwards and you see
what happened in that instant.

## A stream row

```text
> s |  |  |
```

`>` declares a stream row, `s` is its gutter label, and then there is one slot
per column. All three slots are empty, so the stream never fires — the line
just runs through:

```swirly
@ t | 0 | 1 | 2

> s |  |  |
```

Count the pipes. One `|` is one slot, and the axis line above has exactly the
same number — three pipes on both. An empty last slot is a bare trailing `|`,
not an extra one. Get the count wrong and the build stops with a message saying
so, which you will see for yourself in
[Diagnose a failing diagram](../how-to/diagnose-a-failure.md).

## Making it fire

Put values in the slots:

```text
> s | 'a' |  | 'b'
```

```swirly
@ t | 0 | 1 | 2

> s | 'a' |  | 'b'
```

The stream fires `'a'` in transaction 0, nothing in 1, and `'b'` in 2. Notice
that the value sits *on* the line rather than in a bubble on it, and that the
line runs through it. An empty slot is not a gap in the line; it just means
nothing happened.

Notice too that the quotes are yours. A slot is drawn exactly as you typed it,
so `'a'` is a string, `42` is a number, and `return 'a'` is an expression. Try
replacing `'a'` with something longer and watch the column widen to fit.

## Two streams

Add a second row. Remember the blank line between blocks:

```text
@ t | 0 | 1 | 2

> s1 | 'a' |     | 'b'

> s2 |     | 'x' | 'y'
```

```swirly
@ t | 0 | 1 | 2

> s1 | 'a' |     | 'b'

> s2 |     | 'x' | 'y'
```

Both rows hang off the same axis, so transaction 2 is a single column and you
can see at a glance that `s1` and `s2` both fire there. That alignment is the
whole point of the grid.

The extra spaces are for you, not the parser — slots are trimmed, so line them
up however reads best in the source.

Next: [a cell](a-cell.md), which remembers.
