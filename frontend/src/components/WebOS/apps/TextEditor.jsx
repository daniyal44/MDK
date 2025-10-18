import React, { useState } from 'react';
import { Save, FileText, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const TextEditor = () => {
  const [content, setContent] = useState('Welcome to Text Editor\n\nStart typing your document here...');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Arial');

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 flex items-center gap-2 px-3 bg-gray-50">
        <button className="px-3 py-1.5 rounded hover:bg-gray-200 flex items-center gap-2 text-sm transition-colors">
          <Save className="w-4 h-4" />
          Save
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Bold className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Italic className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <AlignLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <AlignCenter className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <AlignRight className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="px-2 py-1 rounded border border-gray-300 text-sm"
        >
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
          <option>Georgia</option>
          <option>Verdana</option>
        </select>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="px-2 py-1 rounded border border-gray-300 text-sm w-16"
        >
          {[10, 12, 14, 16, 18, 20, 24, 28, 32].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-6 resize-none focus:outline-none"
        style={{ fontSize: `${fontSize}px`, fontFamily }}
        placeholder="Start typing..."
      />

      {/* Status Bar */}
      <div className="h-8 border-t border-gray-200 flex items-center justify-between px-4 bg-gray-50 text-xs text-gray-600">
        <span>Characters: {content.length}</span>
        <span>Words: {content.split(/\s+/).filter(w => w).length}</span>
        <span>Lines: {content.split('\n').length}</span>
      </div>
    </div>
  );
};

export default TextEditor;