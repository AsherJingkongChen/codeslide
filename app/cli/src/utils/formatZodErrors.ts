import { z } from 'zod';

export const formatZodErrors = (
  errors: z.ZodIssue[]
): string => (
  errors
    .map(({ message, path }) => (
      `${message}${path.length ? ` at key "${path.join('.')}"` : ''}`
    ))
    .join('\n')
);
