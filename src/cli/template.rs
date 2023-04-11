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
#[template(path = "index.html")]
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
        pre {{
          display: flex;
          flex-direction: column;
          margin: 0;
          height: 100vh;
          white-space: pre-wrap;
          word-break: break-word;
        }}
        code {{
          font-family: {};
          font-size: {};
          font-weight: {};
          overflow: scroll;
          scrollbar-width: none;
        }}
        code::-webkit-scrollbar {{
          display: none;
        }}
        </style>",
        schema.font().family(),
        schema.font().size(),
        schema.font().weight()
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
          Some(lang) => format!("language-{}", lang),
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
