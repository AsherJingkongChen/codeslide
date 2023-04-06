use serde::{Deserialize, Serialize};
use std::{error, io};

#[derive(Deserialize, Serialize, Clone)]
pub struct Schema {
  pub slide: Option<Vec<Page>>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Page {
  pub path: String,
  pub title: Option<String>,
}

impl Schema {
  pub fn from_reader(
    r: impl io::Read
  ) -> Result<Self, Box<dyn error::Error>> {
    Ok(serde_json::from_str(
      &io::read_to_string(r)?
    )?)
  }
}
