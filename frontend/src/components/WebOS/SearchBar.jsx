import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useWebOS } from './WebOSContext';

const SearchBar = ({ apps }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const { openWindow } = useWebOS();
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = apps.filter(app => 
        app.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query, apps]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectApp = (app) => {
    openWindow(app.id, app.name, app.icon);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 min-w-[300px]">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search apps..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-1 max-h-[300px] overflow-y-auto">
          {results.map(app => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleSelectApp(app)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-3"
              >
                <Icon className={`w-5 h-5 ${app.color}`} />
                <span className="text-sm text-gray-800">{app.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;