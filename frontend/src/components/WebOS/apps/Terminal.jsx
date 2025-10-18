import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { mockTerminalCommands } from '../mock';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Web OS Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'input', text: `$ ${trimmed}` }]);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const [command, ...args] = trimmed.split(' ');
    
    if (command === 'echo') {
      setHistory(prev => [...prev, { type: 'output', text: args.join(' ') }]);
    } else if (mockTerminalCommands[command]) {
      const output = typeof mockTerminalCommands[command] === 'function' 
        ? mockTerminalCommands[command]()
        : mockTerminalCommands[command];
      setHistory(prev => [...prev, { type: 'output', text: output }]);
    } else {
      setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${command}` }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    }
  };

  return (
    <div 
      className="h-full bg-gray-900 text-green-400 font-mono text-sm p-4 overflow-y-auto flex flex-col"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, idx) => (
        <div key={idx} className={`mb-1 ${
          entry.type === 'input' ? 'text-blue-400' : 
          entry.type === 'error' ? 'text-red-400' : 'text-green-400'
        }`}>
          {entry.text}
        </div>
      ))}
      
      <div className="flex items-center">
        <span className="text-blue-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;