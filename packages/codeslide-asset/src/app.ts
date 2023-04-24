import highlighter from './highlighter';
import { Layout } from '../../codeslide-config';

const navigate = (
  ev: KeyboardEvent | TouchEvent
): void => {
  const dir = getDirection(ev);
  if (dir === 0) { return; }

  if (ev.type === 'touchstart') {
    willResetLastTouchDirAfterMove();

    let { timeStamp } = ev as TouchEvent;
    let isDoubleTap = true;
    isDoubleTap &&= (timeStamp - lastTouchTimeStamp < 500);
    isDoubleTap &&= (dir === lastTouchDir);

    if (isDoubleTap) {
      lastTouchDir = 0;
    } else {
      lastTouchTimeStamp = timeStamp;
      lastTouchDir = dir;
      return;
    }
  }

  let nextSlideIndex = slideIndex + dir;
  if (looping) {
    nextSlideIndex = getCircularIndex(
      nextSlideIndex, slidesLength
    );
  } else if (
    nextSlideIndex < 0 ||
    nextSlideIndex >= slidesLength
  ) {
    return;
  }

  pinSlide(nextSlideIndex);
};

const $ = (selector: string) => (
  document.querySelector<HTMLElement>(selector)
);

const pinSlide = (index: number) => {
  getSlide(slideIndex).hidden = true;
  getSlide(index).hidden = false;
  slideIndex = index;
};

const getSlide = (index: number) => (
  $(`#slides > .slide#_${index}`)!
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

const willResetLastTouchDirAfterMove = () => {
  document.addEventListener(
    'touchmove',
    () => lastTouchDir = 0,
    { once: true }
  );
};

/* **** start **** */

const layout = <Layout>
  $('#slides > #layout')!.innerHTML;
const slidesLength: number
  = JSON.parse($('#slides > #length')!.innerHTML);
const looping: boolean
  = JSON.parse($('#slides > #looping')!.innerHTML);

let lastTouchTimeStamp = 0;
let lastTouchDir = 0;
let slideIndex = 0;

if (slidesLength > 0) {
  highlighter.highlightAll();

  document.addEventListener('DOMContentLoaded', () => {
    if (layout === 'slide') {
      pinSlide(0);
      if (slidesLength === 1) {
        return;
      }
      document.addEventListener('keydown', navigate);
      document.addEventListener('touchstart', navigate);
    } else {
      for (let index = 0; index < slidesLength; index++) {
        getSlide(index).hidden = false;
      }
    }
  }, { once: true });
}
