use std::{io, path};

pub fn with_path_not_found(
  e: io::Error,
  path: impl AsRef<path::Path>
) -> io::Error {
  match e.kind() {
    io::ErrorKind::NotFound => io::Error::new(
      e.kind(),
      format!("{}: {}",
        e.to_string(),
        path.as_ref().display()
      )
    ),
    _ => e
  }
}