import './CodeEditor.css';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import React, { memo, useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { editor } from 'monaco-editor';

export type CodeEditorProps = {
  initialValue: string;
  onChange(value: string | undefined): void;
};

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const { initialValue, onChange } = props;
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange: OnChange = (value, event) => {
    onChange(value);
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current?.getValue();

    const formatted = prettier
      .format(unformatted ?? '', {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true
      })
      .replace(/\n$/, '');

    editorRef.current?.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        value={initialValue}
        theme="vs-dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2
        }}
      />
    </div>
  );
};

export default memo(CodeEditor);
