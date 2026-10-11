export type ThemeId = 
  | 'ember-d' 
  | 'abyss-d' 
  | 'moss-d' 
  | 'onyx-d' 
  | 'ember-l' 
  | 'abyss-l' 
  | 'moss-l' 
  | 'onyx-l';

export type ActivePage = 
  | 'chat' 
  | 'settings' 
  | 'models' 
  | 'tools' 
  | 'vault' 
  | 'playbooks'
  | 'lan-config';

export interface ModelInfo {
  id: string;
  name: string;
  family: string;
  description: string;
  type: 'local' | 'cloud';
  sizeMb: number;
  sizeLabel: string;
  ramRequired: string;
  isDownloaded: boolean;
  isDownloading?: boolean;
  downloadProgress?: number;
  provider?: 'openai' | 'anthropic' | 'gemini' | 'custom';
  recommended?: boolean;
}

export interface TaskStep {
  id: string;
  tool: string;
  action: string;
  status: 'ok' | 'running' | 'failed';
  detail?: string;
  output?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isTask?: boolean;
  taskStatus?: 'running' | 'success' | 'failed';
  taskSteps?: TaskStep[];
  tokens?: number;
  cost?: number;
  executionTimeMs?: number;
  modelUsed?: string;
}

export interface Conversation {
  id: string;
  title: string;
  group: 'Today' | 'Yesterday' | 'Previous';
  createdAt: string;
  messages: ChatMessage[];
}

export interface AutomationTool {
  name: string;
  displayName: string;
  category: 'Screen' | 'Actions' | 'Navigation' | 'Device & Data' | 'Knowledge Base' | 'TV Remote' | 'Safety';
  description: string;
  enabled: boolean;
  isLocked?: boolean;
  deviceType: 'all' | 'mobile' | 'tv';
  paramsDoc?: string;
}

export interface PermissionItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'granted' | 'restricted' | 'disabled';
  critical?: boolean;
}

export interface VaultNote {
  path: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  updatedAt: string;
}

export interface Playbook {
  id: string;
  name: string;
  triggers: string[];
  summary: string;
  steps: string[];
  markdown: string;
}

export interface ChannelSettings {
  telegram: {
    enabled: boolean;
    botToken: string;
    chatId: string;
    status: 'connected' | 'disconnected' | 'testing';
  };
  discord: {
    enabled: boolean;
    botToken: string;
    channelId: string;
    status: 'connected' | 'disconnected' | 'testing';
  };
  lanServer: {
    enabled: boolean;
    port: number;
    accessUrl: string;
  };
}

export interface CloudLlmSettings {
  provider: 'openai' | 'anthropic' | 'gemini' | 'custom';
  apiKey: string;
  baseUrl: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
}
