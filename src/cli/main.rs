pub mod command;
pub mod slide;

use std::error;

fn main() -> Result<(), Box<dyn error::Error>> {
  let mut cmd = command::Command::new();
  cmd.set("lol", |prompt| -> () {
    println!("({}) LOL!", prompt.join(", "));
  });
  cmd.set("am", |prompt| -> () {
    println!("({}) Add and modify", prompt.join(", "));
  });
  cmd.exec(&std::env::args().skip(1).collect::<Vec<_>>())?;
  Ok(())
  // let input: slide::Input
  //   = serde_json::from_reader(io::stdin())?;
  // let output = input.to_output()?;
  // println!("{}", serde_json::to_string_pretty(&output.slide)?);
  // Ok(())
}
