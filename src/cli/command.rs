use std::collections::HashMap;

pub type Task = fn(&[&str]) -> ();

pub struct Command {
  pub book: HashMap<String, Task>,
}

impl Command {
  pub fn new() -> Self {
    Command { book: HashMap::new() }
  }

  pub fn set(
    &mut self,
    name: &str,
    task: Task
  ) -> Option<Task> {
    self.book.insert(name.to_string(), task)
  }

  pub fn del(
    &mut self,
    name: &str
  ) -> Option<Task> {
    self.book.remove(name)
  }

  pub fn clear(&mut self) {
    self.book.clear();
  }

  pub fn run(
    &self,
    name: &str,
    args: &[&str]
  ) -> Result<(), String> {
    if let Some(task)
      = self.book.get(name) {
      task(args); Ok(())
    } else {
      Err(format!("No such command named `{}`", name))
    }
  }

  pub fn exec(&self, args: &Vec<String>) -> Result<(), String> {
    let mut params: Vec<(&str, Vec<&str>)> = Vec::new();
    for arg in args {
      if arg.starts_with("--") {
        params.push((arg, Vec::new()));
      } else if let Some(last)
        = params.last_mut() {
        last.1.push(arg);
      }
    }
    for (name, args) in &params {
      if let Err(e) = self.run(
        &name[2..],
        args.as_slice()
      ) {
        return Err(e);
      }
    }
    Ok(())
  }
}