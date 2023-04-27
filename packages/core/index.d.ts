export const processConfig: (
  rawJson: string
) => Promise<[string, BufferEncoding]>;

export const getContent: (
  src?: string | URL
) => Promise<string | undefined>;
