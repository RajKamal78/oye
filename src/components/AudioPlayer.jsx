import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function AudioPlayer() {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    isMuted: false,
    volume: 0.6,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setAudioState({ ...state });
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    audioEngine.toggleMusic();
  };

  const handleToggleMute = () => {
    audioEngine.toggleMute();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    audioEngine.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 select-none">
      <div className="flex items-center gap-2 bg-[#1b0d2a]/85 backdrop-blur-md border border-pink-500/30 rounded-full px-3 py-2 shadow-lg shadow-pink-900/30 hover:border-pink-400/60 transition-all duration-300">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={audioState.isPlaying ? "Pause Music" : "Play Music"}
          className={`relative p-2.5 rounded-full transition-transform active:scale-95 ${
            audioState.isPlaying
              ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/40"
              : "bg-pink-950/60 text-pink-300 hover:text-white"
          }`}
          title={audioState.isPlaying ? "Pause music" : "Play music"}
        >
          {audioState.isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}

          {/* Pulsing ring when playing */}
          {audioState.isPlaying && (
            <span className="absolute -inset-1 rounded-full bg-pink-500/30 animate-ping pointer-events-none" />
          )}
        </button>

        {/* Music Status & Equalizer */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 cursor-pointer pr-1"
        >
          <div className="flex items-end gap-1 h-4 w-5 px-0.5">
            <span
              className={`w-1 bg-pink-400 rounded-full transition-all duration-300 ${
                audioState.isPlaying && !audioState.isMuted
                  ? "animate-[bounce_0.8s_infinite] h-4"
                  : "h-1.5"
              }`}
            />
            <span
              className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${
                audioState.isPlaying && !audioState.isMuted
                  ? "animate-[bounce_1.2s_infinite_0.2s] h-3"
                  : "h-2"
              }`}
            />
            <span
              className={`w-1 bg-pink-300 rounded-full transition-all duration-300 ${
                audioState.isPlaying && !audioState.isMuted
                  ? "animate-[bounce_0.9s_infinite_0.4s] h-4"
                  : "h-1"
              }`}
            />
          </div>

          <div className="hidden sm:block text-xs font-medium text-pink-200">
            {audioState.isPlaying ? (
              <span className="flex items-center gap-1 font-script text-base text-pink-300">
                Romantic Melody <Sparkles className="w-3 h-3 text-pink-400 inline" />
              </span>
            ) : (
              <span className="text-pink-400/80">Play Song</span>
            )}
          </div>
        </div>

        {/* Expandable Controls (Mute & Volume Slider) */}
        {isExpanded && (
          <div className="flex items-center gap-2 pl-2 border-l border-pink-500/30">
            <button
              onClick={handleToggleMute}
              className="p-1.5 rounded-full hover:bg-pink-900/40 text-pink-300 hover:text-white transition-colors"
              title={audioState.isMuted ? "Unmute" : "Mute"}
            >
              {audioState.isMuted || audioState.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioState.isMuted ? 0 : audioState.volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-pink-950 rounded-lg appearance-none cursor-pointer accent-pink-500"
              title={`Volume: ${Math.round(audioState.volume * 100)}%`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
