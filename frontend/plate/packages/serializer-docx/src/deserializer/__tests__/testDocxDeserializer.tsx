/** @jsx jsx */

import { createAlignPlugin } from '@udecode/plate-alignment';
import { createBasicElementsPlugin } from '@udecode/plate-basic-elements';
import { createBasicMarksPlugin } from '@udecode/plate-basic-marks';
import {
  createPlateEditor,
  OverrideByKey,
  PlatePlugin,
} from '@udecode/plate-common';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading';
import { createHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createJuicePlugin } from '@udecode/plate-juice';
import { createLineHeightPlugin } from '@udecode/plate-line-height';
import { createLinkPlugin } from '@udecode/plate-link';
import { createImagePlugin } from '@udecode/plate-media';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createTablePlugin } from '@udecode/plate-table';
import { jsx } from '@udecode/plate-test-utils';
import { alignPlugin } from 'www/src/lib/plate/demo/plugins/alignPlugin';
import { lineHeightPlugin } from 'www/src/lib/plate/demo/plugins/lineHeightPlugin';

import { readTestFile } from '../../__tests__/readTestFile';
import { createDeserializeDocxPlugin } from '../createDeserializeDocxPlugin';

jsx;

export const createClipboardData = (html: string, rtf?: string): DataTransfer =>
  ({
    getData: (format: string) => (format === 'text/html' ? html : rtf),
  }) as any;

export const getDocxTestName = (name: string) => `when pasting docx ${name}`;

export const testDocxDeserializer = ({
  input = (
    <editor>
      <hp>
        <cursor />
      </hp>
    </editor>
  ),
  expected,
  plugins = [],
  filename,
  overrideByKey,
}: {
  input?: any;
  expected: any;
  plugins?: PlatePlugin[];
  filename: string;
  overrideByKey?: OverrideByKey;
}) => {
  it('should deserialize', () => {
    const actual = createPlateEditor({
      editor: input,
      plugins: [
        ...plugins,
        createImagePlugin(),
        createHorizontalRulePlugin(),
        createLinkPlugin(),
        createTablePlugin(),
        createBasicElementsPlugin(),
        createBasicMarksPlugin(),
        createTablePlugin(),
        createLineHeightPlugin(lineHeightPlugin as any),
        createAlignPlugin(alignPlugin as any),
        createIndentPlugin({
          inject: {
            props: {
              validTypes: [
                ELEMENT_PARAGRAPH,
                ELEMENT_H1,
                ELEMENT_H2,
                ELEMENT_H3,
              ],
            },
          },
        }),
        createDeserializeDocxPlugin(),
        createJuicePlugin(),
      ],
      overrideByKey,
    });

    actual.insertData(
      createClipboardData(
        readTestFile(`../deserializer/__tests__/${filename}.html`)
      )
    );

    expect(actual.children).toEqual(expected.children);
  });
};
