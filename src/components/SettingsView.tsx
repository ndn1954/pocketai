import React, { useState } from 'react';
import { PermissionItem, ChannelSettings, ThemeId } from '../types';
import { ThemeConfig, THEMES } from '../theme/themes';
import { 
  ArrowLeft, 
  Palette, 
  Send, 
  Check, 
  ExternalLink, 
  Globe, 
  MessageSquare, 
  Sliders, 
  Tv, 
  Smartphone,
  Shield,
  CircleDot,
  Radio
} from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
  permissions: PermissionItem[];
  onTogglePermission: (id: string) => void;
  currentThemeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  channels: ChannelSettings;
  onUpdateChannels: (channels: Partial<ChannelSettings>) => void;
  deviceType: 'mobile' | 'tv';
  onToggleDeviceType: () => void;
  isFloatingCircleEnabled: boolean;
  onToggleFloatingCircle: () => void;
  onOpenLanPortal: () => void;
  theme: ThemeConfig;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onBack,
  permissions,
  onTogglePermission,
  currentThemeId,
  onSelectTheme,
  channels,
  onUpdateChannels,
  deviceType,
  onToggleDeviceType,
  isFloatingCircleEnabled,
  onToggleFloatingCircle,
  onOpenLanPortal,
  theme,
}) => {
  const [telegramToken, setTelegramToken] = useState(channels.telegram.botToken);
  const [telegramSaved, setTelegramSaved] = useState(false);

  const handleSaveTelegram = () => {
    onUpdateChannels({
      telegram: {
        ...channels.telegram,
        botToken: telegramToken,
        status: telegramToken ? 'connected' : 'disconnected',
      },
    });
    setTelegramSaved(true);
    setTimeout(() => setTelegramSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none" style={{ color: theme.textPrimaryHex }}>
      {/* Top Bar */}
      <div 
        className="h-12 px-4 flex items-center justify-between border-b shrink-0"
        style={{ borderColor: theme.borderHex, backgroundColor: theme.surfaceHex }}
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-base font-bold">Settings</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Permissions Section */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            System Permissions & Guards
          </div>
          <div 
            className="rounded-2xl border overflow-hidden divide-y"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            {permissions.map((perm) => {
              const isOk = perm.status === 'granted';
              return (
                <div 
                  key={perm.id} 
                  onClick={() => onTogglePermission(perm.id)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl w-7 text-center">{perm.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{perm.name}</div>
                      <div className="text-xs opacity-60 mt-0.5">{perm.description}</div>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 transition-all ${
                    isOk
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/25 animate-pulse'
                  }`}>
                    {isOk ? 'Enabled' : 'Restricted (Tap)'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appearance & Themes */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            Appearance (All 8 Original Themes)
          </div>
          <div 
            className="p-3.5 rounded-2xl border space-y-3"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(THEMES) as ThemeId[]).map((tid) => {
                const t = THEMES[tid];
                const isSelected = tid === currentThemeId;
                return (
                  <button
                    key={tid}
                    onClick={() => onSelectTheme(tid)}
                    className={`p-2.5 rounded-xl flex flex-col items-center gap-1.5 border transition-all ${
                      isSelected 
                        ? 'border-orange-500 shadow-md scale-105' 
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/20'
                    }`}
                    style={{ backgroundColor: t.bgHex }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center border border-white/20" style={{ backgroundColor: t.accentColor }}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-[10px] font-medium" style={{ color: t.textPrimaryHex }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Remote Control & Bot Gateways */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            Remote Control Channels
          </div>
          <div 
            className="rounded-2xl border overflow-hidden divide-y"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            {/* Telegram */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">✈️</span>
                  <div>
                    <div className="text-sm font-medium">Telegram Bot</div>
                    <div className="text-xs opacity-60">Control this phone from another phone or PC</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                  channels.telegram.status === 'connected' 
                    ? 'bg-emerald-500/15 text-emerald-400' 
                    : 'bg-white/10 opacity-60'
                }`}>
                  {channels.telegram.status === 'connected' ? 'Connected' : 'Offline'}
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <input
                  type="password"
                  value={telegramToken}
                  onChange={(e) => setTelegramToken(e.target.value)}
                  placeholder="Bot token (e.g. 7129481923:AAH...)"
                  className="flex-1 bg-black/20 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono outline-none focus:border-orange-500"
                />
                <button
                  onClick={handleSaveTelegram}
                  className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold"
                >
                  {telegramSaved ? 'Saved ✓' : 'Save'}
                </button>
              </div>
            </div>

            {/* Discord */}
            <div className="p-3.5 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎮</span>
                <div>
                  <div className="text-sm font-medium">Discord Bot</div>
                  <div className="text-xs opacity-60">Command bot through Discord channel gateway</div>
                </div>
              </div>
              <span className="text-xs opacity-40">Ready to link</span>
            </div>

            {/* LAN Configuration Web Portal */}
            <div 
              onClick={onOpenLanPortal}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-sky-400" />
                <div>
                  <div className="text-sm font-medium">Embedded LAN Config Portal</div>
                  <div className="text-xs opacity-60">Built-in HTTP server on port 8080 (app/src/main/assets/web)</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-orange-400 flex items-center gap-1">
                Open Web UI →
              </span>
            </div>
          </div>
        </div>

        {/* Device Profile & Overlay */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            Harness Environment
          </div>
          <div 
            className="rounded-2xl border overflow-hidden divide-y"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            {/* Device Mode */}
            <div 
              onClick={onToggleDeviceType}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                {deviceType === 'mobile' ? (
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Tv className="w-5 h-5 text-purple-400" />
                )}
                <div>
                  <div className="text-sm font-medium">Target Device Profile</div>
                  <div className="text-xs opacity-60">
                    {deviceType === 'mobile' ? 'Mobile Touchscreen (Taps, Swipes, Nodes)' : 'Android TV (DPad, Volume, Center Key)'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold uppercase font-mono px-2 py-0.5 rounded bg-white/10">
                {deviceType}
              </span>
            </div>

            {/* Floating Circle Widget */}
            <div 
              onClick={onToggleFloatingCircle}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CircleDot className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-sm font-medium">Floating Assistant Circle</div>
                  <div className="text-xs opacity-60">Always-on draggable overlay circle (EasyFloat)</div>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                isFloatingCircleEnabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 opacity-50'
              }`}>
                {isFloatingCircleEnabled ? 'Active' : 'Hidden'}
              </span>
            </div>
          </div>
        </div>

        {/* About Card */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            About PokeClaw
          </div>
          <div 
            className="p-4 rounded-2xl border space-y-3"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦞</span>
              <div>
                <div className="font-bold text-sm">PokeClaw (PocketClaw)</div>
                <div className="text-xs opacity-60">v0.7.1 · Local-First AI Phone Automation</div>
              </div>
            </div>
            <p className="text-xs opacity-70 leading-relaxed">
              Open-source Android mobile agent harness with Gemma 4 on LiteRT-LM for private, on-device phone control, and optional cloud LLM reasoning for complex cross-app workflows.
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs opacity-60">
              <span>Licensed under Apache 2.0</span>
              <span>github.com/agents-io/PokeClaw</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
