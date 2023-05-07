import { z } from 'zod';

export type CLIOptions = z.infer<typeof CLIOptions>;

export const CLIOptions = z.object({
  manifest: z.string().optional(),
  output: z.string().optional(),
})
.strict();
