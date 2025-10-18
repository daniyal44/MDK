import React, { useState } from 'react';
import { Globe, Search, ArrowLeft, ArrowRight, RotateCw, Home, Star, Lock } from 'lucide-react';

const Browser = () => {
  const [url, setUrl] = useState('https://webos.local/welcome');
  const [isLoading, setIsLoading] = useState(false);

  const quickLinks = [
    { name: 'Search', url: 'https://search.com', color: 'bg-blue-500' },
    { name: 'News', url: 'https://news.com', color: 'bg-red-500' },
    { name: 'Social', url: 'https://social.com', color: 'bg-purple-500' },
    { name: 'Video', url: 'https://video.com', color: 'bg-pink-500' },
    { name: 'Shop', url: 'https://shop.com', color: 'bg-orange-500' },
    { name: 'Mail', url: 'https://mail.com', color: 'bg-cyan-500' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Navigation Bar */}
      <div className="h-12 border-b border-gray-200 flex items-center gap-2 px-3 bg-gray-50">
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <RotateCw className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Home className="w-4 h-4 text-gray-600" />
        </button>

        {/* Address Bar */}
        <div className="flex-1 flex items-center gap-2 px-3 h-9 bg-white rounded-full border border-gray-300 mx-2">
          <Lock className="w-4 h-4 text-green-600" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700"
            placeholder="Search or enter address"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>

        <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Star className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto py-12 px-8">
          {/* Welcome Message */}
          <div className="text-center mb-12">
            <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Web Browser</h1>
            <p className="text-gray-600">Start your journey on the web</p>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
            <div className="grid grid-cols-3 gap-4">
              {quickLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => setUrl(link.url)}
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto`}>
                    {link.name[0]}
                  </div>
                  <div className="font-medium text-gray-800">{link.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{link.url}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Fast & Secure</h3>
              <p className="text-sm text-gray-600">Browse the web with confidence. All connections are secure.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">Your data stays private. We don't track your browsing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browser;