use super::client;
use super::tool;

use askama::Template;
use serde::{Deserialize, Serialize};
use std::{error, fs};

// type TemplateSchema = {
//   font_family: string;
//   font_size: string;
//   font_weight: string;
//   looping: boolean;
//   slide: Array<{
//     text: string;
//     title: string;
//   }>;
//   stylesheet_hrefs: Array<string>;
// };

#[derive(Deserialize, Serialize, Clone)]
pub struct Page {
  pub text: String,
  pub title: String,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Schema {
  pub font_family: String,
  pub font_size: String,
  pub font_weight: String,
  pub looping: bool,
  pub slide: Vec<Page>,
  pub stylesheet_hrefs: Vec<String>,
}

#[derive(Template)]
#[template(path = "index.html")]
struct _Store<'a> {
  font_family: &'a str,
  font_size: &'a str,
  font_weight: &'a str,
  looping: bool,
  slide: String,
  stylesheet_hrefs: &'a Vec<String>,
}

impl Schema {
  pub fn from_client(
    schema: &client::Schema
  ) -> Result<Self, Box<dyn error::Error>> {
    let mut result = Schema {
      font_family: schema.font().family().into(),
      font_size: schema.font().size().into(),
      font_weight: schema.font().weight().into(),
      looping: schema.looping().clone(),
      slide: Vec::new(),
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
    if let Some(href) = &schema.font().href {
      result.stylesheet_hrefs.push(href.clone());
    }
    result.stylesheet_hrefs.push(
      schema.themehref().into()
    );
    Ok(result)
  }

  pub fn render(
    &self
  ) -> Result<String, Box<dyn error::Error>> {
    Ok(_Store {
      font_family: &self.font_family,
      font_size: &self.font_size,
      font_weight: &self.font_weight,
      looping: self.looping,
      slide: serde_json::to_string(&self.slide)?,
      stylesheet_hrefs: &self.stylesheet_hrefs,
    }.render()?)
  }
}
