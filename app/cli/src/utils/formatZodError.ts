import { z } from 'zod';

export const formatZodError = (
  error: z.ZodIssue
): string => `\
${error.message}\
${
  error.path.length
    ? ` at "${error.path.join('.')}"` : ''
}`;
