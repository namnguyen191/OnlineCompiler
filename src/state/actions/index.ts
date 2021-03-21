import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

export type MoveCellDirection = 'up' | 'down';

export type MoveCellAction = {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: MoveCellDirection;
  };
};

export type DeleteCellAction = {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
};

export type InsertCellAfterAction = {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
};

export type UpdateCellAction = {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
};

export type BundleStartAction = {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
};

export type BundleCompleteAction = {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
};

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction;
