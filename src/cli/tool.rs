use std::{
  io::{Error, ErrorKind},
  path::Path
};

pub fn error_with_path_not_found(
  e: Error,
  path: impl AsRef<Path>
) -> Error {
  match e.kind() {
    ErrorKind::NotFound => Error::new(
      e.kind(),
      format!("{}: {}",
        e.to_string(),
        path.as_ref().display()
      )
    ),
    _ => e
  }
}
