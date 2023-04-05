use std::io;

pub fn with_path_not_found(
  e: io::Error,
  path: &str
) -> io::Error {
  match e.kind() {
    io::ErrorKind::NotFound => io::Error::new(
      e.kind(),
      format!("{}: {}", e.to_string(), path)
    ),
    _ => e
  }
}