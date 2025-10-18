import React, { useState, useEffect } from 'react';
import { Folder, File, ChevronRight, ChevronDown, FolderOpen, Plus, Trash2, Edit2, Download } from 'lucide-react';
import { initialFileSystem } from '../mock';

const FileManager = () => {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [currentPath, setCurrentPath] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root']));
  const [selectedItem, setSelectedItem] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(null);

  const toggleFolder = (path) => {
    const pathStr = path.join('/');
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pathStr)) {
        newSet.delete(pathStr);
      } else {
        newSet.add(pathStr);
      }
      return newSet;
    });
  };

  const renderTreeNode = (node, path = []) => {
    const currentPath = [...path, node.name];
    const pathStr = currentPath.join('/');
    const isExpanded = expandedFolders.has(pathStr);
    const isSelected = selectedItem === pathStr;

    if (node.type === 'folder') {
      return (
        <div key={pathStr} className="select-none">
          <div
            className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded cursor-pointer transition-colors ${
              isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
            }`}
            onClick={() => {
              toggleFolder(currentPath);
              setSelectedItem(pathStr);
            }}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />}
            {isExpanded ? <FolderOpen className="w-4 h-4 text-yellow-500" /> : <Folder className="w-4 h-4 text-yellow-500" />}
            <span className="text-sm text-gray-800">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div className="ml-5 border-l border-gray-200">
              {node.children.map(child => renderTreeNode(child, currentPath))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={pathStr}
        className={`flex items-center gap-2 px-2 py-1.5 ml-5 hover:bg-gray-100 rounded cursor-pointer transition-colors ${
          isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
        }`}
        onClick={() => setSelectedItem(pathStr)}
      >
        <File className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-800">{node.name}</span>
      </div>
    );
  };

  const getCurrentFolder = () => {
    let current = fileSystem;
    for (const folder of currentPath) {
      current = current.children.find(item => item.name === folder);
    }
    return current;
  };

  const currentFolder = getCurrentFolder();
  const items = currentFolder?.children || [];

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 p-3 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">File System</h3>
        {renderTreeNode(fileSystem, [])}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center gap-2 px-4 bg-white">
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2 text-sm transition-colors">
            <Plus className="w-4 h-4" />
            New
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2 text-sm transition-colors">
            <FolderOpen className="w-4 h-4" />
            Open
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2 text-sm transition-colors" disabled={!selectedItem}>
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2 text-sm transition-colors" disabled={!selectedItem}>
            <Edit2 className="w-4 h-4" />
            Rename
          </button>
        </div>

        {/* Address Bar */}
        <div className="h-10 border-b border-gray-200 flex items-center px-4 bg-gray-50">
          <span className="text-sm text-gray-600">/{currentPath.join('/')}</span>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 group"
                onDoubleClick={() => {
                  if (item.type === 'folder') {
                    setCurrentPath([...currentPath, item.name]);
                  }
                }}
              >
                {item.type === 'folder' ? (
                  <Folder className="w-12 h-12 text-yellow-500 group-hover:scale-110 transition-transform" />
                ) : (
                  <File className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />
                )}
                <span className="text-sm text-gray-800 mt-2 text-center">{item.name}</span>
                {item.type === 'file' && (
                  <span className="text-xs text-gray-500 mt-1">{(item.content?.length || 0)} bytes</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;