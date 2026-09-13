//! The Swirly renderer, embedded.
//!
//! Swirly is JavaScript, so something has to run it. What we need from it is a
//! pure, synchronous `string -> string` function with no I/O, no timers and no
//! module loading, which is why this is QuickJS (about a megabyte of engine)
//! rather than a whole JavaScript runtime.

use anyhow::{anyhow, Result};
use rquickjs::{Context, Ctx, Function, Runtime};

/// The bundled parser, renderer and themes, built by `js/build.sh`.
const BUNDLE: &str = include_str!("swirly-bundle.js");

/// Bundled for a browser target, so it expects `self` to exist. That is the
/// entire host surface it needs.
const SHIM: &str = "globalThis.self = globalThis;";

pub struct Renderer {
    // The context keeps the runtime alive internally, but holding it here makes
    // the ownership obvious and keeps the engine warm across every diagram in
    // the book rather than re-evaluating the bundle per block.
    _runtime: Runtime,
    context: Context,
}

impl Renderer {
    pub fn new() -> Result<Self> {
        let runtime = Runtime::new()?;
        let context = Context::full(&runtime)?;

        context.with(|ctx| -> Result<()> {
            eval(&ctx, SHIM, "shim")?;
            eval(&ctx, BUNDLE, "swirly-bundle.js")?;
            Ok(())
        })?;

        Ok(Self {
            _runtime: runtime,
            context,
        })
    }

    /// Renders one diagram specification to an SVG fragment.
    pub fn render(&self, source: &str, theme: &str) -> Result<String> {
        self.context.with(|ctx| {
            let render: Function = ctx
                .globals()
                .get("swirlyRender")
                .map_err(|e| js_error(&ctx, e))?;
            render.call((source, theme)).map_err(|e| js_error(&ctx, e))
        })
    }

    /// The theme names the bundle accepts, for error messages.
    pub fn themes(&self) -> String {
        self.context
            .with(|ctx| {
                ctx.globals()
                    .get::<_, Function>("swirlyThemes")
                    .and_then(|f| f.call::<_, String>(()))
            })
            .unwrap_or_else(|_| "adaptive, sodium, light, dark".to_owned())
    }
}

fn eval(ctx: &Ctx<'_>, code: &str, what: &str) -> Result<()> {
    ctx.eval::<(), _>(code)
        .map_err(|e| js_error(ctx, e).context(format!("evaluating {what}")))
}

/// QuickJS reports a thrown exception as an opaque error code and parks the
/// value; without unpacking it here every JavaScript failure would surface as
/// the useless string "exception".
/// Whether to append JavaScript stack traces to errors.
///
/// Off by default. Most errors that reach a user -- a row whose slot count
/// disagrees with the axis, a `to` naming no column -- are thrown by the
/// renderer as ordinary exceptions, so every one of them would otherwise trail
/// a stack pointing into the bundle. The bundle is minified, so that stack is a
/// single offset into one enormous line and tells a reader nothing, while
/// making a clear message look like a crash.
///
/// It is still the only view into the bundle when something there genuinely
/// breaks, which is what `MDBOOK_SWIRLY_DEBUG` is for. An environment variable
/// rather than a flag because mdBook owns the invocation: this way a single
/// build can be debugged without editing `book.toml`.
fn debug_enabled() -> bool {
    match std::env::var("MDBOOK_SWIRLY_DEBUG") {
        Ok(value) => !value.is_empty() && value != "0",
        Err(_) => false,
    }
}

fn js_error(ctx: &Ctx<'_>, err: rquickjs::Error) -> anyhow::Error {
    if !err.is_exception() {
        return anyhow!(err);
    }

    let caught = ctx.catch();
    if let Some(exception) = caught.as_exception() {
        let message = exception
            .message()
            .unwrap_or_else(|| "unknown JavaScript error".to_owned());
        return match exception.stack() {
            Some(stack) if debug_enabled() && !stack.trim().is_empty() => {
                anyhow!("{message}\n{stack}")
            }
            _ => anyhow!("{message}"),
        };
    }

    anyhow!("{caught:?}")
}
