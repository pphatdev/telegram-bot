"use client";

import { Search, Pencil, Menu, Settings, Shield, Pin, PinOff, Archive, MessageCircle, BellOff, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { SettingsModal } from "./settings-modal";

interface ChatSidebarProps {
  mobileView: 'sidebar' | 'chat';
  setMobileView: (view: 'sidebar' | 'chat') => void;
  activeChatId: number | null;
  setActiveChatId: (id: number) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

type ChatType = 'All' | 'Personal' | 'Group' | 'Channel';

const INITIAL_CHATS = [
  { id: 1, name: 'Saved Messages', type: 'Personal', time: '10:42', message: 'You: Launch notes and ideas', avatarText: '★', avatarColor: 'bg-slate-500', pinned: true },
  { id: 2, name: 'Q3 launch planning', type: 'Group', time: '10:18', message: 'You: Let’s review the timeline', avatarText: 'QL', avatarColor: 'bg-sky-500', pinned: false },
  { id: 3, name: 'Product team', type: 'Group', time: 'Yesterday', message: 'Maya: The new draft is ready', avatarText: 'PT', avatarColor: 'bg-emerald-500', pinned: false },
  { id: 4, name: 'Design review', type: 'Channel', time: 'Friday', message: 'Alex sent an image', avatarText: 'DR', avatarColor: 'bg-violet-500', pinned: false },
];

export function ChatSidebar({ mobileView, setMobileView, activeChatId, setActiveChatId, sidebarWidth, setSidebarWidth }: ChatSidebarProps) {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeTab, setActiveTab] = useState<ChatType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [font, setFont] = useState<'inter' | 'geist' | 'kantumruy' | 'opensans' | 'sans-serif'>('inter');
  const [scale, setScale] = useState<number>(100);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; chatId: number } | null>(null);
  
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(Math.max(e.clientX, 280), 600);
      setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isResizing]);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);


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

  const filteredChats = chats
    .filter(chat => {
      const matchesTab = activeTab === 'All' || chat.type === activeTab;
      const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.message.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const togglePin = (chatId: number) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat));
  };

  return (
    <aside 
      className={`relative shrink-0 w-full lg:w-(--sidebar-width) flex-col overflow-hidden lg:rounded-r-none rounded-[16px] border-white/50 bg-sidebar shadow-xl ${mobileView === 'sidebar' ? 'flex animate-in fade-in slide-in-from-left-8 lg:animate-none duration-300' : 'hidden lg:flex'}`}
      style={{ '--sidebar-width': `${sidebarWidth}px` } as React.CSSProperties}
    >
      <div 
        className="hidden lg:block absolute top-0 bottom-0 right-0 w-1 cursor-col-resize hover:bg-primary/50 active:bg-primary transition-colors z-60"
        onMouseDown={(e) => { e.preventDefault(); setIsResizing(true); }}
      />
      <div className="flex flex-col gap-4 px-4 pt-5 pb-2 border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSettings(true)} aria-label="Menu" className="grid size-9 place-items-center rounded-full bg-accent hover:bg-accent/80 active:scale-95 transition-all lg:hidden">
              <Menu className="w-4.5 h-4.5 text-foreground" />
            </button>
            <h1 className="text-[26px] font-bold tracking-tight text-foreground lg:block hidden">Chats</h1>
            <h1 className="text-[26px] font-bold tracking-tight text-foreground lg:hidden">Chats</h1>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="New message" className="grid size-9 place-items-center rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 active:scale-95 transition-all">
              <Pencil className="w-4.5 h-4.5 translate-x-px -translate-y-px" />
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
          <div 
            key={chat.id} 
            className="group relative"
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({ x: e.clientX, y: e.clientY, chatId: chat.id });
            }}
          >
            <button
              onClick={() => {
                setActiveChatId(chat.id);
                setMobileView('chat');
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-accent/60 ${activeChatId === chat.id ? 'bg-accent' : ''}`}
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ${chat.avatarColor}`}>
                {chat.avatarText}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-[15px] font-medium">{chat.name}</span>
                    {chat.pinned && (
                      <Pin className="w-3.5 h-3.5 text-muted-foreground shrink-0 fill-muted-foreground/30" />
                    )}
                    <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {chat.type}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{chat.time}</span>
                </span>
                <span className="mt-0.5 block truncate text-sm text-muted-foreground">{chat.message}</span>
              </span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); togglePin(chat.id); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background border border-border/50 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground hover:bg-accent shadow-sm"
              aria-label={chat.pinned ? "Unpin chat" : "Pin chat"}
            >
              {chat.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
            </button>
          </div>
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

      {contextMenu && (
        <div 
          className="fixed z-100 w-56 bg-card/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors">
            <Archive className="w-4 h-4 text-muted-foreground" /> Archive
          </button>
          <button 
            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            onClick={() => {
              togglePin(contextMenu.chatId);
              setContextMenu(null);
            }}
          >
            {chats.find(c => c.id === contextMenu.chatId)?.pinned ? (
              <><PinOff className="w-4 h-4 text-muted-foreground" /> Unpin</>
            ) : (
              <><Pin className="w-4 h-4 text-muted-foreground" /> Pin</>
            )}
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors">
            <MessageCircle className="w-4 h-4 text-muted-foreground" /> Mark as Unread
          </button>
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors">
            <BellOff className="w-4 h-4 text-muted-foreground" /> Mute
          </button>
          <div className="h-px bg-border/50 my-1 mx-2" />
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="w-4 h-4" /> Delete Chat
          </button>
        </div>
      )}

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
