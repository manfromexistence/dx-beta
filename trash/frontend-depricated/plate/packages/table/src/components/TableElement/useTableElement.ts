import React from 'react';
import {
  collapseSelection,
  getPluginOptions,
  useEditorRef,
  useElement,
} from '@udecode/plate-common';

import { ELEMENT_TABLE } from '../../createTablePlugin';
import { computeAllCellIndices } from '../../merge/computeCellIndices';
import { useTableStore } from '../../stores/tableStore';
import { TablePlugin, TTableElement } from '../../types';
import { useSelectedCells } from './useSelectedCells';
import { useTableColSizes } from './useTableColSizes';

export interface TableElementState {
  colSizes: number[];
  isSelectingCell: boolean;
  minColumnWidth: number;
  marginLeft: number;
}

export const useTableElementState = ({
  transformColSizes,
}: {
  /**
   * Transform node column sizes
   */
  transformColSizes?: (colSizes: number[]) => number[];
} = {}): TableElementState => {
  const editor = useEditorRef();

  const { minColumnWidth, disableMarginLeft, enableMerging } =
    getPluginOptions<TablePlugin>(editor, ELEMENT_TABLE);

  const element = useElement<TTableElement>();
  const selectedCells = useTableStore().get.selectedCells();
  const marginLeftOverride = useTableStore().get.marginLeftOverride();

  const marginLeft = disableMarginLeft
    ? 0
    : marginLeftOverride ?? element.marginLeft ?? 0;

  let colSizes = useTableColSizes(element);

  React.useEffect(() => {
    if (enableMerging) {
      computeAllCellIndices(editor, element);
    }
  }, [editor, element, enableMerging]);

  if (transformColSizes) {
    colSizes = transformColSizes(colSizes);
  }

  // add a last col to fill the remaining space
  if (!colSizes.includes(0)) {
    colSizes.push('100%' as any);
  }

  return {
    colSizes,
    isSelectingCell: !!selectedCells,
    minColumnWidth: minColumnWidth!,
    marginLeft,
  };
};

export const useTableElement = () => {
  const editor = useEditorRef();
  const selectedCells = useTableStore().get.selectedCells();

  useSelectedCells();

  return {
    props: {
      onMouseDown: () => {
        // until cell dnd is supported, we collapse the selection on mouse down
        if (selectedCells) {
          collapseSelection(editor);
        }
      },
    },
    colGroupProps: {
      contentEditable: false,
      style: { width: '100%' },
    },
  };
};
