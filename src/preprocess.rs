//! Finding `swirly` code blocks and replacing them with rendered SVG.

use anyhow::{anyhow, bail, Context as _, Result};
use pulldown_cmark::{CodeBlockKind, Event, Options, Parser, Tag, TagEnd};
use serde_json::Value;
use std::ops::Range;

use crate::render::Renderer;

pub const DEFAULT_THEME: &str = "adaptive";

#[derive(Clone, Copy, PartialEq, Eq)]
pub enum OnError {
    /// Abort the build. The default: a diagram that silently vanishes from a
    /// book is worse than a build that stops and says why.
    Fail,
    /// Leave the block as source and carry on, with a warning on stderr.
    Warn,
}

pub struct Config {
    pub theme: String,
    pub on_error: OnError,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            theme: DEFAULT_THEME.to_owned(),
            on_error: OnError::Fail,
        }
    }
}

impl Config {
    /// Reads `[preprocessor.swirly]` out of the context mdBook hands us.
    pub fn from_context(context: &Value) -> Result<Self> {
        let mut config = Config::default();

        let table = context
            .get("config")
            .and_then(|c| c.get("preprocessor"))
            .and_then(|p| p.get("swirly"));

        let Some(table) = table else {
            return Ok(config);
        };

        if let Some(theme) = table.get("theme") {
            config.theme = theme
                .as_str()
                .ok_or_else(|| anyhow!("preprocessor.swirly.theme must be a string"))?
                .to_owned();
        }

        if let Some(on_error) = table.get("on-error").or_else(|| table.get("on_error")) {
            config.on_error = match on_error.as_str() {
                Some("fail") => OnError::Fail,
                Some("warn") => OnError::Warn,
                _ => bail!("preprocessor.swirly.on-error must be \"fail\" or \"warn\""),
            };
        }

        Ok(config)
    }
}

/// A `swirly` block found in a chapter: the byte range of the whole fence, the
/// specification inside it, and any per-block option overrides.
struct Block {
    range: Range<usize>,
    source: String,
    theme: Option<String>,
}

/// Parses an info string such as `swirly` or `swirly theme=light`.
///
/// Returns `None` for every other language, including `swirlyfoo` -- the first
/// word has to be exactly `swirly`.
fn parse_info(info: &str) -> Option<Result<Option<String>>> {
    let mut words = info.split_whitespace();
    if words.next()? != "swirly" {
        return None;
    }

    let mut theme = None;
    for word in words {
        match word.split_once('=') {
            Some(("theme", value)) => theme = Some(value.to_owned()),
            _ => {
                return Some(Err(anyhow!(
                    "unrecognised option `{word}` on a swirly block \
                     (only `theme=<name>` is supported)"
                )))
            }
        }
    }

    Some(Ok(theme))
}

/// Locates every `swirly` fence in a chapter.
///
/// This uses a CommonMark parser rather than a regular expression so that
/// tildes, indented fences, longer fences and blocks nested inside lists all
/// behave the way mdBook's own parser will treat them.
fn find_blocks(content: &str) -> Result<Vec<Block>> {
    let mut blocks = Vec::new();
    let mut events = Parser::new_ext(content, Options::all()).into_offset_iter();

    while let Some((event, range)) = events.next() {
        let Event::Start(Tag::CodeBlock(CodeBlockKind::Fenced(info))) = event else {
            continue;
        };

        let Some(parsed) = parse_info(&info) else {
            continue;
        };
        let theme = parsed?;

        let mut source = String::new();
        for (event, _) in events.by_ref() {
            match event {
                Event::Text(text) => source.push_str(&text),
                Event::End(TagEnd::CodeBlock) => break,
                _ => {}
            }
        }

        blocks.push(Block {
            range,
            source,
            theme,
        });
    }

    Ok(blocks)
}

/// Renders every `swirly` block in one chapter's markdown.
fn render_chapter(
    content: &str,
    chapter: &str,
    renderer: &Renderer,
    config: &Config,
) -> Result<String> {
    let blocks =
        find_blocks(content).with_context(|| format!("reading swirly blocks in {chapter}"))?;

    if blocks.is_empty() {
        return Ok(content.to_owned());
    }

    let mut out = content.to_owned();

    // Replacing back to front keeps every remaining byte range valid.
    for block in blocks.iter().rev() {
        let theme = block.theme.as_deref().unwrap_or(&config.theme);
        let line = 1 + content[..block.range.start].matches('\n').count();

        match renderer.render(&block.source, theme) {
            Ok(svg) => {
                // Blank lines on both sides keep CommonMark treating this as an
                // HTML block rather than folding it into a paragraph. Swirly
                // serialises to a single line, so nothing inside can end the
                // block early.
                out.replace_range(block.range.clone(), &format!("\n{svg}\n\n"));
            }
            Err(err) => {
                let message = format!("{chapter}:{line}: {err:#}");
                match config.on_error {
                    OnError::Fail => {
                        return Err(anyhow!(message).context(
                            "a swirly diagram failed to render \
                             (set on-error = \"warn\" to continue)",
                        ))
                    }
                    OnError::Warn => eprintln!("mdbook-swirly: warning: {message}"),
                }
            }
        }
    }

    Ok(out)
}

/// Walks the book, rendering every chapter.
///
/// The tree is walked structurally rather than through typed models: mdBook
/// renamed the root collection from `sections` to `items` in 0.5, and chapters
/// have gained fields over time. Looking for `Chapter` objects with a `content`
/// string works across both and ignores anything else in the payload.
pub fn run(book: &mut Value, renderer: &Renderer, config: &Config) -> Result<()> {
    fn walk(value: &mut Value, renderer: &Renderer, config: &Config) -> Result<()> {
        match value {
            Value::Array(items) => {
                for item in items {
                    walk(item, renderer, config)?;
                }
            }
            Value::Object(map) => {
                if let Some(Value::Object(chapter)) = map.get_mut("Chapter") {
                    let name = chapter
                        .get("path")
                        .and_then(Value::as_str)
                        .or_else(|| chapter.get("name").and_then(Value::as_str))
                        .unwrap_or("<unnamed chapter>")
                        .to_owned();

                    if let Some(Value::String(content)) = chapter.get("content") {
                        let rendered = render_chapter(content, &name, renderer, config)?;
                        chapter.insert("content".to_owned(), Value::String(rendered));
                    }

                    if let Some(sub_items) = chapter.get_mut("sub_items") {
                        walk(sub_items, renderer, config)?;
                    }
                    return Ok(());
                }

                for (_, child) in map.iter_mut() {
                    walk(child, renderer, config)?;
                }
            }
            _ => {}
        }
        Ok(())
    }

    walk(book, renderer, config)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn recognises_only_exact_swirly_fences() {
        assert!(parse_info("swirly").is_some());
        assert!(parse_info("swirly theme=light").is_some());
        assert!(parse_info("rust").is_none());
        assert!(parse_info("swirlyish").is_none());
        assert!(parse_info("").is_none());
    }

    #[test]
    fn reads_a_per_block_theme() {
        let theme = parse_info("swirly theme=sodium").unwrap().unwrap();
        assert_eq!(theme.as_deref(), Some("sodium"));
    }

    #[test]
    fn rejects_unknown_block_options() {
        assert!(parse_info("swirly scale=2").unwrap().is_err());
    }

    #[test]
    fn finds_fences_and_ignores_other_languages() {
        let md = "# Title\n\n```rust\nfn main() {}\n```\n\n```swirly\n@ t | 0\n```\n";
        let blocks = find_blocks(md).unwrap();
        assert_eq!(blocks.len(), 1);
        assert_eq!(blocks[0].source, "@ t | 0\n");
        // The range covers the fence itself but stops at the closing
        // backticks, excluding the newline after them. `render_chapter` relies
        // on that when it pads the replacement with blank lines.
        assert_eq!(&md[blocks[0].range.clone()], "```swirly\n@ t | 0\n```");
    }

    #[test]
    fn surrounds_the_replacement_with_blank_lines() {
        // Without them CommonMark folds the SVG into the surrounding paragraph
        // instead of treating it as an HTML block.
        let renderer = Renderer::new().unwrap();
        let md = "Before.\n\n```swirly\n@ t | 0\n```\n\nAfter.\n";
        let out = render_chapter(md, "t.md", &renderer, &Config::default()).unwrap();
        assert!(out.contains("\n\n<svg"), "{out}");
        assert!(out.contains("</svg>\n\n"), "{out}");
        assert!(out.contains("Before.") && out.contains("After."));
    }

    #[test]
    fn renders_every_block_in_a_chapter() {
        let renderer = Renderer::new().unwrap();
        let md = "```swirly\n@ t | 0\n```\n\ntext\n\n```swirly\n@ t | 0 | 1\n```\n";
        let out = render_chapter(md, "t.md", &renderer, &Config::default()).unwrap();
        assert_eq!(out.matches("<svg").count(), 2, "{out}");
        assert!(!out.contains("```swirly"), "{out}");
    }

    #[test]
    fn a_bad_spec_fails_the_build_by_default() {
        let renderer = Renderer::new().unwrap();
        let md = "```swirly\n@ t | 0 | 1\n\n> s | 'a' |\n```\n";
        let err = render_chapter(md, "ch.md", &renderer, &Config::default()).unwrap_err();
        let text = format!("{err:#}");
        assert!(text.contains("ch.md:1"), "{text}");
        assert!(text.contains("slot"), "{text}");
    }

    #[test]
    fn warn_mode_leaves_the_source_block_in_place() {
        let renderer = Renderer::new().unwrap();
        let config = Config {
            on_error: OnError::Warn,
            ..Config::default()
        };
        let md = "```swirly\n@ t | 0 | 1\n\n> s | 'a' |\n```\n";
        let out = render_chapter(md, "ch.md", &renderer, &config).unwrap();
        assert!(out.contains("```swirly"), "{out}");
    }

    #[test]
    fn a_per_block_theme_overrides_the_book_default() {
        let renderer = Renderer::new().unwrap();
        let md = "```swirly theme=light\n@ t | 0\n\n> s | 'a' |\n```\n";
        let out = render_chapter(md, "t.md", &renderer, &Config::default()).unwrap();
        // The light theme paints real colours; adaptive would be all currentColor.
        assert!(out.contains("black"), "{out}");
        assert!(!out.contains("currentColor"), "{out}");
    }

    #[test]
    fn an_unknown_theme_is_reported() {
        let renderer = Renderer::new().unwrap();
        let md = "```swirly theme=nope\n@ t | 0\n```\n";
        let err = render_chapter(md, "t.md", &renderer, &Config::default()).unwrap_err();
        assert!(format!("{err:#}").contains("unknown theme"), "{err:#}");
    }

    #[test]
    fn finds_tilde_and_indented_fences() {
        let md = "- item\n\n  ~~~swirly\n  @ t | 0\n  ~~~\n";
        let blocks = find_blocks(md).unwrap();
        assert_eq!(blocks.len(), 1);
        assert_eq!(blocks[0].source, "@ t | 0\n");
    }

    #[test]
    fn ignores_a_swirly_fence_nested_in_a_longer_fence() {
        let md = "````markdown\n```swirly\n@ t | 0\n```\n````\n";
        assert!(find_blocks(md).unwrap().is_empty());
    }
}
