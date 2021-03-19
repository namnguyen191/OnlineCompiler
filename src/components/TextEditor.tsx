import './TextEditor.css';
import MDEditor from '@uiw/react-md-editor';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

export type TextEditorProps = {
  cell: Cell;
};

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { cell } = props;
  const { updateCell } = useActions();

  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  });

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value ?? '')}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click To Edit!'} />
      </div>
    </div>
  );
};

export default memo(TextEditor);
