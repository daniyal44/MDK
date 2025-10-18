import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWebOS } from './WebOSContext';

const Window = ({ window, onClose, onMinimize, onMaximize, onFocus, isFocused, children }) => {
  const { updateWindowPosition, updateWindowSize } = useWebOS();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);
  const Icon = window.icon;

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    onFocus();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      width: window.size.width,
      height: window.size.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !window.maximized) {
        updateWindowPosition(window.id, {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
      if (isResizing && !window.maximized) {
        const newWidth = Math.max(400, dragStart.width + (e.clientX - dragStart.x));
        const newHeight = Math.max(300, dragStart.height + (e.clientY - dragStart.y));
        updateWindowSize(window.id, { width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, window, updateWindowPosition, updateWindowSize]);

  if (window.minimized) return null;

  const style = window.maximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', zIndex: window.zIndex }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-lg overflow-hidden backdrop-blur-xl bg-white/95 shadow-2xl border border-gray-200/50 flex flex-col transition-all duration-200 ${
        isFocused ? 'ring-2 ring-blue-400/50' : ''
      }`}
      style={style}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between px-3 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-700" />}
          <span className="text-sm font-medium text-gray-800">{window.title}</span>
        </div>
        <div className="flex items-center gap-1 window-controls">
          <button
            onClick={onMinimize}
            className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={onMaximize}
            className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            {window.maximized ? <Maximize2 className="w-4 h-4 text-gray-700" /> : <Square className="w-4 h-4 text-gray-700" />}
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-white">
        {children}
      </div>

      {/* Resize Handle */}
      {!window.maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeMouseDown}
        >
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400" />
        </div>
      )}
    </div>
  );
};

export default Window;