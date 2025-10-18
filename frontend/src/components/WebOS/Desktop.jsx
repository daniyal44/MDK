import React, { useState, useEffect } from 'react';
import { Monitor, Folder, FileText, Code, Terminal as TerminalIcon, Palette, Calculator, Music, Video, Image, Gamepad2, Settings, Chrome, RefreshCw, Layout } from 'lucide-react';
import Taskbar from './Taskbar';
import Window from './Window';
import FileManager from './apps/FileManager';
import TextEditor from './apps/TextEditor';
import CodeEditor from './apps/CodeEditor';
import Terminal from './apps/Terminal';
import Paint from './apps/Paint';
import CalculatorApp from './apps/Calculator';
import MusicPlayer from './apps/MusicPlayer';
import VideoPlayer from './apps/VideoPlayer';
import ImageViewer from './apps/ImageViewer';
import SnakeGame from './apps/SnakeGame';
import SettingsApp from './apps/Settings';
import BrowserApp from './apps/Browser';
import { useWebOS } from './WebOSContext';
import { useNotifications } from './NotificationContext';
import ContextMenu from './ContextMenu';
import KeyboardShortcuts from './KeyboardShortcuts';

const Desktop = () => {
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, focusedWindow, updateWindowPosition } = useWebOS();
  const { showNotification } = useNotifications();
  const [time, setTime] = useState(new Date());
  const [contextMenu, setContextMenu] = useState(null);
  const [snapIndicator, setSnapIndicator] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const appComponents = {
    fileManager: FileManager,
    textEditor: TextEditor,
    codeEditor: CodeEditor,
    terminal: Terminal,
    paint: Paint,
    calculator: CalculatorApp,
    musicPlayer: MusicPlayer,
    videoPlayer: VideoPlayer,
    imageViewer: ImageViewer,
    game: SnakeGame,
    settings: SettingsApp,
    browser: BrowserApp,
  };

  const apps = [
    { id: 'fileManager', name: 'File Manager', icon: Folder, color: 'text-yellow-500' },
    { id: 'textEditor', name: 'Text Editor', icon: FileText, color: 'text-blue-500' },
    { id: 'codeEditor', name: 'Code Editor', icon: Code, color: 'text-green-500' },
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon, color: 'text-gray-700' },
    { id: 'paint', name: 'Paint', icon: Palette, color: 'text-pink-500' },
    { id: 'calculator', name: 'Calculator', icon: Calculator, color: 'text-indigo-500' },
    { id: 'musicPlayer', name: 'Music Player', icon: Music, color: 'text-purple-500' },
    { id: 'videoPlayer', name: 'Video Player', icon: Video, color: 'text-red-500' },
    { id: 'imageViewer', name: 'Image Viewer', icon: Image, color: 'text-teal-500' },
    { id: 'game', name: 'Snake Game', icon: Gamepad2, color: 'text-orange-500' },
    { id: 'browser', name: 'Browser', icon: Chrome, color: 'text-cyan-500' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'text-gray-600' },
  ];

  const desktopIcons = [
    { id: 'fileManager', name: 'File Manager', icon: Folder },
    { id: 'textEditor', name: 'Text Editor', icon: FileText },
    { id: 'codeEditor', name: 'Code Editor', icon: Code },
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  ];

  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { 
          icon: RefreshCw, 
          label: 'Refresh', 
          onClick: () => {
            showNotification('Desktop refreshed', 'success', 2000);
          }
        },
        { divider: true },
        { 
          icon: Layout, 
          label: 'Display Settings', 
          onClick: () => openWindow('settings', 'Settings', Settings)
        },
      ]
    });
  };

  const handleWindowDragEnd = (windowId, position) => {
    const { x, y } = position;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Window snapping
    if (x <= 10) {
      // Snap left
      setSnapIndicator(null);
      updateWindowPosition(windowId, { x: 0, y: 0 });
      showNotification('Window snapped to left', 'info', 1500);
    } else if (x >= screenWidth - 910) {
      // Snap right
      setSnapIndicator(null);
      updateWindowPosition(windowId, { x: screenWidth / 2, y: 0 });
      showNotification('Window snapped to right', 'info', 1500);
    } else if (y <= 10) {
      // Maximize
      setSnapIndicator(null);
      maximizeWindow(windowId);
      showNotification('Window maximized', 'info', 1500);
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
      onContextMenu={handleDesktopRightClick}
      onClick={() => setContextMenu(null)}
    >
      {/* Keyboard Shortcuts Handler */}
      <KeyboardShortcuts apps={apps} />

      {/* Desktop Icons */}
      <div className="absolute top-6 left-6 grid grid-cols-1 gap-3 z-0">
        {desktopIcons.map((icon) => {
          const Icon = icon.icon;
          return (
            <button
              key={icon.id}
              onDoubleClick={() => openWindow(icon.id, icon.name, Icon)}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  items: [
                    { 
                      icon: Icon, 
                      label: `Open ${icon.name}`, 
                      onClick: () => openWindow(icon.id, icon.name, Icon)
                    },
                  ]
                });
              }}
              className="flex flex-col items-center justify-center w-24 h-24 rounded-md hover:bg-white/10 active:bg-white/20 transition-all duration-150 group cursor-pointer"
            >
              <div className="w-12 h-12 mb-1.5 flex items-center justify-center">
                <Icon className="w-full h-full text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform" strokeWidth={1.5} />
              </div>
              <span className="text-white text-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] text-center font-normal leading-tight px-1">{icon.name}</span>
            </button>
          );
        })}
      </div>

      {/* Windows */}
      {windows.map((window) => {
        const AppComponent = appComponents[window.appId];
        return (
          <Window
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            isFocused={focusedWindow === window.id}
            onDragEnd={(position) => handleWindowDragEnd(window.id, position)}
          >
            {AppComponent && <AppComponent windowId={window.id} />}
          </Window>
        );
      })}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Taskbar */}
      <Taskbar time={time} apps={apps} />
    </div>
  );
};

export default Desktop;