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
    .strictObject({
      manifest: z.string().optional(),
      output: z.string().optional(),
    })
    .catch((e) => {
      throw new Error(
        `Cannot parse the CLI options:\n\t${
          formatZodError(e.error.errors[0])
        }`
      );
    });
}
