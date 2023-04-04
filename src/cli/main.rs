pub mod params;
pub mod slide;

use std::{error, fs};
use serde_json::Value;
use params::Params;

fn main() -> Result<(), Box<dyn error::Error>> {
  // read parameters
  let params
    = Params::from_iter(std::env::args().skip(1));
  params.filter(vec!["input", "output"])?;

  // get parameter `input`
  let default_args
    = vec!["./input.codeslide.json".to_string()];
  let mut input_paths
    = params.get_args("input").unwrap_or(&default_args);
  if input_paths.len() == 0 {
    input_paths = &default_args;
  }

  // get parameter `output` ([TODO] output field should be embedded in input schema)
  let default_args
    = vec!["./output.codeslide.json".to_string()];
  let mut output_path
    = params.get_args("output").unwrap_or(&default_args);
  match output_path.len() {
    0 => { output_path = &default_args; }
    1 => {},
    _ => {
      return Err(
        "Parameter `output` should \
        be followed by from 0 to 1 arguments".into()
      );
    }
  }
  let output_path = &output_path[0];

  // process all inputs
  for input_path in input_paths {
    let input = &fs::read_to_string(input_path)?;
    let input = serde_json::from_str::<Value>(input)?;
    let input
      = serde_json::from_value::<slide::Input>(input["slide"].clone())?;
    let output = slide::to_output(&input)?;
    let output = serde_json::to_string_pretty(&output)?;
    fs::write(output_path, output)?;
  }
  Ok(())
}
