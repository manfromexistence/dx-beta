/** @jsx jsx */

import { mockPlugin } from '@udecode/plate-common';
import * as isHotkey from '@udecode/plate-core';
import { jsx } from '@udecode/plate-test-utils';

import { onKeyDownExitBreak } from '../../onKeyDownExitBreak';

jsx;

const input = (
  <editor>
    <hp>
      te
      <cursor />
      st
    </hp>
  </editor>
) as any;

const event = new KeyboardEvent('keydown') as any;

const output = (
  <editor>
    <hp>
      <cursor />
      test
    </hp>
  </editor>
) as any;

it('should be', () => {
  jest.spyOn(isHotkey, 'isHotkey').mockReturnValue(true);
  onKeyDownExitBreak(
    input,
    mockPlugin({
      options: { hotkey: 'enter', level: 0, query: { start: true, end: true } },
    })
  )(event);
  expect(input.children).toEqual(output.children);
  expect(input.selection?.anchor).toEqual({ offset: 2, path: [0, 0] });
});
