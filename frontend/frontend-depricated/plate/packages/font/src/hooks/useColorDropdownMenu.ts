import React from 'react';
import {
  focusEditor,
  getMark,
  removeMark,
  select,
  setMarks,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common';

export const useColorDropdownMenuState = ({
  nodeType,
  closeOnSelect = true,
  colors,
  customColors,
}: {
  nodeType: string;
  colors: { name: string; value: string; isBrightColor: boolean }[];
  customColors: { name: string; value: string; isBrightColor: boolean }[];
  closeOnSelect?: boolean;
}) => {
  const editor = useEditorRef();

  const selectionDefined = useEditorSelector(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (editor) => !!editor.selection,
    []
  );

  const color = useEditorSelector(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (editor) => getMark(editor, nodeType) as string,
    [nodeType]
  );

  const [selectedColor, setSelectedColor] = React.useState<string>();

  const [open, setOpen] = React.useState(false);
  const onToggle = React.useCallback(
    (value = !open) => {
      setOpen(value);
    },
    [open, setOpen]
  );

  const updateColor = React.useCallback(
    (value: string) => {
      if (editor.selection) {
        setSelectedColor(value);

        select(editor, editor.selection);
        focusEditor(editor);

        setMarks(editor, { [nodeType]: value });
      }
    },
    [editor, nodeType]
  );

  const updateColorAndClose = React.useCallback(
    (value: string) => {
      updateColor(value);
      closeOnSelect && onToggle();
    },
    [closeOnSelect, onToggle, updateColor]
  );

  const clearColor = React.useCallback(() => {
    if (editor.selection) {
      select(editor, editor.selection);
      focusEditor(editor);

      if (selectedColor) {
        removeMark(editor, { key: nodeType });
      }

      closeOnSelect && onToggle();
    }
  }, [editor, selectedColor, closeOnSelect, onToggle, nodeType]);

  React.useEffect(() => {
    if (selectionDefined) {
      setSelectedColor(color);
    }
  }, [color, selectionDefined]);

  return {
    open,
    onToggle,
    selectedColor,
    color,
    updateColorAndClose,
    updateColor,
    clearColor,
    colors,
    customColors,
  };
};

export const useColorDropdownMenu = ({
  open,
  onToggle,
}: ReturnType<typeof useColorDropdownMenuState>) => {
  return {
    menuProps: {
      open,
      onOpenChange: onToggle,
    },
    buttonProps: {
      pressed: open,
    },
  };
};
