import React from 'react';
import { AgentProfile } from '../types/artemis';
import { Bot, Zap, Brain, Wrench, Layers, Video, Smartphone, Settings, ShieldCheck, Github } from 'lucide-react';

interface NavbarProps {
  currentView: 'workspace' | 'catalog' | 'diagnostics' | 'trace' | 'phone_only';
  onViewChange: (view: 'workspace' | 'catalog' | 'diagnostics' | 'trace' | 'phone_only') => void;
  profile: AgentProfile;
  onProfileChange: (p: AgentProfile) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  profile,
  onProfileChange,
  onOpenSettings
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between select-none">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 p-1 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
             onClick={() => onViewChange('workspace')}>
          <img src="/logo.svg" alt="ARTEMIS Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-extrabold text-white tracking-wider font-outfit uppercase">
              ARTEMIS
            </h1>
            <span className="hidden sm:inline-block text-[9px] bg-blue-600/30 text-blue-300 font-bold px-1.5 py-0.2 rounded border border-blue-500/40">
              v1.2.0
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium hidden md:block">
            Autonomous Mobile Agent Platform for Android
          </p>
        </div>
      </div>

      {/* Center Navigation Tabs */}
      <nav className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs font-semibold shadow-inner">
        <button
          onClick={() => onViewChange('workspace')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            currentView === 'workspace'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Workspace</span>
        </button>

        <button
          onClick={() => onViewChange('catalog')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            currentView === 'catalog'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Smart Tasks</span>
        </button>

        <button
          onClick={() => onViewChange('diagnostics')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            currentView === 'diagnostics'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Diagnostics</span>
        </button>

        <button
          onClick={() => onViewChange('trace')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            currentView === 'trace'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Traces</span>
        </button>

        <button
          onClick={() => onViewChange('phone_only')}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            currentView === 'phone_only'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Phone Only</span>
        </button>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Architecture Profile Pill */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onProfileChange('flash')}
            className={`px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1 text-[11px] ${
              profile === 'flash'
                ? 'bg-amber-500/20 text-amber-300'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3 h-3 text-amber-400" /> Flash
          </button>
          <button
            onClick={() => onProfileChange('pro')}
            className={`px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1 text-[11px] ${
              profile === 'pro'
                ? 'bg-purple-500/20 text-purple-300'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-3 h-3 text-purple-400" /> Pro
          </button>
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="Engine & Device Configuration"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
