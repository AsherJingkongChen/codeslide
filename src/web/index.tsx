import {
  render
} from 'solid-js/web';
import highlighter from 'highlight.js/lib/common';

const fromTemplateSchema = (
  propName: string
) => JSON.parse(
  document.getElementById(
    `ts_${propName}`
  )!.innerText
);

const looping: boolean = fromTemplateSchema('looping');
const slide: Slide = fromTemplateSchema('slide');

let lastTouchTimeStamp = 0;
let lastTouchDir = 0;
let pageNumber = 0;

const navigate = (
  ev: KeyboardEvent | TouchEvent
): void => {
  const dir = getDir(ev);

  if (ev.type === 'touchstart') {
    let { timeStamp } = ev as TouchEvent;
    let isDoubleTap = true;
    isDoubleTap &&= (timeStamp - lastTouchTimeStamp < 500);
    isDoubleTap &&= (dir === lastTouchDir);
    lastTouchTimeStamp = timeStamp;
    lastTouchDir = dir;
    if (! isDoubleTap) { return; }
  }

  const pageCount = slide.length;
  let nextPageNumber = pageNumber + dir;
  if (looping) {
    nextPageNumber = circularIndex(
      nextPageNumber,
      pageCount
    );
  }

  const nextPage = slide[nextPageNumber];
  if (nextPage) {
    pageNumber = nextPageNumber;
    console.log(nextPage);
    document.querySelector('code#main')!.innerHTML
      = highlighter.highlightAuto(nextPage.text).value;
    document.title = nextPage.title;
  }
};
document.addEventListener('keydown', navigate);
document.addEventListener('touchstart', navigate);

highlighter.highlightAll();
render(
  () => (
    <pre>
      <code
        id={ 'main' }
        class={ 'language-rust' }/>
    </pre>
  ),
  document.body
);
if (slide.length !== 0) {
  document.querySelector('code#main')!.innerHTML
    = highlighter.highlightAuto(slide[0].text).value;
  document.title = slide[0].title;
}

const circularIndex = (
  index: number,
  length: number
) => ( index % length + ((index < 0) ? length : 0) );

const getDir = (
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
      case 'ArrowUp': return -1;
      case 'ArrowRight': return +1;
      case 'ArrowDown': return +1;
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

type Slide = Array<{
  text: string;
  title: string;
}>;
