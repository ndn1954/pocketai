import React from 'react';
import { Conversation, ActivePage } from '../types';
import { ThemeConfig } from '../theme/themes';
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  HardDrive, 
  Wrench, 
  BookOpen, 
  Brain, 
  Globe, 
  X,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  theme: ThemeConfig;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  currentPage,
  onNavigate,
  theme,
}) => {
  const todayConvs = conversations.filter(c => c.group === 'Today');
  const yesterdayConvs = conversations.filter(c => c.group === 'Yesterday');

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[80vw] flex flex-col shadow-2xl transition-transform duration-300 ease-out border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          backgroundColor: theme.surfaceHex, 
          borderColor: theme.borderHex,
          color: theme.textPrimaryHex 
        }}
      >
        {/* Sidebar Header */}
        <div className="p-4 pt-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🦞</span>
            <span className="font-bold text-base tracking-tight">PokeClaw</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onNewChat();
              onNavigate('chat');
              onClose();
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-4">
          {/* Today */}
          {todayConvs.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-40 px-3 py-1">
                Today
              </div>
              <div className="space-y-0.5">
                {todayConvs.map((conv) => {
                  const isActive = conv.id === activeConversationId && currentPage === 'chat';
                  return (
                    <button
                      key={conv.id}
                      onClick={() => {
                        onSelectConversation(conv.id);
                        onNavigate('chat');
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
                        isActive 
                          ? 'bg-white/10 font-semibold' 
                          : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      <span className="truncate flex-1">{conv.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {yesterdayConvs.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-40 px-3 py-1">
                Yesterday
              </div>
              <div className="space-y-0.5">
                {yesterdayConvs.map((conv) => {
                  const isActive = conv.id === activeConversationId && currentPage === 'chat';
                  return (
                    <button
                      key={conv.id}
                      onClick={() => {
                        onSelectConversation(conv.id);
                        onNavigate('chat');
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
                        isActive 
                          ? 'bg-white/10 font-semibold' 
                          : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      <span className="truncate flex-1">{conv.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Modules */}
        <div className="p-2 border-t border-white/10 space-y-0.5 bg-black/10">
          <button
            onClick={() => { onNavigate('chat'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
              currentPage === 'chat' ? 'bg-white/10 font-bold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span className="flex-1">Chat & Runner</span>
          </button>

          <button
            onClick={() => { onNavigate('models'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
              currentPage === 'models' ? 'bg-white/10 font-bold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span className="flex-1">Models (LiteRT-LM)</span>
          </button>

          <button
            onClick={() => { onNavigate('tools'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
              currentPage === 'tools' ? 'bg-white/10 font-bold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <Wrench className="w-4 h-4 text-sky-400" />
            <span className="flex-1">Automation Tools</span>
          </button>

          <button
            onClick={() => { onNavigate('playbooks'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
              currentPage === 'playbooks' ? 'bg-white/10 font-bold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="flex-1">Playbooks</span>
          </button>

          <button
            onClick={() => { onNavigate('vault'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
              currentPage === 'vault' ? 'bg-white/10 font-bold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <Brain className="w-4 h-4 text-pink-400" />
            <span className="flex-1">Knowledge Vault</span>
          </button>

          <button
            onClick={() => { onNavigate('settings'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
              currentPage === 'settings' ? 'bg-white/10 font-bold' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4 text-purple-400" />
            <span className="flex-1">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};
