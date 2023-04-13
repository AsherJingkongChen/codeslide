use crate::Result;
use super::client;
use super::file;
use askama::Template;
use debug_print::debug_eprintln;
use minifier::css::minify;
use std::fs;

// type TemplateSchema = {
//   link_hrefs: Array<string>;
//   show: {
//     looping: boolean;
//   };
//   slide: Array<{
//     text: string;
//     title: string;
//     lang_class: string;
//   }>;
//   stylesheet: string;
// };

#[derive(Clone, Debug)]
pub struct Page {
  pub text: String,
  pub title: String,
  pub lang_class: String,
}

#[derive(Clone, Debug, Template)]
#[template(path = "index.j2")]
pub struct Schema {
  pub link_hrefs: Vec<String>,
  pub show: Show,
  pub slide: Vec<Page>,
  pub stylesheet: String,
}

#[derive(Clone, Debug)]
pub struct Show {
  pub looping: bool,
}

impl Schema {
  pub fn from_client(
    schema: &client::Schema
  ) -> Result<Self> {
    let mut result = Schema {
      link_hrefs: schema.links().to_vec(),
      show: Show {
        looping: schema.show().looping().clone(),
      },
      slide: Vec::new(),
      stylesheet: minify(&format!(
        "<style>
        body {{
          margin: 0;
          overflow: hidden;
          background-color: black;
        }}
        .page#current {{
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: scroll;
        }}
        .page#current {{
          scrollbar-width: none;
        }}
        .page#current ::-webkit-scrollbar {{
          display: none;
        }}
        pre {{
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }}
        pre code.hljs {{
          padding-bottom: 0;
        }}
        pre.title {{
          border-bottom: 2px solid currentColor;
        }}
        pre.title > code {{
          font-size: larger;
          font-weight: bolder;
        }}
        code {{
          font-family: {};
          font-size: {};
          font-weight: {};
        }}
        </style>",
        schema.show().font().family(),
        schema.show().font().size(),
        schema.show().font().weight()
      ))?.to_string(),
    };

    for page in schema.slide() {
      result.slide.push(Page {
        text: fs::read_to_string(page.path())
          .or_else(|e| Err(
            file::with_path_not_found(e, page.path())
          ))?,
        title: page.title().to_string(),
        lang_class: match page.lang() {
          None => String::new(),
          Some(lang) => {
            format!("language-{}", lang.to_str())
          },
        }
      });
    }

    debug_eprintln!("{{");
    debug_eprintln!("  \"link_hrefs\": {:?},", result.link_hrefs);
    debug_eprintln!("  \"show\": \"{:?}\",", result.show);
    #[allow(unused_variables)]
    for (index, page)
    in result.slide.iter().enumerate() {
      debug_eprintln!(
        "  \"slide[{}]\": {{ \"title\": {:?}, \"lang_class\": {:?} }},",
        index, page.title, page.lang_class
      );
    }
    debug_eprintln!("  \"stylesheet\": {:?}", result.stylesheet);
    debug_eprintln!("}}");

    Ok(result)
  }

  pub fn markup(&self) -> Result<String> {
    Ok(self.render()?)
  }
}
