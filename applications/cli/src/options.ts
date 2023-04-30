import { z } from 'zod';

export type CLIOptions = z.infer<typeof CLIOptions>;

export const CLIOptions = z.object(
  {
    output: z.string().optional(),
    fontFamily: z.string().optional(),
    fontSize: z.string().optional(),
    fontWeight: z.string().optional(),
    format: z.string().optional(),
    layout: z.string().optional(),
    pagesize: z.string().optional(),
    slides: z.array(z.string()).optional(),
    styles: z.array(z.string()).optional(),
  })
  .strict()
  .superRefine((ref, ctx) => {
    if ((ref.slides?.length ?? 0) % 2 !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The option --slides should has even number of arguments',
      });
    }
  });