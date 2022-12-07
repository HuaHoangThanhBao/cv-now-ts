export interface DragPosition {
  page: string[][];
  pageI: number;
  column: string[];
  columnI: number;
  block: string;
  blockI: number;
}

export interface DragColumnPosition {
  page?: string[][];
  pageI: number;
  itemI?: number;
  columnI?: number;
  block?: string;
  blockI?: number;
}
