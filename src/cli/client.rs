use serde::{Deserialize, Serialize};
use std::{error, io};

#[derive(Deserialize, Serialize, Clone)]
pub struct Schema {
  pub slide: Option<Vec<PageVar>>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Page {
  path: String,
  title: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
#[serde(untagged)]
pub enum PageVar {
  Page(Page),
  Path(String),
}

impl Schema {
  pub fn from_reader(
    r: impl io::Read
  ) -> Result<Self, Box<dyn error::Error>> {
    Ok(serde_json::from_str(
      io::read_to_string(r)?.as_str()
    )?)
  }
}

impl PageVar {
  pub fn path(&self) -> &String {
    match &self {
      PageVar::Page(page) => &page.path,
      PageVar::Path(path) => path,
    }
  }
  pub fn title(&self) -> &String {
    match &self {
      PageVar::Page(page) => {
        match &page.title {
          None => &page.path,
          Some(title) => title,
        }
      },
      PageVar::Path(path) => path,
    }
  }
}
