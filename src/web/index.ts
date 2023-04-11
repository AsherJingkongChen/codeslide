import highlighter from 'highlight.js/lib/common';
import django from 'highlight.js/lib/languages/django';

const renderPage = (index: number) => {
  const title = $ts(`#slide > title#_${index}`)!.innerHTML;
  const code = $ts(`#slide > pre#_${index}`)!.innerHTML;
  document.title = title;
  getPage().innerHTML = code;

  console.log(title);
};

const navigate = (
  ev: KeyboardEvent | TouchEvent
): void => {
  const dir = getDirection(ev);
  if (dir === 0) { return; }

  if (ev.type === 'touchstart') {
    willResetLastTouchDirOnceMoved();

    let { timeStamp } = ev as TouchEvent;
    let isDoubleTap = true;
    isDoubleTap &&= (timeStamp - lastTouchTimeStamp < 500);
    isDoubleTap &&= (dir === lastTouchDir);

    if (isDoubleTap) {
      resetLastTouchDir();
    } else {
      lastTouchTimeStamp = timeStamp;
      lastTouchDir = dir;
      return;
    }
  }

  let nextPageIndex = pageIndex + dir;
  if (looping) {
    nextPageIndex = getCircularIndex(
      nextPageIndex, slideLength
    );
  } else if (
    nextPageIndex < 0 ||
    nextPageIndex >= slideLength
  ) {
    return;
  }

  renderPage(pageIndex = nextPageIndex);
};

const $ts = (
  selector: string
) => ( document.querySelector(`#template > ${selector}`) );

const getPage = () => (
  document.querySelector('pre#page') as HTMLPreElement
);

const getCircularIndex = (
  index: number,
  length: number
) => ( index % length + ((index < 0) ? length : 0) );

const getDirection = (
  ev: KeyboardEvent | TouchEvent
) => {
  let isModifierPressed = false;
  isModifierPressed ||= ev.altKey;
  isModifierPressed ||= ev.ctrlKey;
  isModifierPressed ||= ev.metaKey;
  isModifierPressed ||= ev.shiftKey;
  if (isModifierPressed) { return 0; }

  if (ev.type === 'keydown') {
    switch ((ev as KeyboardEvent).code) {
      // case 'ArrowUp': return -1;
      case 'ArrowRight': return +1;
      // case 'ArrowDown': return +1;
      case 'ArrowLeft': return -1;
      case 'Space': return +1;
      default: return 0;
    }
  } else if (ev.type === 'touchstart') {
    const { screenX } = (ev as TouchEvent).touches[0];
    if (screenX > 0.6 * window.innerWidth) {
      return +1;
    } else if (screenX < 0.4 * window.innerWidth) {
      return -1;
    }
  }
  return 0;
};

const resetLastTouchDir = () => {
  lastTouchDir = 0;
};

const willResetLastTouchDirOnceMoved = () => {
  document.removeEventListener(
    'touchmove', resetLastTouchDir
  );
  document.addEventListener(
    'touchmove', resetLastTouchDir,
    { once: true }
  );
};

/* **** start **** */

const looping: boolean
  = JSON.parse($ts('#show > #looping')!.innerHTML);
const slideLength: number
  = JSON.parse($ts('#slide > #length')!.innerHTML);

let lastTouchTimeStamp = 0;
let lastTouchDir = 0;
let pageIndex = 0;

highlighter.registerLanguage('django', django);

if (slideLength > 0) {
  document.addEventListener('DOMContentLoaded', () => {
    renderPage(0);
    highlighter.highlightAll();

    document.addEventListener('keydown', navigate);
    document.addEventListener('touchstart', navigate);
  }, { once: true });
}
