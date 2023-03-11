import Text from '../css/Text.module.less';
import Color from '../css/Color.module.less';
import { JSXElement } from 'solid-js';

export function OpenFile(): JSXElement {
  return (
    <div
      class={
        `${Text.MonoThin} ` +
        `${Color.DefaultDark} ` 
      }
    >
      <label>
        <input
          type='file'
          style={{
            'opacity': '0',
            'position': 'absolute',
          }}
        />

        Open a file
      </label>
    </div>
  );
}