export const Direction = {
  up: true,
  right: true,
  down: true,
  left: true,
} as const;

export type Direction = keyof typeof Direction;
