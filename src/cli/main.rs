pub mod client;
pub mod tool;
pub mod template;

use std::{error, fs};
use template::Template;

// [TODO]
// - Expand client schema
// - Increase accessibility in Web App

fn main() -> Result<(), Box<dyn error::Error>> {
  let mut template = template::Store::new();

  // read parameters
  let params
    = client::Params::from_iter(
      std::env::args().skip(1)
    ).filter(&vec!["client"])?;

  // get parameters
  let default_args = vec!["./client.cs.json".into()];
  let mut client_paths
    = params.get_args("client")
      .unwrap_or(&default_args);
  if client_paths.is_empty() {
    client_paths = &default_args;
  }

  // process with parameters
  for client_path in client_paths {
    let template_schema
      = template::Schema::from_client(
        &client::Schema::from_file(&client_path)?
      )?;

    template.slide =
      serde_json::to_string(&template_schema.slide)?;

    fs::write(
      &template_schema.output,
      template.render()?
    ).or_else(|e| Err(
      tool::with_path_not_found(e, &template_schema.output)
    ))?;
  }
  Ok(())
}
