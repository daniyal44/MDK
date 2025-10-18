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
      className={`absolute rounded-xl overflow-hidden flex flex-col transition-all duration-200 ${
        isFocused ? 'shadow-[0_20px_70px_rgba(0,0,0,0.3)]' : 'shadow-[0_10px_40px_rgba(0,0,0,0.2)]'
      }`}
      style={{
        ...style,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-11 flex items-center justify-between px-4 cursor-move select-none relative"
        style={{
          background: 'rgba(249, 250, 251, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2.5">
          {Icon && <Icon className="w-4 h-4 text-gray-700" strokeWidth={2} />}
          <span className="text-[13px] font-medium text-gray-800">{window.title}</span>
        </div>
        <div className="flex items-center gap-2 window-controls">
          <button
            onClick={onMinimize}
            className="w-11 h-9 rounded-md hover:bg-black/5 active:bg-black/10 flex items-center justify-center transition-colors"
          >
            <Minus className="w-[15px] h-[15px] text-gray-700" strokeWidth={2} />
          </button>
          <button
            onClick={onMaximize}
            className="w-11 h-9 rounded-md hover:bg-black/5 active:bg-black/10 flex items-center justify-center transition-colors"
          >
            {window.maximized ? <Maximize2 className="w-[15px] h-[15px] text-gray-700" strokeWidth={2} /> : <Square className="w-[15px] h-[15px] text-gray-700" strokeWidth={2} />}
          </button>
          <button
            onClick={onClose}
            className="w-11 h-9 rounded-md hover:bg-red-500 hover:text-white active:bg-red-600 flex items-center justify-center transition-colors"
          >
            <X className="w-[15px] h-[15px]" strokeWidth={2} />
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