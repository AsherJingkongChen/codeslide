import {
  Chained,
  Code,
  Direction,
  WeaklyChained
} from '../entity';

export type SlideTemplate = WeaklyChained<Code, Direction, string>;
export type Slide = Chained<Code, Direction>;

// [Node App In]
// type SlideJSON = Record<string, Record<Direction, string>>;

// [Node App Out]
// type SlideTemplate = WeaklyChained<Code, Direction, string>;

// [Web App In] is [Node App Out]

// [Web App Out]
// type Slide = Chained<Code, Direction>;

// get SlideJSON
// export const typecheck = (
//   json: string
// ): object | undefined => {
//   let raw: any;
//   try { raw = JSON.parse(json); }
//   catch (err) { return; }

//   if (typeof raw !== 'object') {
//     return;
//   }

//   let slide: object;
//   if (typeof (slide = raw.slide) !== 'object') {
//     return;
//   }

//   for (const relation of Object.values(slide)) {
//     if (typeof relation !== 'object') {
//       return;
//     }

//     for (const [dir, path] of Object.entries(relation)) {
//       if (! (dir in Direction)) {
//         return;
//       }
//       if (typeof path !== 'string') {
//         return;
//       }
//     }
//   }

//   return slide;
// };
