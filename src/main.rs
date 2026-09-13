//! mdbook-swirly -- render Swirly diagrams in an mdBook at build time.
//!
//! Three modes, as the mdBook preprocessor protocol requires:
//!
//!   mdbook-swirly                      read [context, book] on stdin, write book on stdout
//!   mdbook-swirly supports <renderer>  exit 0 if this renderer is supported
//!   mdbook-swirly install [dir]        wire the preprocessor into a book

mod install;
mod preprocess;
mod render;

use anyhow::{Context as _, Result};
use std::io::{self, Read, Write};
use std::path::PathBuf;
use std::process::ExitCode;

const USAGE: &str = "\
mdbook-swirly -- render Swirly diagrams in an mdBook

USAGE:
    mdbook-swirly                      run as a preprocessor (mdBook does this)
    mdbook-swirly install [DIR]        add the preprocessor to a book
    mdbook-swirly render [FILE]        render one specification to stdout
    mdbook-swirly supports <RENDERER>  preprocessor protocol handshake

INSTALL OPTIONS:
    --force    replace assets/swirly.css if it already exists
    --print    show the changes instead of making them

RENDER OPTIONS:
    --theme <NAME>    adaptive (default), sodium, light or dark

Configure in book.toml:

    [preprocessor.swirly]
    command = \"mdbook-swirly\"
    after = [\"links\"]
    theme = \"adaptive\"      # adaptive | sodium | light | dark
    on-error = \"fail\"       # fail | warn
";

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let refs: Vec<&str> = args.iter().map(String::as_str).collect();

    let result = match refs.as_slice() {
        // mdBook asks before using us. Answering anything but exit 0 makes it
        // skip the preprocessor *silently* and build the book anyway, so this
        // arm has to come first and must not be able to fail.
        ["supports", ..] => return ExitCode::SUCCESS,
        ["-h" | "--help" | "help", ..] => {
            print!("{USAGE}");
            return ExitCode::SUCCESS;
        }
        ["-V" | "--version", ..] => {
            println!("mdbook-swirly {}", env!("CARGO_PKG_VERSION"));
            return ExitCode::SUCCESS;
        }
        ["install", rest @ ..] => install_command(rest),
        ["render", rest @ ..] => render_command(rest),
        [] => preprocess_command(),
        [unknown, ..] => {
            eprintln!("mdbook-swirly: unknown argument `{unknown}`\n");
            eprint!("{USAGE}");
            return ExitCode::FAILURE;
        }
    };

    match result {
        Ok(()) => ExitCode::SUCCESS,
        Err(err) => {
            eprintln!("mdbook-swirly: {err:#}");
            ExitCode::FAILURE
        }
    }
}

fn preprocess_command() -> Result<()> {
    let mut input = String::new();
    io::stdin()
        .read_to_string(&mut input)
        .context("reading the book from stdin")?;

    let (context, mut book): (serde_json::Value, serde_json::Value) = serde_json::from_str(&input)
        .context(
            "parsing the preprocessor payload -- run this through mdBook, \
             not by hand",
        )?;

    let config = preprocess::Config::from_context(&context)?;
    let renderer = render::Renderer::new().context("starting the Swirly renderer")?;

    if !renderer.themes().split(", ").any(|t| t == config.theme) {
        anyhow::bail!(
            "unknown theme \"{}\" in book.toml (expected one of {})",
            config.theme,
            renderer.themes()
        );
    }

    preprocess::run(&mut book, &renderer, &config)?;

    let out = io::stdout();
    serde_json::to_writer(out.lock(), &book).context("writing the book to stdout")?;
    Ok(())
}

fn install_command(args: &[&str]) -> Result<()> {
    let mut options = install::Options {
        force: false,
        print: false,
    };
    let mut dir = None;

    for arg in args {
        match *arg {
            "--force" => options.force = true,
            "--print" | "--dry-run" => options.print = true,
            other if other.starts_with('-') => {
                anyhow::bail!("unknown install option `{other}`")
            }
            other => dir = Some(PathBuf::from(other)),
        }
    }

    install::run(&dir.unwrap_or_else(|| PathBuf::from(".")), &options)
}

/// Rendering one file without a book around it, for checking a diagram or
/// debugging a spec that mdBook is rejecting.
fn render_command(args: &[&str]) -> Result<()> {
    let mut theme = preprocess::DEFAULT_THEME.to_owned();
    let mut path = None;
    let mut rest = args.iter();

    while let Some(arg) = rest.next() {
        match *arg {
            "--theme" => theme = rest.next().context("--theme needs a value")?.to_string(),
            other if other.starts_with("--theme=") => theme = other["--theme=".len()..].to_owned(),
            other if other.starts_with('-') => {
                anyhow::bail!("unknown render option `{other}`")
            }
            other => path = Some(PathBuf::from(other)),
        }
    }

    let source = match path {
        Some(path) => {
            std::fs::read_to_string(&path).with_context(|| format!("reading {}", path.display()))?
        }
        None => {
            let mut buf = String::new();
            io::stdin().read_to_string(&mut buf)?;
            buf
        }
    };

    let renderer = render::Renderer::new()?;
    let svg = renderer.render(&source, &theme)?;
    let mut out = io::stdout();
    out.write_all(svg.as_bytes())?;
    out.write_all(b"\n")?;
    Ok(())
}
