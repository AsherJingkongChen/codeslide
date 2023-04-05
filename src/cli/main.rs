pub mod params;
pub mod slide;
pub mod tool;
pub mod template;

use std::{error, fs};
use serde_json::Value;
use params::Params;
use template::*;

fn main() -> Result<(), Box<dyn error::Error>> {
  let mut output_template = WebApp::new();

  // read parameters
  let params
    = Params::from_iter(std::env::args().skip(1));
  params.filter(vec!["input", "output"])?;

  // get parameter `input`
  let default_args
    = vec!["./input.codeslide.json".to_string()];
  let mut input_paths
    = params.get_args("input")
      .unwrap_or(&default_args);
  if input_paths.len() == 0 {
    input_paths = &default_args;
  }

  // process all inputs
  for input_path in input_paths {
    let mut input: Value
      = serde_json::from_str(
        &fs::read_to_string(input_path)
        .or_else(|e| Err(
          tool::with_path_not_found(e, input_path)
        ))?
      )?;
    let output_path
      = input["output"].take().as_str()
        .unwrap_or("./output.codeslide.json")
        .to_string();

    let slide
      = serde_json::from_value::<slide::Input>(input["slide"].take())?;
    // println!("{}", serde_json::to_string_pretty(&slide::to_output(&slide)?)?);
    let slide
      = serde_json::to_string(&slide::to_output(&slide)?)?;
    output_template.slide = slide;
    fs::write(&output_path, output_template.render()?)?;
  }
  Ok(())
}
