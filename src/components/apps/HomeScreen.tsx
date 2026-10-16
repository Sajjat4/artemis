import React from 'react';
import { Search, Mic, Camera, MapPin, PlaySquare, Settings, MessageSquare, Globe, Clock, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  onAppLaunch: (app: 'maps' | 'youtube' | 'settings' | 'messages' | 'chrome') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onAppLaunch }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-indigo-950/70 via-slate-900 to-slate-950 text-white select-none relative overflow-hidden">
      {/* Ambient background wallpaper art */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Top At a Glance Widget */}
      <div className="z-10 mt-6 px-1">
        <p className="text-sm font-medium text-slate-300">Thursday, Oct 16</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-4xl font-light tracking-tight text-white font-outfit">8:01</span>
          <span className="text-xs text-slate-400 font-medium">72°F Sunny • San Francisco</span>
        </div>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-4 gap-y-5 gap-x-2 z-10 my-auto px-1">
        {/* Maps */}
        <button
          onClick={() => onAppLaunch('maps')}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-emerald-400/30">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-slate-200">Maps</span>
        </button>

        {/* YouTube */}
        <button
          onClick={() => onAppLaunch('youtube')}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-red-400/30">
            <PlaySquare className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-slate-200">YouTube</span>
        </button>

        {/* Chrome */}
        <button
          onClick={() => onAppLaunch('chrome')}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-amber-400/30">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-slate-200">Chrome</span>
        </button>

        {/* Messages */}
        <button
          onClick={() => onAppLaunch('messages')}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-blue-400/30">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-slate-200">Messages</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => onAppLaunch('settings')}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-slate-600/40">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-slate-200">Settings</span>
        </button>

        {/* Clock */}
        <div className="flex flex-col items-center gap-1.5 opacity-80">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-700 to-purple-800 flex items-center justify-center shadow">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-slate-300">Clock</span>
        </div>

        {/* Camera */}
        <div className="flex flex-col items-center gap-1.5 opacity-80">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-700 flex items-center justify-center shadow">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-slate-300">Camera</span>
        </div>

        {/* Artemis Helper */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow border border-emerald-400/40">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <span className="text-[10px] font-semibold text-emerald-400">Artemis</span>
        </div>
      </div>

      {/* Bottom Search Bar & Dock */}
      <div className="z-10 space-y-3 pb-2">
        {/* Google Pixel Search Pill */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-full px-4 py-2.5 flex items-center justify-between border border-white/10 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="text-blue-400 font-bold text-sm">G</span>
            <span className="text-slate-400 text-xs">Search apps, web, &amp; device...</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Mic className="w-4 h-4" />
            <Camera className="w-4 h-4" />
          </div>
        </div>

        {/* Dock Icons */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-2.5 flex justify-around border border-white/10 shadow-lg">
          <button onClick={() => onAppLaunch('messages')} className="p-1 hover:scale-110 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
          </button>
          <button onClick={() => onAppLaunch('chrome')} className="p-1 hover:scale-110 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center shadow">
              <Globe className="w-5 h-5 text-white" />
            </div>
          </button>
          <button onClick={() => onAppLaunch('maps')} className="p-1 hover:scale-110 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </button>
          <button onClick={() => onAppLaunch('youtube')} className="p-1 hover:scale-110 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow">
              <PlaySquare className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
