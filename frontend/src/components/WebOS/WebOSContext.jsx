import React, { createContext, useContext, useState, useCallback } from 'react';

const WebOSContext = createContext();

export const useWebOS = () => {
  const context = useContext(WebOSContext);
  if (!context) {
    throw new Error('useWebOS must be used within WebOSProvider');
  }
  return context;
};

export const WebOSProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = useCallback((appId, title, icon) => {
    const existingWindow = windows.find(w => w.appId === appId && !w.minimized);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    const newWindow = {
      id: Date.now(),
      appId,
      title,
      icon,
      minimized: false,
      maximized: false,
      position: { x: 100 + windows.length * 30, y: 50 + windows.length * 30 },
      size: { width: 900, height: 600 },
      zIndex: nextZIndex,
    };

    setWindows(prev => [...prev, newWindow]);
    setFocusedWindow(newWindow.id);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (focusedWindow === windowId) {
      setFocusedWindow(null);
    }
  }, [focusedWindow]);

  const minimizeWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, minimized: true } : w
    ));
    if (focusedWindow === windowId) {
      setFocusedWindow(null);
    }
  }, [focusedWindow]);

  const maximizeWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, maximized: !w.maximized } : w
    ));
  }, []);

  const focusWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return { ...w, minimized: false, zIndex: nextZIndex };
      }
      return w;
    }));
    setFocusedWindow(windowId);
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((windowId, position) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((windowId, size) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ));
  }, []);

  return (
    <WebOSContext.Provider value={{
      windows,
      focusedWindow,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    }}>
      {children}
    </WebOSContext.Provider>
  );
};