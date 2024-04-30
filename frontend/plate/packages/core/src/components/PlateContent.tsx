import React from 'react';
import { Editable } from 'slate-react';

import { useEditableProps } from '../hooks/index';
import { useEditorRef } from '../stores';
import { TEditableProps } from '../types/slate-react/TEditableProps';
import { EditorMethodsEffect } from './EditorMethodsEffect';
import { EditorRefEffect } from './EditorRefEffect';
import { EditorStateEffect } from './EditorStateEffect';
import { PlateControllerEffect } from './PlateControllerEffect';
import { PlateSlate } from './PlateSlate';

export type PlateContentProps = TEditableProps & {
  /**
   * Renders the editable content.
   */
  renderEditable?: (editable: React.ReactElement) => React.ReactNode;
};

/**
 * Editable with plugins.
 *
 * - decorate prop
 * - DOM handler props
 * - readOnly prop
 * - renderAfterEditable
 * - renderBeforeEditable
 * - renderElement prop
 * - renderLeaf prop
 * - useHooks
 */
const PlateContent = React.forwardRef(
  ({ renderEditable, ...props }: PlateContentProps, ref) => {
    const { id } = props;

    const editor = useEditorRef(id);

    if (!editor) {
      throw new Error(
        'Editor not found. Please ensure that PlateContent is rendered below Plate.'
      );
    }

    const editableProps = useEditableProps(props);

    const editable = <Editable ref={ref} {...(editableProps as any)} />;

    let afterEditable: React.ReactNode = null;
    let beforeEditable: React.ReactNode = null;

    editor.plugins.forEach((plugin) => {
      const {
        renderBeforeEditable: RenderBeforeEditable,
        renderAfterEditable: RenderAfterEditable,
      } = plugin;

      if (RenderAfterEditable) {
        afterEditable = (
          <>
            {afterEditable}
            <RenderAfterEditable {...editableProps} />
          </>
        );
      }

      if (RenderBeforeEditable) {
        beforeEditable = (
          <>
            {beforeEditable}
            <RenderBeforeEditable {...editableProps} />
          </>
        );
      }
    });

    let aboveEditable: React.ReactNode = (
      <>
        {beforeEditable}

        {renderEditable ? renderEditable(editable) : editable}

        <EditorMethodsEffect id={id} />
        <EditorStateEffect id={id} />
        <EditorRefEffect id={id} />
        <PlateControllerEffect id={id} />

        {afterEditable}
      </>
    );

    editor.plugins.forEach((plugin) => {
      const { renderAboveEditable: RenderAboveEditable } = plugin;

      if (RenderAboveEditable)
        aboveEditable = (
          <RenderAboveEditable>{aboveEditable}</RenderAboveEditable>
        );
    });

    return <PlateSlate id={id}>{aboveEditable}</PlateSlate>;
  }
);
PlateContent.displayName = 'PlateContent';

export { PlateContent };
