import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ModelInfo, PermissionItem } from '../types';
import { ThemeConfig } from '../theme/themes';
import { 
  Menu, 
  Settings as SettingsIcon, 
  Edit3, 
  Rocket, 
  Send, 
  Mic, 
  AlertTriangle, 
  Sparkles, 
  ChevronDown, 
  Layers, 
  Monitor, 
  Clock, 
  Smartphone,
  CheckCircle2,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ChatViewProps {
  messages: ChatMessage[];
  isTaskRunning: boolean;
  onSendChat: (text: string) => void;
  onSendTask: (text: string) => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
  onOpenMenu: () => void;
  onOpenModelSheet: () => void;
  activeModel: ModelInfo;
  permissions: PermissionItem[];
  theme: ThemeConfig;
  showPhonePreview: boolean;
  onTogglePhonePreview: () => void;
  isListeningMic: boolean;
  onToggleMic: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isTaskRunning,
  onSendChat,
  onSendTask,
  onNewChat,
  onOpenSettings,
  onOpenMenu,
  onOpenModelSheet,
  activeModel,
  permissions,
  theme,
  showPhonePreview,
  onTogglePhonePreview,
  isListeningMic,
  onToggleMic,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const restrictedPerm = permissions.find(p => p.status === 'restricted' || p.status === 'disabled');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTaskRunning]);

  const handleSendAsChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTaskRunning) return;
    onSendChat(inputText.trim());
    setInputText('');
  };

  const handleSendAsTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTaskRunning) return;
    onSendTask(inputText.trim());
    setInputText('');
  };

  const quickPrompts = [
    'Open WhatsApp and send hi to Mom',
    'Check my battery level',
    'Open Settings and turn off WiFi',
    'Open YouTube and search cats',
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none" style={{ color: theme.textPrimaryHex }}>
      {/* Top Phone Status Bar */}
      <div 
        className="h-10 px-5 flex items-center justify-between text-xs font-semibold shrink-0 border-b"
        style={{ borderColor: `${theme.borderHex}60`, backgroundColor: `${theme.surfaceHex}40` }}
      >
        <span>12:38</span>
        <div className="flex items-center gap-2 text-[11px] opacity-70">
          <span className="font-mono">5G · 72%</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Main App Toolbar */}
      <div 
        className="h-13 px-4 flex items-center justify-between border-b shrink-0"
        style={{ borderColor: theme.borderHex, backgroundColor: theme.surfaceHex }}
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenMenu}
            className="p-1.5 rounded-xl hover:bg-white/10 active:scale-95 transition-transform"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-lg">🦞</span>
            <span className="font-bold text-base tracking-tight">PokeClaw</span>
          </div>

          {/* Active Model Pill */}
          <button
            onClick={onOpenModelSheet}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all hover:bg-white/5 active:scale-95"
            style={{ 
              borderColor: `${theme.accentColor}40`,
              backgroundColor: `${theme.accentColor}12`,
              color: theme.accentColor
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span className="truncate max-w-[110px]">{activeModel.name}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onTogglePhonePreview}
            className={`p-2 rounded-xl transition-all ${
              showPhonePreview 
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                : 'hover:bg-white/10 opacity-60'
            }`}
            title="Toggle Live Phone Display"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          <button
            onClick={onNewChat}
            className="p-2 rounded-xl hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity"
            title="New Chat"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Permission Warning Banner (if attention needed) */}
      {restrictedPerm && (
        <div 
          onClick={onOpenSettings}
          className="mx-3.5 my-2 p-2.5 rounded-2xl flex items-center gap-2.5 cursor-pointer border transition-all animate-pulse-subtle bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 shrink-0"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-amber-300">
              1 permission needs attention
            </div>
            <div className="text-[11px] text-amber-200/80 truncate">
              {restrictedPerm.name} is {restrictedPerm.status}. Tap to fix in Settings.
            </div>
          </div>
          <span className="text-xs text-amber-400 font-bold shrink-0">Fix →</span>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
        <div className="text-center text-[11px] font-bold uppercase tracking-widest opacity-30 py-1">
          Today
        </div>

        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div className={`flex items-end gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {!isUser && (
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 shadow-sm mb-0.5"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    🦞
                  </div>
                )}

                {/* Message Bubble */}
                <div 
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                    isUser
                      ? 'rounded-br-sm'
                      : 'rounded-bl-sm border'
                  }`}
                  style={{
                    backgroundColor: isUser ? theme.userBubbleHex : theme.aiBubbleHex,
                    color: isUser ? '#ffffff' : theme.textPrimaryHex,
                    borderColor: isUser ? 'transparent' : `${theme.borderHex}80`,
                  }}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Task Execution Trace Tree */}
                  {msg.taskSteps && msg.taskSteps.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1 font-mono text-xs">
                      {msg.taskSteps.map((step) => (
                        <div key={step.id} className="flex items-center gap-2 opacity-85">
                          <span 
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              step.status === 'ok' ? 'bg-emerald-400' : 'bg-orange-400 animate-pulse'
                            }`} 
                          />
                          <span className="truncate">{step.action}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Task Metrics & Badge Footer */}
                  {msg.tokens !== undefined && (
                    <div className="mt-1.5 pt-1 border-t border-white/5 flex items-center justify-between text-[10px] opacity-40 font-mono">
                      <span>{msg.modelUsed || activeModel.name}</span>
                      <span>{msg.tokens} tokens · ${msg.cost?.toFixed(3) || '0.000'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Live Thinking / Running Indicator */}
        {isTaskRunning && (
          <div className="flex items-end gap-2 self-start animate-in fade-in">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0"
              style={{ backgroundColor: theme.accentColor }}
            >
              🦞
            </div>
            <div 
              className="p-3 rounded-2xl rounded-bl-sm border text-sm flex items-center gap-2"
              style={{ backgroundColor: theme.aiBubbleHex, borderColor: theme.borderHex }}
            >
              <span className="text-xs opacity-70">PokeClaw is executing task tools...</span>
              <div className="flex gap-1 items-center px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-dot-3" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips Carousel */}
      <div className="px-4 py-1.5 flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
        {quickPrompts.map((q) => (
          <button
            key={q}
            onClick={() => {
              setInputText(q);
            }}
            className="px-2.5 py-1 rounded-full text-xs whitespace-nowrap bg-white/5 hover:bg-white/10 border border-white/10 opacity-70 hover:opacity-100 transition-all active:scale-95 shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Dual Mode Hint */}
      <div className="px-4 pt-1 flex items-center justify-center gap-4 text-[11px] opacity-40 shrink-0">
        <span><b>Send</b> = chat with AI</span>
        <span>•</span>
        <span><b>🚀</b> = execute phone task</span>
      </div>

      {/* Input Form Bar */}
      <div 
        className="p-3 border-t shrink-0"
        style={{ borderColor: theme.borderHex, backgroundColor: theme.surfaceHex }}
      >
        <div className="flex items-center gap-2">
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={onToggleMic}
            className={`p-2.5 rounded-full transition-all ${
              isListeningMic 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-white/5 hover:bg-white/10 opacity-60 hover:opacity-100'
            }`}
            title="Speech to Text"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendAsChat();
                }
              }}
              placeholder={isListeningMic ? "Listening to your voice..." : "Message or describe task..."}
              disabled={isTaskRunning}
              className="w-full bg-black/20 border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors"
              style={{ color: theme.textPrimaryHex }}
            />
          </div>

          {/* Run Phone Task Button */}
          <button
            type="button"
            onClick={handleSendAsTask}
            disabled={!inputText.trim() || isTaskRunning}
            className="p-2.5 rounded-full bg-orange-600 hover:bg-orange-500 active:scale-95 text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md shadow-orange-950/30"
            title="Run as phone task (🚀)"
          >
            <Rocket className="w-4 h-4" />
          </button>

          {/* Send Chat Button */}
          <button
            type="button"
            onClick={handleSendAsChat}
            disabled={!inputText.trim() || isTaskRunning}
            className="px-3 py-2 rounded-full font-bold text-xs uppercase tracking-wider text-white transition-all disabled:opacity-30 disabled:pointer-events-none hover:opacity-90"
            style={{ backgroundColor: theme.accentColor }}
            title="Send chat message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
