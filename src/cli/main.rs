pub mod params;
pub mod slide;

use std::{error, fs, io::BufReader};
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
    = params.get_args("input")
      .unwrap_or(&default_args);
  if input_paths.len() == 0 {
    input_paths = &default_args;
  }

  // process all inputs
  for input_path in input_paths {
    let mut input: Value
      = serde_json::from_reader(
        BufReader::new(fs::File::open(input_path)?)
      )?;
    let output_path
      = input["output"].take().as_str()
        .unwrap_or("./output.codeslide.json")
        .to_string();

    let slide
      = serde_json::from_value::<slide::Input>(input["slide"].take())?;
    let slide = slide::to_output(&slide)?;
    let slide = serde_json::to_string_pretty(&slide)?;
    fs::write(&output_path, slide)?;
  }
  Ok(())
}
