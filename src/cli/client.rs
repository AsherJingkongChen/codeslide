use crate::Result;
use super::lang::Lang;
use serde::Deserialize;
use std::io;

// [TODO]
// show?: {
//   font?: {
//     family?: string; V
//     size?: string; V
//     weight?: string; V
//   };
//   looping?: boolean; V
//   single?: boolean; O
//   transition?: string;
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
  links: Option<Vec<String>>,
  show: Option<Show>,
  slide: Option<Vec<Page>>,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Show {
  font: Option<Font>,
  looping: Option<bool>,
  single: Option<bool>,
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
  pub fn lang(&self) -> Option<Lang> {
    match &self {
      Page::Page(page) => {
        page.lang.as_ref()
          .map(String::as_str)
          .and_then(Lang::from_str)
          .or(Lang::from_path(&page.path))
      },
      Page::Path(path) => Lang::from_path(path),
    }
  }
}

impl Schema {
  pub fn links(&self) -> Vec<String> {
    let result
      = _DEFAULT_LINKS.iter()
        .map(|s| s.to_string()).collect::<Vec<_>>();
    match &self.links {
      Some(links) => {
        [result, links.clone()].concat()
      },
      None => result
    }
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
  pub fn font(&self) -> &Font {
    self.font.as_ref().unwrap_or(_DEFAULT_FONT)
  }
  pub fn looping(&self) -> &bool {
    self.looping.as_ref().unwrap_or(&false)
  }
  pub fn single(&self) -> &bool {
    self.single.as_ref().unwrap_or(&false)
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
highlight.js/11.7.0/styles/github-dark-dimmed.min.css"
];

const _DEFAULT_SHOW: &Show = &Show {
  font: None,
  looping: None,
  single: None,
};

const _DEFAULT_SLIDE: &Vec<Page> = &vec![];
