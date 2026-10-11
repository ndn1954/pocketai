import React, { useState } from 'react';
import { Playbook } from '../types';
import { ThemeConfig } from '../theme/themes';
import { ArrowLeft, BookOpen, ChevronRight, Play, Sparkles } from 'lucide-react';

interface PlaybooksViewProps {
  onBack: () => void;
  playbooks: Playbook[];
  onRunPlaybookPrompt: (prompt: string) => void;
  theme: ThemeConfig;
}

export const PlaybooksView: React.FC<PlaybooksViewProps> = ({
  onBack,
  playbooks,
  onRunPlaybookPrompt,
  theme,
}) => {
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook>(playbooks[0]);

  const samplePrompts: Record<string, string> = {
    send_message: 'Open WhatsApp and send hi to Mom',
    direct_device_data: 'Check my battery level and available storage',
    open_and_search: 'Open YouTube and search funny cat videos',
    open_and_navigate: 'Open Settings and turn off WiFi',
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
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">Playbooks</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">
              Agent Rules
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Playbook list selector */}
        <div 
          className="w-full md:w-64 border-b md:border-b-0 md:border-r overflow-y-auto p-3 space-y-1.5 shrink-0"
          style={{ borderColor: theme.borderHex, backgroundColor: `${theme.surfaceHex}50` }}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-2 mb-1">
            Engine Rulesets
          </div>
          {playbooks.map((pb) => {
            const isSelected = pb.id === selectedPlaybook.id;
            return (
              <button
                key={pb.id}
                onClick={() => setSelectedPlaybook(pb)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  isSelected
                    ? 'border-orange-500/40 bg-orange-500/10 shadow-sm'
                    : 'border-transparent hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="font-semibold text-xs tracking-tight">{pb.name}</div>
                <div className="text-[11px] opacity-60 line-clamp-1 mt-0.5">{pb.summary}</div>
              </button>
            );
          })}
        </div>

        {/* Playbook detail */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{selectedPlaybook.name}</h2>
              <p className="text-xs opacity-70 mt-0.5">{selectedPlaybook.summary}</p>
            </div>
            {samplePrompts[selectedPlaybook.id] && (
              <button
                onClick={() => onRunPlaybookPrompt(samplePrompts[selectedPlaybook.id])}
                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Test Run</span>
              </button>
            )}
          </div>

          {/* Triggers */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 mb-1.5">
              Intent Triggers
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedPlaybook.triggers.map((trig) => (
                <span 
                  key={trig} 
                  className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-mono opacity-80"
                >
                  &quot;{trig}&quot;
                </span>
              ))}
            </div>
          </div>

          {/* Sequential Execution Plan */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 mb-1.5">
              Step Execution Plan
            </div>
            <div 
              className="p-3.5 rounded-2xl border space-y-2 font-mono text-xs"
              style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
            >
              {selectedPlaybook.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold shrink-0">{idx + 1}.</span>
                  <span className="opacity-80">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Markdown Reference */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 mb-1.5">
              Raw Markdown Document (app/src/main/assets/playbooks/)
            </div>
            <pre 
              className="p-4 rounded-2xl border text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap"
              style={{ backgroundColor: `${theme.surfaceHex}80`, borderColor: theme.borderHex }}
            >
              {selectedPlaybook.markdown}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
