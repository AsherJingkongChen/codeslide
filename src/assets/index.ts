import { render } from 'eta';
import HighlightCSS from './highlight.css';
import SlidesCSS from './slides.css';
import SlidesHTMLTemplate from './slides.html';

export { HighlightCSS, SlidesCSS };

export const SlidesHTML = ({ slides, styles }: {
  slides: string[],
  styles: string[],
}): string => render(
  SlidesHTMLTemplate,
  {
    slides: `\
<div id="slides">
${
  slides
    .map((slide, index) => `\
<div class="slide" id="slide_${index}">
${slide}
</div>`
    )
    .join('\n')
}
</div>`,
    style: `\
<style>
${styles.join('\n')}
</style>`,
  }
);
