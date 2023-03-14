import { createRenderer } from 'fela';
import { render } from 'fela-dom';
import FelaPresetWeb from 'fela-preset-web';

export const styleRenderer = {
  web: createRenderer({
    plugins: [
      ...FelaPresetWeb
    ]
  })
};

render(styleRenderer.web);
