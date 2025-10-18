import React, { useState } from 'react';
import { Folder, FileText, Code, Terminal as TerminalIcon, Palette, Calculator, Music, Video, Image, Gamepad2, Settings, Chrome, Menu, Wifi, Volume2, Battery, Calendar as CalendarIcon } from 'lucide-react';
import { useWebOS } from './WebOSContext';
import SearchBar from './SearchBar';

const Taskbar = ({ time, apps }) => {
  const { windows, openWindow, focusWindow } = useWebOS();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const allApps = apps || [
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

  const pinnedApps = allApps.slice(0, 6);

  const handleAppClick = (app) => {
    openWindow(app.id, app.name, app.icon);
    setShowStartMenu(false);
  };

  const handleTaskbarItemClick = (window) => {
    focusWindow(window.id);
  };

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && (
        <div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[640px] h-[580px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{
            background: 'rgba(243, 244, 246, 0.8)',
            backdropFilter: 'blur(60px)',
            WebkitBackdropFilter: 'blur(60px)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="p-8 h-full flex flex-col">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search apps, settings, and files..."
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60 backdrop-blur-sm text-sm"
              />
            </div>
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Pinned</h3>
            <div className="grid grid-cols-6 gap-3 flex-1 overflow-y-auto">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-white/40 active:bg-white/60 transition-all duration-150 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                      <Icon className={`w-7 h-7 ${app.color}`} strokeWidth={2} />
                    </div>
                    <span className="text-[10px] text-gray-800 text-center font-medium leading-tight">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center px-2 z-50"
        style={{
          background: 'rgba(243, 244, 246, 0.7)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 -2px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Centered Taskbar Content */}
        <div className="flex items-center gap-1">
          {/* Start Button */}
          <button
            onClick={() => setShowStartMenu(!showStartMenu)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${ 
              showStartMenu ? 'bg-white/80 shadow-sm' : 'hover:bg-white/40 active:bg-white/60'
            }`}
          >
            <Menu className="w-5 h-5 text-gray-800" strokeWidth={2} />
          </button>

          {/* Divider */}
          <div className="w-px h-7 bg-gray-400/30 mx-1" />

          {/* Pinned Apps */}
          {pinnedApps.map((app) => {
            const Icon = app.icon;
            const isOpen = windows.some(w => w.appId === app.id);
            return (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 relative ${
                  isOpen ? 'bg-white/60' : 'hover:bg-white/40 active:bg-white/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${app.color}`} strokeWidth={2} />
                {isOpen && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-700" />
                )}
              </button>
            );
          })}

          {/* Open Windows */}
          {windows.filter(w => !w.minimized && !pinnedApps.some(p => p.id === w.appId)).map((window) => {
            const Icon = window.icon;
            return (
              <button
                key={window.id}
                onClick={() => handleTaskbarItemClick(window)}
                className="h-11 px-3 min-w-[140px] max-w-[200px] rounded-lg bg-white/60 hover:bg-white/80 active:bg-white/90 flex items-center gap-2.5 transition-all duration-200"
              >
                {Icon && <Icon className="w-4 h-4 text-gray-700 flex-shrink-0" strokeWidth={2} />}
                <span className="text-[13px] text-gray-800 font-medium truncate">{window.title}</span>
              </button>
            );
          })}
        </div>

        {/* System Tray - Right Side */}
        <div className="absolute right-3 flex items-center gap-1">
          <button className="w-9 h-9 rounded-lg hover:bg-white/40 active:bg-white/60 flex items-center justify-center transition-colors">
            <Wifi className="w-[18px] h-[18px] text-gray-700" strokeWidth={2} />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-white/40 active:bg-white/60 flex items-center justify-center transition-colors">
            <Volume2 className="w-[18px] h-[18px] text-gray-700" strokeWidth={2} />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-white/40 active:bg-white/60 flex items-center justify-center transition-colors">
            <Battery className="w-[18px] h-[18px] text-gray-700" strokeWidth={2} />
          </button>
          <div className="ml-1 px-2">
            <div className="text-[13px] text-gray-800 font-medium leading-tight">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[10px] text-gray-600 leading-tight">
              {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;