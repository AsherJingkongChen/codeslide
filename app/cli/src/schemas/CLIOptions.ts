import { z } from 'zod';

export type CLIOptions = z.infer<typeof CLIOptions.schema>;

export namespace CLIOptions {
  export const parse = (
    options: Partial<CLIOptions>
  ): CLIOptions => (
    schema.parse(options)
  );

  export const schema = z
    .strictObject({
      manifest: z.string().optional(),
      output: z.string().optional(),
    });
}
