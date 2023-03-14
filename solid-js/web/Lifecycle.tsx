import { JSXElement } from "solid-js";
import { MountableElement, render } from 'solid-js/web';

export type Lifecycle = [Mounter, Cleaner];
export type Mounter = () => Cleaner;
export type Cleaner = () => void;

export const createLifecycle = (
  code: () => JSXElement,
  element: () => MountableElement
): Lifecycle => {

  let disposer = () => {};

  return [
    () => {
      disposer();
      return disposer = render(code, element());
    },
    () => {
      disposer();
      disposer = () => {};
    }
  ];
};