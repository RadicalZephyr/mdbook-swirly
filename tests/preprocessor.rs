//! Drives the real binary over the real mdBook preprocessor protocol.
//!
//! The unit tests cover the pieces; these cover the contract mdBook actually
//! holds us to, including the handshake whose failure mode is a book that
//! builds fine with every diagram silently missing.

use serde_json::{json, Value};
use std::io::Write;
use std::process::{Command, Stdio};

const BIN: &str = env!("CARGO_BIN_EXE_mdbook-swirly");

/// The payload shape of mdBook 0.5: `[context, book]`, with the chapters under
/// `items` (0.4 called it `sections`).
fn payload(content: &str, config: Value) -> String {
    json!([
        {
            "root": "/tmp/book",
            "config": { "preprocessor": { "swirly": config } },
            "renderer": "html",
            "mdbook_version": "0.5.4"
        },
        {
            "items": [
                { "Chapter": {
                    "name": "Chapter",
                    "content": content,
                    "number": [1],
                    "sub_items": [],
                    "path": "chapter.md",
                    "source_path": "chapter.md",
                    "parent_names": []
                }}
            ]
        }
    ])
    .to_string()
}

fn run(input: &str) -> (bool, String, String) {
    run_with_env(input, &[])
}

fn run_with_env(input: &str, env: &[(&str, &str)]) -> (bool, String, String) {
    let mut command = Command::new(BIN);
    // Inherited from the developer's shell it would make these assertions
    // depend on who is running them.
    command.env_remove("MDBOOK_SWIRLY_DEBUG");
    for (key, value) in env {
        command.env(key, value);
    }
    let mut child = command
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("spawn mdbook-swirly");
    child
        .stdin
        .as_mut()
        .unwrap()
        .write_all(input.as_bytes())
        .unwrap();
    let out = child.wait_with_output().unwrap();
    (
        out.status.success(),
        String::from_utf8_lossy(&out.stdout).into_owned(),
        String::from_utf8_lossy(&out.stderr).into_owned(),
    )
}

fn first_chapter(stdout: &str) -> String {
    let book: Value = serde_json::from_str(stdout).expect("stdout is a book");
    book["items"][0]["Chapter"]["content"]
        .as_str()
        .unwrap()
        .to_owned()
}

#[test]
fn supports_handshake_exits_zero() {
    // If this ever regresses, mdBook skips the preprocessor without a word and
    // every diagram disappears from the book.
    let status = Command::new(BIN)
        .args(["supports", "html"])
        .status()
        .unwrap();
    assert!(status.success());
}

#[test]
fn renders_a_block_and_leaves_the_rest_alone() {
    let md = "# Title\n\nProse.\n\n```swirly\n@ t | 0 | 1\n\n> s | 'a' |\n```\n\nMore prose.\n";
    let (ok, stdout, stderr) = run(&payload(md, json!({})));
    assert!(ok, "{stderr}");

    let content = first_chapter(&stdout);
    assert!(content.contains("<svg"), "{content}");
    assert!(content.contains("class=\"swirly\""));
    assert!(
        content.contains("currentColor"),
        "adaptive theme by default"
    );
    assert!(!content.contains("```swirly"));
    assert!(content.contains("# Title") && content.contains("More prose."));
}

#[test]
fn leaves_a_book_without_diagrams_untouched() {
    let md = "# Title\n\n```rust\nfn main() {}\n```\n";
    let (ok, stdout, _) = run(&payload(md, json!({})));
    assert!(ok);
    assert_eq!(first_chapter(&stdout), md);
}

#[test]
fn honours_the_configured_theme() {
    let md = "```swirly\n@ t | 0\n\n> s | 'a'\n```\n";
    let (ok, stdout, stderr) = run(&payload(md, json!({ "theme": "light" })));
    assert!(ok, "{stderr}");
    let content = first_chapter(&stdout);
    assert!(content.contains("black"), "light theme paints real colours");
    assert!(!content.contains("currentColor"));
}

#[test]
fn a_bad_spec_fails_the_build_with_a_located_message() {
    // One slot, two columns.
    let md = "# Title\n\n```swirly\n@ t | 0 | 1\n\n> s | 'a'\n```\n";
    let (ok, _, stderr) = run(&payload(md, json!({})));
    assert!(!ok, "a broken diagram must stop the build");
    assert!(stderr.contains("chapter.md:3"), "{stderr}");
    assert!(stderr.contains("slot"), "{stderr}");
}

#[test]
fn warn_mode_keeps_building() {
    let md = "```swirly\n@ t | 0 | 1\n\n> s | 'a'\n```\n";
    let (ok, stdout, stderr) = run(&payload(md, json!({ "on-error": "warn" })));
    assert!(ok, "{stderr}");
    assert!(stderr.contains("warning"), "{stderr}");
    assert!(first_chapter(&stdout).contains("```swirly"));
}

#[test]
fn an_unknown_theme_in_book_toml_is_rejected_up_front() {
    let md = "```swirly\n@ t | 0\n```\n";
    let (ok, _, stderr) = run(&payload(md, json!({ "theme": "nope" })));
    assert!(!ok);
    assert!(stderr.contains("unknown theme"), "{stderr}");
}

#[test]
fn renders_chapters_nested_under_sub_items() {
    let input = json!([
        { "root": "/tmp/book", "config": {}, "renderer": "html", "mdbook_version": "0.5.4" },
        { "items": [
            { "Chapter": {
                "name": "Parent",
                "content": "parent\n",
                "path": "p.md",
                "sub_items": [
                    { "Chapter": {
                        "name": "Child",
                        "content": "```swirly\n@ t | 0\n```\n",
                        "path": "c.md",
                        "sub_items": []
                    }}
                ]
            }}
        ]}
    ])
    .to_string();

    let (ok, stdout, stderr) = run(&input);
    assert!(ok, "{stderr}");
    let book: Value = serde_json::from_str(&stdout).unwrap();
    let child = book["items"][0]["Chapter"]["sub_items"][0]["Chapter"]["content"]
        .as_str()
        .unwrap();
    assert!(child.contains("<svg"), "{child}");
}

#[test]
fn accepts_the_mdbook_0_4_sections_key() {
    // Walking the payload structurally rather than through typed models means
    // the rename in 0.5 does not matter.
    let input = json!([
        { "root": "/tmp/book", "config": {}, "renderer": "html", "mdbook_version": "0.4.40" },
        { "sections": [
            { "Chapter": { "name": "C", "content": "```swirly\n@ t | 0\n```\n", "path": "c.md", "sub_items": [] }}
        ]}
    ])
    .to_string();

    let (ok, stdout, stderr) = run(&input);
    assert!(ok, "{stderr}");
    let book: Value = serde_json::from_str(&stdout).unwrap();
    assert!(book["sections"][0]["Chapter"]["content"]
        .as_str()
        .unwrap()
        .contains("<svg"));
}

/// The bundle is minified, so its stack traces are an offset into one enormous
/// line. Useless to a reader, and they make an ordinary message -- a slot
/// count, a bad theme -- look like a crash.
#[test]
fn a_javascript_stack_is_hidden_by_default() {
    let md = "```swirly\n@ t | 0 | 1\n\n> s | 'a'\n```\n";
    let (ok, _, stderr) = run(&payload(md, json!({})));
    assert!(!ok);
    assert!(stderr.contains("slot"), "{stderr}");
    assert!(
        !stderr.contains("eval_script"),
        "expected no JavaScript stack by default, got: {stderr}"
    );
}

#[test]
fn mdbook_swirly_debug_shows_the_javascript_stack() {
    let md = "```swirly\n@ t | 0 | 1\n\n> s | 'a'\n```\n";
    let (ok, _, stderr) = run_with_env(&payload(md, json!({})), &[("MDBOOK_SWIRLY_DEBUG", "1")]);
    assert!(!ok);
    assert!(
        stderr.contains("eval_script"),
        "expected a JavaScript stack, got: {stderr}"
    );
}

#[test]
fn mdbook_swirly_debug_is_off_when_empty_or_zero() {
    let md = "```swirly\n@ t | 0 | 1\n\n> s | 'a'\n```\n";
    for value in ["", "0"] {
        let (_, _, stderr) =
            run_with_env(&payload(md, json!({})), &[("MDBOOK_SWIRLY_DEBUG", value)]);
        assert!(
            !stderr.contains("eval_script"),
            "MDBOOK_SWIRLY_DEBUG={value:?} should be off, got: {stderr}"
        );
    }
}
