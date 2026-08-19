"use client";

import { Search, Pencil, Menu, Settings, Shield } from "lucide-react";
import { useState, useEffect } from "react";
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
    document.documentElement.style.fontSize = `${newScale * 0.85}%`;
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
    <aside className={`w-full lg:w-82.5 flex-col overflow-hidden lg:rounded-r-none rounded-[16px]  border-white/50 bg-sidebar shadow-xl ${mobileView === 'sidebar' ? 'flex animate-in fade-in slide-in-from-left-8 lg:animate-none duration-300' : 'hidden lg:flex'}`}>
      <div className="flex flex-col gap-4 px-4 pt-5 pb-2 border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSettings(true)} aria-label="Menu" className="grid size-9 place-items-center rounded-full bg-accent hover:bg-accent/80 active:scale-95 transition-all lg:hidden">
              <Menu className="w-[18px] h-[18px] text-foreground" />
            </button>
            <h1 className="text-[26px] font-bold tracking-tight text-foreground lg:block hidden">Chats</h1>
            <h1 className="text-[26px] font-bold tracking-tight text-foreground lg:hidden">Chats</h1>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="New message" className="grid size-9 place-items-center rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 active:scale-95 transition-all">
              <Pencil className="w-[18px] h-[18px] translate-x-[1px] -translate-y-[1px]" />
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 rounded-[12px] bg-accent/60 px-3 py-2 text-sm text-muted-foreground focus-within:bg-accent focus-within:ring-2 focus-within:ring-primary/20 transition-all border border-transparent focus-within:border-border/50">
          <Search className="w-4 h-4 text-muted-foreground/70" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground/70 text-foreground font-medium"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        <div role="tablist" aria-label="Conversation types" className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {(['All', 'Personal', 'Group', 'Channel'] as ChatType[]).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-all active:scale-[0.97] ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-accent/50 text-muted-foreground hover:bg-accent hover:text-foreground border border-border/50'
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
      <div className="hidden lg:block border-t border-border p-3">
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
