import React, { useState } from 'react';
import { ThemeConfig } from '../theme/themes';
import { CloudLlmSettings, ChannelSettings } from '../types';
import { X, Globe, Save, CheckCircle2 } from 'lucide-react';

interface LanConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  cloudConfig: CloudLlmSettings;
  onSaveCloudConfig: (cfg: Partial<CloudLlmSettings>) => void;
  channels: ChannelSettings;
  theme: ThemeConfig;
}

export const LanConfigModal: React.FC<LanConfigModalProps> = ({
  isOpen,
  onClose,
  cloudConfig,
  onSaveCloudConfig,
  channels,
  theme,
}) => {
  const [apiKey, setApiKey] = useState(cloudConfig.apiKey);
  const [baseUrl, setBaseUrl] = useState(cloudConfig.baseUrl);
  const [modelName, setModelName] = useState(cloudConfig.modelName);
  const [dingtalkId, setDingtalkId] = useState('');
  const [feishuId, setFeishuId] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveCloudConfig({
      apiKey,
      baseUrl,
      modelName,
    });
    setToastMessage('Configurations saved to PokeClaw device storage!');
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#f5f5f7] text-[#1d1d1f] rounded-3xl shadow-2xl p-6 font-sans my-8 border border-white/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
        >
          <X className="w-4 h-4 text-zinc-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5856D6]/10 text-[#5856D6] text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Embedded NanoHTTPD Server · {channels.lanServer.accessUrl}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#5856D6]">PokeClaw Web Portal</h1>
          <p className="text-xs text-[#86868b] mt-1">
            Configure LLM credentials and enterprise webhooks from your computer browser over LAN
          </p>
        </div>

        {toastMessage && (
          <div className="mb-4 p-3 bg-emerald-500 text-white rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {/* Card: LLM */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
            <div className="flex items-center gap-2 font-semibold text-sm mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" />
              <span>LLM Engine Settings</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  API Key (OpenAI / Claude / Gemini)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 text-sm bg-[#fafafa] border border-[#e5e5ea] rounded-xl outline-none focus:border-[#5856D6] text-zinc-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Base URL
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://api.openai.com/v1"
                  className="w-full px-3 py-2 text-sm bg-[#fafafa] border border-[#e5e5ea] rounded-xl outline-none focus:border-[#5856D6] text-zinc-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Model Name
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="gpt-4o"
                  className="w-full px-3 py-2 text-sm bg-[#fafafa] border border-[#e5e5ea] rounded-xl outline-none focus:border-[#5856D6] text-zinc-800 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Card: DingTalk */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
            <div className="flex items-center gap-2 font-semibold text-sm mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3370FF]" />
              <span>DingTalk Robot Gateway</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Client ID (AppKey)
                </label>
                <input
                  type="text"
                  value={dingtalkId}
                  onChange={(e) => setDingtalkId(e.target.value)}
                  placeholder="ding..."
                  className="w-full px-3 py-2 text-sm bg-[#fafafa] border border-[#e5e5ea] rounded-xl outline-none focus:border-[#5856D6] text-zinc-800 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Card: Feishu */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
            <div className="flex items-center gap-2 font-semibold text-sm mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D6B9]" />
              <span>Feishu / Lark Integration</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">
                App ID
              </label>
              <input
                type="text"
                value={feishuId}
                onChange={(e) => setFeishuId(e.target.value)}
                placeholder="cli_..."
                className="w-full px-3 py-2 text-sm bg-[#fafafa] border border-[#e5e5ea] rounded-xl outline-none focus:border-[#5856D6] text-zinc-800 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 text-sm font-semibold rounded-xl bg-[#5856D6] text-white hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-300"
          >
            <Save className="w-4 h-4" />
            <span>Save to Device</span>
          </button>
        </div>
      </div>
    </div>
  );
};
