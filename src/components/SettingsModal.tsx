import React, { useState } from 'react';
import { X, Server, Key, Cpu, Shield, Check, Smartphone } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [adbHost, setAdbHost] = useState('127.0.0.1');
  const [adbPort, setAdbPort] = useState('5037');
  const [deviceSerial, setDeviceSerial] = useState('emulator-5554');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [hierarchyBackend, setHierarchyBackend] = useState<'a11y' | 'uiautomator'>('a11y');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Engine &amp; Device Configuration</h3>
              <p className="text-[11px] text-slate-400">Artemis Runtime &amp; ADB Gateway Settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-xs">
          {/* ADB Connection */}
          <div>
            <label className="font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <span>Android Debug Bridge (ADB) Endpoint</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  value={adbHost}
                  onChange={(e) => setAdbHost(e.target.value)}
                  placeholder="Host (127.0.0.1)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={adbPort}
                  onChange={(e) => setAdbPort(e.target.value)}
                  placeholder="Port (5037)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Target Serial */}
          <div>
            <label className="font-semibold text-slate-300 block mb-1.5">Target Device Serial</label>
            <input
              type="text"
              value={deviceSerial}
              onChange={(e) => setDeviceSerial(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-blue-500"
            />
          </div>

          {/* Multimodal LLM Model */}
          <div>
            <label className="font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Multimodal Vision &amp; Reasoning Model</span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-sans outline-none focus:border-blue-500"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Sub-1s latency, Recommended)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep reasoning, long horizons)</option>
              <option value="claude-3-7-sonnet">Claude 3.7 Sonnet (Multimodal agentic)</option>
              <option value="gpt-4o">OpenAI GPT-4o (Vision)</option>
            </select>
          </div>

          {/* Hierarchy Backend */}
          <div>
            <label className="font-semibold text-slate-300 block mb-1.5">Hierarchy &amp; Gesture Engine</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHierarchyBackend('a11y')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  hierarchyBackend === 'a11y'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <p className="font-bold text-white text-[11px]">com.artemis.helper</p>
                <p className="text-[10px] text-slate-400 mt-0.5">A11y service (15ms latency)</p>
              </button>
              <button
                type="button"
                onClick={() => setHierarchyBackend('uiautomator')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  hierarchyBackend === 'uiautomator'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <p className="font-bold text-white text-[11px]">uiautomator dump</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Native system CLI fallback</p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg"
          >
            {saved ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{saved ? 'Saved!' : 'Save & Connect'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
