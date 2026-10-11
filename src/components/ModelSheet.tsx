import React from 'react';
import { ModelInfo } from '../types';
import { ThemeConfig } from '../theme/themes';
import { Check, Download, Sparkles, X } from 'lucide-react';

interface ModelSheetProps {
  isOpen: boolean;
  onClose: () => void;
  models: ModelInfo[];
  activeModelId: string;
  onSelectModel: (modelId: string) => void;
  theme: ThemeConfig;
  onGoModelsPage: () => void;
}

export const ModelSheet: React.FC<ModelSheetProps> = ({
  isOpen,
  onClose,
  models,
  activeModelId,
  onSelectModel,
  theme,
  onGoModelsPage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      
      <div 
        className="relative z-10 w-full max-w-md rounded-t-[28px] border-t p-4 pb-8 shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300"
        style={{ 
          backgroundColor: theme.surfaceHex, 
          borderColor: theme.borderHex,
          color: theme.textPrimaryHex 
        }}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between px-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <h3 className="text-base font-bold tracking-tight">Switch Active Model</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-white/10 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5 max-h-[60vh] overflow-y-auto px-1">
          {models.map((model) => {
            const isActive = model.id === activeModelId;
            return (
              <div
                key={model.id}
                onClick={() => {
                  if (model.isDownloaded) {
                    onSelectModel(model.id);
                    onClose();
                  } else {
                    onGoModelsPage();
                    onClose();
                  }
                }}
                className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                  isActive 
                    ? 'border-orange-500/40 bg-orange-500/10' 
                    : 'border-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm truncate">{model.name}</span>
                    {model.type === 'local' ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Local
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/20">
                        Cloud
                      </span>
                    )}
                    {model.recommended && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 font-medium">
                        Best
                      </span>
                    )}
                  </div>
                  <div className="text-xs opacity-60 truncate mt-0.5">
                    {model.family} · {model.sizeLabel} · {model.ramRequired}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {model.isDownloaded ? (
                    isActive ? (
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ color: theme.accentColor, backgroundColor: `${theme.accentColor}20` }}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <span className="text-xs opacity-40">Ready</span>
                    )
                  ) : (
                    <div className="flex items-center gap-1 text-xs opacity-50 text-amber-300">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center px-2">
          <span className="text-xs opacity-50">Need more model options or API keys?</span>
          <button 
            onClick={() => {
              onClose();
              onGoModelsPage();
            }}
            className="text-xs font-semibold hover:underline"
            style={{ color: theme.accentColor }}
          >
            Manage Models →
          </button>
        </div>
      </div>
    </div>
  );
};
