use serde::Deserialize;

#[derive(Clone, Debug, Deserialize)]
#[serde(untagged, deny_unknown_fields)]
pub enum Content<T, U = String> {
  Text(U),
  Type(T),
}

impl<T, U> Content<T, U> {
  pub fn as_text(&self) -> Option<&U> {
    match self {
      Content::Text(res) => Some(res),
      _ => None,
    }
  }
  pub fn as_type(&self) -> Option<&T> {
    match self {
      Content::Type(res) => Some(res),
      _ => None,
    }
  }
}
