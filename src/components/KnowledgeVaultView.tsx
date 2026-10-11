import React, { useState } from 'react';
import { VaultNote } from '../types';
import { ThemeConfig } from '../theme/themes';
import { ArrowLeft, Search, Plus, FileText, CheckSquare, Tag, Folder, Save, Trash2 } from 'lucide-react';

interface KnowledgeVaultViewProps {
  onBack: () => void;
  notes: VaultNote[];
  onSaveNote: (note: VaultNote) => void;
  onDeleteNote: (path: string) => void;
  theme: ThemeConfig;
}

export const KnowledgeVaultView: React.FC<KnowledgeVaultViewProps> = ({
  onBack,
  notes,
  onSaveNote,
  onDeleteNote,
  theme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotePath, setSelectedNotePath] = useState<string>(notes[0]?.path || '');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const filteredNotes = notes.filter(n => {
    const q = searchQuery.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const activeNote = notes.find(n => n.path === selectedNotePath) || notes[0];

  const handleStartEdit = (note: VaultNote) => {
    setSelectedNotePath(note.path);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditCategory(note.category);
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    const newPath = `notes/note-${Date.now()}.md`;
    const newNote: VaultNote = {
      path: newPath,
      title: 'New Knowledge Note',
      category: 'Notes',
      tags: ['new', 'vault'],
      content: '# New Note\n\nWrite your thoughts, memory snippets, or instructions for PokeClaw here.',
      updatedAt: 'Just now',
    };
    onSaveNote(newNote);
    handleStartEdit(newNote);
  };

  const handleSave = () => {
    if (!activeNote) return;
    const updated: VaultNote = {
      ...activeNote,
      title: editTitle,
      content: editContent,
      category: editCategory,
      updatedAt: 'Just now',
    };
    onSaveNote(updated);
    setIsEditing(false);
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
            <span className="text-base font-bold">Knowledge Vault</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              Local Markdown /vault/
            </span>
          </div>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-2.5 py-1 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Search & Note List Sidebar */}
        <div 
          className="w-full md:w-72 border-b md:border-b-0 md:border-r flex flex-col shrink-0"
          style={{ borderColor: theme.borderHex, backgroundColor: `${theme.surfaceHex}50` }}
        >
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vault (kb_search)..."
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredNotes.map((note) => {
              const isSelected = note.path === (activeNote?.path);
              return (
                <div
                  key={note.path}
                  onClick={() => {
                    setSelectedNotePath(note.path);
                    setIsEditing(false);
                  }}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-orange-500/40 bg-orange-500/10'
                      : 'border-transparent hover:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate">{note.title}</span>
                    <span className="text-[10px] opacity-40 font-mono">{note.category}</span>
                  </div>
                  <div className="text-[11px] opacity-60 line-clamp-1 mt-0.5 font-mono">
                    {note.path}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {note.tags.map(t => (
                      <span key={t} className="text-[9px] px-1 py-0.2 rounded bg-white/5 opacity-60">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note Content Viewer / Editor */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          {activeNote ? (
            isEditing ? (
              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-lg font-bold bg-transparent border-b border-white/20 pb-1 outline-none w-full mr-4"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 rounded-xl bg-white/10 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-50">Category:</span>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="bg-black/20 border border-white/10 rounded-lg px-2 py-0.5 text-xs outline-none"
                  />
                </div>

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-xs font-mono outline-none focus:border-orange-500 resize-none min-h-[300px]"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: theme.borderHex }}>
                  <div>
                    <h2 className="text-lg font-bold">{activeNote.title}</h2>
                    <div className="text-xs opacity-50 font-mono mt-0.5">
                      {activeNote.path} · Updated {activeNote.updatedAt}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(activeNote)}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteNote(activeNote.path)}
                      className="p-1 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-40">Tags:</span>
                  <div className="flex gap-1.5">
                    {activeNote.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rendered content */}
                <div 
                  className="p-4 rounded-2xl border font-mono text-xs leading-relaxed whitespace-pre-wrap"
                  style={{ backgroundColor: `${theme.surfaceHex}80`, borderColor: theme.borderHex }}
                >
                  {activeNote.content}
                </div>
              </div>
            )
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs opacity-40">
              No note selected in vault
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
