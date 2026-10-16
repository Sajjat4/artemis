import React from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, CheckCheck } from 'lucide-react';

interface MessagesAppProps {
  draftMessage?: string;
  isSent?: boolean;
}

export const MessagesApp: React.FC<MessagesAppProps> = ({
  draftMessage = 'Hey Alice! Maps says ETA is 24 min (arriving around 8:25 PM)',
  isSent = false
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 select-none">
      {/* Top Bar */}
      <div className="px-3 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <div className="w-7 h-7 rounded-full bg-pink-600 flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Alice Chen</p>
            <p className="text-[9px] text-emerald-400">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <Phone className="w-3.5 h-3.5" />
          <Video className="w-3.5 h-3.5" />
          <MoreVertical className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        <div className="text-center text-[9px] text-slate-500 font-medium">Today, 7:55 PM</div>
        
        {/* Incoming message from Alice */}
        <div className="flex flex-col items-start max-w-[80%]">
          <div className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-2xl rounded-tl-sm border border-slate-700/60 shadow">
            Hey! Are you heading over to the airport or coffee shop soon? What's your ETA?
          </div>
          <span className="text-[9px] text-slate-500 mt-1 ml-1">7:56 PM</span>
        </div>

        {/* Outgoing Message if Sent */}
        {isSent && (
          <div className="flex flex-col items-end self-end ml-auto max-w-[80%]">
            <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm shadow">
              {draftMessage}
            </div>
            <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-1 mr-1">
              <span>8:01 PM</span>
              <CheckCheck className="w-3 h-3 text-blue-400" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Composer */}
      <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <div className="flex-1 bg-slate-800 rounded-full px-3 py-2 text-xs flex items-center">
          <input
            type="text"
            readOnly
            value={!isSent ? draftMessage : ''}
            placeholder="Type an SMS or RCS message..."
            className="bg-transparent text-white outline-none w-full text-xs font-medium"
          />
        </div>
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            !isSent ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
