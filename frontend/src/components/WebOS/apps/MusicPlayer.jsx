import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Music } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(70);
  const [currentTrack, setCurrentTrack] = useState(0);

  const playlist = [
    { title: 'Ambient Dreams', artist: 'Virtual Orchestra', duration: 240 },
    { title: 'Digital Sunset', artist: 'Synth Masters', duration: 195 },
    { title: 'Cyber Jazz', artist: 'Future Beats', duration: 210 },
    { title: 'Neon Lights', artist: 'Electric Soul', duration: 180 },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Now Playing */}
      <div className="flex-1 flex flex-col items-center justify-center text-white p-8">
        <div className="w-64 h-64 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl flex items-center justify-center mb-8 border border-white/20">
          <Music className="w-24 h-24 text-white/80" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{playlist[currentTrack].title}</h2>
        <p className="text-lg text-white/80 mb-8">{playlist[currentTrack].artist}</p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-2">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex justify-between w-full max-w-md text-sm text-white/70 mb-8">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-all">
            <Shuffle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
            className="w-12 h-12 rounded-full hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white text-purple-500 hover:scale-110 flex items-center justify-center transition-all shadow-lg"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          <button
            onClick={() => setCurrentTrack(Math.min(playlist.length - 1, currentTrack + 1))}
            className="w-12 h-12 rounded-full hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <SkipForward className="w-6 h-6" />
          </button>
          <button className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-all">
            <Repeat className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Playlist */}
      <div className="h-48 bg-black/20 backdrop-blur-lg border-t border-white/10 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-white font-semibold mb-3">Playlist</h3>
          {playlist.map((track, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTrack(idx)}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                idx === currentTrack
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm opacity-70">{track.artist}</div>
                </div>
                <div className="text-sm opacity-70">{formatTime(track.duration)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;