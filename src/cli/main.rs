pub mod client;
pub mod tool;
pub mod template;

use std::{error, io::{stdout, stdin, Write}};
use template::Template;

// [TODO]
// - Expand client schema
// - Increase accessibility in Web App

fn main() -> Result<(), Box<dyn error::Error>> {
  let mut template = template::Store::new();

  // read client schema from stdin
  let template_schema
    = template::Schema::from_client(
      &client::Schema::from_reader(stdin())?
    )?;

  // fill template store
  template.slide =
    serde_json::to_string(&template_schema.slide)?;

  // write rendered template to stdout
  stdout().write_all(template.render()?.as_bytes())?;
  Ok(())
}
