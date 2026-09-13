// The JavaScript half of mdbook-swirly.
//
// Rust owns the CLI, stdin/stdout and book.toml; this file is a pure,
// synchronous string -> string function with no host requirements beyond a
// bare ES2020 engine. That is what lets it run inside QuickJS rather than
// needing a whole JavaScript runtime embedded in the binary.
//
// Bundled by js/build.sh into ../src/swirly-bundle.js, which Rust embeds with
// include_str!.

import { parseMarbleDiagramSpecification } from '@swirly/parser'
import { renderMarbleDiagram } from '@swirly/renderer'
import { darkStyles } from '@swirly/theme-default-dark'
import { lightStyles } from '@swirly/theme-default-light'
import { sodiumStyles } from '@swirly/theme-sodium'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'

/**
 * Every ink colour becomes `currentColor` and the background rect is dropped,
 * so one rendering inherits whatever palette the page is using. mdbook toggles
 * its theme at runtime, which a baked-in palette could never follow.
 *
 * The cell box is the one thing that cannot be `currentColor` — it has to match
 * the page background, not the ink. The literal here is only a fallback for
 * when the stylesheet is missing; assets/swirly.css overrides it with mdbook's
 * own `--bg` variable, and a CSS rule beats a presentation attribute.
 */
const adaptive = (base) => {
  const ink = Object.fromEntries(
    Object.keys(base)
      .filter((key) => /_color$/.test(key) && key !== 'background_color')
      .map((key) => [key, 'currentColor'])
  )
  return {
    ...base,
    ...ink,
    background_color: '',
    grid_cell_fill_color: '#fff'
  }
}

const THEMES = {
  adaptive: adaptive(sodiumStyles),
  sodium: sodiumStyles,
  light: lightStyles,
  dark: darkStyles
}

globalThis.swirlyThemes = () => Object.keys(THEMES).join(', ')

/**
 * Renders one diagram specification to an SVG fragment.
 *
 * Width and height are left on the element so the diagram keeps an intrinsic
 * size; the stylesheet makes it responsive. The class is the hook both for that
 * and for the theme-aware colours.
 */
globalThis.swirlyRender = (source, themeName) => {
  const styles = THEMES[themeName]
  if (styles == null) {
    throw new Error(
      `unknown theme "${themeName}" (expected one of ${globalThis.swirlyThemes()})`
    )
  }

  const spec = parseMarbleDiagramSpecification(source)
  const { document } = renderMarbleDiagram(spec, { DOMParser, styles })

  const $svg = document.documentElement
  $svg.setAttribute('class', 'swirly')
  $svg.setAttribute('role', 'img')

  return new XMLSerializer().serializeToString($svg)
}
