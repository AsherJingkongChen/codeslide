use super::client;
use super::tool;

use askama::Template;
use serde::{Deserialize, Serialize};
use std::{error, fs};

#[derive(Template)]
#[template(path = "index.html")]
struct Store {
  pub slide: String,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Schema {
  pub slide: Vec<Page>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Page {
  pub text: String,
  pub title: String,
}

impl Schema {
  pub fn from_client(
    schema: &client::Schema
  ) -> Result<Self, Box<dyn error::Error>> {
    let mut result = Schema {
      slide: Vec::new(),
    };
    match &schema.slide {
      None => { return Ok(result); },
      Some(slide) => {
        for page in slide {
          result.slide.push(Page {
            text: fs::read_to_string(page.path())
              .or_else(|e| Err(
                tool::with_path_not_found(e, page.path())
              ))?,
            title: page.title().clone()
          });
        }
      }
    }
    Ok(result)
  }

  pub fn render(
    &self
  ) -> Result<String, Box<dyn error::Error>> {
    let mut result = Store {
      slide: String::new()
    };
    result.slide = serde_json::to_string(&self.slide)?;
    Ok(result.render()?)
  }
}
