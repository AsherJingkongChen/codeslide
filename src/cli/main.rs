pub mod client;
pub mod content;
pub mod tool;
pub mod lang;
pub mod template;

use std::{
  error::Error,
  result::Result as stdResult,
  io::{stdout, stdin, Write},
};

pub type Result<T>
  = stdResult<T, Box<dyn Error>>;

// [TODO]
// - Expand client schema
// - Increase accessibility in Web App

fn main() -> Result<()> {
  // read client schema from stdin
  let client_schema
    = client::Schema::from_reader(stdin())?;

  // make template schema
  let template_schema
    = template::Schema::from_client(&client_schema)?;

  // render template to HTML or PDF and write to stdout
  if template_schema.show.layout == "pdf" {
    stdout().write_all(
      template_schema.pdf()?.as_slice()
    )?;
  } else {
    stdout().write_all(
      template_schema.markup()?.as_bytes()
    )?;
  }

  Ok(())
}
