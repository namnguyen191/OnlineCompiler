import { Action } from '../actions';
import { RootState } from '../reducers';

type MiddlewareAPI<S, A> = {
  getState(): S;
  dispatch(action: A): void;
};

type _Middleware<S, A> = {
  (api: MiddlewareAPI<S, A>): (
    next: (action: A) => void
  ) => (action: A) => void;
};

export type Middleware = _Middleware<RootState, Action>;
