"use client";

import { Search, Pencil, Menu, Settings, Shield, X, User, Bell, Palette, ArrowLeft, Sun, Moon, Monitor, Check, Type, ChevronDown, ChevronRight, Bot, Lock } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [activeSettingsView, setActiveSettingsView] = useState<'main' | 'appearance' | 'passcode'>('main');
  const [isPasscodeOn, setIsPasscodeOn] = useState(false);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [font, setFont] = useState<'inter' | 'geist' | 'kantumruy' | 'opensans' | 'sans-serif'>('inter');
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [scale, setScale] = useState<number>(100);

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    document.documentElement.style.fontSize = `${newScale}%`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFontDropdownOpen) {
          setIsFontDropdownOpen(false);
        } else if (activeSettingsView === 'appearance' || activeSettingsView === 'passcode') {
          setActiveSettingsView('main');
        } else if (showSettings) {
          setShowSettings(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFontDropdownOpen, activeSettingsView, showSettings]);

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

      {/* Settings Popup - iOS 26 Concept */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-200" onClick={() => { setShowSettings(false); setActiveSettingsView('main'); }}>
          <div className="w-[90%] max-w-sm sm:max-w-md rounded-[32px] bg-background/85 backdrop-blur-3xl p-6 shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300" onClick={(e) => { e.stopPropagation(); setIsFontDropdownOpen(false); }}>
            {activeSettingsView === 'main' ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[28px] font-bold tracking-tight">Settings</h2>
                  <button onClick={() => { setShowSettings(false); setActiveSettingsView('main'); }} className="rounded-full bg-secondary/80 p-2 hover:bg-secondary text-foreground transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
                  <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                    <div className="bg-blue-500 p-1.5 rounded-[10px] text-white shadow-sm"><User className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="text-[17px] font-medium text-foreground">Personal Info</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                  </button>
                  <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                    <div className="bg-emerald-500 p-1.5 rounded-[10px] text-white shadow-sm"><Shield className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="text-[17px] font-medium text-foreground">Privacy & Security</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                  </button>
                  <button onClick={() => setActiveSettingsView('passcode')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                    <div className="bg-slate-700 dark:bg-slate-400 p-1.5 rounded-[10px] text-white shadow-sm"><Lock className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="text-[17px] font-medium text-foreground">Passcode Lock</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                  </button>
                  <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                    <div className="bg-red-500 p-1.5 rounded-[10px] text-white shadow-sm"><Bell className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="text-[17px] font-medium text-foreground">Notifications</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                  </button>
                  <button onClick={() => setActiveSettingsView('appearance')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                    <div className="bg-indigo-500 p-1.5 rounded-[10px] text-white shadow-sm"><Palette className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="text-[17px] font-medium text-foreground">Appearance</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                  </button>
                </div>

                <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm mt-4">
                  <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                    <div className="bg-orange-500 p-1.5 rounded-[10px] text-white shadow-sm"><Bot className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="text-[17px] font-medium text-foreground">Switch Account (Bot)</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                  </button>
                </div>
              </>
            ) : activeSettingsView === 'appearance' ? (
              <>
                <div className="relative flex items-center justify-center mb-8 h-8">
                  <button onClick={() => setActiveSettingsView('main')} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                    <ArrowLeft className="w-6 h-6 -ml-1" />
                    <span className="text-[17px]">Settings</span>
                  </button>
                  <h2 className="text-[17px] font-semibold tracking-tight">Appearance</h2>
                </div>
                
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div>
                    <div className="text-[13px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 px-3">Theme</div>
                    <div role="tablist" className="flex bg-secondary/50 rounded-xl p-1 border border-white/5">
                      {(['light', 'dark', 'system'] as const).map((t) => (
                        <button
                          key={t}
                          role="tab"
                          aria-selected={theme === t}
                          onClick={() => handleThemeChange(t)}
                          className={`flex-1 flex flex-col items-center justify-center gap-1.5 rounded-[9px] py-2.5 text-[12px] font-medium transition-all ${
                            theme === t
                              ? 'bg-background text-foreground shadow-sm'
                              : 'text-muted-foreground hover:bg-accent/30'
                          }`}
                        >
                          {t === 'light' && <Sun className="w-5 h-5 mb-0.5" />}
                          {t === 'dark' && <Moon className="w-5 h-5 mb-0.5" />}
                          {t === 'system' && <Monitor className="w-5 h-5 mb-0.5" />}
                          <span className="capitalize">{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[13px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 px-3">Font Family</div>
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsFontDropdownOpen(!isFontDropdownOpen); }}
                        className="flex w-full items-center justify-between gap-2 rounded-2xl bg-card/60 backdrop-blur-xl border border-white/5 px-4 py-3.5 text-[17px] font-medium active:scale-[0.98] transition-transform shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <Type className="w-4 h-4 text-muted-foreground" />
                          <span style={{ fontFamily: 'var(--font-sans)' }}>
                            {font === 'inter' && 'Inter (Default)'}
                            {font === 'geist' && 'Geist Sans'}
                            {font === 'kantumruy' && 'Kantumruy Pro'}
                            {font === 'opensans' && 'Open Sans'}
                            {font === 'sans-serif' && 'Sans Serif'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isFontDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isFontDropdownOpen && (
                        <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-2xl border border-white/10 bg-background/95 backdrop-blur-3xl p-2 shadow-2xl animate-in fade-in zoom-in-95">
                          {(
                            [
                              { id: 'inter', label: 'Inter', var: 'Inter, sans-serif' },
                              { id: 'geist', label: 'Geist Sans', var: 'var(--font-geist-sans)' },
                              { id: 'kantumruy', label: 'Kantumruy Pro', var: 'var(--font-kantumruy-pro)' },
                              { id: 'opensans', label: 'Open Sans', var: 'var(--font-open-sans)' },
                              { id: 'sans-serif', label: 'Sans Serif', var: 'sans-serif' }
                            ] as const
                          ).map((f) => (
                            <button 
                              key={f.id}
                              onClick={(e) => { e.stopPropagation(); handleFontChange(f.id); setIsFontDropdownOpen(false); }}
                              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[17px] transition-colors ${font === f.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'}`}
                            >
                              <span style={{ fontFamily: f.var }}>{f.label}</span>
                              {font === f.id && <Check className="w-5 h-5 ml-auto" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 px-3">
                      <div className="text-[13px] uppercase tracking-wider font-semibold text-muted-foreground">Display Scale: {scale}%</div>
                      {scale !== 100 && (
                        <button 
                          onClick={() => handleScaleChange(100)} 
                          className="text-[13px] text-primary hover:opacity-80 font-medium transition-opacity"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <div className="bg-card/60 backdrop-blur-xl rounded-[24px] border border-white/5 p-5 shadow-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-[12px] font-bold text-muted-foreground">A</span>
                        <input 
                          type="range" 
                          min="0" 
                          max="9" 
                          step="1" 
                          value={[65, 70, 75, 80, 85, 90, 95, 100, 110, 120].indexOf(scale) !== -1 ? [65, 70, 75, 80, 85, 90, 95, 100, 110, 120].indexOf(scale) : 7} 
                          onChange={(e) => {
                            const steps = [65, 70, 75, 80, 85, 90, 95, 100, 110, 120];
                            handleScaleChange(steps[Number(e.target.value)]);
                          }}
                          className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[28px] [&::-webkit-slider-thumb]:h-[28px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300/30 transition-all"
                        />
                        <span className="text-lg font-bold text-muted-foreground">A</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground/50 mt-4 px-1">
                        {[65, 70, 75, 80, 85, 90, 95, 100, 110, 120].map((step) => (
                          <span 
                            key={step} 
                            className={`cursor-pointer hover:text-foreground transition ${scale === step ? 'text-foreground' : ''}`}
                            onClick={() => handleScaleChange(step)}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : activeSettingsView === 'passcode' ? (
              <>
                <div className="relative flex items-center justify-center mb-8 h-8">
                  <button onClick={() => setActiveSettingsView('main')} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                    <ArrowLeft className="w-6 h-6 -ml-1" />
                    <span className="text-[17px]">Settings</span>
                  </button>
                  <h2 className="text-[17px] font-semibold tracking-tight">Passcode Lock</h2>
                </div>
                
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
                    <div className="flex w-full items-center justify-between px-4 py-3.5">
                      <div className="text-[17px] font-medium text-foreground">Turn Passcode On</div>
                      <button 
                        className={`w-12 h-7 rounded-full p-1 transition-colors ${isPasscodeOn ? 'bg-green-500' : 'bg-black/10 dark:bg-white/10'}`}
                        onClick={() => setIsPasscodeOn(!isPasscodeOn)}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${isPasscodeOn ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    {isPasscodeOn && (
                      <div className="animate-in slide-in-from-top-2 fade-in duration-200">
                        <div className="h-[1px] w-full bg-border/50" />
                        <button className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                          <div className="text-[17px] font-medium text-primary">Change Passcode</div>
                        </button>
                        <div className="h-[1px] w-full bg-border/50" />
                        <button className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                          <div className="text-[17px] font-medium text-foreground">Auto-Lock</div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-[17px]">1 hr</span>
                            <ChevronRight className="w-5 h-5 opacity-50" />
                          </div>
                        </button>
                        <div className="h-[1px] w-full bg-border/50" />
                        <div className="flex w-full items-center justify-between px-4 py-3.5">
                          <div className="text-[17px] font-medium text-foreground">Unlock with Biometrics</div>
                          <button 
                            className={`w-12 h-7 rounded-full p-1 transition-colors ${useBiometrics ? 'bg-green-500' : 'bg-black/10 dark:bg-white/10'}`}
                            onClick={() => setUseBiometrics(!useBiometrics)}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${useBiometrics ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {isPasscodeOn && (
                    <p className="text-[13px] text-muted-foreground px-4 text-center animate-in fade-in duration-300">
                      When a passcode is set, a lock icon appears at the top of your chats list. Tap it to lock your app.
                    </p>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </aside>
  );
}
