use std::fs;
use std::{error, io};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone)]
struct SlideMapInput {
  pub slides: IndexMap<String, SlideInput>,
}

#[derive(Deserialize, Serialize, Clone)]
struct SlideInput {
  pub up: Option<String>,
  pub right: Option<String>,
  pub down: Option<String>,
  pub left: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
struct SlideMapOutput {
  pub slides: IndexMap<String, SlideOutput>,
}

#[derive(Deserialize, Serialize, Clone)]
struct SlideOutput {
  pub path: String,
  pub text: String,
  pub up: Option<String>,
  pub right: Option<String>,
  pub down: Option<String>,
  pub left: Option<String>,
}

fn get_output(
  input: &SlideMapInput
) -> Result<SlideMapOutput, Box<dyn error::Error>> {
  let mut output = SlideMapOutput {
    slides: IndexMap::new()
  };

  for (path, input_slide) in &input.slides {
    match output.slides.get_mut(path) {
      Some(output_slide) => {
        output_slide.up = input_slide.up.clone();
        output_slide.right = input_slide.right.clone();
        output_slide.down = input_slide.down.clone();
        output_slide.left = input_slide.left.clone();
      },
      None => {
        output.slides.insert(
          path.clone(),
          SlideOutput {
            path: path.clone(),
            text: fs::read_to_string(path)?,
            up: input_slide.up.clone(),
            right: input_slide.right.clone(),
            down: input_slide.down.clone(),
            left: input_slide.left.clone()
          }
        );
        if let Some(up) = &input_slide.up {
          output.slides.insert(
            up.clone(),
            SlideOutput {
              path: up.clone(),
              text: fs::read_to_string(up)?,
              up: None,
              right: None,
              down: Some(path.clone()),
              left: None,
            }
          );
        }
        if let Some(right) = &input_slide.right {
          output.slides.insert(
            right.clone(),
            SlideOutput {
              path: right.clone(),
              text: fs::read_to_string(right)?,
              up: None,
              right: None,
              down: None,
              left: Some(path.clone()),
            }
          );
        }
        if let Some(down) = &input_slide.down {
          output.slides.insert(
            down.clone(),
            SlideOutput {
              path: down.clone(),
              text: fs::read_to_string(down)?,
              up: Some(path.clone()),
              right: None,
              down: None,
              left: None,
            }
          );
        }
        if let Some(left) = &input_slide.left {
          output.slides.insert(
            left.clone(),
            SlideOutput {
              path: left.clone(),
              text: fs::read_to_string(left)?,
              up: None,
              right: Some(path.clone()),
              down: None,
              left: None,
            }
          );
        }
      },
    }
  }

  // let output_slides = output.slides.clone();
  for (path, input_slide) in &input.slides {
    if let Some(up) = &input_slide.up {
      if let Some(next_slide)
        = output.slides.get_mut(up) {
        if next_slide.down.is_none() {
          next_slide.down = Some(path.clone());
        }
      }
    }
    if let Some(right) = &input_slide.right {
      if let Some(next_slide)
        = output.slides.get_mut(right) {
        if next_slide.left.is_none() {
          next_slide.left = Some(path.clone());
        }
      }
    }
    if let Some(down) = &input_slide.down {
      if let Some(next_slide)
        = output.slides.get_mut(down) {
        if next_slide.up.is_none() {
          next_slide.up = Some(path.clone());
        }
      }
    }
    if let Some(left) = &input_slide.left {
      if let Some(next_slide)
        = output.slides.get_mut(left) {
        if next_slide.right.is_none() {
          next_slide.right = Some(path.clone());
        }
      }
    }
  }

  Ok(output)
}

fn main() -> Result<(), Box<dyn error::Error>> {
  let input: SlideMapInput
    = serde_json::from_reader(io::stdin())?;
  let output = get_output(&input)?;
  println!("{}", serde_json::to_string_pretty(&output.slides)?);
  Ok(())
}

// struct Node {
//   val: isize,
//   left: Option<Box<Node>>,
//   right: Option<Box<Node>>,
// }

// impl Node {
//   fn new(val: isize) -> Node {
//       Node {
//           val,
//           left: None,
//           right: None,
//       }
//   }
// }

// pub struct BinTree {
//   root: Option<Box<Node>>,
// }

// impl BinTree {
//   pub fn insert(&mut self, z: isize) {
//       let z_node = Some(Box::new(Node::new(z)));
     
//       let node = self.find_node(z);

//       if let Some(n) = node {
//           if z < n.val {
//               n.left = z_node;
//           } else {
//               n.right = z_node;
//           }
//       } else {
//           *node = z_node;
//       }
//   }
//   fn find_node(&mut self, z: isize) -> &mut Option<Box<Node>> {
//       let mut x = &mut self.root;

//       loop {
//           match x {
//               Some(n) => {
//                   if z < n.val {
//                       x = &mut n.left;
//                   } else {
//                       x = &mut n.right;
//                   }
//               }
//               None => {
//                   return x;
//               }
//           }
//       }
//   }
// }

