import { ThemeId } from '../types';

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  isDark: boolean;
  accentColor: string;
  bgHex: string;
  surfaceHex: string;
  userBubbleHex: string;
  aiBubbleHex: string;
  textPrimaryHex: string;
  textSecondaryHex: string;
  borderHex: string;
  cssClass: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'abyss-d': {
    id: 'abyss-d',
    label: 'Abyss',
    isDark: true,
    accentColor: '#60a5fa',
    bgHex: '#0c111b',
    surfaceHex: '#151d2e',
    userBubbleHex: '#2563eb',
    aiBubbleHex: '#1e2d45',
    textPrimaryHex: '#cbd5e1',
    textSecondaryHex: '#64748b',
    borderHex: '#1a2234',
    cssClass: 'abyss-d',
  },
  'ember-d': {
    id: 'ember-d',
    label: 'Ember',
    isDark: true,
    accentColor: '#e8845a',
    bgHex: '#141010',
    surfaceHex: '#1f1a18',
    userBubbleHex: '#d45a30',
    aiBubbleHex: '#352a25',
    textPrimaryHex: '#e8ddd5',
    textSecondaryHex: '#78655c',
    borderHex: '#2a2220',
    cssClass: 'ember-d',
  },
  'moss-d': {
    id: 'moss-d',
    label: 'Moss',
    isDark: true,
    accentColor: '#4ade80',
    bgHex: '#0f1410',
    surfaceHex: '#161e16',
    userBubbleHex: '#2d7a4f',
    aiBubbleHex: '#243524',
    textPrimaryHex: '#d4e0d4',
    textSecondaryHex: '#5d755d',
    borderHex: '#1c261c',
    cssClass: 'moss-d',
  },
  'onyx-d': {
    id: 'onyx-d',
    label: 'Onyx',
    isDark: true,
    accentColor: '#a3a3a3',
    bgHex: '#111111',
    surfaceHex: '#1a1a1a',
    userBubbleHex: '#444444',
    aiBubbleHex: '#2c2c2c',
    textPrimaryHex: '#d4d4d4',
    textSecondaryHex: '#737373',
    borderHex: '#262626',
    cssClass: 'onyx-d',
  },
  'abyss-l': {
    id: 'abyss-l',
    label: 'Abyss ☀',
    isDark: false,
    accentColor: '#2563eb',
    bgHex: '#e8edf4',
    surfaceHex: '#f0f4f9',
    userBubbleHex: '#2563eb',
    aiBubbleHex: '#d5dfee',
    textPrimaryHex: '#1e293b',
    textSecondaryHex: '#64748b',
    borderHex: '#c8d4e4',
    cssClass: 'abyss-l',
  },
  'ember-l': {
    id: 'ember-l',
    label: 'Ember ☀',
    isDark: false,
    accentColor: '#c0542e',
    bgHex: '#f0e8e0',
    surfaceHex: '#f7f0ea',
    userBubbleHex: '#c0542e',
    aiBubbleHex: '#e6d8ca',
    textPrimaryHex: '#3d2e24',
    textSecondaryHex: '#8c7b70',
    borderHex: '#d8ccc0',
    cssClass: 'ember-l',
  },
  'moss-l': {
    id: 'moss-l',
    label: 'Moss ☀',
    isDark: false,
    accentColor: '#2d7a4f',
    bgHex: '#e4efe4',
    surfaceHex: '#f0f7f0',
    userBubbleHex: '#2d7a4f',
    aiBubbleHex: '#d0e8d0',
    textPrimaryHex: '#1a2e1a',
    textSecondaryHex: '#587358',
    borderHex: '#c0d8c0',
    cssClass: 'moss-l',
  },
  'onyx-l': {
    id: 'onyx-l',
    label: 'Onyx ☀',
    isDark: false,
    accentColor: '#555555',
    bgHex: '#e8e8e8',
    surfaceHex: '#f2f2f2',
    userBubbleHex: '#444444',
    aiBubbleHex: '#d8d8d8',
    textPrimaryHex: '#1a1a1a',
    textSecondaryHex: '#737373',
    borderHex: '#cccccc',
    cssClass: 'onyx-l',
  },
};
