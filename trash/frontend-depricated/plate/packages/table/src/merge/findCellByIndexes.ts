import { getPluginOptions, PlateEditor, Value } from '@udecode/plate-common';

import { ELEMENT_TABLE } from '../createTablePlugin';
import { getCellIndices } from '../merge/getCellIndices';
import { TablePlugin, TTableCellElement, TTableElement } from '../types';
import { computeCellIndices } from './computeCellIndices';
import { getCellIndicesWithSpans } from './getCellIndicesWithSpans';

export const findCellByIndexes = <V extends Value>(
  editor: PlateEditor<V>,
  table: TTableElement,
  searchRowIndex: number,
  searchColIndex: number
) => {
  const { _cellIndices: cellIndices } = getPluginOptions<TablePlugin, V>(
    editor,
    ELEMENT_TABLE
  );

  const allCells = table.children.flatMap(
    (current) => current.children
  ) as TTableCellElement[];

  const foundCell = allCells.find((cell) => {
    const cellElement = cell as TTableCellElement;

    const indices =
      getCellIndices(cellIndices!, cellElement) ||
      computeCellIndices(editor, table, cellElement)!;

    const { col: _startColIndex, row: _startRowIndex } = indices;
    const { row: _endRowIndex, col: _endColIndex } = getCellIndicesWithSpans(
      indices,
      cellElement
    );

    if (
      searchColIndex >= _startColIndex &&
      searchColIndex <= _endColIndex &&
      searchRowIndex >= _startRowIndex &&
      searchRowIndex <= _endRowIndex
    ) {
      return true;
    }

    return false;
  });

  return foundCell;
};
