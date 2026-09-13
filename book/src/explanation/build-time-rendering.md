# Why render at build time

There are three places a diagram can be turned into pixels, and the choice
shapes everything else.

## The three options

**In the browser.** Ship the specification to the reader along with a renderer,
and draw the diagram after the page loads. This is how
[mdbook-mermaid](https://github.com/badboy/mdbook-mermaid) works — and why a
book using it loads a couple of megabytes of JavaScript before any diagram
appears.

**By hand, ahead of time.** Run a tool, commit the SVG, reference it with
`![](diagram.svg)`. No runtime cost, but the picture and the prose are now two
files that can disagree, and nothing notices when they do.

**At build time.** Turn the specification into an SVG while the book is being
built, and inline it into the page.

## What build time buys

**The page is finished when it arrives.** No JavaScript, no layout shift, no
second request. A diagram is as cheap as the paragraph next to it.

**The source is the artifact.** There is no generated file to regenerate,
forget to regenerate, or commit stale. The specification in the markdown *is*
the diagram; they cannot drift because there is only one of them.

**A broken diagram breaks the build.** This is the one that matters most in
practice. If the notation changes, or a diagram is edited into something that
no longer parses, you find out from a failed build with a chapter and line
number — not from a reader, months later, looking at a blank space. It is the
same argument as compiling rather than discovering type errors at runtime, and
it is why `on-error` defaults to `fail`.

**Diagrams are reviewable.** A change to a diagram shows up in a diff as the
lines that changed, in a notation a reviewer can read. A change to a committed
SVG shows up as several thousand unreadable lines.

## What it costs

**The theme problem.** A diagram rendered at build time cannot know what
colours the reader will choose, and mdBook lets them choose at runtime. Solving
that is the whole of [adaptive theming](adaptive-theming.md), and it is the
single most interesting constraint in this tool.

**No interactivity.** A build-time SVG cannot animate, respond to hover, or let
the reader scrub a timeline. For marble diagrams that is no loss; if you wanted
an interactive playground, you would want something else entirely.

**A renderer in the build.** Something has to run Swirly, which is JavaScript,
inside a process that mdBook can invoke. That is the subject of
[Architecture](architecture.md), and it is the reason this tool is 1.7 MB
rather than a shell script.

## Why not just commit the SVGs

This is the closest competitor, and it deserves a straight answer: committing
SVGs works, and for a handful of diagrams it is completely reasonable.

It stops being reasonable at the point where you have enough diagrams that
nobody can remember which ones are current. A book with twenty figures and a
notation still under development — which is exactly the situation this was
built for — regenerates all of them every time the renderer improves. Doing
that by hand is a chore that gets skipped, and a skipped chore is a book with
some figures from an older renderer and no way to tell which.

Moving the render into the build makes that failure impossible rather than
merely unlikely.
