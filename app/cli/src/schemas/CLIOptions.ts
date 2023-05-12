import { z } from 'zod';
import { formatZodErrors } from '../utils';

export type CLIOptions = z.infer<typeof CLIOptions.schema>;

export namespace CLIOptions {
  export const parse = (
    options: Partial<CLIOptions>
  ): CLIOptions => {
    const result = schema.safeParse(options);
    if (! result.success) {
      throw new Error(
        `Cannot parse the CLI options: "${
          formatZodErrors(result.error.errors)
        }"`
      );
    }
    return result.data;
  };

  export const schema = z
    .strictObject({
      manifest: z.string().optional(),
      output: z.string().optional(),
    });
}
