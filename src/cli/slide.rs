use indexmap::IndexMap;
use if_chain::if_chain;
use std::{fs, io};
use serde::{Deserialize, Serialize};

pub type Input = IndexMap<String, InputItem>;
pub type Output = IndexMap<String, OutputItem>;

#[derive(Deserialize, Serialize, Clone)]
pub struct InputItem {
  pub up: Option<String>,
  pub right: Option<String>,
  pub down: Option<String>,
  pub left: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct OutputItem {
  pub path: String,
  pub text: String,
  pub up: Option<String>,
  pub right: Option<String>,
  pub down: Option<String>,
  pub left: Option<String>,
}

pub fn to_output(input: &Input) -> io::Result<Output> {
  let mut output = Output::new();
  for (path, input_item) in input {
    match output.get_mut(path) {
      Some(output_item) => {
        output_item.up = input_item.up.clone();
        output_item.right = input_item.right.clone();
        output_item.down = input_item.down.clone();
        output_item.left = input_item.left.clone();
      },
      None => {
        output.insert(
          path.clone(),
          OutputItem {
            path: path.clone(),
            text: fs::read_to_string(path)?,
            up: input_item.up.clone(),
            right: input_item.right.clone(),
            down: input_item.down.clone(),
            left: input_item.left.clone()
          }
        );
        if_chain! {
          if let Some(up) = &input_item.up;
          if !output.contains_key(up);
          then {
            output.insert(
              up.clone(),
              OutputItem {
                path: up.clone(),
                text: fs::read_to_string(up)?,
                up: None,
                right: None,
                down: Some(path.clone()),
                left: None,
              }
            );
          }
        }
        if_chain! {
          if let Some(right) = &input_item.right;
          if !output.contains_key(right);
          then {
            output.insert(
              right.clone(),
              OutputItem {
                path: right.clone(),
                text: fs::read_to_string(right)?,
                up: None,
                right: None,
                down: None,
                left: Some(path.clone()),
              }
            );
          }
        }
        if_chain! {
          if let Some(down) = &input_item.down;
          if !output.contains_key(down);
          then {
            output.insert(
              down.clone(),
              OutputItem {
                path: down.clone(),
                text: fs::read_to_string(down)?,
                up: Some(path.clone()),
                right: None,
                down: None,
                left: None,
              }
            );
          }
        }
        if_chain! {
          if let Some(left) = &input_item.left;
          if !output.contains_key(left);
          then {
            output.insert(
              left.clone(),
              OutputItem {
                path: left.clone(),
                text: fs::read_to_string(left)?,
                up: None,
                right: Some(path.clone()),
                down: None,
                left: None,
              }
            );
          }
        }
      },
    }
  }
  for (path, input_item) in input {
    if_chain! {
      if let Some(up) = &input_item.up;
      if let Some(next_item) = output.get_mut(up);
      if next_item.down.is_none();
      then {
        next_item.down = Some(path.clone());
      }
    }
    if_chain! {
      if let Some(right) = &input_item.right;
      if let Some(next_item) = output.get_mut(right);
      if next_item.left.is_none();
      then {
        next_item.left = Some(path.clone());
      }
    }
    if_chain! {
      if let Some(down) = &input_item.down;
      if let Some(next_item) = output.get_mut(down);
      if next_item.up.is_none();
      then {
        next_item.up = Some(path.clone());
      }
    }
    if_chain! {
      if let Some(left) = &input_item.left;
      if let Some(next_item) = output.get_mut(left);
      if next_item.right.is_none();
      then {
        next_item.right = Some(path.clone());
      }
    }
  }
  Ok(output)
}
