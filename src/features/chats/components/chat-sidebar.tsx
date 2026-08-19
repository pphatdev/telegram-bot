"use client";

import { Search, Pencil, Menu, Settings, Shield } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "./settings-modal";

interface ChatSidebarProps {
  mobileView: 'sidebar' | 'chat';
  setMobileView: (view: 'sidebar' | 'chat') => void;
}

type ChatType = 'All' | 'Personal' | 'Group' | 'Channel';

const MOCK_CHATS = [
  { id: 1, name: 'Saved Messages', type: 'Personal', time: '10:42', message: 'You: Launch notes and ideas', avatarText: '★', avatarColor: 'bg-slate-500' },
  { id: 2, name: 'Q3 launch planning', type: 'Group', time: '10:18', message: 'You: Let’s review the timeline', avatarText: 'QL', avatarColor: 'bg-sky-500', active: true },
  { id: 3, name: 'Product team', type: 'Group', time: 'Yesterday', message: 'Maya: The new draft is ready', avatarText: 'PT', avatarColor: 'bg-emerald-500' },
  { id: 4, name: 'Design review', type: 'Channel', time: 'Friday', message: 'Alex sent an image', avatarText: 'DR', avatarColor: 'bg-violet-500' },
];

export function ChatSidebar({ mobileView, setMobileView }: ChatSidebarProps) {
  const [activeTab, setActiveTab] = useState<ChatType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [font, setFont] = useState<'inter' | 'geist' | 'kantumruy' | 'opensans' | 'sans-serif'>('inter');
  const [scale, setScale] = useState<number>(100);

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    document.documentElement.style.fontSize = `${newScale}%`;
  };

  const handleFontChange = (newFont: 'inter' | 'geist' | 'kantumruy' | 'opensans' | 'sans-serif') => {
    setFont(newFont);
    if (newFont === 'geist') {
      document.documentElement.style.setProperty('--font-sans', 'var(--font-geist-sans)');
    } else if (newFont === 'kantumruy') {
      document.documentElement.style.setProperty('--font-sans', 'var(--font-kantumruy-pro)');
    } else if (newFont === 'opensans') {
      document.documentElement.style.setProperty('--font-sans', 'var(--font-open-sans)');
    } else if (newFont === 'sans-serif') {
      document.documentElement.style.setProperty('--font-sans', 'sans-serif');
    } else {
      document.documentElement.style.removeProperty('--font-sans');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const filteredChats = MOCK_CHATS.filter((chat) => {
    const matchesTab = activeTab === 'All' || chat.type === activeTab;
    const matchesSearch = 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      chat.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <aside className={`w-full lg:w-82.5 flex-col overflow-hidden lg:rounded-r-none rounded-[16px]  border-white/50 bg-sidebar shadow-xl ${mobileView === 'sidebar' ? 'flex' : 'hidden lg:flex'}`}>
      <div className="flex items-center gap-3 bg-primary/90 px-4 py-4 text-primary-foreground backdrop-blur-xl">
        <button aria-label="Menu" className="rounded-full p-1 hover:bg-primary-foreground/15 lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <div className="grid size-9 place-items-center rounded-full bg-primary-foreground/20 text-lg font-semibold lg:ml-0 ml-1">
          t
        </div>
        <div className="flex-1 text-lg font-semibold">Telegram</div>
        <button aria-label="New message" className="rounded-full p-2 hover:bg-primary-foreground/15">
          <Pencil className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-primary px-4 py-3">
        <label className="flex items-center gap-2 rounded-lg bg-primary-foreground/15 px-3 py-2 text-sm text-primary-foreground/70">
          <Search className="w-4 h-4" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-primary-foreground/70"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <div role="tablist" aria-label="Conversation types" className="mt-3 flex gap-1 rounded-xl bg-primary-foreground/10 p-1">
          {(['All', 'Personal', 'Group', 'Channel'] as ChatType[]).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                activeTab === tab
                  ? 'bg-primary-foreground text-primary shadow-sm'
                  : 'text-primary-foreground/75 hover:bg-primary-foreground/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <nav aria-label="Chats" className="flex-1 overflow-y-auto py-2">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setMobileView('chat')}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-accent/60 ${chat.active ? 'bg-accent' : ''}`}
          >
            <span className={`grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ${chat.avatarColor}`}>
              {chat.avatarText}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate text-[15px] font-medium">{chat.name}</span>
                  <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                    {chat.type}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{chat.time}</span>
              </span>
              <span className="mt-0.5 block truncate text-sm text-muted-foreground">{chat.message}</span>
            </span>
          </button>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button onClick={() => setShowSettings(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
          <Settings className="w-4 h-4" /> Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
          <Shield className="w-4 h-4" /> Whitelist & Blacklist
        </button>
      </div>

      <SettingsModal 
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        theme={theme}
        handleThemeChange={handleThemeChange}
        font={font}
        handleFontChange={handleFontChange}
        scale={scale}
        handleScaleChange={handleScaleChange}
      />
    </aside>
  );
}
