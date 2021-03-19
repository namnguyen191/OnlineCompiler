import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { bundlerMiddleware } from './middlewares/bundler-middleware';
import reducers from './reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(bundlerMiddleware, thunk)
);
