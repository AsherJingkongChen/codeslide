import {
  CodePageState,
  CodePageView,
  SlideNavigatorState,
  SlideNavigatorView,
  sameModifier,
  SlideNavigatorDirmap,
} from './shared';
import {
  render
} from 'solid-js/web';
import {
  createRenderer,
} from 'fela';
import {
  rehydrate
} from 'fela-dom';

const fromTemplateSchema = (
  propName: string
) => JSON.parse(
  document.getElementById(
    `ts_${propName}`
  )!.innerText
);

const nav = new SlideNavigatorState({
  looping: fromTemplateSchema('looping'),
  slide: fromTemplateSchema('slide'),
});
const code = new CodePageState();
let lastTouchTime = 0;
let lastTouchDir = 0;

nav.onNavigation = (ev) => {
  if (! sameModifier(ev, {})) {
    return;
  }
  if (ev.type === 'keydown') {
    return SlideNavigatorDirmap[
      (ev as KeyboardEvent).code
    ];
  } else if (ev.type === 'touchstart') {
    let { touches, timeStamp } = ev as TouchEvent;
    let { screenX } = touches[0];
    let dir = 0;
    if (screenX > 0.7 * window.innerWidth) {
      dir = +1;
    } else if (screenX < 0.3 * window.innerWidth) {
      dir = -1;
    }
    if (timeStamp - lastTouchTime < 500 &&
        dir === lastTouchDir) {
      return dir;
    }
    lastTouchTime = timeStamp;
    lastTouchDir = dir;
  }
  return;
};

nav.afterNavigation = (slide) => {
  console.log(slide);
  code.setText(slide.text);
  document.title = slide.title;
};

const styleRenderer = createRenderer();
styleRenderer.renderStatic(`
  body {
    margin: 0;
    overflow: hidden;
  }
  pre {
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100vh;
    white-space: pre-wrap;
  }
  code {
    display: inline-box;
    height: 100%;
    font-family: {= font_family =};
    font-size: {= font_size =};
    font-weight: {= font_weight =};
    overflow: scroll;
    scrollbar-width: none;
  }
  code::-webkit-scrollbar {
    display: none;
  }
`);
rehydrate(styleRenderer);

render(
  () => (
    <SlideNavigatorView state={ nav }>
      <CodePageView state={ code }/>
    </SlideNavigatorView>
  ),
  document.body
);

// Set the Text
if (nav.getPage()) {
  nav.afterNavigation(nav.getPage()!);
}
