use super::client;
use super::tool;

use askama::Template;
use serde::{Deserialize, Serialize};
use std::{error, fs};
use minifier::css::minify;

// type TemplateSchema = {
//   looping: boolean;
//   slide: Array<{
//     text: string;
//     title: string;
//   }>;
//   stylesheet: string;
//   stylesheet_hrefs: Array<string>;
// };

#[derive(Deserialize, Serialize, Clone)]
pub struct Page {
  pub text: String,
  pub title: String,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Schema {
  pub looping: bool,
  pub slide: Vec<Page>,
  pub stylesheet: String,
  pub stylesheet_hrefs: Vec<String>,
}

#[derive(Template)]
#[template(path = "index.html")]
struct _Store<'a> {
  looping: bool,
  slide: &'a Vec<Page>,
  stylesheet: &'a str,
  stylesheet_hrefs: &'a Vec<String>,
}

impl Schema {
  pub fn from_client(
    schema: &client::Schema
  ) -> Result<Self, Box<dyn error::Error>> {
    let mut result = Schema {
      looping: schema.looping().clone(),
      slide: Vec::new(),
      stylesheet: String::new(),
      stylesheet_hrefs: Vec::new(),
    };

    for page in schema.slide() {
      result.slide.push(Page {
        text: fs::read_to_string(page.path())
          .or_else(|e| Err(
            tool::with_path_not_found(e, page.path())
          ))?,
        title: page.title().into()
      });
    }

    result.stylesheet = minify(&format!(
      "<style>
      body {{
        margin: 0;
        overflow: hidden;
        background-color: black;
      }}
      pre {{
        display: flex;
        flex-direction: column;
        margin: 0;
        height: 100vh;
        white-space: pre-wrap;
      }}
      code {{
        height: 100%;
        font-family: {};
        font-size: {};
        font-weight: {};
        overflow: scroll;
        scrollbar-width: none;
      }}
      code::-webkit-scrollbar {{
        display: none;
      }}
      </style>",
      schema.font().family(),
      schema.font().size(),
      schema.font().weight()
    ))?.to_string();

    if let Some(href) = &schema.font().href {
      result.stylesheet_hrefs.push(href.clone());
    }
    result.stylesheet_hrefs.push(
      schema.style().into()
    );
    Ok(result)
  }

  pub fn render(
    &self
  ) -> Result<String, Box<dyn error::Error>> {
    Ok(_Store {
      looping: self.looping,
      slide: &self.slide,
      stylesheet: &self.stylesheet,
      stylesheet_hrefs: &self.stylesheet_hrefs,
    }.render()?)
  }
}
