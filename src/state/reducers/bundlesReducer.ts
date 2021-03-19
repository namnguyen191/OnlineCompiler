import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

type BundleStates = {
  [key: string]: {
    code: string;
    err: string;
  };
};

const initialState: BundleStates = {};

const bundlesReducer = produce(
  (state: BundleStates = initialState, action: Action): BundleStates => {
    switch (action.type) {
      case ActionType.BUNDLE_CREATED:
        state[action.payload.cellId] = action.payload.bundle;
        return state;
      default:
        return state;
    }
  }
);

export default bundlesReducer;
