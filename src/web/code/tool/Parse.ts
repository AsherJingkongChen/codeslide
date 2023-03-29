// import {
//   Code,
//   Direction,
//   Slide
// } from '../entity';

// export type ResponseObject = {
//   slide: {
//     meta: SlideMeta;
//     data: SlideData[];
//   };
// };

// export type SlideMeta = {
// };

// export type SlideData =
//   Chained<Code, Direction, string>;

// // response object is resolved
// export const parseResponseObject = <_T = 'slides'>(
//   response: ResponseObject
// ): Slide | undefined => {
//   const mapped = new Map<string, Slide>();

//   const { data } = response['slides'];
//   for (const { path, text } of data) {
//     if (! mapped.has(path)) {
//       mapped.set(path, { path, text });
//     }
//   }
  
//   let first: Slide | undefined;
//   for (const source of data) {
//     const target = mapped.get(source.path);
//     if (! target) { continue; }
//     if (! first) { first = target; }

//     for (const _dir in Direction) {
//       const dir = _dir as Direction;
//       const dirpath = source[dir];
//       if (dirpath) {
//         target[dir] = mapped.get(dirpath);
//       }
//     }
//   }

//   return first;
// };

// // [Node App In]
// // type Json = any;
// // type RequestObject = {
// //   slides: Record<string, Chained<{}, Direction, string>>;
// // };
// //
// // [Node App Out]
// // type SlideData = Chained<Code, Direction, string>;
// // type SlideMeta = {
// //   firstPath: string;
// // };
// // type ResponseObject = {
// //   slides: {
// //     meta: SlideMeta;
// //     data: SlideData[];
// //   };
// // };
// //
// // [Web App In] is [Node App Out]
// //
// // [Web App Out]
// // type Slide = Chained<Code, Direction>; // circular

// // get SlideJSON
// // export const typecheck = (
// //   json: string
// // ): object | undefined => {
// //   let raw: any;
// //   try { raw = JSON.parse(json); }
// //   catch (err) { return; }

// //   if (typeof raw !== 'object') {
// //     return;
// //   }

// //   let slide: object;
// //   if (typeof (slide = raw.slide) !== 'object') {
// //     return;
// //   }

// //   for (const relation of Object.values(slide)) {
// //     if (typeof relation !== 'object') {
// //       return;
// //     }

// //     for (const [dir, path] of Object.entries(relation)) {
// //       if (! (dir in Direction)) {
// //         return;
// //       }
// //       if (typeof path !== 'string') {
// //         return;
// //       }
// //     }
// //   }

// //   return slide;
// // };
