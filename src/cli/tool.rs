use std::{
  io,
  path::Path
};

pub fn error_with_path_not_found(
  e: io::Error,
  path: impl AsRef<Path>
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
