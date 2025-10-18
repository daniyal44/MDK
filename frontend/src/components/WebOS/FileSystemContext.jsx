import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialFileSystem } from './mock';

const FileSystemContext = createContext();

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) throw new Error('useFileSystem must be used within FileSystemProvider');
  return context;
};

export const FileSystemProvider = ({ children }) => {
  const [fileSystem, setFileSystem] = useState(() => {
    const saved = localStorage.getItem('webos_filesystem');
    return saved ? JSON.parse(saved) : initialFileSystem;
  });

  useEffect(() => {
    localStorage.setItem('webos_filesystem', JSON.stringify(fileSystem));
  }, [fileSystem]);

  const findNode = useCallback((path) => {
    if (path.length === 0) return fileSystem;
    let current = fileSystem;
    for (const name of path) {
      if (!current.children) return null;
      current = current.children.find(item => item.name === name);
      if (!current) return null;
    }
    return current;
  }, [fileSystem]);

  const createFile = useCallback((path, name, content = '') => {
    setFileSystem(prev => {
      const newFS = JSON.parse(JSON.stringify(prev));
      let current = newFS;
      for (const folder of path) {
        current = current.children.find(item => item.name === folder);
      }
      if (current && current.children) {
        current.children.push({ name, type: 'file', content });
      }
      return newFS;
    });
  }, []);

  const createFolder = useCallback((path, name) => {
    setFileSystem(prev => {
      const newFS = JSON.parse(JSON.stringify(prev));
      let current = newFS;
      for (const folder of path) {
        current = current.children.find(item => item.name === folder);
      }
      if (current && current.children) {
        current.children.push({ name, type: 'folder', children: [] });
      }
      return newFS;
    });
  }, []);

  const deleteItem = useCallback((path, name) => {
    setFileSystem(prev => {
      const newFS = JSON.parse(JSON.stringify(prev));
      let current = newFS;
      for (const folder of path) {
        current = current.children.find(item => item.name === folder);
      }
      if (current && current.children) {
        current.children = current.children.filter(item => item.name !== name);
      }
      return newFS;
    });
  }, []);

  const renameItem = useCallback((path, oldName, newName) => {
    setFileSystem(prev => {
      const newFS = JSON.parse(JSON.stringify(prev));
      let current = newFS;
      for (const folder of path) {
        current = current.children.find(item => item.name === folder);
      }
      if (current && current.children) {
        const item = current.children.find(item => item.name === oldName);
        if (item) item.name = newName;
      }
      return newFS;
    });
  }, []);

  const updateFileContent = useCallback((path, name, content) => {
    setFileSystem(prev => {
      const newFS = JSON.parse(JSON.stringify(prev));
      let current = newFS;
      for (const folder of path) {
        current = current.children.find(item => item.name === folder);
      }
      if (current && current.children) {
        const file = current.children.find(item => item.name === name);
        if (file) file.content = content;
      }
      return newFS;
    });
  }, []);

  return (
    <FileSystemContext.Provider value={{
      fileSystem,
      findNode,
      createFile,
      createFolder,
      deleteItem,
      renameItem,
      updateFileContent
    }}>
      {children}
    </FileSystemContext.Provider>
  );
};