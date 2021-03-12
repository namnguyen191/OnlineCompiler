import './Preview.css';
import React, { memo, useEffect } from 'react';
import { useRef } from 'react';

export type PreviewProps = {
  code: string;
  err: string;
};

const html = `
    <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (error) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
          console.log(error);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (error) {
            handleError(error);
          }
        }, false)
      </script>
    </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = (props) => {
  const { code, err } = props;
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    // We need to give the iframe sometime to setup
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default memo(Preview);
