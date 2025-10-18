import React, { createContext, useContext, useState, useCallback } from 'react';

const WorkspaceContext = createContext();

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return context;
};

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: 'Workspace 1', windows: [] },
    { id: 2, name: 'Workspace 2', windows: [] },
    { id: 3, name: 'Workspace 3', windows: [] },
    { id: 4, name: 'Workspace 4', windows: [] },
  ]);
  const [currentWorkspace, setCurrentWorkspace] = useState(1);

  const switchWorkspace = useCallback((id) => {
    setCurrentWorkspace(id);
  }, []);

  const addWindowToWorkspace = useCallback((workspaceId, windowId) => {
    setWorkspaces(prev => prev.map(ws => 
      ws.id === workspaceId 
        ? { ...ws, windows: [...ws.windows, windowId] }
        : ws
    ));
  }, []);

  const removeWindowFromWorkspace = useCallback((workspaceId, windowId) => {
    setWorkspaces(prev => prev.map(ws => 
      ws.id === workspaceId
        ? { ...ws, windows: ws.windows.filter(id => id !== windowId) }
        : ws
    ));
  }, []);

  return (
    <WorkspaceContext.Provider value={{
      workspaces,
      currentWorkspace,
      switchWorkspace,
      addWindowToWorkspace,
      removeWindowFromWorkspace
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};