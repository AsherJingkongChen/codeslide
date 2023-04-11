use crate::Result;
use super::lang;
use serde::Deserialize;
use std::io;

// type ClientSchema = {
//   font?: {
//     family?: string; V
//     size?: string; V
//     weight?: string; V
//   };
//   links?: Array<string>; V
//   show?: {
//     format?: string;
//     layout?: string;
//     looping?: boolean; V
//     transition?: string;
//   };
//   slide?: Array< V
//   | string
//   | {
//       path: string; V
//       title?: string; V
//       lang?: string; V
//     }
//   >;
// };

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Font {
  family: Option<String>,
  size: Option<String>,
  weight: Option<String>,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(untagged, deny_unknown_fields)]
pub enum Page {
  Page(_Page),
  Path(String),
}

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct _Page {
  path: String,
  title: Option<String>,
  lang: Option<String>,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Schema {
  font: Option<Font>,
  links: Option<Vec<String>>,
  show: Option<Show>,
  slide: Option<Vec<Page>>,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Show {
  // format: Option<String>,
  // layout: Option<String>,
  looping: Option<bool>,
}

/* **** **** **** **** */

impl Font {
  pub fn family(&self) -> String {
    self.family.as_ref().map_or(
      _DEFAULT_FONT_FAMILY.to_string(),
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
    self.font.as_ref().unwrap_or(_DEFAULT_FONT)
  }
  pub fn links(&self) -> Vec<String> {
    self.links.as_ref().unwrap_or(
      &_DEFAULT_LINKS.iter()
      .map(|s| s.to_string()).collect()
    ).clone()
  }
  pub fn show(&self) -> &Show {
    self.show.as_ref().unwrap_or(_DEFAULT_SHOW)
  }
  pub fn slide(&self) -> &Vec<Page> {
    self.slide.as_ref().unwrap_or(_DEFAULT_SLIDE)
  }
  pub fn from_reader(
    r: impl io::Read
  ) -> Result<Self> {
    Ok(serde_json::from_str(
      &io::read_to_string(r)?
    )?)
  }
}

impl Show {
  // pub fn format(&self) -> &String {

  // }
  // pub fn layout(&self) -> &String {

  // }
  pub fn looping(&self) -> &bool {
    self.looping.as_ref().unwrap_or(&false)
  }
}

static _DEFAULT_FONT: &Font = &Font {
  family: None,
  size: None,
  weight: None,
};

const _DEFAULT_FONT_FAMILY: &str = "\
ui-monospace, SFMono-Regular, SF Mono, Menlo, \
Consolas, Liberation Mono, monospace";

const _DEFAULT_LINKS: &[&str] = &[
"https://cdnjs.cloudflare.com/ajax/libs/\
highlight.js/11.7.0/styles/github-dark.min.css"
];

const _DEFAULT_SHOW: &Show = &Show {
  looping: None,
};

const _DEFAULT_SLIDE: &Vec<Page> = &vec![];
