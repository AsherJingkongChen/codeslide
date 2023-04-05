pub use askama::Template;

#[derive(Template)]
#[template(path = "../dist/web/asset/index.html")]
pub struct WebApp {
  pub slide: String,
}

impl WebApp {
  pub fn new() -> Self {
    WebApp { slide: String::new() }
  }
}