//! `mdbook-swirly install` -- wire the preprocessor into an existing book.
//!
//! Follows the shape of `mdbook-mermaid install`: drop an asset into the book
//! and add the entries to `book.toml` that make mdBook use it.

use anyhow::{anyhow, bail, Context as _, Result};
use std::fs;
use std::path::Path;
use toml_edit::{value, Array, DocumentMut, Item, Table};

const CSS: &str = include_str!("../assets/swirly.css");
const CSS_PATH: &str = "./assets/swirly.css";

pub struct Options {
    /// Overwrite an existing stylesheet instead of leaving local edits alone.
    pub force: bool,
    /// Show what would change without touching anything.
    pub print: bool,
}

pub fn run(dir: &Path, options: &Options) -> Result<()> {
    let toml_path = dir.join("book.toml");
    if !toml_path.exists() {
        bail!(
            "no book.toml in {} -- run this from a book directory, \
             or pass the path to one",
            dir.display()
        );
    }

    let original = fs::read_to_string(&toml_path)
        .with_context(|| format!("reading {}", toml_path.display()))?;
    let mut doc: DocumentMut = original
        .parse()
        .with_context(|| format!("parsing {}", toml_path.display()))?;

    let changed = update(&mut doc)?;
    let updated = doc.to_string();

    if options.print {
        println!("{updated}");
        println!("# --- and {CSS_PATH} ---");
        println!("{CSS}");
        return Ok(());
    }

    write_css(dir, options.force)?;

    if changed {
        // Keep a copy: this file is hand-maintained, and an editor that gets it
        // wrong should be recoverable without reaching for git.
        let backup = toml_path.with_extension("toml.bak");
        fs::write(&backup, &original).with_context(|| format!("writing {}", backup.display()))?;
        fs::write(&toml_path, &updated)
            .with_context(|| format!("writing {}", toml_path.display()))?;
        println!(
            "Updated {} (previous copy at {})",
            toml_path.display(),
            backup.display()
        );
    } else {
        println!("{} already configured, left alone", toml_path.display());
    }

    println!("\nDiagrams now render from fenced blocks tagged `swirly`:");
    println!("\n    ```swirly");
    println!("    @ t | 0 | 1 | 2");
    println!();
    println!("    > s | 'a' |  | 'b' |");
    println!("    ```");

    Ok(())
}

/// Adds the preprocessor and stylesheet entries. Returns whether anything moved.
///
/// Everything here is additive and idempotent; `toml_edit` preserves comments,
/// key order and formatting everywhere it does not need to change.
fn update(doc: &mut DocumentMut) -> Result<bool> {
    let mut changed = false;

    {
        // Assigning straight into `doc["preprocessor"]["swirly"]` produces an
        // inline `preprocessor = { swirly = ... }` at the top of the file.
        // Creating the parent as an *implicit* table is what yields a real
        // `[preprocessor.swirly]` section.
        let root = doc.as_table_mut();
        let preprocessors = child_table(root, "preprocessor", true, &mut changed)?;
        let swirly = child_table(preprocessors, "swirly", false, &mut changed)?;

        if !swirly.contains_key("command") {
            swirly["command"] = value("mdbook-swirly");
            changed = true;
        }

        // `{{#include}}` has to expand before we look for fences, or a diagram
        // pulled in by an include would never be seen.
        if !swirly.contains_key("after") {
            swirly["after"] = value(Array::from_iter(["links"]));
            changed = true;
        }
    }

    {
        let root = doc.as_table_mut();
        let output = child_table(root, "output", true, &mut changed)?;
        let html = child_table(output, "html", false, &mut changed)?;

        match html.get_mut("additional-css") {
            Some(existing) => {
                let array = existing.as_array_mut().ok_or_else(|| {
                    anyhow!("output.html.additional-css in book.toml is not an array")
                })?;
                if !array.iter().any(|v| v.as_str() == Some(CSS_PATH)) {
                    array.push(CSS_PATH);
                    changed = true;
                }
            }
            None => {
                html["additional-css"] = value(Array::from_iter([CSS_PATH]));
                changed = true;
            }
        }
    }

    Ok(changed)
}

/// Fetches a child table, creating it if absent.
///
/// `implicit` marks a table that exists only to hold sub-tables, so `toml_edit`
/// writes `[preprocessor.swirly]` rather than an empty `[preprocessor]` header
/// followed by it.
fn child_table<'a>(
    parent: &'a mut Table,
    key: &str,
    implicit: bool,
    changed: &mut bool,
) -> Result<&'a mut Table> {
    if !parent.contains_key(key) {
        let mut table = Table::new();
        table.set_implicit(implicit);
        parent.insert(key, Item::Table(table));
        *changed = true;
    }

    parent
        .get_mut(key)
        .and_then(Item::as_table_mut)
        .ok_or_else(|| anyhow!("expected `{key}` in book.toml to be a table"))
}

fn write_css(dir: &Path, force: bool) -> Result<()> {
    let path = dir.join("assets").join("swirly.css");

    if path.exists() && !force {
        println!("{} exists, left alone (--force to replace)", path.display());
        return Ok(());
    }

    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).with_context(|| format!("creating {}", parent.display()))?;
    }
    fs::write(&path, CSS).with_context(|| format!("writing {}", path.display()))?;
    println!("Wrote {}", path.display());
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn apply(src: &str) -> String {
        let mut doc: DocumentMut = src.parse().unwrap();
        update(&mut doc).unwrap();
        doc.to_string()
    }

    #[test]
    fn adds_real_sections_not_inline_tables() {
        let out = apply("[book]\ntitle = \"T\"\n");
        assert!(out.contains("[preprocessor.swirly]"), "{out}");
        assert!(!out.contains("preprocessor = {"), "{out}");
    }

    #[test]
    fn preserves_comments_and_existing_keys() {
        let src = "# hand written\n[book]\ntitle = \"T\"   # keep me\n";
        let out = apply(src);
        assert!(out.contains("# hand written"));
        assert!(out.contains("# keep me"));
    }

    #[test]
    fn merges_into_an_existing_additional_css_array() {
        let src = "[output.html]\nadditional-css = [\"./assets/mine.css\"]\n";
        let out = apply(src);
        assert!(out.contains("./assets/mine.css"));
        assert!(out.contains(CSS_PATH));
    }

    #[test]
    fn leaves_an_existing_additional_js_alone() {
        let src = "[output.html]\nadditional-js = [\"./assets/mermaid.min.js\"]\n";
        let out = apply(src);
        assert!(out.contains("additional-js = [\"./assets/mermaid.min.js\"]"));
    }

    #[test]
    fn is_idempotent() {
        let once = apply("[book]\ntitle = \"T\"\n");
        let twice = apply(&once);
        assert_eq!(once, twice);
    }

    #[test]
    fn respects_a_command_the_author_already_set() {
        let src = "[preprocessor.swirly]\ncommand = \"cargo run --\"\n";
        let out = apply(src);
        assert!(out.contains("cargo run --"), "{out}");
    }
}
