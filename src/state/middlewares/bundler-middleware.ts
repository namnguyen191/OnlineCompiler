import bundle from '../../bundler';
import { ActionType } from '../action-types';
import { Middleware } from './middleware';

let timer: any;

export const bundlerMiddleware: Middleware = ({ getState, dispatch }) => {
  return (next) => {
    return (action) => {
      next(action);

      // Only run bundler if the action deal with updating a code cell
      if (action.type !== ActionType.UPDATE_CELL) {
        return;
      }

      const {
        cells: { data: cellData }
      } = getState();
      const cell = cellData[action.payload.id];
      if (cell.type === 'text') {
        return;
      }

      clearTimeout(timer);
      timer = setTimeout(async () => {
        console.log('Start bundling ...');
        const result = await bundle(action.payload.content);
        dispatch({
          type: ActionType.BUNDLE_CREATED,
          payload: {
            cellId: cell.id,
            bundle: result
          }
        });
        console.log('Bundle created');
      }, 1500);
    };
  };
};
