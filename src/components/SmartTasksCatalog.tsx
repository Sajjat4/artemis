import React, { useState } from 'react';
import { SmartSuggestion, AgentProfile } from '../types/artemis';
import { SMART_TASK_LIBRARY } from '../data/smartTasks';
import { Sparkles, Zap, Brain, Play, ArrowRight, Layers, Award, Search, Filter } from 'lucide-react';

interface SmartTasksCatalogProps {
  onSelectTask: (task: SmartSuggestion) => void;
  selectedProfile: AgentProfile;
}

export const SmartTasksCatalog: React.FC<SmartTasksCatalogProps> = ({
  onSelectTask,
  selectedProfile,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = SMART_TASK_LIBRARY.filter((task) => {
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6 select-none">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 p-6 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>99%+ Task Completion • AndroidWorld Benchmark</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Curated Autonomous Mobile Task Library
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Dispatch pre-validated testing workflows across Google Maps, YouTube, System Settings, Messages, and multi-app chains with full multimodal reasoning.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'navigation', label: 'Maps & Navigation' },
            { id: 'media', label: 'Media & YouTube' },
            { id: 'system', label: 'System Settings' },
            { id: 'cross_app', label: 'Cross-App Chains' },
            { id: 'benchmark', label: 'Benchmarks' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filterCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-64 bg-slate-950/80 rounded-xl px-3 py-1.5 flex items-center gap-2 border border-slate-800 text-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workflows..."
            className="bg-transparent text-white placeholder-slate-500 outline-none w-full"
          />
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="group rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-blue-500/60 p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  {task.apps.map((app) => (
                    <span
                      key={app.name}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700/60"
                    >
                      {app.name}
                    </span>
                  ))}
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                    task.profile === 'flash'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}
                >
                  {task.profile === 'flash' ? <Zap className="w-2.5 h-2.5" /> : <Brain className="w-2.5 h-2.5" />}
                  {task.profile}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                {task.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {task.description}
              </p>

              {/* Expected steps */}
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <Layers className="w-3 h-3 text-slate-400" />
                <span>~{task.expectedSteps} autonomous steps</span>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={() => onSelectTask(task)}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Workflow</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
