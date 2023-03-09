import { JSXElement } from "solid-js";
import { MountableElement, render } from 'solid-js/web';

export type Lifecycle = [Mounter, Cleaner];
export type Mounter = () => Cleaner;
export type Cleaner = () => void;

export function createLifecycle(
  code: () => JSXElement,
  element: MountableElement
): Lifecycle {
  let _dispose = () => {};

  return [
    () => {
      _dispose();
      return _dispose = render(code, element);
    },
    () => {
      _dispose();
      _dispose = () => {};
    }
  ];
}