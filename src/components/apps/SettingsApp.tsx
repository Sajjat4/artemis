import React, { useState } from 'react';
import { Search, Wifi, Bluetooth, Moon, Bell, Shield, Smartphone, Accessibility, ChevronRight } from 'lucide-react';

interface SettingsAppProps {
  darkModeEnabled?: boolean;
  wifiEnabled?: boolean;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  darkModeEnabled = true,
  wifiEnabled = true,
}) => {
  const [darkTheme, setDarkTheme] = useState(darkModeEnabled);
  const [wifi, setWifi] = useState(wifiEnabled);
  const [bluetooth, setBluetooth] = useState(true);
  const [a11yActive, setA11yActive] = useState(true);

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 select-none overflow-y-auto">
      {/* Header */}
      <div className="p-4 pb-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>
        <div className="mt-3 bg-slate-800 rounded-2xl px-3 py-2 flex items-center gap-2 border border-slate-700/60">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            readOnly
            placeholder="Search settings..."
            className="bg-transparent text-xs text-white outline-none flex-1"
          />
        </div>
      </div>

      {/* Main Settings List */}
      <div className="p-3 space-y-2">
        {/* Network & Internet */}
        <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Network & internet</p>
              <p className="text-[10px] text-slate-400">GoogleGuest-5G • Connected</p>
            </div>
          </div>
          <button
            onClick={() => setWifi(!wifi)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
              wifi ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                wifi ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Connected Devices (Bluetooth) */}
        <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Bluetooth className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Connected devices</p>
              <p className="text-[10px] text-slate-400">Pixel Buds Pro • Paired</p>
            </div>
          </div>
          <button
            onClick={() => setBluetooth(!bluetooth)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
              bluetooth ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                bluetooth ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Display & Dark Theme */}
        <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Dark Theme</p>
              <p className="text-[10px] text-slate-400">{darkTheme ? 'Always On' : 'Off'}</p>
            </div>
          </div>
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
              darkTheme ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                darkTheme ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Artemis Accessibility Service */}
        <div className="bg-emerald-950/40 rounded-2xl p-3 border border-emerald-600/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-semibold text-white">Artemis Helper Service</p>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">A11Y</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-medium">Active (Sub-15ms node dumps & gestures)</p>
            </div>
          </div>
          <button
            onClick={() => setA11yActive(!a11yActive)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
              a11yActive ? 'bg-emerald-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                a11yActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* System & About Phone */}
        <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">About phone</p>
              <p className="text-[10px] text-slate-400">Pixel 9 Pro • Android 15 • API 35</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
