use serde::{Deserialize, Serialize};
use std::{error, io};

// export type ClientSchema = {
//   font?: {
//     family: string;
//     weight?: string;
//     size?: string;
//     href?: string;
//   };
//   loop?: boolean;
//   slide?: Array<
//   | string
//   | {
//       path: string;
//       title?: string;
//     }
//   >;
//   style: {
//     name?: string;
//     href?: string;
//   }
// };

#[derive(Deserialize, Serialize, Clone)]
pub struct Schema {
  pub font: Option<Font>,
  pub looping: Option<bool>,
  pub slide: Option<Vec<PageVar>>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Font {
  family: String,
  weight: Option<String>,
  size: Option<String>,
  href: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
#[serde(untagged)]
pub enum PageVar {
  Page(Page),
  Path(String),
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Page {
  path: String,
  title: Option<String>,
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
