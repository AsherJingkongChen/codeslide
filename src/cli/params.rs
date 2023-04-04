use std::collections::HashSet;

use indexmap::IndexMap;

pub struct Params {
  params: IndexMap<String, Vec<String>>,
}

impl Params {
  pub fn from_iter(
    args: impl IntoIterator<Item = String>
  ) -> Params {
    Params::from_iter_by(args, "--")
  }

  pub fn from_iter_by(
    args: impl IntoIterator<Item = String>,
    prefix: &str
  ) -> Params {
    let mut params = IndexMap::new();
    for arg in args.into_iter() {
      if arg.starts_with(prefix) {
        params.insert((&arg[2..]).to_string(), Vec::new());
      } else if let Some(last)
        = params.last_mut() {
        last.1.push(arg);
      }
    }
    Params { params }
  }

  pub fn get_args(
    &self,
    param_name: &str
  ) -> Result<&Vec<String>, String> {
    self.params.get(param_name).ok_or(format!(
      "Parameter `{}` is not provided, \
      try again with field `--{}` added",
      param_name,
      param_name
    ))
  }

  pub fn filter(
    &self,
    valid_param_names: Vec<&str>
  ) -> Result<&Self, String> {
    let valid_param_names: HashSet<&str>
      = HashSet::from_iter(valid_param_names);
    for param_name in self.params.keys() {
      if !valid_param_names.contains(param_name.as_str()) {
        return Err(format!(
          "Unexpected parameter `{}` is received, \
          try again with field `--{}` removed",
          param_name,
          param_name
        ));
      }
    }
    Ok(&self)
  }
}