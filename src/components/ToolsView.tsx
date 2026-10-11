import React, { useState } from 'react';
import { AutomationTool } from '../types';
import { ThemeConfig } from '../theme/themes';
import { 
  ArrowLeft, 
  Terminal, 
  Play, 
  Check, 
  X, 
  SlidersHorizontal,
  Smartphone,
  Tv,
  HelpCircle
} from 'lucide-react';

interface ToolsViewProps {
  onBack: () => void;
  tools: AutomationTool[];
  onToggleTool: (toolName: string) => void;
  theme: ThemeConfig;
  onExecuteToolMock: (toolName: string, params: Record<string, any>) => { success: boolean; data: any };
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  onBack,
  tools,
  onToggleTool,
  theme,
  onExecuteToolMock,
}) => {
  const [filterDevice, setFilterDevice] = useState<'all' | 'mobile' | 'tv'>('all');
  const [testTool, setTestTool] = useState<AutomationTool | null>(null);
  const [testParam, setTestParam] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  const categories: AutomationTool['category'][] = [
    'Screen',
    'Actions',
    'Navigation',
    'Device & Data',
    'Knowledge Base',
    'TV Remote',
    'Safety',
  ];

  const enabledCount = tools.filter(t => t.enabled).length;
  const disabledCount = tools.filter(t => !t.enabled).length;

  const handleRunTest = (tool: AutomationTool) => {
    let params: Record<string, any> = {};
    try {
      if (testParam.trim().startsWith('{')) {
        params = JSON.parse(testParam);
      } else if (testParam.trim()) {
        params = { text: testParam.trim(), query: testParam.trim(), app_name: testParam.trim() };
      }
    } catch {
      params = { raw: testParam };
    }

    const res = onExecuteToolMock(tool.name, params);
    setTestResult(JSON.stringify(res, null, 2));
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
            <span className="text-base font-bold">Automation Tools</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              {enabledCount} Active
            </span>
          </div>
        </div>

        {/* Device type filter */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/5 text-[11px]">
          <button
            onClick={() => setFilterDevice('all')}
            className={`px-2 py-0.5 rounded-lg transition-all ${filterDevice === 'all' ? 'bg-white/20 font-bold' : 'opacity-50'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterDevice('mobile')}
            className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${filterDevice === 'mobile' ? 'bg-white/20 font-bold' : 'opacity-50'}`}
          >
            <Smartphone className="w-3 h-3" /> Mobile
          </button>
          <button
            onClick={() => setFilterDevice('tv')}
            className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${filterDevice === 'tv' ? 'bg-white/20 font-bold' : 'opacity-50'}`}
          >
            <Tv className="w-3 h-3" /> TV
          </button>
        </div>
      </div>

      {/* Tool Categories list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {categories.map((category) => {
          const categoryTools = tools.filter(t => {
            const matchesCat = t.category === category;
            const matchesDev = filterDevice === 'all' || t.deviceType === 'all' || t.deviceType === filterDevice;
            return matchesCat && matchesDev;
          });

          if (categoryTools.length === 0) return null;

          return (
            <div key={category}>
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-40 px-1 mb-2">
                {category}
              </div>

              <div 
                className="rounded-2xl border overflow-hidden divide-y"
                style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
              >
                {categoryTools.map((tool) => (
                  <div key={tool.name} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-orange-400">
                          {tool.name}
                        </span>
                        <span className="text-[11px] opacity-70">
                          ({tool.displayName})
                        </span>
                        {tool.deviceType === 'tv' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                            TV
                          </span>
                        )}
                      </div>
                      <div className="text-xs opacity-60 mt-0.5">
                        {tool.description}
                      </div>
                      {tool.paramsDoc && tool.paramsDoc !== 'none' && (
                        <div className="text-[10px] font-mono opacity-40 mt-1">
                          params: {tool.paramsDoc}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setTestTool(tool);
                          setTestParam('');
                          setTestResult(null);
                        }}
                        title="Test tool execution"
                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>

                      {tool.isLocked ? (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/5 opacity-40 cursor-not-allowed">
                          LOCKED
                        </span>
                      ) : (
                        <button
                          onClick={() => onToggleTool(tool.name)}
                          className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
                            tool.enabled
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                              : 'bg-red-500/15 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {tool.enabled ? 'ON' : 'OFF'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center text-xs opacity-40 py-4">
          {enabledCount} tools enabled · {disabledCount} disabled in agent dispatch table
        </div>
      </div>

      {/* Tool Tester Modal */}
      {testTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div 
            className="w-full max-w-md rounded-2xl border p-4 shadow-2xl space-y-3"
            style={{ backgroundColor: theme.surfaceHex, borderColor: theme.borderHex }}
          >
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: theme.borderHex }}>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-400" />
                <span className="font-mono text-sm font-bold">{testTool.name}()</span>
              </div>
              <button 
                onClick={() => setTestTool(null)} 
                className="p-1 rounded-lg hover:bg-white/10 opacity-60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs opacity-70">
              {testTool.description}
            </p>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1">
                Mock Arguments (String or JSON)
              </label>
              <input
                type="text"
                value={testParam}
                onChange={(e) => setTestParam(e.target.value)}
                placeholder='e.g. "WhatsApp" or {"category": "battery"}'
                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-orange-500"
              />
            </div>

            <button
              onClick={() => handleRunTest(testTool)}
              className="w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white text-xs font-bold transition-all shadow"
            >
              Execute Tool
            </button>

            {testResult && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono opacity-50">Execution Output:</span>
                <pre className="p-3 bg-black/40 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-40 border border-white/5">
                  {testResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
