import React from 'react';
import { Search, Navigation, Clock, Compass, Layers, Volume2, Star } from 'lucide-react';

interface MapsAppProps {
  searchQuery: string;
  hasRoute: boolean;
  onSearchChange?: (val: string) => void;
}

export const MapsApp: React.FC<MapsAppProps> = ({ searchQuery, hasRoute }) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 select-none overflow-hidden relative">
      {/* Top Search Bar */}
      <div className="p-3 z-10">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-2 border border-slate-700/60 shadow-lg">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            readOnly
            value={searchQuery || 'Search here...'}
            className="bg-transparent flex-1 text-xs text-white outline-none font-medium"
          />
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">
            A
          </div>
        </div>
      </div>

      {/* Map Canvas Visual Simulation */}
      <div className="flex-1 relative bg-[#1c2438] overflow-hidden">
        {/* Stylized Grid Lines for Road Map */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          {/* Highways */}
          <line x1="0" y1="80" x2="400" y2="120" stroke="#fbbf24" strokeWidth="4" />
          <line x1="120" y1="0" x2="160" y2="600" stroke="#60a5fa" strokeWidth="6" />
          <line x1="0" y1="340" x2="400" y2="300" stroke="#94a3b8" strokeWidth="3" />
          <line x1="260" y1="0" x2="220" y2="600" stroke="#94a3b8" strokeWidth="3" />
          
          {/* Secondary streets */}
          <path d="M 40 180 Q 150 200 300 160" stroke="#475569" strokeWidth="2" fill="none" />
          <path d="M 80 400 Q 200 380 340 450" stroke="#475569" strokeWidth="2" fill="none" />
          
          {/* Parks & Water bodies */}
          <rect x="220" y="80" width="120" height="90" rx="16" fill="#15803d" opacity="0.3" />
          <rect x="20" y="240" width="90" height="110" rx="12" fill="#0284c7" opacity="0.25" />

          {/* Active Route Path if route calculated */}
          {hasRoute && (
            <path
              d="M 160 380 Q 170 260 210 210 T 260 110"
              stroke="#3b82f6"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="6 2"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Current Location Pin */}
        <div className="absolute top-[375px] left-[155px] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-blue-500/30 animate-ping absolute" />
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-md z-10" />
        </div>

        {/* Destination Pin */}
        {hasRoute && (
          <div className="absolute top-[100px] left-[250px] flex flex-col items-center z-10">
            <div className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap mb-0.5">
              SFO Airport
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white shadow-md" />
          </div>
        )}

        {/* Cafe Markers if coffee search */}
        {searchQuery.toLowerCase().includes('coffee') && (
          <>
            <div className="absolute top-[160px] left-[90px] flex items-center gap-1 bg-amber-950/80 border border-amber-600/60 rounded-full px-2 py-1 shadow-md z-10">
              <span className="text-amber-400 text-[10px]">☕</span>
              <span className="text-[10px] text-white font-semibold">Sightglass Coffee (4.7★)</span>
            </div>
            <div className="absolute top-[280px] left-[180px] flex items-center gap-1 bg-amber-950/80 border border-amber-600/60 rounded-full px-2 py-1 shadow-md z-10">
              <span className="text-amber-400 text-[10px]">☕</span>
              <span className="text-[10px] text-white font-semibold">Blue Bottle (4.6★)</span>
            </div>
          </>
        )}

        {/* Quick Map Controls Floating */}
        <div className="absolute right-3 top-16 flex flex-col gap-2 z-10">
          <button className="w-8 h-8 rounded-full bg-slate-800/90 border border-slate-700 shadow flex items-center justify-center text-slate-300">
            <Layers className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-slate-800/90 border border-slate-700 shadow flex items-center justify-center text-slate-300">
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Card (Route or Place Card) */}
        {hasRoute ? (
          <div className="absolute bottom-3 inset-x-3 bg-slate-800/95 backdrop-blur-md rounded-2xl p-3 border border-slate-700 shadow-xl z-20">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-emerald-400 font-bold text-sm">24 min</span>
                <span className="text-slate-400 text-xs ml-2">14.8 mi • 8:25 PM</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Fastest route
              </span>
            </div>
            <p className="text-slate-300 text-[11px] mb-2.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              Via US-101 S (Typical traffic for this time)
            </p>
            <div className="flex items-center gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-1.5 px-3 font-semibold text-xs flex items-center justify-center gap-1.5 shadow">
                <Navigation className="w-3.5 h-3.5" /> Start Navigation
              </button>
              <button className="p-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : searchQuery.toLowerCase().includes('coffee') ? (
          <div className="absolute bottom-3 inset-x-3 bg-slate-800/95 backdrop-blur-md rounded-2xl p-3 border border-slate-700 shadow-xl z-20">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-xs text-white">Sightglass Coffee Roasters</h4>
                <div className="flex items-center gap-1 text-[10px] text-amber-400 mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="font-semibold">4.7</span>
                  <span className="text-slate-400">(1,842 reviews) • $$ • Cafe</span>
                </div>
                <p className="text-[10px] text-emerald-400 mt-1 font-medium">Open until 7:00 PM • Takeout & Dine-in</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
                <Navigation className="w-3 h-3" /> Directions
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
