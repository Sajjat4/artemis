import React from 'react';
import { Search, Globe, Lock, MoreVertical, ExternalLink } from 'lucide-react';

export const ChromeApp: React.FC<{ query?: string }> = ({
  query = 'multimodal mobile AI agents android world benchmark'
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 select-none overflow-y-auto">
      {/* Chrome Top Bar */}
      <div className="px-3 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-2 sticky top-0 z-10">
        <div className="flex-1 bg-slate-800/90 rounded-full px-3 py-1.5 flex items-center gap-2 border border-slate-700">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span className="text-[11px] text-slate-200 font-mono truncate">google.com/search?q={query}</span>
        </div>
        <div className="w-5 h-5 rounded-md border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
          1
        </div>
        <MoreVertical className="w-4 h-4 text-slate-400" />
      </div>

      {/* Search Results */}
      <div className="p-3 space-y-3">
        {/* Google Logo / Search Header */}
        <div className="flex items-center gap-2 py-1">
          <span className="text-blue-400 font-bold text-sm">G</span>
          <span className="text-red-400 font-bold text-sm">o</span>
          <span className="text-yellow-400 font-bold text-sm">o</span>
          <span className="text-blue-400 font-bold text-sm">g</span>
          <span className="text-green-400 font-bold text-sm">l</span>
          <span className="text-red-400 font-bold text-sm">e</span>
          <span className="text-[10px] text-slate-400 ml-2">About 1,480,000 results (0.34s)</span>
        </div>

        {/* Top Result: Artemis & AndroidWorld */}
        <div className="bg-slate-800/70 rounded-2xl p-3 border border-slate-700/60 shadow">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
            <Globe className="w-3 h-3 text-blue-400" />
            <span>github.com › google › artemis</span>
          </div>
          <h4 className="text-xs font-bold text-blue-400 leading-snug hover:underline cursor-pointer flex items-center gap-1">
            ARTEMIS: Let AI assistants and test suites use real phones like a human <ExternalLink className="w-2.5 h-2.5 inline" />
          </h4>
          <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
            ARTEMIS achieves <strong>99%+ task completion</strong> on Google Research's AndroidWorld benchmark. Featuring Flash &amp; Pro multimodal agent pipelines, zero-latency accessibility service, and full MCP IDE hooks.
          </p>
          <div className="flex gap-1.5 mt-2">
            <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-medium">AndroidWorld SOTA</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">Native MCP Server</span>
          </div>
        </div>

        {/* Second Result */}
        <div className="bg-slate-800/70 rounded-2xl p-3 border border-slate-700/60 shadow">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
            <Globe className="w-3 h-3 text-purple-400" />
            <span>arxiv.org › abs › 2410.xxxxx</span>
          </div>
          <h4 className="text-xs font-bold text-blue-400 leading-snug">
            AndroidWorld: Dynamic Benchmarking Environment for Autonomous Agents
          </h4>
          <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
            Google Research environment for benchmarking autonomous mobile agents across 100+ complex real-world Android tasks.
          </p>
        </div>
      </div>
    </div>
  );
};
