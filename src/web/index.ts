import highlighter from './highlighter';

const showPage = (index: number) => {
  const oldPage = <HTMLElement>
    document.querySelector('.page#current');
  const newPage = <HTMLElement>
    $ts(`#slide > .page#_${index}`)!.cloneNode(true);
  newPage.id = 'current';

  document.title =
    newPage.querySelector('.title > code')!.innerHTML;
  oldPage.replaceWith(newPage);
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

  showPage(pageIndex = nextPageIndex);
};

const $ts = (selector: string) => (
  document.querySelector<HTMLElement>(`#template > ${selector}`)
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
      case 'ArrowRight': return +1;
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

if (slideLength > 0) {
  highlighter.highlightAll();
  
  document.addEventListener('DOMContentLoaded', () => {
    showPage(0);
    document.addEventListener('keydown', navigate);
    document.addEventListener('touchstart', navigate);
  });
}
