import React, { useState } from 'react';
import { AgentProfile, TaskStatus } from '../types/artemis';
import { Zap, Brain, ArrowUp, Square, X, Sparkles, Loader2 } from 'lucide-react';

interface FloatingDockProps {
  inputPrompt: string;
  onInputChange: (val: string) => void;
  onSubmit: (prompt: string, profile: AgentProfile) => void;
  onStop: () => void;
  status: TaskStatus;
  profile: AgentProfile;
  onProfileChange: (p: AgentProfile) => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  inputPrompt,
  onInputChange,
  onSubmit,
  onStop,
  status,
  profile,
  onProfileChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isRunning = status === 'running';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputPrompt.trim() && !isRunning) {
        onSubmit(inputPrompt, profile);
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 z-30">
      {/* Floating Card Wrapper with Ambient Wave Layer */}
      <div
        className={`relative rounded-3xl bg-slate-900/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl overflow-hidden ${
          isFocused || inputPrompt.trim()
            ? 'border-blue-500/80 ring-2 ring-blue-500/20'
            : 'border-slate-700/70 hover:border-slate-600'
        }`}
      >
        {/* Animated Fluid Wave Layer at top of card */}
        <div className="absolute top-0 inset-x-0 h-1.5 overflow-hidden opacity-80">
          <div
            className={`w-full h-full bg-gradient-to-r transition-all duration-500 ${
              profile === 'flash'
                ? 'from-amber-400 via-orange-500 to-red-500'
                : 'from-blue-500 via-indigo-500 to-purple-600'
            } ${isRunning ? 'animate-pulse' : ''}`}
          />
        </div>

        {/* Card Body */}
        <div className="p-3">
          {/* Main Input Row */}
          <div className="flex items-center gap-2">
            <div className="pl-1">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>

            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => onInputChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isRunning}
              placeholder={
                profile === 'flash'
                  ? "Flash Mode: fast single-look reactive steps (e.g., 'Open Maps & find SFO route')..."
                  : "Pro Mode: deliberative planning & error recovery for long workflows..."
              }
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none font-sans"
            />

            {/* Clear Button */}
            {inputPrompt.trim() && !isRunning && (
              <button
                type="button"
                onClick={() => onInputChange('')}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Stop / Run Action Buttons */}
            {isRunning ? (
              <button
                type="button"
                onClick={onStop}
                className="w-9 h-9 rounded-2xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                title="Stop current autonomous run"
              >
                <Square className="w-4 h-4 fill-white" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => inputPrompt.trim() && onSubmit(inputPrompt, profile)}
                disabled={!inputPrompt.trim()}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${
                  inputPrompt.trim()
                    ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-blue-500/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
                title="Dispatch task to Artemis"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Footer Bar: Architecture Profile Toggle */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-full border border-slate-800">
              <button
                type="button"
                onClick={() => onProfileChange('flash')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                  profile === 'flash'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Flash (3-5s)</span>
              </button>

              <button
                type="button"
                onClick={() => onProfileChange('pro')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                  profile === 'pro'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Brain className="w-3 h-3 text-purple-400" />
                <span>Pro (Planner)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="hidden sm:inline">Press Enter ↵ to run</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-mono">ADB :5554</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
