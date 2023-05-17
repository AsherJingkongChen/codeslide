import { z } from 'zod';
import { formatZodError } from '../utils';
import { homepage } from '../../package.json';

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
Cannot parse the Front Matter section:
\t${formatZodError(e.error, ['codeslide'])}
\tReference: ${homepage}/docs/REFERENCE.md`
      );
    });
}
