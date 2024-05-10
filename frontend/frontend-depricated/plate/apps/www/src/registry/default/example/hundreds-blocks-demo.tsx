import React, { useCallback, useMemo, useState } from 'react';
import { editableProps } from '@/plate/demo/editableProps';
import { basicNodesPlugins } from '@/plate/demo/plugins/basicNodesPlugins';
import { createHugeDocumentValue } from '@/plate/demo/values/createHugeDocumentValue';
import { Plate, TElement, Value } from '@udecode/plate-common';
import { createEditor } from 'slate';
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from 'slate-react';

import { Editor } from '@/registry/default/plate-ui/editor';

const initialValue = createHugeDocumentValue();

function WithPlate() {
  return (
    <Plate initialValue={initialValue} plugins={basicNodesPlugins}>
      <Editor {...editableProps} />
    </Plate>
  );
}

function Element({ attributes, children, element }: RenderElementProps) {
  switch ((element as TElement).type) {
    case 'h1': {
      return <h1 {...attributes}>{children}</h1>;
    }
    default: {
      return <p {...attributes}>{children}</p>;
    }
  }
}

function WithoutPlate() {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((p: any) => <Element {...p} />, []);
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const onChange = useCallback((newValue: Value) => setValue(newValue), []);

  return (
    <Slate editor={editor} initialValue={value} onChange={onChange as any}>
      <Editable renderElement={renderElement} {...(editableProps as any)} />
    </Slate>
  );
}

export default function HundredsBlocksDemo() {
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <WithPlate />
      </div>
      <div className="w-1/2 p-4">
        <WithoutPlate />
      </div>
    </div>
  );
}
