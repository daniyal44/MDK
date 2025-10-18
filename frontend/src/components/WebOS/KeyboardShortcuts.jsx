import React, { useEffect } from 'react';
import { useWebOS } from './WebOSContext';
import { useNotifications } from './NotificationContext';

const KeyboardShortcuts = ({ apps }) => {
  const { windows, closeWindow, minimizeWindow, focusWindow, openWindow, focusedWindow } = useWebOS();
  const { showNotification } = useNotifications();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + Tab - Switch windows
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        const visibleWindows = windows.filter(w => !w.minimized);
        if (visibleWindows.length > 1) {
          const currentIndex = visibleWindows.findIndex(w => w.id === focusedWindow);
          const nextIndex = (currentIndex + 1) % visibleWindows.length;
          focusWindow(visibleWindows[nextIndex].id);
        }
      }

      // Ctrl + W - Close focused window
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        if (focusedWindow) {
          closeWindow(focusedWindow);
          showNotification('Window closed', 'info', 2000);
        }
      }

      // Alt + F4 - Close focused window
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        if (focusedWindow) {
          closeWindow(focusedWindow);
        }
      }

      // Windows/Meta + D - Minimize all windows
      if (e.metaKey && e.key === 'd') {
        e.preventDefault();
        windows.forEach(w => minimizeWindow(w.id));
        showNotification('All windows minimized', 'info', 2000);
      }

      // Windows + 1-9 - Open pinned apps
      if (e.metaKey && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        if (apps[index]) {
          openWindow(apps[index].id, apps[index].name, apps[index].icon);
        }
      }

      // Ctrl + Alt + Arrow - Workspace switching (for future implementation)
      if (e.ctrlKey && e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        showNotification('Workspace switching (coming soon)', 'info', 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows, focusedWindow, apps, closeWindow, minimizeWindow, focusWindow, openWindow, showNotification]);

  return null;
};

export default KeyboardShortcuts;