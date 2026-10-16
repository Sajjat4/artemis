import React, { useState } from 'react';
import { Session, AgentStep } from '../types/artemis';
import { Play, Pause, ChevronLeft, ChevronRight, Layers, FileJson, Video, Cpu, Clock, CheckCircle } from 'lucide-react';

interface TraceInspectorProps {
  session: Session;
  selectedStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const TraceInspector: React.FC<TraceInspectorProps> = ({
  session,
  selectedStepIndex,
  onSelectStep,
}) => {
  const [isPlayingReplay, setIsPlayingReplay] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'json' | 'tree'>('details');

  const currentStep: AgentStep | undefined = session.steps[selectedStepIndex];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-5 select-none">
      {/* Session Summary Card */}
      <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-full">
              Session ID: {session.id}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {new Date(session.startTime).toLocaleTimeString()}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {session.goal}
          </h2>
        </div>

        {/* Aggregate Metrics */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-500 uppercase">Steps</p>
            <p className="text-white font-bold mt-0.5">{session.steps.length}</p>
          </div>
          <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-500 uppercase">Tokens</p>
            <p className="text-emerald-400 font-bold mt-0.5">
              {session.metrics.totalTokens.toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] text-slate-500 uppercase">Success</p>
            <p className="text-blue-400 font-bold mt-0.5">{session.metrics.successRate}%</p>
          </div>
        </div>
      </div>

      {/* Timeline Scrubbing Bar */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-blue-400" />
            <span>Trace Timeline Scrubber</span>
          </span>
          <span className="font-mono text-slate-400 text-[11px]">
            Step {selectedStepIndex + 1} of {session.steps.length || 1}
          </span>
        </div>

        {/* Step dots line */}
        <div className="relative flex items-center gap-2 py-2 overflow-x-auto">
          {session.steps.map((step, idx) => (
            <button
              key={step.stepId}
              onClick={() => onSelectStep(idx)}
              className={`flex-1 min-w-[36px] py-2 px-1.5 rounded-xl text-center text-xs font-mono font-bold transition-all ${
                selectedStepIndex === idx
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400'
              }`}
            >
              #{step.stepNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Step Inspection Detail */}
      {currentStep ? (
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                {currentStep.stepNumber}
              </span>
              <h3 className="font-bold text-sm text-white">
                {currentStep.agentRole} Action — {currentStep.actionTaken.action}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  activeTab === 'details' ? 'bg-blue-600/30 text-blue-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  activeTab === 'json' ? 'bg-blue-600/30 text-blue-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Raw JSON
              </button>
            </div>
          </div>

          {activeTab === 'details' ? (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase font-mono mb-1">Agent Multimodal Reasoning</p>
                <p className="text-slate-200 leading-relaxed font-sans">{currentStep.thought}</p>
                {currentStep.planExcerpt && (
                  <p className="text-purple-300 font-mono mt-2 pt-2 border-t border-slate-800 text-[11px]">
                    Plan: {currentStep.planExcerpt}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-500 text-[10px] uppercase">Execution Latency</p>
                  <p className="text-white font-bold mt-1">{currentStep.executionResult.durationMs}ms</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-500 text-[10px] uppercase">Token Usage</p>
                  <p className="text-emerald-400 font-bold mt-1">
                    {currentStep.tokenUsage.totalTokens} tokens
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-500 text-[10px] uppercase">Status</p>
                  <p className="text-blue-400 font-bold mt-1 uppercase">
                    {currentStep.executionResult.status}
                  </p>
                </div>
              </div>

              {/* Elements discovered */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase font-mono mb-2">
                  Indexed Interactive Screen Elements ({currentStep.screenState.elementBoxes.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.screenState.elementBoxes.map((box) => (
                    <div
                      key={box.index}
                      className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[11px] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-4 h-4 rounded bg-blue-600 text-white font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                          {box.index}
                        </span>
                        <span className="font-semibold text-slate-200 truncate">{box.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        [{box.bounds[0]}%, {box.bounds[1]}%]
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-emerald-400 text-[11px] overflow-x-auto max-h-96">
              <pre>{JSON.stringify(currentStep, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500 text-xs">No step selected.</div>
      )}
    </div>
  );
};
