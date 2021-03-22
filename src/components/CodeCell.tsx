import './CodeCell.css';
import React, { memo, useEffect } from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypeSelector } from '../hooks/use-typed-selector';
import { Cell } from '../state';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

export type CodeCellProps = {
  cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = (props) => {
  const { cell } = props;
  const { updateCell, createBundle } = useActions();
  const bundle = useTypeSelector((state) => {
    return state.bundles[cell.id];
  });
  // const cumulativeCode = useTypeSelector((state) => {
  //   const { data, order } = state.cells;
  //   const orderedCells = order.map((id) => data[id]);

  //   const cumulativeCode = [];
  //   for (let c of orderedCells) {
  //     if (c.type === 'code') {
  //       cumulativeCode.push(c.content);
  //     }
  //     if (c.id === cell.id) {
  //       break;
  //     }
  //   }

  //   return cumulativeCode;
  // });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value ?? '')}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default memo(CodeCell);
