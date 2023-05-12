import { z } from 'zod';

export const formatZodErrors = (
  errors: z.ZodIssue[]
): string => `\
${errors[0].message}\
${
  errors[0].path.length
    ? ` at key "${errors[0].path.join('.')}"` : ''
}`;
