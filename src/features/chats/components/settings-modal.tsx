import { Shield, X, User, Bell, Palette, ArrowLeft, Sun, Moon, Monitor, Check, Type, ChevronDown, ChevronRight, Bot, Lock, LogOut, Plus, Smartphone, KeyRound, ShieldCheck, Camera, Copy } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsModalProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  theme: 'light' | 'dark' | 'system';
  handleThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  font: 'inter' | 'geist' | 'kantumruy' | 'opensans' | 'sans-serif';
  handleFontChange: (font: 'inter' | 'geist' | 'kantumruy' | 'opensans' | 'sans-serif') => void;
  scale: number;
  handleScaleChange: (scale: number) => void;
}

export function SettingsModal({
  showSettings,
  setShowSettings,
  theme,
  handleThemeChange,
  font,
  handleFontChange,
  scale,
  handleScaleChange
}: SettingsModalProps) {
  const [viewHistory, setViewHistory] = useState<string[]>(['main']);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const activeSettingsView = viewHistory[viewHistory.length - 1];
  
  const navigateTo = (view: string) => {
    setDirection('forward');
    setViewHistory(prev => [...prev, view]);
  };
  
  const goBack = () => {
    setDirection('backward');
    setViewHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const [isPasscodeOn, setIsPasscodeOn] = useState(false);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [botName, setBotName] = useState('Marketing Bot');
  const [botDescription, setBotDescription] = useState('Automated marketing outreach and campaign management.');
  const [messagePreview, setMessagePreview] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFontDropdownOpen) {
          setIsFontDropdownOpen(false);
        } else if (viewHistory.length > 1) {
          goBack();
        } else if (showSettings) {
          setShowSettings(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFontDropdownOpen, viewHistory, showSettings]);

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-200" onClick={() => { setShowSettings(false); setViewHistory(['main']); setDirection('forward'); }}>
      <div className="w-full h-full sm:w-[90%] max-w-none sm:max-w-md sm:h-auto rounded-none sm:rounded-[32px] bg-background/95 sm:bg-background/85 backdrop-blur-3xl p-6 sm:shadow-2xl border-0 sm:border border-white/10 animate-in slide-in-from-right-8 sm:slide-in-from-right-0 sm:zoom-in-95 duration-300 overflow-y-auto" onClick={(e) => { e.stopPropagation(); setIsFontDropdownOpen(false); }}>
        <div key={activeSettingsView} className={`w-full ${direction === 'forward' && activeSettingsView !== 'main' ? 'animate-in fade-in slide-in-from-right-8 duration-300' : ''} ${direction === 'backward' ? 'animate-in fade-in slide-in-from-left-8 duration-300' : ''}`}>
        {activeSettingsView === 'main' ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[22px] font-bold tracking-tight">Settings</h2>
              <button onClick={() => { setShowSettings(false); setViewHistory(['main']); setDirection('forward'); }} className="rounded-full bg-secondary/80 p-2 hover:bg-secondary text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative mb-3">
                <div className="grid size-[90px] place-items-center rounded-full bg-blue-500 text-[32px] font-bold text-white shadow-xl">
                  MB
                </div>
                <div className="absolute bottom-1 right-1 size-[22px] rounded-full bg-green-500 border-[3.5px] border-background">
                </div>
              </div>
              <h3 className="text-[22px] font-bold text-foreground tracking-tight">{botName}</h3>
              <p className="text-[15px] text-muted-foreground mt-0.5">@marketing_campaign_bot</p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
              <button onClick={() => navigateTo('profile')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                <div className="bg-blue-500 p-1.5 rounded-[10px] text-white shadow-sm"><User className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-foreground">Personal Info</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </button>
              <button onClick={() => navigateTo('security')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                <div className="bg-emerald-500 p-1.5 rounded-[10px] text-white shadow-sm"><Shield className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-foreground">Privacy & Security</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </button>
              <button onClick={() => navigateTo('passcode')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                <div className="bg-slate-700 dark:bg-slate-400 p-1.5 rounded-[10px] text-white shadow-sm"><Lock className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-foreground">Passcode Lock</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </button>
              <button onClick={() => navigateTo('notifications')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                <div className="bg-red-500 p-1.5 rounded-[10px] text-white shadow-sm"><Bell className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-foreground">Notifications</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </button>
              <button onClick={() => navigateTo('appearance')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                <div className="bg-indigo-500 p-1.5 rounded-[10px] text-white shadow-sm"><Palette className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-foreground">Appearance</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </button>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm mt-4">
              <button onClick={() => navigateTo('switch-bot')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                <div className="bg-orange-500 p-1.5 rounded-[10px] text-white shadow-sm"><Bot className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-foreground">Switch Account (Bot)</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </button>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm mt-4">
              <button className="flex w-full items-center justify-center gap-3 px-4 py-3.5 hover:bg-destructive/10 transition-colors group">
                <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors" />
                <div className="text-[15px] font-medium text-red-500 group-hover:text-red-600 transition-colors">Log Out</div>
              </button>
            </div>
          </>
        ) : activeSettingsView === 'profile' ? (
          <>
            <div className="relative flex items-center justify-center mb-8 h-8">
              <button onClick={goBack} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-6 h-6 -ml-1" />
                <span className="text-[15px]">Settings</span>
              </button>
              <h2 className="text-[15px] font-semibold tracking-tight">Bot Profile</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-center mb-2 animate-in zoom-in-95 duration-300">
                <div className="relative group cursor-pointer">
                  <div className="grid size-[110px] place-items-center rounded-full bg-blue-500 text-[40px] font-bold text-white shadow-xl transition-transform group-active:scale-95">
                    MB
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-1 grid size-[34px] place-items-center rounded-full bg-primary text-primary-foreground border-[3.5px] border-background shadow-sm">
                    <Camera className="w-[18px] h-[18px]" />
                  </div>
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
                <div className="p-4 border-b border-border/50 focus-within:bg-accent/30 transition-colors">
                  <div className="text-[13px] font-semibold text-primary mb-1">Name</div>
                  <input className="w-full bg-transparent text-[15px] font-medium text-foreground outline-none placeholder:text-muted-foreground/50" value={botName} onChange={(e) => setBotName(e.target.value)} />
                </div>
                <div className="p-4 border-b border-border/50">
                  <div className="text-[13px] font-semibold text-primary mb-1">Username</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-foreground">@marketing_campaign_bot</span>
                    <button className="text-primary hover:opacity-80 transition-opacity p-1 rounded-md hover:bg-primary/10"><Copy className="w-[18px] h-[18px]" /></button>
                  </div>
                  <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">This is your bot's public handle. Users can interact with your bot by searching for this username on Telegram.</p>
                </div>
                <div className="p-4 focus-within:bg-accent/30 transition-colors">
                  <div className="text-[13px] font-semibold text-primary mb-1">About</div>
                  <textarea className="w-full bg-transparent text-[15px] text-foreground outline-none resize-none placeholder:text-muted-foreground/50 leading-relaxed" rows={2} value={botDescription} onChange={(e) => setBotDescription(e.target.value)}></textarea>
                  <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">This text will be shown on the bot's profile page and when users share your bot.</p>
                </div>
              </div>
            </div>
          </>
        ) : activeSettingsView === 'notifications' ? (
          <>
            <div className="relative flex items-center justify-center mb-8 h-8">
              <button onClick={goBack} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-6 h-6 -ml-1" />
                <span className="text-[15px]">Settings</span>
              </button>
              <h2 className="text-[15px] font-semibold tracking-tight">Notifications</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
                <div className="flex w-full items-center justify-between px-4 py-3.5 border-b border-border/50">
                  <div className="text-[15px] font-medium text-foreground">Desktop Notifications</div>
                  <button 
                    className={`w-12 h-7 rounded-full p-1 transition-colors ${desktopNotifications ? 'bg-green-500' : 'bg-black/10 dark:bg-white/10'}`}
                    onClick={() => setDesktopNotifications(!desktopNotifications)}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${desktopNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div className="flex w-full items-center justify-between px-4 py-3.5 border-b border-border/50">
                  <div className="text-[15px] font-medium text-foreground">Message Preview</div>
                  <button 
                    className={`w-12 h-7 rounded-full p-1 transition-colors ${messagePreview ? 'bg-green-500' : 'bg-black/10 dark:bg-white/10'}`}
                    onClick={() => setMessagePreview(!messagePreview)}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${messagePreview ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div className="flex w-full items-center justify-between px-4 py-3.5">
                  <div className="text-[15px] font-medium text-foreground">Play Sound</div>
                  <button 
                    className={`w-12 h-7 rounded-full p-1 transition-colors ${soundEnabled ? 'bg-green-500' : 'bg-black/10 dark:bg-white/10'}`}
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
              
              <div className="text-[13px] text-muted-foreground px-2 leading-relaxed">
                Choose how you want to be notified about new messages and events from this bot.
              </div>
            </div>
          </>
        ) : activeSettingsView === 'appearance' ? (
          <>
            <div className="relative flex items-center justify-center mb-8 h-8">
              <button onClick={goBack} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-6 h-6 -ml-1" />
                <span className="text-[15px]">Settings</span>
              </button>
              <h2 className="text-[15px] font-semibold tracking-tight">Appearance</h2>
            </div>
            
            <div className="space-y-6">
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
                    className="flex w-full items-center justify-between gap-2 rounded-2xl bg-card/60 backdrop-blur-xl border border-white/5 px-4 py-3.5 text-[15px] font-medium active:scale-[0.98] transition-transform shadow-sm"
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
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-colors ${font === f.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'}`}
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
              <button onClick={goBack} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-6 h-6 -ml-1" />
                <span className="text-[15px]">Settings</span>
              </button>
              <h2 className="text-[15px] font-semibold tracking-tight">Passcode Lock</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
                <div className="flex w-full items-center justify-between px-4 py-3.5">
                  <div className="text-[15px] font-medium text-foreground">Turn Passcode On</div>
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
                      <div className="text-[15px] font-medium text-primary">Change Passcode</div>
                    </button>
                    <div className="h-[1px] w-full bg-border/50" />
                    <button className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                      <div className="text-[15px] font-medium text-foreground">Auto-Lock</div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-[15px]">1 hr</span>
                        <ChevronRight className="w-5 h-5 opacity-50" />
                      </div>
                    </button>
                    <div className="h-[1px] w-full bg-border/50" />
                    <div className="flex w-full items-center justify-between px-4 py-3.5">
                      <div className="text-[15px] font-medium text-foreground">Unlock with Biometrics</div>
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
        ) : activeSettingsView === 'switch-bot' ? (
          <>
            <div className="relative flex items-center justify-center mb-8 h-8">
              <button onClick={goBack} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-6 h-6 -ml-1" />
                <span className="text-[15px]">Settings</span>
              </button>
              <h2 className="text-[15px] font-semibold tracking-tight">Switch Account</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
                <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                  <div className="relative">
                    <div className="grid size-10 place-items-center rounded-full bg-blue-500 text-sm font-semibold text-white shadow-sm">MB</div>
                    <div className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-green-500 border-2 border-background">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-foreground">Marketing Bot</div>
                    <div className="text-[13px] text-muted-foreground">@marketing_campaign_bot</div>
                  </div>
                </button>
                <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                  <div className="grid size-10 place-items-center rounded-full bg-emerald-500 text-sm font-semibold text-white shadow-sm">SB</div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-foreground">Support Bot</div>
                    <div className="text-[13px] text-muted-foreground">@customer_support_bot</div>
                  </div>
                </button>
                <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                  <div className="grid size-10 place-items-center rounded-full bg-secondary text-primary shadow-sm border border-border"><Plus className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-primary">Add Bot Account</div>
                  </div>
                </button>
              </div>
              <p className="text-[13px] text-muted-foreground px-4 text-center animate-in fade-in duration-300">
                You can manage multiple bot accounts and seamlessly switch between them to manage broadcasts and settings.
              </p>
            </div>
          </>
        ) : activeSettingsView === 'security' ? (
          <>
            <div className="relative flex items-center justify-center mb-8 h-8">
              <button onClick={goBack} className="absolute left-0 flex items-center gap-1 text-primary hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-6 h-6 -ml-1" />
                <span className="text-[15px]">Settings</span>
              </button>
              <h2 className="text-[15px] font-semibold tracking-tight">Privacy & Security</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm">
                <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                  <div className="bg-indigo-500 p-1.5 rounded-[10px] text-white shadow-sm"><KeyRound className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-foreground">Two-Step Verification</div>
                  </div>
                  <div className="text-[15px] text-muted-foreground mr-1">Off</div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                </button>
                <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors border-b border-border/50">
                  <div className="bg-sky-500 p-1.5 rounded-[10px] text-white shadow-sm"><Smartphone className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-foreground">Active Sessions</div>
                  </div>
                  <div className="text-[15px] text-muted-foreground mr-1">2 devices</div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                </button>
                <button onClick={() => navigateTo('passcode')} className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                  <div className="bg-slate-700 dark:bg-slate-400 p-1.5 rounded-[10px] text-white shadow-sm"><Lock className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-foreground">Passcode Lock</div>
                  </div>
                  <div className="text-[15px] text-muted-foreground mr-1">{isPasscodeOn ? 'On' : 'Off'}</div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                </button>
              </div>

              <div className="bg-card/60 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/5 shadow-sm mt-4">
                <button className="flex w-full items-center gap-4 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors">
                  <div className="bg-rose-500 p-1.5 rounded-[10px] text-white shadow-sm"><ShieldCheck className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-foreground">Webhook Security</div>
                  </div>
                  <div className="text-[15px] text-muted-foreground mr-1">Active</div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                </button>
              </div>
              
              <p className="text-[13px] text-muted-foreground px-4 text-center animate-in fade-in duration-300">
                Manage your active sessions, set up two-step verification, and configure bot webhook secrets to protect against unauthorized access.
              </p>
            </div>
          </>
        ) : null}
        </div>
      </div>
    </div>
  );
}
