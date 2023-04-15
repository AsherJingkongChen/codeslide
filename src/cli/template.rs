use crate::{
  Result,
  client,
  content::Content,
  tool,
};
use askama::Template;
use debug_print::debug_eprintln;
use minifier::css::minify;
use std::fs;
use url::Url;

// type TemplateSchema = {
//   show: {
//     layout: string;
//     looping: boolean;
//   };
//   slides: ({
//     content: string;
//     lang_class: string;
//     title: string;
//   })[];
//   stylehrefs: URL[];
//   stylesheet: string;
// };

#[derive(Clone, Debug)]
pub struct Slide {
  pub content: String,
  pub lang_class: String,
  pub title: String,
}

#[derive(Clone, Debug, Template)]
#[template(path = "index.j2")]
pub struct Schema {
  pub show: Show,
  pub slides: Vec<Slide>,
  pub stylehrefs: Vec<Url>,
  pub stylesheet: String,
}

#[derive(Clone, Debug)]
pub struct Show {
  pub layout: String,
  pub looping: bool,
}

impl Schema {
  pub fn from_client(
    schema: &client::Schema
  ) -> Result<Self> {
    let mut result = Schema {
      show: Show {
        layout: schema.show().layout().to_string(),
        looping: schema.show().looping(),
      },
      slides: Vec::new(),
      stylehrefs: schema.styles().iter()
        .map(Content::as_text).filter(Option::is_some)
        .map(|s| s.unwrap().clone())
        .collect::<Vec<_>>(),
      stylesheet: minify(&format!(
        "html, body {{
          margin: 0;
          overflow: hidden;
          background-color: black;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }}
        .slide#current {{
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: scroll;
          font-size: {};
          font-weight: {};
        }}
        .slide#current {{
          scrollbar-width: none;
        }}
        .slide#current :-webkit-scrollbar {{
          display: none;
        }}
        pre {{
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }}
        .title {{
          border-top: medium double currentColor;
        }}
        .title.noborder {{
          border: none;
        }}
        .title > code {{
          font-size: larger;
          font-weight: bolder;
        }}
        code {{
          font-family: {};
        }}
        @page {{
          size: auto;
        }}
        @media print {{
          .slide#current {{
            height: auto;
          }}
        }}
        {}",
        schema.show().font().size(),
        schema.show().font().weight(),
        schema.show().font().family(),
        String::from_iter(
          schema.styles().iter()
            .map(Content::as_type).filter(Option::is_some)
            .map(|s| s.unwrap().sheet.clone())
        ),
      ))?.to_string(),
    };

    for page in schema.slides() {
      result.slides.push(Slide {
        content: fs::read_to_string(page.path())
          .or_else(|e| Err(
            tool::error_with_path_not_found(e, page.path())
          ))?,
        lang_class: match page.lang() {
          None => String::new(),
          Some(lang) => {
            format!("language-{}", lang.as_str())
          },
        },
        title: page.title().to_string(),
      });
    }

    debug_eprintln!("{:#?}", result);

    Ok(result)
  }

  pub fn markup(&self) -> Result<String> {
    Ok(self.render()?)
  }
}
