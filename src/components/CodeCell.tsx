import React, { memo } from 'react';
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
  const { updateCell } = useActions();
  const bundle = useTypeSelector((state) => {
    return state.bundles[cell.id];
  });

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
        <Preview code={bundle?.code ?? ''} err={bundle?.err ?? ''} />
      </div>
    </Resizable>
  );
};

export default memo(CodeCell);
