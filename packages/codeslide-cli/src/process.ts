import { stderr, stdin, stdout, exit } from 'process';
import { PathLike, writeFileSync } from 'fs';
import { Config } from '../../codeslide-config';
import { parseConfig } from './parse';
import { getContent } from './tool';

export const process = async (
  { config, output }: any
) => {
  if (config === undefined) {
    let input = Buffer.alloc(0);
    stdin
      .on('data', (d) => {
        input = Buffer.concat([input, d]);
      })
      .once('end', () => {
        parseConfig(input.toString())
          .then(Config.print)
          .then((result) => (
            writeToOutput(output, result)
          ));
      });
  } else {
    const result = await getContent(config)
      .then(parseConfig)
      .then(Config.print);
    writeToOutput(output, result);
  }
};

const writeToOutput = (
  output: PathLike,
  result?: string,
) => {
  if (result !== undefined) {
    writeFileSync(output ?? stdout.fd, result);
  } else {
    stderr.write(
      'Cannot make slides from the given config\n'
    );
    exit(1);
  }
};
