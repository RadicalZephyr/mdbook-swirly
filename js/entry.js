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
 * Fills are the exception. A marble interior, a cell box, an operator band --
 * anything named `*_fill_color` -- has to read as the page *background*, not
 * the ink, or it turns into a solid block with an invisible label inside it.
 * Those get a literal light fallback, which assets/swirly.css overrides with
 * mdBook's --bg; a CSS rule beats a presentation attribute, so the stylesheet
 * wins whenever it is loaded and the literal keeps things legible when it is
 * not.
 *
 * `arrow_fill_color` is not a colour: Swirly reads "" as an unfilled, open
 * arrowhead, so it passes through untouched.
 */
const BACKGROUND_FALLBACK = '#fff'

const adaptive = (base) => {
  const remapped = {}
  for (const key of Object.keys(base)) {
    if (!/_color$/.test(key) || key === 'background_color') {
      continue
    }
    if (key === 'arrow_fill_color') {
      continue
    }
    remapped[key] = /_fill_color$/.test(key)
      ? BACKGROUND_FALLBACK
      : 'currentColor'
  }
  return { ...base, ...remapped, background_color: '' }
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
