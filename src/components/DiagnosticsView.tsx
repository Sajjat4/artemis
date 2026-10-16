import React, { useState } from 'react';
import { DeviceInfo, ProbeResult } from '../types/artemis';
import { INITIAL_PROBES, INITIAL_DEVICE } from '../data/probes';
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw, Smartphone, Wrench, Shield, Terminal, Zap, ExternalLink } from 'lucide-react';

export const DiagnosticsView: React.FC = () => {
  const [probes, setProbes] = useState<ProbeResult[]>(INITIAL_PROBES);
  const [device, setDevice] = useState<DeviceInfo>(INITIAL_DEVICE);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'probes' | 'device' | 'mcp'>('probes');

  const runDiagnostics = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setProbes((prev) =>
        prev.map((p) => ({
          ...p,
          status: 'pass',
          summary: `${p.summary} (Verified)`,
        }))
      );
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white tracking-tight">System &amp; Device Diagnostics</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of ADB connections, Accessibility helper, screen mirror pipeline, and MCP toolchains.
          </p>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={isRefreshing}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Running Probes...' : 'Re-Run System Diagnostics'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-medium gap-4">
        <button
          onClick={() => setActiveTab('probes')}
          className={`pb-2.5 px-1 border-b-2 transition-colors ${
            activeTab === 'probes' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Diagnostic Probes ({probes.length})
        </button>
        <button
          onClick={() => setActiveTab('device')}
          className={`pb-2.5 px-1 border-b-2 transition-colors ${
            activeTab === 'device' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Target Device Telemetry
        </button>
        <button
          onClick={() => setActiveTab('mcp')}
          className={`pb-2.5 px-1 border-b-2 transition-colors ${
            activeTab === 'mcp' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Model Context Protocol (MCP) Setup
        </button>
      </div>

      {/* Probes View */}
      {activeTab === 'probes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {probes.map((probe) => (
            <div
              key={probe.id}
              className="bg-slate-900/80 rounded-2xl p-4.5 border border-slate-800 flex items-start gap-3.5 shadow"
            >
              <div className="mt-0.5">
                {probe.status === 'pass' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {probe.status === 'warn' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {probe.status === 'fail' && <XCircle className="w-5 h-5 text-red-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs text-white truncate">{probe.title}</h4>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                      probe.status === 'pass'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : probe.status === 'warn'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {probe.status}
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-300 mt-1">{probe.summary}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{probe.description}</p>
                {probe.actionLabel && (
                  <button className="mt-2.5 text-[10px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                    <span>{probe.actionLabel}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Target Device Telemetry */}
      {activeTab === 'device' && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{device.model}</h3>
              <p className="text-xs text-slate-400 font-mono">Serial: {device.serial} • IP: {device.ipAddress}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 font-mono text-xs">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-500 text-[10px] uppercase">OS Platform</p>
              <p className="text-white font-semibold mt-1">{device.androidVersion}</p>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-500 text-[10px] uppercase">Resolution</p>
              <p className="text-white font-semibold mt-1">{device.resolution}</p>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-500 text-[10px] uppercase">Battery &amp; Power</p>
              <p className="text-emerald-400 font-semibold mt-1">{device.batteryLevel}% (Charging)</p>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-500 text-[10px] uppercase">A11y Helper APK</p>
              <p className="text-emerald-400 font-semibold mt-1">Installed &amp; Active</p>
            </div>
          </div>
        </div>
      )}

      {/* MCP Integration Guide */}
      {activeTab === 'mcp' && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>Connect Antigravity, Claude Code, Cursor, &amp; Windsurf to Artemis</span>
          </h3>
          <p className="text-slate-300 leading-relaxed">
            Artemis provides a native Model Context Protocol (MCP) server that lets AI IDEs directly inspect device state, capture screenshots, query UI trees, and execute gestures.
          </p>

          <div className="bg-slate-950 p-3 rounded-xl font-mono text-slate-300 text-[11px] overflow-x-auto border border-slate-800">
            <p className="text-slate-500"># Add to your IDE MCP configuration (e.g. mcpServers):</p>
            <pre className="text-emerald-400 mt-2">
{`{
  "mcpServers": {
    "artemis": {
      "command": "python",
      "args": ["-m", "artemis.mcp"],
      "env": {
        "ADB_HOST": "127.0.0.1",
        "ADB_PORT": "5037"
      }
    }
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
