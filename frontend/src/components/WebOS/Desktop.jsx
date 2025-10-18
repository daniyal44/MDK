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
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, focusedWindow } = useWebOS();
  const [time, setTime] = useState(new Date());

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

  const desktopIcons = [
    { id: 'fileManager', name: 'File Manager', icon: Folder },
    { id: 'textEditor', name: 'Text Editor', icon: FileText },
    { id: 'codeEditor', name: 'Code Editor', icon: Code },
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  ];

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-6 left-6 grid grid-cols-1 gap-3 z-0">
        {desktopIcons.map((icon) => {
          const Icon = icon.icon;
          return (
            <button
              key={icon.id}
              onDoubleClick={() => openWindow(icon.id, icon.name, Icon)}
              className="flex flex-col items-center justify-center w-24 h-24 rounded-md hover:bg-white/10 active:bg-white/20 transition-all duration-150 group cursor-pointer backdrop-blur-sm"
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
          >
            {AppComponent && <AppComponent windowId={window.id} />}
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar time={time} />
    </div>
  );
};

export default Desktop;