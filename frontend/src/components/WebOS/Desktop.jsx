import React, { useState, useEffect } from 'react';
import { Monitor, Folder, FileText, Code, Terminal as TerminalIcon, Palette, Calculator, Music, Video, Image, Gamepad2, Settings, Chrome } from 'lucide-react';
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
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 relative">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4 z-0">
        {desktopIcons.map((icon) => {
          const Icon = icon.icon;
          return (
            <button
              key={icon.id}
              onDoubleClick={() => openWindow(icon.id, icon.name, Icon)}
              className="flex flex-col items-center justify-center w-20 h-20 rounded-lg hover:bg-white/20 transition-all duration-200 group cursor-pointer"
            >
              <Icon className="w-10 h-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              <span className="text-white text-xs mt-1 drop-shadow text-center font-medium">{icon.name}</span>
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