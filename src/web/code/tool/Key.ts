export const sameKeyset = (
  e1: Partial<KeyboardEvent>,
  e2: Partial<KeyboardEvent>,
  keyOrCode: 'key' | 'code' = 'key'
) => (
  e1[keyOrCode] === e2[keyOrCode] &&
  sameModifier(e1, e2)
);

export const sameModifier = (
  e1: Partial<KeyboardEvent>,
  e2: Partial<KeyboardEvent>
) => (
  !!e1.altKey === !!e2.altKey &&
  !!e1.ctrlKey === !!e2.ctrlKey &&
  !!e1.metaKey === !!e2.metaKey &&
  !!e1.shiftKey === !!e2.shiftKey
);
