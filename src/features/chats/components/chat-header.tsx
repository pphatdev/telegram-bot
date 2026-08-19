import { ArrowLeft, Search, EllipsisVertical, X } from "lucide-react";

interface ChatHeaderProps {
  setMobileView: (view: 'sidebar' | 'chat') => void;
  closeChat?: () => void;
  onProfileClick?: () => void;
  innerSearchQuery: string;
  setInnerSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export function ChatHeader({ setMobileView, closeChat, onProfileClick, innerSearchQuery, setInnerSearchQuery, isSearchOpen, setIsSearchOpen }: ChatHeaderProps) {
  return (
    <header className="flex h-17 min-w-93.75 items-center gap-3 border-b border-border bg-card px-4 shadow-sm sm:px-7 overflow-hidden">
      <button onClick={() => { setMobileView('sidebar'); if (closeChat) closeChat(); }} aria-label="Back to chats" className="rounded-full p-2 text-muted-foreground hover:bg-accent shrink-0">
        <ArrowLeft className="w-5 h-5" />
      </button>

      {isSearchOpen ? (
        <div className="flex-1 flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1.5 animate-in fade-in slide-in-from-right-4 duration-200 min-w-0">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input 
            type="text" 
            autoFocus
            placeholder="Search in this chat..." 
            className="bg-transparent border-none outline-none w-full text-[15px] placeholder:text-muted-foreground"
            value={innerSearchQuery}
            onChange={(e) => setInnerSearchQuery(e.target.value)}
          />
          <button onClick={() => { setIsSearchOpen(false); setInnerSearchQuery(''); }} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground shrink-0 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div 
          className="flex min-w-0 flex-1 items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity animate-in fade-in duration-200"
          onClick={onProfileClick}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-500 text-sm font-semibold text-white">QL</span>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[15px] font-semibold">Q3 launch planning</h1>
            <p className="text-xs text-muted-foreground truncate">online · Group conversation</p>
          </div>
        </div>
      )}

      {!isSearchOpen && (
        <div className="flex items-center gap-1 shrink-0 animate-in fade-in duration-200">
          <button onClick={() => setIsSearchOpen(true)} aria-label="Search in conversation" className="rounded-full p-2 text-muted-foreground hover:bg-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="More options" className="rounded-full p-2 text-muted-foreground hover:bg-accent transition-colors">
            <EllipsisVertical className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
}
