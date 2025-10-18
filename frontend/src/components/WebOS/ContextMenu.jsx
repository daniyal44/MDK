import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ x, y, items, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[180px] z-[10000]"
      style={{ left: x, top: y }}
    >
      {items.map((item, idx) => (
        item.divider ? (
          <div key={idx} className="h-px bg-gray-200 my-1" />
        ) : (
          <button
            key={idx}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            disabled={item.disabled}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            <span>{item.label}</span>
            {item.shortcut && (
              <span className="ml-auto text-xs text-gray-500">{item.shortcut}</span>
            )}
          </button>
        )
      ))}
    </div>
  );
};

export default ContextMenu;