import { z } from 'zod';

export const formatZodError = (
  error: z.ZodError,
  prefix?: string[],
): string => [
  ...new Set(
    error.errors.map((e) => _formatZodIssue(e, prefix))
  ).values()
].join('\n\t');

const _formatZodIssue = (
  error: z.ZodIssue,
  prefix?: string[],
): string => `\
${error.message}\
${
  (error.path.length || prefix)
    ? ` at "${[
        ...(prefix ?? []),
        ...error.path,
      ].join('.')}"` : ''
}`;
