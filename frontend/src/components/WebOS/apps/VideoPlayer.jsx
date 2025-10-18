import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward, Video } from 'lucide-react';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(600);
  const [volume, setVolume] = useState(100);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 relative">
        <div className="text-center">
          <Video className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No video loaded</p>
          <p className="text-gray-500 text-sm mt-2">Video player ready</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full hover:bg-gray-800 flex items-center justify-center text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-white text-black hover:scale-110 flex items-center justify-center transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-gray-800 flex items-center justify-center text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-white" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button className="w-10 h-10 rounded-full hover:bg-gray-800 flex items-center justify-center text-white transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;