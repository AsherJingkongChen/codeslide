import {
  sameKeyset,
  sameModifier
} from '../tool/Key';

export namespace Code {
  export type Key = string;
  export type Graph = Map<Key, Code>;
  export type Dir = 'up' | 'right' | 'down' | 'left';
}

export type Code =
& { text: string; }
& { [dir in Code.Dir]?: Code.Key; };

export class Slide {
  private readonly _nextDirKeymap:
    Readonly<Record<string, Code.Dir | undefined>>
  = {
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    Space: 'right',
  };

  constructor() {
  }

  private _getDir(ev: KeyboardEvent | MouseEvent): Code.Dir | undefined {
    if (! sameModifier(ev, {})) {
      return;
    }

    if (ev.type === 'keydown') {
      ev = ev as KeyboardEvent;
      return this._nextDirKeymap[ev.key];
    } else if (ev.type === 'mousedown') {
      ev = ev as MouseEvent;
      return (ev.button === 0) ? 'right' : undefined;
    } else {
      return;
    }
  }
}
// // Slide.tsx
// const slide = {
//   navigate: (e: KeyboardEvent) => {
//     for (const key in slide.nextPathMap) {
//       if (samekey(e, { key }) && slide.next(slide.nextPathMap[key])) {
//         return;
//       }
//     }
//   },
//   next: (dir: string) => {
//     const nextPath = codeGraph[path][dir];
//     if (!nextPath) {
//       return false;
//     }
//     path = nextPath;
//     code.setText(codeGraph[path].text);
//     return true;
//   },
// };
// const codeGraph = {
//   'A': { text: 'const A = 42;', left: false, right: 'B' },
//   'B': { text: 'const B = [\'\\\\\'];', left: 'A', right: 'C' },
//   'C': { text: 'let C = \'Hi!\';', left: 'B', right: 'D' },
//   'D': { text: 'const D = () => C;', left: 'C', right: false },
// } as Record<string, any>;

// let path = 'A';
// code.setText(codeGraph[path].text);

// // [TODO] Add global event listeners here for Slide:View:nav() and Slide:View:enter()
// document.addEventListener('keydown', (e) => {
//   console.log(e.key);
//   if (e.key === 'ArrowUp') {
//   } else if (e.key === 'ArrowRight') {
//     const nextPath = codeGraph[path].right;
//     if (!nextPath) { console.log('REACHED RIGHTMOST'); return; }
//     path = nextPath;
//     code.setText(codeGraph[path].text);
//   } else if (e.key === 'ArrowDown') {
//   } else if (e.key === 'ArrowLeft') {
//     const nextPath = codeGraph[path].left;
//     if (!nextPath) { console.log('REACHED LEFTMOST'); return; }
//     path = nextPath;
//     code.setText(codeGraph[path].text);
//   }
// });
