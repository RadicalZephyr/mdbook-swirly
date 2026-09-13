# A cell

A stream fires and is gone. A **cell** holds a value — it always has one, and
it keeps it until something replaces it. That difference is most of what FRP
diagrams are about, and Swirly draws it as a box.

Replace your chapter's diagram with this:

```text
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |  | 'b' |  | 'c' |  |
```

```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |  | 'b' |  | 'c' |  |
```

`=` declares a cell row. The slots work exactly as they did for a stream —
one per column — but they mean something different. A value *changes* what the
cell holds, and a blank slot means **keep holding what you had**.

So the box is divided in three, and the dividers fall at 0, 2 and 4: exactly
where you wrote a value. You did not draw those dividers, and you could not
have put them in the wrong place. They are derived from the slots.

Notice the box opens before column 0. The cell already held `'a'` when the
diagram starts, because a cell always has a value — there is no moment where it
has none.

## Where the value comes from

A cell usually gets its values from a stream. Put both rows in and you can see
the relationship:

```text
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |  |

> s |     | 'b' |     | 'c' |     |  |
```

```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |  |

> s |     | 'b' |     | 'c' |     |  |
```

Read a column at a time. `s` fires `'b'` in transaction 1, and `c` changes to
`'b'` in transaction 2 — one column later. Same for `'c'` at 3 and 4.

That one-column lag is not a drawing convention; it is the thing being drawn.
A cell updated by a stream takes its new value in the *next* transaction, so
that everything reading the cell during transaction 1 agrees on what it holds.
Lining the rows up on a shared axis is what makes that visible.

## Stopping early

A cell does not have to run to the end of the diagram. Add a `to` line directly
beneath the row — no blank line, because it belongs to the same block:

```text
= c | 'a' |     | 'b' |     | 'c' |  |
to = 5
```

```swirly
@ t | 0 | 1 | 2 | 3 | 4 | 5

= c | 'a' |     | 'b' |     | 'c' |  |
to = 5

> s |     | 'b' |     | 'c' |     |  |
```

The box now closes at transaction 5 and the line carries on to the same
arrowhead every other row reaches. `from` does the same at the other end, for a
cell that does not exist until partway through.

## What you have

You can now draw the two things FRP is made of and the relationship between
them. That is most of the notation. The
[syntax reference](../reference/syntax.md) has the rest — annotation rows,
references between rows, nested transactions — and it is short.

One thing left: [making diagrams follow the reader's theme](themes.md).
