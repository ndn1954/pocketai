import React from 'react';
import { 
  Wifi, 
  Battery, 
  Search, 
  Send, 
  ArrowLeft, 
  Sliders, 
  Check, 
  MessageSquare, 
  Play, 
  Settings, 
  PhoneCall, 
  Compass,
  FileText
} from 'lucide-react';

export type ScreenState = 
  | 'home' 
  | 'whatsapp_list' 
  | 'whatsapp_chat' 
  | 'settings' 
  | 'youtube' 
  | 'battery_info';

interface PhoneSimulatorProps {
  currentScreen: ScreenState;
  onScreenChange: (screen: ScreenState) => void;
  lastTapPoint?: { x: number; y: number } | null;
  typingText?: string;
  isWifiOn: boolean;
  onToggleWifi: () => void;
  batteryLevel: number;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  currentScreen,
  onScreenChange,
  lastTapPoint,
  typingText,
  isWifiOn,
  onToggleWifi,
  batteryLevel,
}) => {
  return (
    <div className="relative w-full max-w-[340px] h-[640px] bg-[#000] rounded-[40px] border-[6px] border-[#222] shadow-2xl overflow-hidden flex flex-col font-sans select-none">
      {/* Dynamic island / speaker punch hole */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
        <div className="w-2 h-2 rounded-full bg-[#0a192f]" />
      </div>

      {/* Touch coordinate animation ripple overlay */}
      {lastTapPoint && (
        <div 
          className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${lastTapPoint.x}%`, top: `${lastTapPoint.y}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-orange-500/40 border-2 border-orange-400 tap-ripple" />
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/80 text-[9px] text-orange-300 font-mono px-1.5 py-0.5 rounded shadow">
            tap({Math.round(lastTapPoint.x * 3.9)},{Math.round(lastTapPoint.y * 8.4)})
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="h-8 pt-1 px-5 flex items-center justify-between text-xs text-white/90 z-20">
        <span className="font-semibold text-[11px]">12:38</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          {isWifiOn ? <Wifi className="w-3 h-3 text-white" /> : <span className="text-[9px] text-white/40">LTE</span>}
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">{batteryLevel}%</span>
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 bg-[#121214] text-white relative overflow-hidden flex flex-col">
        {/* ================= HOME SCREEN ================= */}
        {currentScreen === 'home' && (
          <div className="flex-1 p-4 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-[#0c0d12]">
            <div className="pt-6 text-center">
              <div className="text-4xl font-light tracking-tight">12:38</div>
              <div className="text-xs text-white/60 mt-1">Sunday, October 11</div>
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-4 gap-4 px-2 py-4">
              <button 
                onClick={() => onScreenChange('whatsapp_chat')}
                className="flex flex-col items-center gap-1 group active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-green-900/30">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <span className="text-[10px] text-white/80">WhatsApp</span>
              </button>

              <button 
                onClick={() => onScreenChange('youtube')}
                className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FF0000] flex items-center justify-center text-white shadow-lg shadow-red-900/30">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
                <span className="text-[10px] text-white/80">YouTube</span>
              </button>

              <button 
                onClick={() => onScreenChange('settings')}
                className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-700 flex items-center justify-center text-white shadow-lg">
                  <Settings className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/80">Settings</span>
              </button>

              <button 
                onClick={() => onScreenChange('battery_info')}
                className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30">
                  <Battery className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/80">Power</span>
              </button>
            </div>

            {/* Dock */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-3 flex justify-around mb-2">
              <button onClick={() => onScreenChange('home')} className="p-1">
                <Compass className="w-6 h-6 text-white/80" />
              </button>
              <button onClick={() => onScreenChange('whatsapp_chat')} className="p-1">
                <MessageSquare className="w-6 h-6 text-[#25D366]" />
              </button>
              <button onClick={() => onScreenChange('settings')} className="p-1">
                <Settings className="w-6 h-6 text-white/80" />
              </button>
            </div>
          </div>
        )}

        {/* ================= WHATSAPP CHAT ================= */}
        {currentScreen === 'whatsapp_chat' && (
          <div className="flex-1 flex flex-col bg-[#0b141a]">
            {/* WhatsApp App Bar */}
            <div className="h-12 bg-[#1f2c34] px-3 flex items-center gap-2 border-b border-[#2a3942]">
              <button onClick={() => onScreenChange('home')} className="p-1 text-white/80">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-7 h-7 rounded-full bg-pink-600 flex items-center justify-center text-xs font-semibold text-white">
                M
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">Mom</div>
                <div className="text-[10px] text-[#00a884]">online</div>
              </div>
              <PhoneCall className="w-4 h-4 text-[#aebac1] mr-1" />
            </div>

            {/* Messages body */}
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="self-center bg-[#182229] text-[9px] text-[#8696a0] px-2 py-0.5 rounded shadow">
                YESTERDAY
              </div>
              <div className="self-start max-w-[80%] bg-[#202c33] text-[#e9edef] text-xs p-2.5 rounded-lg rounded-tl-none shadow">
                Don&apos;t forget to bring that bottle of red wine for dinner tonight!
                <div className="text-[9px] text-[#8696a0] text-right mt-0.5">8:14 PM</div>
              </div>
              <div className="self-end max-w-[80%] bg-[#005c4b] text-[#e9edef] text-xs p-2.5 rounded-lg rounded-tr-none shadow">
                Got it, Pinot Noir bought 👍
                <div className="text-[9px] text-emerald-200 text-right mt-0.5">8:16 PM</div>
              </div>

              <div className="self-center bg-[#182229] text-[9px] text-[#8696a0] px-2 py-0.5 rounded shadow mt-1">
                TODAY
              </div>
              <div className="self-start max-w-[80%] bg-[#202c33] text-[#e9edef] text-xs p-2.5 rounded-lg rounded-tl-none shadow">
                Are you on the way?
                <div className="text-[9px] text-[#8696a0] text-right mt-0.5">12:35 PM</div>
              </div>

              {/* Typed text or sent text */}
              {(typingText || currentScreen === 'whatsapp_chat') && (
                <div className="self-end max-w-[80%] bg-[#005c4b] text-[#e9edef] text-xs p-2.5 rounded-lg rounded-tr-none shadow animate-in fade-in">
                  {typingText || 'hi'}
                  <div className="text-[9px] text-emerald-200 text-right mt-0.5 flex items-center justify-end gap-1">
                    <span>12:37 PM</span>
                    <Check className="w-3 h-3 text-sky-400" />
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Input */}
            <div className="p-2 bg-[#1f2c34] flex items-center gap-1.5 border-t border-[#2a3942]">
              <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-xs text-[#d1d7db] flex items-center">
                <span>{typingText || 'Message'}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-black">
                <Send className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        )}

        {/* ================= SETTINGS ================= */}
        {currentScreen === 'settings' && (
          <div className="flex-1 flex flex-col bg-[#121214]">
            <div className="h-12 px-3 flex items-center gap-2 border-b border-white/10">
              <button onClick={() => onScreenChange('home')} className="p-1 text-white/80">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold">Settings</span>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              <div className="bg-[#1c1c1e] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Wi-Fi</div>
                    <div className="text-[10px] text-white/50">{isWifiOn ? 'Home_5G_Fast' : 'Off'}</div>
                  </div>
                </div>
                <button 
                  onClick={onToggleWifi}
                  className={`w-11 h-6 rounded-full transition-colors relative ${isWifiOn ? 'bg-blue-600' : 'bg-zinc-600'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${isWifiOn ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              <div className="bg-[#1c1c1e] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Battery className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Battery</div>
                    <div className="text-[10px] text-white/50">{batteryLevel}% · Normal performance</div>
                  </div>
                </div>
                <span className="text-xs text-white/40">→</span>
              </div>

              <div className="bg-[#1c1c1e] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Accessibility</div>
                    <div className="text-[10px] text-emerald-400">PokeClaw Service: ON</div>
                  </div>
                </div>
                <span className="text-xs text-white/40">→</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= YOUTUBE ================= */}
        {currentScreen === 'youtube' && (
          <div className="flex-1 flex flex-col bg-[#0f0f0f]">
            <div className="h-12 px-3 flex items-center gap-2 border-b border-white/10">
              <button onClick={() => onScreenChange('home')} className="p-1 text-white/80">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex-1 bg-white/10 rounded-full px-3 py-1 flex items-center gap-2 text-xs">
                <Search className="w-3.5 h-3.5 text-white/50" />
                <span className="text-white/80">{typingText || 'funny cat videos'}</span>
              </div>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-orange-950 to-amber-900 flex items-center justify-center text-2xl">
                  🐱🐾
                </div>
                <div className="p-2">
                  <div className="text-xs font-medium line-clamp-2">Hilarious Cats Getting Caught in 4K (2026 Edition)</div>
                  <div className="text-[10px] text-white/50 mt-1">CatVids • 4.2M views • 2 days ago</div>
                </div>
              </div>
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-indigo-950 to-purple-900 flex items-center justify-center text-2xl">
                  😸💤
                </div>
                <div className="p-2">
                  <div className="text-xs font-medium line-clamp-2">Top 50 Funniest Kitten Moments That Will Melt You</div>
                  <div className="text-[10px] text-white/50 mt-1">MeowDaily • 1.1M views • 1 week ago</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= BATTERY INFO ================= */}
        {currentScreen === 'battery_info' && (
          <div className="flex-1 flex flex-col bg-[#121214]">
            <div className="h-12 px-3 flex items-center gap-2 border-b border-white/10">
              <button onClick={() => onScreenChange('home')} className="p-1 text-white/80">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold">Battery & Power</span>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center mb-4 bg-emerald-500/10">
                <Battery className="w-8 h-8 text-emerald-400 mb-1" />
                <span className="text-xl font-bold">{batteryLevel}%</span>
              </div>
              <div className="text-sm font-medium">Battery Level Healthy</div>
              <div className="text-xs text-white/50 mt-1">Status: Discharging · Temperature: 31.4°C</div>
              <div className="text-xs text-white/50">Estimated 18h 42m remaining</div>
            </div>
          </div>
        )}

        {/* Android Navigation Bar */}
        <div className="h-6 bg-black flex items-center justify-around px-8">
          <button onClick={() => onScreenChange('home')} className="w-3 h-3 border border-white/40 rounded-sm" title="Recents" />
          <button onClick={() => onScreenChange('home')} className="w-3.5 h-3.5 rounded-full border border-white/40" title="Home" />
          <button onClick={() => onScreenChange('home')} className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-white/40" title="Back" />
        </div>
      </div>
    </div>
  );
};
