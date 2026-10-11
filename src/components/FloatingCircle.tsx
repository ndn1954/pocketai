import React, { useState } from 'react';
import { ThemeConfig } from '../theme/themes';
import { Play, Square, MessageSquare, Settings, X, Sparkles } from 'lucide-react';

interface FloatingCircleProps {
  isVisible: boolean;
  isTaskRunning: boolean;
  onOpenChat: () => void;
  onQuickRun: (prompt: string) => void;
  theme: ThemeConfig;
}

export const FloatingCircle: React.FC<FloatingCircleProps> = ({
  isVisible,
  isTaskRunning,
  onOpenChat,
  onQuickRun,
  theme,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-6 z-40 select-none">
      {/* Quick Action Popup Menu */}
      {isOpenMenu && (
        <div 
          className="absolute bottom-16 right-0 w-52 rounded-2xl border p-2.5 shadow-2xl space-y-1.5 animate-in slide-in-from-bottom-2 duration-150 backdrop-blur-md"
          style={{ 
            backgroundColor: `${theme.surfaceHex}fa`, 
            borderColor: theme.borderHex,
            color: theme.textPrimaryHex 
          }}
        >
          <div className="flex items-center justify-between px-1.5 pb-1 border-b border-white/10 text-[11px] font-bold opacity-70">
            <span>🦞 PokeClaw Widget</span>
            <button onClick={() => setIsOpenMenu(false)} className="opacity-50 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setIsOpenMenu(false);
              onQuickRun('Open WhatsApp and send hi to Mom');
            }}
            className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 flex items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">Auto-Reply WhatsApp</span>
          </button>

          <button
            onClick={() => {
              setIsOpenMenu(false);
              onQuickRun('Check my battery level');
            }}
            className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate">Check Battery Info</span>
          </button>

          <button
            onClick={() => {
              setIsOpenMenu(false);
              onOpenChat();
            }}
            className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 flex items-center gap-2 transition-colors font-medium border-t border-white/5 pt-1.5"
          >
            <Play className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Full App</span>
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className={`w-13 h-13 p-3 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 border-2 ${
          isTaskRunning 
            ? 'animate-pulse border-orange-400 bg-orange-600 shadow-orange-500/50' 
            : 'border-white/20 hover:scale-105'
        }`}
        style={{ 
          backgroundColor: isTaskRunning ? '#ea580c' : theme.surfaceHex,
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}
        title="PokeClaw Assistant Circle"
      >
        <span className="text-xl">🦞</span>
      </button>
    </div>
  );
};
