import React, { useState } from 'react';
import { Play, Save, Code, FileCode } from 'lucide-react';

const CodeEditor = () => {
  const [code, setCode] = useState(`// Welcome to Code Editor\n\nfunction greet(name) {\n  console.log(\`Hello, \${name}!\`);\n  return \`Welcome, \${name}\`;\n}\n\nconst result = greet("Web OS");\nconsole.log(result);`);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog(...args);
      };

      // eslint-disable-next-line no-eval
      eval(code);
      
      console.log = originalLog;
      setOutput(logs.join('\n') || 'Code executed successfully (no output)');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-full flex">
      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center gap-2 px-3 bg-gray-50">
          <button
            onClick={runCode}
            className="px-3 py-1.5 rounded bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 text-sm transition-colors"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-200 flex items-center gap-2 text-sm transition-colors">
            <Save className="w-4 h-4" />
            Save
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-gray-900 text-green-400"
            style={{ tabSize: 2 }}
            spellCheck="false"
          />
        </div>
      </div>

      {/* Output Panel */}
      <div className="w-80 border-l border-gray-200 flex flex-col bg-gray-50">
        <div className="h-12 border-b border-gray-200 flex items-center px-3 font-semibold text-sm">
          Output
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{output || 'No output yet. Click Run to execute code.'}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;