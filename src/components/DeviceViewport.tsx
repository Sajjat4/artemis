import React, { useState } from 'react';
import { Wifi, Battery, Volume2, Power, RotateCw, Camera, Eye, Layers, Sparkles, Smartphone, ChevronLeft, Circle, Square } from 'lucide-react';
import { BoundingBox } from '../types/artemis';
import { HomeScreen } from './apps/HomeScreen';
import { MapsApp } from './apps/MapsApp';
import { YouTubeApp } from './apps/YouTubeApp';
import { SettingsApp } from './apps/SettingsApp';
import { MessagesApp } from './apps/MessagesApp';
import { ChromeApp } from './apps/ChromeApp';

interface DeviceViewportProps {
  currentApp: 'home' | 'maps' | 'youtube' | 'settings' | 'messages' | 'chrome';
  onAppChange: (app: 'home' | 'maps' | 'youtube' | 'settings' | 'messages' | 'chrome') => void;
  boundingBoxes: BoundingBox[];
  activeTapPoint: [number, number] | null;
  onUserTap?: (xPercent: number, yPercent: number) => void;
  mapsQuery?: string;
  mapsHasRoute?: boolean;
  youtubeQuery?: string;
  youtubeIsPlaying?: boolean;
  messagesDraft?: string;
  messagesSent?: boolean;
}

export const DeviceViewport: React.FC<DeviceViewportProps> = ({
  currentApp,
  onAppChange,
  boundingBoxes,
  activeTapPoint,
  onUserTap,
  mapsQuery = 'SFO Airport',
  mapsHasRoute = false,
  youtubeQuery = 'Coldplay - Viva La Vida',
  youtubeIsPlaying = true,
  messagesDraft = '',
  messagesSent = false
}) => {
  const [showOverlays, setShowOverlays] = useState(true);
  const [devicePower, setDevicePower] = useState(true);
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    if (onUserTap) {
      onUserTap(x, y);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-2 select-none">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between w-full max-w-[360px] mb-2 px-2 py-1.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] text-slate-200">Pixel 9 Pro</span>
          <span className="bg-slate-800 text-slate-400 text-[9px] px-1.5 py-0.5 rounded font-mono">60 FPS</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            title="Toggle Element Bounding Boxes"
            className={`p-1.5 rounded-lg transition-colors ${
              showOverlays ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onAppChange('home')}
            title="Go to Home"
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevicePower(!devicePower)}
            title="Power On/Off"
            className={`p-1.5 rounded-lg transition-colors ${
              devicePower ? 'hover:bg-slate-800 text-slate-400' : 'bg-red-600/20 text-red-400'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Android Device Hardware Frame */}
      <div className="relative w-full max-w-[360px] aspect-[9/19.5] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-[5px] border-slate-700/80 ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
        {/* Device Speaker & Camera Notch */}
        <div className="absolute top-2 inset-x-0 flex justify-center z-40 pointer-events-none">
          <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-white/10 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-indigo-900/40" />
          </div>
        </div>

        {/* Device Power Off Screen */}
        {!devicePower && (
          <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-slate-600">
            <Power className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-xs font-mono">Screen Standby</p>
            <button
              onClick={() => setDevicePower(true)}
              className="mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-xs font-medium"
            >
              Wake Device
            </button>
          </div>
        )}

        {/* Screen Content Wrapper */}
        <div
          onClick={handleScreenClick}
          className="relative w-full h-full bg-slate-900 rounded-[34px] overflow-hidden flex flex-col cursor-crosshair group shadow-inner"
        >
          {/* Android Status Bar */}
          <div className="h-7 px-4 pt-1 bg-black/40 backdrop-blur-sm flex items-center justify-between text-white text-[11px] font-medium z-30 select-none">
            <span>8:01</span>
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="text-[10px] font-bold text-emerald-400">5G</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 fill-white" />
            </div>
          </div>

          {/* Active Application Viewport */}
          <div className="flex-1 w-full relative overflow-hidden">
            {currentApp === 'home' && <HomeScreen onAppLaunch={onAppChange} />}
            {currentApp === 'maps' && (
              <MapsApp searchQuery={mapsQuery} hasRoute={mapsHasRoute} />
            )}
            {currentApp === 'youtube' && (
              <YouTubeApp searchQuery={youtubeQuery} isPlaying={youtubeIsPlaying} />
            )}
            {currentApp === 'settings' && <SettingsApp darkModeEnabled={true} wifiEnabled={true} />}
            {currentApp === 'messages' && (
              <MessagesApp draftMessage={messagesDraft} isSent={messagesSent} />
            )}
            {currentApp === 'chrome' && <ChromeApp />}

            {/* Artemis Element Bounding Boxes Overlay */}
            {showOverlays && boundingBoxes && boundingBoxes.length > 0 && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {boundingBoxes.map((box) => {
                  const [x1, y1, x2, y2] = box.bounds;
                  const isHovered = selectedBox?.index === box.index;
                  return (
                    <div
                      key={box.index}
                      style={{
                        left: `${x1}%`,
                        top: `${y1}%`,
                        width: `${Math.max(x2 - x1, 4)}%`,
                        height: `${Math.max(y2 - y1, 3)}%`,
                      }}
                      className={`absolute border transition-all duration-150 rounded-sm pointer-events-auto cursor-pointer ${
                        isHovered
                          ? 'border-yellow-400 bg-yellow-400/25 z-30'
                          : 'border-blue-500/80 bg-blue-500/10 hover:border-emerald-400 hover:bg-emerald-400/20'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBox(box);
                      }}
                      title={`[${box.index}] ${box.label} (${box.className || 'View'})`}
                    >
                      <span className="absolute -top-3 -left-1 bg-blue-600 text-white font-mono text-[9px] font-bold px-1 rounded shadow-sm scale-90 leading-tight">
                        {box.index}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Active Tap / Touch Ripple Effect */}
            {activeTapPoint && (
              <div
                style={{
                  left: `${activeTapPoint[0]}%`,
                  top: `${activeTapPoint[1]}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/40 animate-ping absolute" />
                <div className="w-6 h-6 rounded-full bg-blue-600/70 border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-300" />
                </div>
              </div>
            )}
          </div>

          {/* Android Navigation Bar */}
          <div className="h-6 bg-black/60 backdrop-blur-sm flex items-center justify-around px-8 z-30 select-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentApp !== 'home') onAppChange('home');
              }}
              className="text-slate-400 hover:text-white p-1"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAppChange('home');
              }}
              className="text-slate-400 hover:text-white p-1"
              title="Home"
            >
              <Circle className="w-3.5 h-3.5 fill-slate-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAppChange('settings');
              }}
              className="text-slate-400 hover:text-white p-1"
              title="Recent Apps"
            >
              <Square className="w-3.5 h-3.5 fill-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Inspected Element Detail Chip */}
      {selectedBox && (
        <div className="mt-2 w-full max-w-[360px] bg-slate-900 border border-slate-700/80 rounded-xl p-2 text-xs flex items-center justify-between shadow-lg">
          <div className="flex-1 min-w-0 pr-2">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <span className="bg-blue-600 text-[10px] px-1 rounded">#{selectedBox.index}</span>
              <span className="truncate">{selectedBox.label}</span>
            </p>
            <p className="text-[10px] text-slate-400 font-mono truncate">
              {selectedBox.resourceId || selectedBox.className || 'android.view.View'}
            </p>
          </div>
          <button
            onClick={() => setSelectedBox(null)}
            className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
