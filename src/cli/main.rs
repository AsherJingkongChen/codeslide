pub mod client;
pub mod tool;
pub mod template;

use std::{error, io::{stdout, stdin, Write}};

// [TODO]
// - Expand client schema
// - Increase accessibility in Web App

fn main() -> Result<(), Box<dyn error::Error>> {
  // // read client schema
  let client_schema
    = client::Schema::from_reader(stdin())?;

  let template_schema
    = template::Schema::from_client(&client_schema);

  // write rendered template to stdout
  stdout().write_all(
    template_schema?.render()?.as_bytes()
  )?;
  Ok(())
}
