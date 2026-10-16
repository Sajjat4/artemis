import React, { useState, useEffect } from 'react';
import { Search, Play, Pause, SkipForward, ThumbsUp, Share2, Download, Bookmark, Sparkles } from 'lucide-react';

interface YouTubeAppProps {
  searchQuery?: string;
  isPlaying?: boolean;
}

export const YouTubeApp: React.FC<YouTubeAppProps> = ({
  searchQuery = 'Coldplay - Viva La Vida (Live)',
  isPlaying = true
}) => {
  const [playing, setPlaying] = useState(isPlaying);
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    setPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="w-full h-full flex flex-col bg-[#0f0f0f] text-slate-100 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-white/10 sticky top-0 bg-[#0f0f0f]/95 backdrop-blur z-20">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
            <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
          </div>
          <span className="font-bold text-xs tracking-tight">YouTube</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white/10 rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <Search className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] text-white/90 truncate max-w-[130px] font-medium">{searchQuery}</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-indigo-600 text-[9px] flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="w-full aspect-video bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950 relative flex flex-col justify-end overflow-hidden group">
        {/* Animated Visualizer Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-500/20 to-red-500/30 blur-xl animate-pulse" />
          <div className="text-center z-10">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-600/90 flex items-center justify-center shadow-lg border border-red-400/40 cursor-pointer"
                 onClick={() => setPlaying(!playing)}>
              {playing ? (
                <Pause className="w-5 h-5 text-white fill-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              )}
            </div>
            <p className="text-[11px] font-bold text-white mt-2 drop-shadow">Coldplay — Viva La Vida</p>
            <p className="text-[9px] text-slate-300 drop-shadow">Official Live Stadium Performance • 1080p60</p>
          </div>
        </div>

        {/* Video Scrubber */}
        <div className="relative w-full px-2 pb-1.5 z-10">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] text-slate-300 mt-1 font-mono">
            <span>{Math.floor((progress * 240) / 100 / 60)}:{String(Math.floor((progress * 240) / 100 % 60)).padStart(2, '0')}</span>
            <span>4:02</span>
          </div>
        </div>
      </div>

      {/* Video Details & Actions */}
      <div className="p-3">
        <h3 className="font-bold text-xs text-white leading-tight">
          Coldplay - Viva La Vida (Live in São Paulo)
        </h3>
        <p className="text-[10px] text-slate-400 mt-0.5">89M views • 3 years ago • #Coldplay #LiveMusic</p>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between mt-3 pb-3 border-b border-white/10 text-[10px]">
          <button className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full hover:bg-white/15">
            <ThumbsUp className="w-3 h-3" /> 2.1M
          </button>
          <button className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full hover:bg-white/15">
            <Share2 className="w-3 h-3" /> Share
          </button>
          <button className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full hover:bg-white/15">
            <Download className="w-3 h-3" /> Remix
          </button>
          <button className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full hover:bg-white/15">
            <Bookmark className="w-3 h-3" /> Save
          </button>
        </div>

        {/* Channel Row */}
        <div className="flex items-center justify-between py-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center font-bold text-xs">
              C
            </div>
            <div>
              <p className="text-xs font-semibold text-white flex items-center gap-1">
                Coldplay <Sparkles className="w-2.5 h-2.5 text-blue-400" />
              </p>
              <p className="text-[9px] text-slate-400">26.8M subscribers</p>
            </div>
          </div>
          <button className="bg-white text-black font-semibold text-[10px] px-3 py-1 rounded-full">
            Subscribed
          </button>
        </div>

        {/* Up Next List */}
        <div className="mt-3">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Up Next</p>
          <div className="flex gap-2 mb-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer">
            <div className="w-24 h-14 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
              Yellow (Live)
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-white line-clamp-1">Coldplay - Yellow (Official Video)</p>
              <p className="text-[9px] text-slate-400">Coldplay • 940M views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
