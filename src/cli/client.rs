use super::lang;

use serde::{Deserialize, Serialize};
use std::{error, io};

// type ClientSchema = {
//   font?: {
//     family?: string; V
//     size?: string; V
//     weight?: string; V
//     href?: string; V
//   };
//   looping?: boolean; V
//   slide?: Array<
//   | string
//   | {
//       path: string; V
//       title?: string; V
//       lang?: string; V
//     }
//   >;
//   style?:
//   | string; V
//   | {
//       sheet?: string;
//       hrefs: Array<string>;
//     }
//   | {
//       sheet: string;
//       hrefs?: Array<string>;
//     };
//   target?:
//   | string
//   | {
//       format?: string;
//       layout?: string;
//       transition?: string;
//     };
// };

#[derive(Deserialize, Serialize, Clone)]
pub struct Font {
  family: Option<String>,
  size: Option<String>,
  weight: Option<String>,
  href: Option<String>,
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
  lang: Option<String>,
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
    self.family.as_ref().map_or(
      _DEFAULT_FONT_FAMILY.into(),
      |family| {
        format!("{}, {}", family, _DEFAULT_FONT_FAMILY)
      }
    )
  }
  pub fn size(&self) -> &str {
    self.size.as_ref().map_or("medium", String::as_str)
  }
  pub fn weight(&self) -> &str {
    self.weight.as_ref().map_or("normal", String::as_str)
  }
  pub fn href(&self) -> Option<&str> {
    self.href.as_ref().map(String::as_str)
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
        page.title.as_ref().map_or(
          &page.path,
          String::as_str
        )
      },
      Page::Path(path) => path,
    }
  }
  pub fn lang(&self) -> Option<&str> {
    match &self {
      Page::Page(page) => {
        page.lang.as_ref()
          .map(String::as_str)
          .and_then(lang::supported)
          .or(lang::from(&page.path))
      },
      Page::Path(path) => lang::from(path),
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
      &*io::read_to_string(r)?
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
