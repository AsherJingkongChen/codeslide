use super::client;
use super::tool;

pub use askama::Template;
use serde::{Deserialize, Serialize};
use std::{error, fs};

#[derive(Template)]
#[template(path = "../dist/web/asset/index.html")]
pub struct Store {
  pub slide: String,
}

impl Store {
  pub fn new() -> Self {
    Store { slide: String::new() }
  }
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
}
