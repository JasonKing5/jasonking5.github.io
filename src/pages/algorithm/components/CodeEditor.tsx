import React, { useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
  currentStep?: {
    lineNumber?: number;  
  };
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onChange,
  currentStep,
}) => {
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!editorRef.current) return;

    // 清除旧的装饰
    if (decorationsRef.current.length > 0) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }

    // 如果没有currentStep或lineNumber，直接返回
    if (!currentStep?.lineNumber) return;

    try {
      const lineNumber = currentStep.lineNumber;
      const model = editorRef.current.getModel();
      
      // 检查行号是否有效
      if (!model || lineNumber < 1 || lineNumber > model.getLineCount()) return;

      const lineContent = model.getLineContent(lineNumber);

      // 检查是否是注释行
      const isCommentLine = lineContent.trim().startsWith('//') || 
                           lineContent.trim().startsWith('/*') ||
                           lineContent.trim().startsWith('*');

      // 如果不是注释行，添加高亮
      if (!isCommentLine) {
        const newDecorations = [{
          range: {
            startLineNumber: lineNumber,
            startColumn: 1,
            endLineNumber: lineNumber,
            endColumn: 1,
          },
          options: {
            isWholeLine: true,
            className: 'highlight-line',
            linesDecorationsClassName: 'highlight-line-gutter'
          },
        }];

        decorationsRef.current = editorRef.current.deltaDecorations([], newDecorations);
        
        // 安全地滚动到目标行
        if (lineNumber > 0) {
          editorRef.current.revealLineInCenter(lineNumber);
        }
      }
    } catch (error) {
      console.error('Error updating editor decorations:', error);
    }
  }, [currentStep]);

  return (
    <div className="code-editor-wrapper">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          lineNumbers: 'on',
          readOnly: true,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          renderLineHighlight: 'all',
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
          },
          domReadOnly: true,  // 防止DOM级别的编辑
          cursorStyle: 'line',  // 使用行光标样式
          cursorBlinking: 'solid',  // 设置光标不闪烁
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
