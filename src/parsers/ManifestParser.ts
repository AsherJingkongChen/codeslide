import matter from 'gray-matter';
import { z } from 'zod';
import { FrontMatterParser } from './FrontMatterParser';
import { _getContent } from './_getContent';
import { SlideShowParser } from './SlideShowParser';

export const ManifestParser = z.string().transform(
  async (manifest: string) => {
    manifest = manifest.replace(
      /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''
    );
    const { content, data } = matter(manifest);
    if (data.codeslide === undefined) {
      throw new Error(
        'Cannot find the key "codeslide" in the Front Matter section'
      );
    }
    const codeslide = FrontMatterParser.parse(data.codeslide);
    codeslide.slides = await SlideShowParser.parseAsync(content);
    codeslide.styles = await Promise.all(
      codeslide.styles.map((path) => _getContent(path))
    );
    return codeslide;
  }
);
