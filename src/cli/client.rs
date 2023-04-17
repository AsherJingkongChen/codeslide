use crate::{
  Result,
  content::Content,
  lang::Lang,
};
use std::{
  io::{Read, read_to_string},
  path::PathBuf
};
use serde::Deserialize;
use url::Url;

// [TODO]
// show?: {
//   layout?:
//   | "pdf" | "scroll" | "slide";
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
#[serde(deny_unknown_fields)]
pub struct Schema {
  show: Option<Show>,
  slides: Option<Vec<Slide>>,
  styles: Option<Vec<Style>>,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Show {
  font: Option<Font>,
  layout: Option<String>,
  looping: Option<bool>,
}

pub type Slide = Content<_Slide, PathBuf>;

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct _Slide {
  path: PathBuf,
  title: Option<String>,
  lang: Option<String>,
}

pub type Style = Content<_Style, Url>;

#[derive(Clone, Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct _Style {
  pub sheet: String,
}

/* **** **** **** **** */

impl Font {
  pub fn family(&self) -> String {
    let default = String::from("\
ui-monospace, SFMono-Regular, SF Mono, Menlo, \
Consolas, Liberation Mono, monospace"
    );
    match &self.family {
      None => default,
      Some(res) => {
        format!("{}, {}", res, default)
      }
    }
  }
  pub fn size(&self) -> &str {
    match &self.size {
      None => "medium",
      Some(res) => res,
    }
  }
  pub fn weight(&self) -> &str {
    match &self.weight {
      None => "normal",
      Some(res) => res,
    }
  }
}

impl Schema {
  pub fn show(&self) -> &Show {
    match &self.show {
      None => &Show {
        font: None,
        looping: None,
        layout: None,
      },
      Some(res) => res,
    }
  }
  pub fn slides(&self) -> &[Slide] {
    match &self.slides {
      None => &[],
      Some(res) => res,
    }
  }
  pub fn styles(&self) -> Vec<Style> {
    let default: Vec<Style> = vec![
      Content::Text(Url::parse("\
https://cdnjs.cloudflare.com/ajax/libs/highlight.js/\
11.7.0/styles/github-dark-dimmed.min.css"
      ).unwrap())
    ];
    match &self.styles {
      None => default,
      Some(v) => {
        [default, v.clone()].concat()
      },
    }
  }
  pub fn from_reader(r: impl Read) -> Result<Self> {
    Ok(serde_json::from_str(
      &read_to_string(r)?
    )?)
  }
}

impl Show {
  pub fn font(&self) -> &Font {
    match &self.font {
      None => &Font {
        family: None,
        size: None,
        weight: None,
      },
      Some(res) => res
    }
  }
  pub fn layout(&self) -> &str {
    match &self.layout {
      None => "slide",
      Some(res) => {
        let res = res.as_str();
        match res {
          | "pdf"
          | "scroll"
          | "slide" => res,
          _ => "slide",
        }
      },
    }
  }
  pub fn looping(&self) -> bool {
    match self.looping {
      None => false,
      Some(res) => res
    }
  }
}

impl Slide {
  pub fn path(&self) -> &PathBuf {
    match &self {
      Content::Text(path) => path,
      Content::Type(page) => &page.path,
    }
  }
  pub fn title(&self) -> &str {
    match &self {
      Content::Text(_) => "",
      Content::Type(page) => {
        match &page.title {
          None => "",
          Some(res) => res,
        }
      },
    }
  }
  pub fn lang(&self) -> Option<Lang> {
    match &self {
      Content::Text(path) => {
        Lang::from_path(path)
      },
      Content::Type(page) => {
        page.lang.as_ref()
          .map(String::as_str)
          .and_then(Lang::from_str)
          .or(Lang::from_path(&page.path))
      },
    }
  }
}
