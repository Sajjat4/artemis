import React, { useRef, useEffect } from 'react';
import { AgentStep, AgentProfile, TaskStatus } from '../types/artemis';
import { Bot, Terminal, Zap, Brain, CheckCircle2, AlertTriangle, Clock, ArrowRight, CornerDownRight, Cpu, Eye } from 'lucide-react';

interface AgentStreamProps {
  steps: AgentStep[];
  goal: string;
  profile: AgentProfile;
  status: TaskStatus;
  currentStepIndex: number;
  totalTokens: number;
  onSelectStep?: (index: number) => void;
  selectedStepIndex?: number;
}

export const AgentStream: React.FC<AgentStreamProps> = ({
  steps,
  goal,
  profile,
  status,
  currentStepIndex,
  totalTokens,
  onSelectStep,
  selectedStepIndex
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [steps.length]);

  return (
    <div className="flex flex-col h-full bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-md">
      {/* Stream Header */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">Artemis Agent Stream</h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                  profile === 'flash'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}
              >
                {profile === 'flash' ? <Zap className="w-3 h-3" /> : <Brain className="w-3 h-3" />}
                {profile.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[280px] sm:max-w-md font-medium">
              {goal || 'Ready for autonomous mobile commands'}
            </p>
          </div>
        </div>

        {/* Live Status Pill & Token Meter */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50 text-[11px] text-slate-300 font-mono">
            <Cpu className="w-3 h-3 text-blue-400" />
            <span>{totalTokens.toLocaleString()} tokens</span>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
              status === 'running'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 animate-pulse'
                : status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {status === 'running' && <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />}
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Steps List */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {steps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
              <Bot className="w-6 h-6 text-slate-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-300">Awaiting Task Dispatch</h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
              Select a task preset below or enter a prompt in the command dock to launch autonomous device execution.
            </p>
          </div>
        ) : (
          steps.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            return (
              <div
                key={step.stepId}
                onClick={() => onSelectStep && onSelectStep(idx)}
                className={`group rounded-xl p-3.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500/80 ring-1 ring-blue-500/40 shadow-lg'
                    : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/80'
                }`}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-600/30 text-blue-400 text-xs font-mono font-bold flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1">
                      {step.agentRole}
                      <span className="text-[10px] text-slate-500 font-normal">in {step.screenState.app}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {step.executionResult.durationMs}ms
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                        step.executionResult.status === 'success'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : step.executionResult.status === 'blocked'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {step.executionResult.status === 'success' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                      )}
                      {step.executionResult.status}
                    </span>
                  </div>
                </div>

                {/* Multimodal Thought / LLM Reasoning */}
                <div className="bg-slate-950/70 rounded-lg p-2.5 border border-slate-800/60 mb-2">
                  <div className="flex items-start gap-1.5 text-xs text-slate-300 leading-relaxed font-sans">
                    <CornerDownRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p>{step.thought}</p>
                      {step.planExcerpt && (
                        <p className="text-[11px] text-purple-300 mt-1 font-mono bg-purple-950/30 p-1.5 rounded border border-purple-800/40">
                          <strong>Plan:</strong> {step.planExcerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Taken & Terminal Command */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-950/20 border border-blue-900/30 rounded-lg px-2.5 py-1.5 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-blue-300">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="font-semibold">{step.actionTaken.action}</span>
                    {step.actionTaken.targetIndex !== undefined && (
                      <span className="bg-blue-600 text-white px-1.5 py-0.2 rounded text-[10px]">
                        [{step.actionTaken.targetIndex}]
                      </span>
                    )}
                    {step.actionTaken.targetLabel && (
                      <span className="text-slate-300 font-sans">"{step.actionTaken.targetLabel}"</span>
                    )}
                  </div>
                  {step.actionTaken.targetCoordinates && (
                    <span className="text-[10px] text-slate-400">
                      coord: [{step.actionTaken.targetCoordinates[0]}, {step.actionTaken.targetCoordinates[1]}]
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
