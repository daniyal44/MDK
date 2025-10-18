import React, { useState } from 'react';
import { Monitor, Volume2, Bell, Palette, Info, User } from 'lucide-react';
import { mockSettings } from '../mock';

const Settings = () => {
  const [settings, setSettings] = useState(mockSettings);

  const sections = [
    { id: 'display', name: 'Display', icon: Monitor },
    { id: 'sound', name: 'Sound', icon: Volume2 },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'about', name: 'About', icon: Info },
  ];

  const [activeSection, setActiveSection] = useState('display');

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 p-3">
        <div className="flex items-center gap-3 p-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            WO
          </div>
          <div>
            <div className="font-semibold text-gray-800">Web OS</div>
            <div className="text-xs text-gray-600">v1.0.0</div>
          </div>
        </div>

        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{section.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeSection === 'display' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Display Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>1920 × 1080 (Recommended)</option>
                  <option>1366 × 768</option>
                  <option>1280 × 720</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brightness</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="80"
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Night Mode</span>
                <button className="w-12 h-6 bg-gray-300 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'sound' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sound Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Sound Effects</span>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">System Sounds</span>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <div className="font-medium text-gray-800">Show Notifications</div>
                  <div className="text-sm text-gray-600">Display system notifications</div>
                </div>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <div className="font-medium text-gray-800">Sound Alerts</div>
                  <div className="text-sm text-gray-600">Play sound with notifications</div>
                </div>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Appearance</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border-2 border-blue-500 rounded-lg bg-white">
                    <div className="font-medium">Light</div>
                  </button>
                  <button className="p-4 border-2 border-gray-300 rounded-lg bg-gray-900">
                    <div className="font-medium text-white">Dark</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'].map(color => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Web OS</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-2xl">
                  WO
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-800">Web OS</h3>
                <p className="text-gray-600">Version 1.0.0</p>
                <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
                  A fully functional operating system in your browser. Experience the power of modern web technologies.
                </p>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• File Manager with virtual file system</li>
                  <li>• Text Editor with formatting</li>
                  <li>• Code Editor with syntax highlighting</li>
                  <li>• Terminal with command execution</li>
                  <li>• Paint application</li>
                  <li>• Calculator</li>
                  <li>• Media players</li>
                  <li>• Games and more!</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;