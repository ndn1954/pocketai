import React, { useState } from 'react';
import { 
  ThemeId, 
  ActivePage, 
  ModelInfo, 
  AutomationTool, 
  PermissionItem, 
  Playbook, 
  VaultNote, 
  Conversation, 
  ChatMessage, 
  TaskStep, 
  ChannelSettings, 
  CloudLlmSettings 
} from './types';
import { THEMES, ThemeConfig } from './theme/themes';
import { 
  INITIAL_MODELS, 
  INITIAL_TOOLS, 
  INITIAL_PERMISSIONS, 
  INITIAL_PLAYBOOKS, 
  INITIAL_VAULT_NOTES, 
  INITIAL_CONVERSATIONS, 
  DEFAULT_CHANNELS, 
  DEFAULT_CLOUD_CONFIG 
} from './data/initialData';
import { ChatView } from './components/ChatView';
import { ModelsView } from './components/ModelsView';
import { ToolsView } from './components/ToolsView';
import { SettingsView } from './components/SettingsView';
import { PlaybooksView } from './components/PlaybooksView';
import { KnowledgeVaultView } from './components/KnowledgeVaultView';
import { LanConfigModal } from './components/LanConfigModal';
import { ModelSheet } from './components/ModelSheet';
import { Sidebar } from './components/Sidebar';
import { FloatingCircle } from './components/FloatingCircle';
import { PhoneSimulator, ScreenState } from './components/PhoneSimulator';

export function App() {
  // Theme state
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('abyss-d');
  const theme: ThemeConfig = THEMES[currentThemeId];

  // Navigation state
  const [currentPage, setCurrentPage] = useState<ActivePage>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModelSheetOpen, setIsModelSheetOpen] = useState(false);
  const [isLanModalOpen, setIsLanModalOpen] = useState(false);
  const [showPhonePreview, setShowPhonePreview] = useState(true);
  const [isListeningMic, setIsListeningMic] = useState(false);

  // Core Data states
  const [models, setModels] = useState<ModelInfo[]>(INITIAL_MODELS);
  const [activeModelId, setActiveModelId] = useState<string>('functiongemma-270m');
  const [tools, setTools] = useState<AutomationTool[]>(INITIAL_TOOLS);
  const [permissions, setPermissions] = useState<PermissionItem[]>(INITIAL_PERMISSIONS);
  const [playbooks, setPlaybooks] = useState<Playbook[]>(INITIAL_PLAYBOOKS);
  const [vaultNotes, setVaultNotes] = useState<VaultNote[]>(INITIAL_VAULT_NOTES);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [channels, setChannels] = useState<ChannelSettings>(DEFAULT_CHANNELS);
  const [cloudConfig, setCloudConfig] = useState<CloudLlmSettings>(DEFAULT_CLOUD_CONFIG);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tv'>('mobile');
  const [isFloatingCircleEnabled, setIsFloatingCircleEnabled] = useState(true);

  // Phone Simulator state
  const [phoneScreen, setPhoneScreen] = useState<ScreenState>('home');
  const [lastTapPoint, setLastTapPoint] = useState<{ x: number; y: number } | null>(null);
  const [typingText, setTypingText] = useState<string>('');
  const [isWifiOn, setIsWifiOn] = useState<boolean>(true);
  const [batteryLevel, setBatteryLevel] = useState<number>(72);

  // Task running lock
  const [isTaskRunning, setIsTaskRunning] = useState(false);

  const activeModel = models.find(m => m.id === activeModelId) || models[0];
  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  // Handlers for models
  const handleSelectModel = (id: string) => {
    setActiveModelId(id);
  };

  const handleDownloadModel = (id: string) => {
    setModels(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, isDownloading: true, downloadProgress: 15 };
      }
      return m;
    }));

    setTimeout(() => {
      setModels(prev => prev.map(m => {
        if (m.id === id) return { ...m, downloadProgress: 60 };
        return m;
      }));
    }, 600);

    setTimeout(() => {
      setModels(prev => prev.map(m => {
        if (m.id === id) return { ...m, downloadProgress: 100, isDownloading: false, isDownloaded: true };
        return m;
      }));
    }, 1200);
  };

  const handleDeleteModel = (id: string) => {
    setModels(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, isDownloaded: false, isDownloading: false };
      }
      return m;
    }));
    if (activeModelId === id) {
      setActiveModelId('functiongemma-270m');
    }
  };

  // Tool handlers
  const handleToggleTool = (toolName: string) => {
    setTools(prev => prev.map(t => {
      if (t.name === toolName && !t.isLocked) {
        return { ...t, enabled: !t.enabled };
      }
      return t;
    }));
  };

  const handleExecuteToolMock = (toolName: string, params: Record<string, any>) => {
    switch (toolName) {
      case 'get_screen_info':
        return { 
          success: true, 
          data: { 
            activeApp: phoneScreen,
            nodes: [
              { id: 'statusBar', text: '12:38', clickable: false },
              { id: 'icon_whatsapp', text: 'WhatsApp', bounds: [80, 240, 160, 320], clickable: true },
              { id: 'icon_youtube', text: 'YouTube', bounds: [180, 240, 260, 320], clickable: true },
              { id: 'icon_settings', text: 'Settings', bounds: [280, 240, 360, 320], clickable: true }
            ] 
          } 
        };
      case 'get_device_info':
        return { success: true, data: { battery: `${batteryLevel}%`, wifi: isWifiOn ? 'Connected' : 'Disconnected', os: 'Android 15 (VanillaIceCream)', ramTotal: '12GB', ramFree: '5.4GB' } };
      case 'clipboard':
        return { success: true, data: { text: 'https://github.com/agents-io/PokeClaw' } };
      case 'open_app':
        setPhoneScreen(params.app_name?.toLowerCase().includes('youtube') ? 'youtube' : params.app_name?.toLowerCase().includes('setting') ? 'settings' : 'whatsapp_chat');
        return { success: true, data: { launched: params.app_name || 'App', timeMs: 140 } };
      default:
        return { success: true, data: { tool: toolName, params, status: 'ok' } };
    }
  };

  // Permission toggle (allows user to fix battery optimization)
  const handleTogglePermission = (id: string) => {
    setPermissions(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'granted' ? 'restricted' : 'granted' };
      }
      return p;
    }));
  };

  // Knowledge Vault handlers
  const handleSaveNote = (note: VaultNote) => {
    setVaultNotes(prev => {
      const idx = prev.findIndex(n => n.path === note.path);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = note;
        return copy;
      }
      return [note, ...prev];
    });
  };

  const handleDeleteNote = (path: string) => {
    setVaultNotes(prev => prev.filter(n => n.path !== path));
  };

  // New Chat
  const handleNewChat = () => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New conversation',
      group: 'Today',
      createdAt: 'Just now',
      messages: [
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          text: '🦞 PokeClaw ready. You can chat or tap 🚀 to control this phone with on-device LiteRT-LM tools.',
          timestamp: 'Just now',
        }
      ],
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
  };

  // Conversational message
  const handleSendChat = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: 'Just now',
    };

    const assistantMsgId = `asst-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      text: '',
      timestamp: 'Just now',
      modelUsed: activeModel.name,
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          title: c.messages.length <= 1 ? text : c.title,
          messages: [...c.messages, userMsg, assistantMsg],
        };
      }
      return c;
    }));

    setIsTaskRunning(true);

    setTimeout(() => {
      let reply = `I'm PokeClaw running on ${activeModel.name}. If you want me to interact with phone apps (WhatsApp, YouTube, Settings), tap the 🚀 button to execute an autonomous task!`;
      if (text.toLowerCase().includes('hi') || text.toLowerCase().includes('hello')) {
        reply = `Hello! PokeClaw is ready. I can automate apps on your phone completely on-device without leaking data. Try saying "Open WhatsApp and send hi to Mom" with 🚀.`;
      } else if (text.toLowerCase().includes('battery')) {
        reply = `Your battery is at ${batteryLevel}% and currently healthy.`;
      }

      setConversations(prev => prev.map(c => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            messages: c.messages.map(m => {
              if (m.id === assistantMsgId) {
                return { ...m, text: reply, tokens: 92, cost: 0.0 };
              }
              return m;
            }),
          };
        }
        return c;
      }));
      setIsTaskRunning(false);
    }, 600);
  };

  // Autonomous Task Execution Loop
  const handleSendTask = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: 'Just now',
      isTask: true,
    };

    const assistantMsgId = `asst-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      text: 'Starting autonomous task loop. Observing screen hierarchy...',
      timestamp: 'Just now',
      isTask: true,
      taskStatus: 'running',
      taskSteps: [],
      modelUsed: activeModel.name,
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          title: c.messages.length <= 1 ? text : c.title,
          messages: [...c.messages, userMsg, assistantMsg],
        };
      }
      return c;
    }));

    setIsTaskRunning(true);
    setShowPhonePreview(true);

    const lower = text.toLowerCase();

    // SCENARIO 1: WhatsApp message
    if (lower.includes('whatsapp') || lower.includes('mom') || lower.includes('message')) {
      const steps: TaskStep[] = [
        { id: '1', tool: 'get_screen_info', action: 'screen → found WhatsApp icon on Home', status: 'ok' },
        { id: '2', tool: 'open_app', action: 'tap → opened WhatsApp', status: 'ok' },
        { id: '3', tool: 'get_screen_info', action: 'screen → found Mom in recent chats', status: 'ok' },
        { id: '4', tool: 'find_and_tap', action: 'tap → opened chat with Mom', status: 'ok' },
        { id: '5', tool: 'input_text', action: 'type → "hi"', status: 'ok' },
        { id: '6', tool: 'find_and_tap', action: 'tap → sent', status: 'ok' },
      ];

      // Step 1: Tap icon
      setTimeout(() => {
        setLastTapPoint({ x: 22, y: 55 });
        updateSteps(assistantMsgId, [steps[0]]);
      }, 400);

      // Step 2: Open WhatsApp
      setTimeout(() => {
        setPhoneScreen('whatsapp_chat');
        setLastTapPoint({ x: 50, y: 50 });
        updateSteps(assistantMsgId, [steps[0], steps[1]]);
      }, 900);

      // Step 3 & 4: Find Mom
      setTimeout(() => {
        setLastTapPoint({ x: 45, y: 35 });
        updateSteps(assistantMsgId, [steps[0], steps[1], steps[2], steps[3]]);
      }, 1400);

      // Step 5: Type text
      setTimeout(() => {
        setTypingText('hi');
        setLastTapPoint({ x: 50, y: 92 });
        updateSteps(assistantMsgId, [steps[0], steps[1], steps[2], steps[3], steps[4]]);
      }, 1900);

      // Step 6: Tap send & finish
      setTimeout(() => {
        setLastTapPoint({ x: 92, y: 92 });
        updateSteps(assistantMsgId, steps, 'Done! Sent "hi" to Mom on WhatsApp.', 'success');
        setIsTaskRunning(false);
        setTimeout(() => setLastTapPoint(null), 1000);
      }, 2400);
      return;
    }

    // SCENARIO 2: Battery Check
    if (lower.includes('battery') || lower.includes('power')) {
      const steps: TaskStep[] = [
        { id: '1', tool: 'get_device_info', action: 'device_info → read system battery service', status: 'ok' },
      ];

      setTimeout(() => {
        setPhoneScreen('battery_info');
        updateSteps(assistantMsgId, steps, `🔋 Your battery is currently at ${batteryLevel}% and healthy. Unplugged.`, 'success');
        setIsTaskRunning(false);
      }, 800);
      return;
    }

    // SCENARIO 3: WiFi / Settings
    if (lower.includes('wifi') || lower.includes('setting')) {
      const steps: TaskStep[] = [
        { id: '1', tool: 'open_app', action: 'open_app → Settings launched', status: 'ok' },
        { id: '2', tool: 'get_screen_info', action: 'screen → located Network & internet', status: 'ok' },
        { id: '3', tool: 'find_and_tap', action: 'tap → Wi-Fi switch toggled to OFF', status: 'ok' },
      ];

      setTimeout(() => {
        setPhoneScreen('settings');
        setLastTapPoint({ x: 88, y: 22 });
        updateSteps(assistantMsgId, [steps[0], steps[1]]);
      }, 600);

      setTimeout(() => {
        setIsWifiOn(false);
        setLastTapPoint({ x: 88, y: 22 });
        updateSteps(assistantMsgId, steps, 'WiFi network has been switched OFF in Settings.', 'success');
        setIsTaskRunning(false);
        setTimeout(() => setLastTapPoint(null), 1000);
      }, 1500);
      return;
    }

    // SCENARIO 4: YouTube search
    if (lower.includes('youtube') || lower.includes('cat') || lower.includes('video')) {
      const steps: TaskStep[] = [
        { id: '1', tool: 'open_app', action: 'open_app → YouTube launched', status: 'ok' },
        { id: '2', tool: 'find_and_tap', action: 'tap → search bar', status: 'ok' },
        { id: '3', tool: 'input_text', action: 'type → "funny cat videos"', status: 'ok' },
        { id: '4', tool: 'system_key', action: 'system_key → enter submitted', status: 'ok' },
      ];

      setTimeout(() => {
        setPhoneScreen('youtube');
        setTypingText('funny cat videos');
        updateSteps(assistantMsgId, steps, 'Opened YouTube and searched "funny cat videos". Results are displayed on screen.', 'success');
        setIsTaskRunning(false);
      }, 1200);
      return;
    }

    // SCENARIO 5: Generic Fallback Task
    const genericSteps: TaskStep[] = [
      { id: '1', tool: 'get_screen_info', action: `screen → inspecting active UI for "${text}"`, status: 'ok' },
      { id: '2', tool: 'find_and_tap', action: 'tap → coordinate matched for target action', status: 'ok' },
      { id: '3', tool: 'finish', action: 'finish → task completed successfully', status: 'ok' },
    ];

    setTimeout(() => {
      setLastTapPoint({ x: 50, y: 50 });
      updateSteps(assistantMsgId, genericSteps, `Completed task: "${text}". All steps executed successfully.`, 'success');
      setIsTaskRunning(false);
      setTimeout(() => setLastTapPoint(null), 1000);
    }, 1200);
  };

  const updateSteps = (
    msgId: string, 
    steps: TaskStep[], 
    finalText?: string, 
    status: 'running' | 'success' | 'failed' = 'running'
  ) => {
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          messages: c.messages.map(m => {
            if (m.id === msgId) {
              return {
                ...m,
                taskSteps: steps,
                text: finalText !== undefined ? finalText : m.text,
                taskStatus: status,
                tokens: (m.tokens || 100) + steps.length * 35,
                cost: 0.0,
              };
            }
            return m;
          }),
        };
      }
      return c;
    }));
  };

  const handleToggleMic = () => {
    if (!isListeningMic) {
      setIsListeningMic(true);
      setTimeout(() => {
        setIsListeningMic(false);
        handleSendTask('Open WhatsApp and send hi to Mom');
      }, 2000);
    } else {
      setIsListeningMic(false);
    }
  };

  return (
    <div 
      className={`w-full h-screen overflow-hidden flex flex-col justify-center items-center p-0 md:p-4 select-none ${theme.cssClass}`}
      style={{ backgroundColor: '#08080a' }}
    >
      {/* Top Floating Theme Bar matching the original prototype */}
      <div className="hidden lg:flex fixed top-3 left-1/2 -translate-x-1/2 z-30 gap-1.5 p-1 bg-[#141417]/90 border border-white/10 rounded-full backdrop-blur-md shadow-xl text-xs">
        {(Object.keys(THEMES) as ThemeId[]).map((tid) => {
          const t = THEMES[tid];
          const isSelected = tid === currentThemeId;
          return (
            <button
              key={tid}
              onClick={() => setCurrentThemeId(tid)}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                isSelected 
                  ? 'bg-white/20 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main Container Layout */}
      <div className="w-full h-full max-w-6xl flex items-center justify-center gap-6">
        {/* Device Frame Shell */}
        <div 
          className="relative w-full max-w-[420px] h-full max-h-[880px] rounded-none md:rounded-[44px] overflow-hidden flex flex-col border-0 md:border-2 shadow-2xl transition-all duration-300"
          style={{ 
            backgroundColor: theme.bgHex, 
            borderColor: theme.borderHex,
            boxShadow: '0 25px 70px rgba(0,0,0,0.6)'
          }}
        >
          {/* Active Page View */}
          {currentPage === 'chat' && (
            <ChatView
              messages={activeConversation.messages}
              isTaskRunning={isTaskRunning}
              onSendChat={handleSendChat}
              onSendTask={handleSendTask}
              onNewChat={handleNewChat}
              onOpenSettings={() => setCurrentPage('settings')}
              onOpenMenu={() => setIsSidebarOpen(true)}
              onOpenModelSheet={() => setIsModelSheetOpen(true)}
              activeModel={activeModel}
              permissions={permissions}
              theme={theme}
              showPhonePreview={showPhonePreview}
              onTogglePhonePreview={() => setShowPhonePreview(!showPhonePreview)}
              isListeningMic={isListeningMic}
              onToggleMic={handleToggleMic}
            />
          )}

          {currentPage === 'models' && (
            <ModelsView
              onBack={() => setCurrentPage('chat')}
              models={models}
              activeModelId={activeModelId}
              onSelectModel={handleSelectModel}
              onDownloadModel={handleDownloadModel}
              onDeleteModel={handleDeleteModel}
              cloudConfig={cloudConfig}
              onUpdateCloudConfig={(cfg) => setCloudConfig(prev => ({ ...prev, ...cfg }))}
              theme={theme}
            />
          )}

          {currentPage === 'tools' && (
            <ToolsView
              onBack={() => setCurrentPage('chat')}
              tools={tools}
              onToggleTool={handleToggleTool}
              theme={theme}
              onExecuteToolMock={handleExecuteToolMock}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsView
              onBack={() => setCurrentPage('chat')}
              permissions={permissions}
              onTogglePermission={handleTogglePermission}
              currentThemeId={currentThemeId}
              onSelectTheme={setCurrentThemeId}
              channels={channels}
              onUpdateChannels={(c) => setChannels(prev => ({ ...prev, ...c }))}
              deviceType={deviceType}
              onToggleDeviceType={() => setDeviceType(prev => prev === 'mobile' ? 'tv' : 'mobile')}
              isFloatingCircleEnabled={isFloatingCircleEnabled}
              onToggleFloatingCircle={() => setIsFloatingCircleEnabled(!isFloatingCircleEnabled)}
              onOpenLanPortal={() => setIsLanModalOpen(true)}
              theme={theme}
            />
          )}

          {currentPage === 'playbooks' && (
            <PlaybooksView
              onBack={() => setCurrentPage('chat')}
              playbooks={playbooks}
              onRunPlaybookPrompt={(prompt) => {
                setCurrentPage('chat');
                handleSendTask(prompt);
              }}
              theme={theme}
            />
          )}

          {currentPage === 'vault' && (
            <KnowledgeVaultView
              onBack={() => setCurrentPage('chat')}
              notes={vaultNotes}
              onSaveNote={handleSaveNote}
              onDeleteNote={handleDeleteNote}
              theme={theme}
            />
          )}
        </div>

        {/* Live Phone Screen Display (Side-by-side companion on larger screens) */}
        {showPhonePreview && (
          <div className="hidden lg:flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Simulated Device Viewport</span>
            </div>
            <PhoneSimulator
              currentScreen={phoneScreen}
              onScreenChange={setPhoneScreen}
              lastTapPoint={lastTapPoint}
              typingText={typingText}
              isWifiOn={isWifiOn}
              onToggleWifi={() => setIsWifiOn(!isWifiOn)}
              batteryLevel={batteryLevel}
            />
            <div className="text-[11px] text-white/40 mt-3 text-center max-w-[280px]">
              Tap actions and coordinates are rendered live as PokeClaw executes tools.
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        theme={theme}
      />

      {/* Model Switcher Bottom Sheet */}
      <ModelSheet
        isOpen={isModelSheetOpen}
        onClose={() => setIsModelSheetOpen(false)}
        models={models}
        activeModelId={activeModelId}
        onSelectModel={handleSelectModel}
        theme={theme}
        onGoModelsPage={() => setCurrentPage('models')}
      />

      {/* Embedded LAN Config Portal Modal */}
      <LanConfigModal
        isOpen={isLanModalOpen}
        onClose={() => setIsLanModalOpen(false)}
        cloudConfig={cloudConfig}
        onSaveCloudConfig={(cfg) => setCloudConfig(prev => ({ ...prev, ...cfg }))}
        channels={channels}
        theme={theme}
      />

      {/* Floating Circle Widget */}
      <FloatingCircle
        isVisible={isFloatingCircleEnabled}
        isTaskRunning={isTaskRunning}
        onOpenChat={() => setCurrentPage('chat')}
        onQuickRun={handleSendTask}
        theme={theme}
      />
    </div>
  );
}

export default App;
