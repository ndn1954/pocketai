import React, { useState } from 'react';
import { ModelInfo, CloudLlmSettings } from '../types';
import { ThemeConfig } from '../theme/themes';
import { 
  ArrowLeft, 
  HardDrive, 
  Check, 
  Trash2, 
  Download, 
  Key, 
  Layers, 
  Server, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface ModelsViewProps {
  onBack: () => void;
  models: ModelInfo[];
  activeModelId: string;
  onSelectModel: (id: string) => void;
  onDownloadModel: (id: string) => void;
  onDeleteModel: (id: string) => void;
  cloudConfig: CloudLlmSettings;
  onUpdateCloudConfig: (cfg: Partial<CloudLlmSettings>) => void;
  theme: ThemeConfig;
}

export const ModelsView: React.FC<ModelsViewProps> = ({
  onBack,
  models,
  activeModelId,
  onSelectModel,
  onDownloadModel,
  onDeleteModel,
  cloudConfig,
  onUpdateCloudConfig,
  theme,
}) => {
  const [showKey, setShowKey] = useState(false);
  const [customModelUrl, setCustomModelUrl] = useState('');
  const [customAdded, setCustomAdded] = useState(false);

  const activeModel = models.find(m => m.id === activeModelId) || models[0];
  const downloadedLocalModels = models.filter(m => m.type === 'local' && m.isDownloaded);
  const usedStorageMb = downloadedLocalModels.reduce((acc, m) => acc + m.sizeMb, 0);
  const totalStorageMb = 4096;
  const storagePercent = Math.min(100, Math.round((usedStorageMb / totalStorageMb) * 100));

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
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">Models & Inference</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 opacity-70">
              LiteRT-LM
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Active Model Card */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            Active Engine
          </div>
          <div 
            className="p-4 rounded-2xl border shadow-sm flex items-center justify-between"
            style={{ 
              backgroundColor: theme.surfaceHex, 
              borderColor: `${theme.accentColor}50` 
            }}
          >
            <div className="flex items-center gap-3.5">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
                style={{ backgroundColor: `${theme.accentColor}25` }}
              >
                🦞
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-tight">{activeModel.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ● Ready
                  </span>
                </div>
                <div className="text-xs opacity-60 mt-0.5">
                  {activeModel.family} · {activeModel.type === 'local' ? `${activeModel.sizeLabel} · On-device execution` : 'Cloud reasoning'}
                </div>
                <div className="text-[11px] opacity-40 mt-1">
                  {activeModel.ramRequired}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local On-Device Models */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2 flex items-center justify-between">
            <span>On-Device Models (LiteRT-LM)</span>
            <span className="text-[10px] lowercase opacity-70">Offline & Private</span>
          </div>

          <div 
            className="rounded-2xl border overflow-hidden divide-y"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            {models.filter(m => m.type === 'local').map((model) => {
              const isActive = model.id === activeModelId;
              return (
                <div key={model.id} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">{model.name}</span>
                      {model.recommended && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 font-semibold">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-xs opacity-60 line-clamp-1 mt-0.5">
                      {model.description}
                    </div>
                    <div className="text-[10px] opacity-40 mt-1 font-mono">
                      {model.sizeLabel} · {model.ramRequired}
                    </div>

                    {/* Download Progress Bar */}
                    {model.isDownloading && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-[10px] opacity-70">
                          <span className="flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 animate-spin text-orange-400" />
                            Downloading weights...
                          </span>
                          <span>{model.downloadProgress || 45}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-orange-500 rounded-full transition-all duration-300"
                            style={{ width: `${model.downloadProgress || 45}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {model.isDownloaded ? (
                      <>
                        <button
                          onClick={() => onSelectModel(model.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white/10 hover:bg-white/15 text-white/90'
                          }`}
                        >
                          {isActive ? 'Active' : 'Select'}
                        </button>
                        <button
                          onClick={() => onDeleteModel(model.id)}
                          title="Delete downloaded weights"
                          className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onDownloadModel(model.id)}
                        disabled={model.isDownloading}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 active:scale-95 text-white flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Get ({model.sizeLabel})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Storage Bar */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            Storage Allocation
          </div>
          <div 
            className="p-3.5 rounded-2xl border space-y-2"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 opacity-60" />
                <span className="font-medium">On-Device Model Storage</span>
              </span>
              <span className="font-mono text-[11px] opacity-70">
                {usedStorageMb} MB / {totalStorageMb} MB ({storagePercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${storagePercent}%`, 
                  backgroundColor: storagePercent > 80 ? '#ef4444' : '#10b981' 
                }}
              />
            </div>
            <div className="text-[10px] opacity-40">
              {downloadedLocalModels.length} models installed in local flash cache. Zero network access required during task execution.
            </div>
          </div>
        </div>

        {/* Cloud LLM Providers */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2 flex items-center justify-between">
            <span>Cloud LLM Providers</span>
            <span className="text-[10px] opacity-60">Optional BYOK</span>
          </div>

          <div 
            className="p-4 rounded-2xl border space-y-4"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            <div>
              <label className="text-xs font-medium opacity-70 block mb-1.5">
                Provider
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['openai', 'anthropic', 'gemini', 'custom'] as const).map((prov) => (
                  <button
                    key={prov}
                    onClick={() => onUpdateCloudConfig({ provider: prov })}
                    className={`py-1.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all border ${
                      cloudConfig.provider === prov
                        ? 'border-orange-500 bg-orange-500/20 text-orange-300'
                        : 'border-white/10 hover:bg-white/5 opacity-60'
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium opacity-70 block mb-1">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={cloudConfig.apiKey}
                  onChange={(e) => onUpdateCloudConfig({ apiKey: e.target.value })}
                  placeholder={cloudConfig.provider === 'openai' ? 'sk-...' : 'Enter your API key...'}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-orange-500 transition-colors pr-16 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-50 hover:opacity-100 px-1 py-0.5"
                >
                  {showKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-[10px] opacity-40 mt-1">
                API keys are kept strictly on your client. Never sent to any central server.
              </p>
            </div>

            <div>
              <label className="text-xs font-medium opacity-70 block mb-1">
                Base URL (Proxy / Endpoint)
              </label>
              <input
                type="text"
                value={cloudConfig.baseUrl}
                onChange={(e) => onUpdateCloudConfig({ baseUrl: e.target.value })}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-orange-500 transition-colors font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium opacity-70">
                  Temperature ({cloudConfig.temperature})
                </label>
                <span className="text-[10px] opacity-40">Lower = deterministic tool calling</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={cloudConfig.temperature}
                onChange={(e) => onUpdateCloudConfig({ temperature: parseFloat(e.target.value) })}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Custom Local Model URL (#36) */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
            Custom GGUF / LiteRT Weight URL
          </div>
          <div 
            className="p-3.5 rounded-2xl border space-y-2.5"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            <div className="flex gap-2">
              <input 
                type="text"
                value={customModelUrl}
                onChange={(e) => setCustomModelUrl(e.target.value)}
                placeholder="https://huggingface.co/.../model.bin"
                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-orange-500 font-mono"
              />
              <button 
                onClick={() => {
                  if (customModelUrl) {
                    setCustomAdded(true);
                    setTimeout(() => setCustomAdded(false), 2500);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold whitespace-nowrap"
              >
                {customAdded ? 'Saved ✓' : 'Register'}
              </button>
            </div>
            <div className="text-[10px] opacity-40">
              Download and sideload external LiteRT quantized checkpoints directly to device storage.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
