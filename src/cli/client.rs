use serde::{Deserialize, Serialize};
use std::{error, io};

// type ClientSchema = {
//   font?: {
//     family?: string;
//     size?: string;
//     weight?: string;
//     href?: string;
//   };
//   looping?: boolean;
//   slide?: Array<
//   | string
//   | {
//       title?: string;
//       path: string; // equivalent to path
//       // lang?: string;
//     }
//   >;
//   style?:
//   | string;
//   // | {
//   //     sheet?: string;
//   //     hrefs: Array<string>;
//   //   }
//   // | {
//   //     sheet: string;
//   //     hrefs?: Array<string>;
//   //   };
//   // target?:
//   // | string
//   // | {
//   //     format?: string;
//   //     layout?: string;
//   //     transition?: string;
//   //   };
// };

#[derive(Deserialize, Serialize, Clone)]
pub struct Font {
  family: Option<String>,
  size: Option<String>,
  weight: Option<String>,
  pub href: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
#[serde(untagged)]
pub enum Page {
  Page(_Page),
  Path(String),
}

#[derive(Deserialize, Serialize, Clone)]
pub struct _Page {
  path: String,
  title: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Schema {
  font: Option<Font>,
  looping: Option<bool>,
  slide: Option<Vec<Page>>,
  style: Option<String>,
}

/* **** **** **** **** */

impl Font {
  pub fn family(&self) -> String {
    match &self.family {
      None => _DEFAULT_FONT_FAMILY.into(),
      Some(family) => {
        format!("{}, {}", family, _DEFAULT_FONT_FAMILY)
      },
    }
  }
  pub fn size(&self) -> &str {
    match &self.size {
      None => "medium",
      Some(size) => size,
    }
  }
  pub fn weight(&self) -> &str {
    match &self.weight {
      None => "normal",
      Some(weight) => weight,
    }
  }
}

impl Page {
  pub fn path(&self) -> &str {
    match &self {
      Page::Page(page) => &page.path,
      Page::Path(path) => path,
    }
  }
  pub fn title(&self) -> &str {
    match &self {
      Page::Page(page) => {
        match &page.title {
          None => &page.path,
          Some(title) => title,
        }
      },
      Page::Path(path) => path,
    }
  }
}

impl Schema {
  pub fn font(&self) -> &Font {
    match &self.font {
      None => _DEFAULT_FONT,
      Some(font) => font
    }
  }
  pub fn looping(&self) -> &bool {
    match &self.looping {
      None => &false,
      Some(looping) => looping,
    }
  }
  pub fn slide(&self) -> &Vec<Page> {
    match &self.slide {
      None => _EMPTY_VEC,
      Some(slide) => slide,
    }
  }
  pub fn style(&self) -> &str {
    match &self.style {
      None => "\
https://cdnjs.cloudflare.com/\
ajax/libs/highlight.js/11.7.0/\
styles/github-dark.min.css",
      Some(style) => style,
    }
  }
  pub fn from_reader(
    r: impl io::Read
  ) -> Result<Self, Box<dyn error::Error>> {
    Ok(serde_json::from_str(
      io::read_to_string(r)?.as_str()
    )?)
  }
}

static _EMPTY_VEC: &Vec<Page> = &vec![];
static _DEFAULT_FONT: &Font = &Font {
  family: None,
  size: None,
  weight: None,
  href: None,
};
static _DEFAULT_FONT_FAMILY: &str = "\
ui-monospace, SFMono-Regular, SF Mono, Menlo, \
Consolas, Liberation Mono, monospace";
