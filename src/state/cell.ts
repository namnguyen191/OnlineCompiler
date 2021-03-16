export type CellTypes = 'code' | 'text';
export type Cell = {
  id: string;
  type: CellTypes;
  content: string;
};
