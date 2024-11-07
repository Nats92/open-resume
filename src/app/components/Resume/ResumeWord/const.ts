import { BorderStyle, ITableBordersOptions, ITableCellBorders } from 'docx';

export const RESET_CELL_BORDERS: ITableCellBorders = {
  bottom: { style: BorderStyle.NONE, size: 0 },
  top: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  start: { style: BorderStyle.NONE, size: 0 },
  end: { style: BorderStyle.NONE, size: 0 },
}

export const RESET_TABLE_BORDERS: ITableBordersOptions = {
  bottom: { style: BorderStyle.NONE, size: 0 },
  top: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  insideHorizontal: { style: BorderStyle.NONE, size: 0 },
  insideVertical: { style: BorderStyle.NONE, size: 0 },
}

export const BASE_MARGINS = {
  bottom: 80,
  top: 80,
}

export const BASE_SPACING = { before: 120, after: 120 };

