import React, { memo, useEffect, useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

export type CodeCellProps = {};

const CodeCell: React.FC<CodeCellProps> = (props) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value ?? '')}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default memo(CodeCell);
