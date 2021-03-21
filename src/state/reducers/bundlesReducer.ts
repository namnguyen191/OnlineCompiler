import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

type BundlesStates = {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
};

const initialState: BundlesStates = {};

const bundlesReducer = produce(
  (state: BundlesStates = initialState, action: Action): BundlesStates => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: ''
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err
        };
        return state;
      default:
        return state;
    }
  }
);

export default bundlesReducer;
