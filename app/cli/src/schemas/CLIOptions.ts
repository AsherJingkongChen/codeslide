import { z } from 'zod';
import { formatZodError } from '../utils';

export type CLIOptions = z.infer<typeof CLIOptions.schema>;

export namespace CLIOptions {
  export const parse = (
    options?: Partial<CLIOptions>
  ): CLIOptions => (
    schema.default({}).parse(options)
  );

  export const schema = z
    .object({
      manifest: z.string().optional(),
      output: z.string().optional(),
    })
    .strict()
    .catch((e) => {
      throw new Error(`\
Cannot parse the CLI options:
\t${formatZodError(e.error.errors[0])}`
      );
    });
}
