import { ArrowLeft, Search, EllipsisVertical } from "lucide-react";

interface ChatHeaderProps {
  setMobileView: (view: 'sidebar' | 'chat') => void;
  closeChat?: () => void;
  onProfileClick?: () => void;
}

export function ChatHeader({ setMobileView, closeChat, onProfileClick }: ChatHeaderProps) {
  return (
    <header className="flex h-17 items-center gap-3 border-b border-border bg-card px-4 shadow-sm sm:px-7">
      <button onClick={() => { setMobileView('sidebar'); if (closeChat) closeChat(); }} aria-label="Back to chats" className="rounded-full p-2 text-muted-foreground hover:bg-accent">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div 
        className="flex min-w-0 flex-1 items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onProfileClick}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-500 text-sm font-semibold text-white">QL</span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[15px] font-semibold">Q3 launch planning</h1>
          <p className="text-xs text-muted-foreground">online · Group conversation</p>
        </div>
      </div>
      <button aria-label="Search in conversation" className="rounded-full p-2 text-muted-foreground hover:bg-accent">
        <Search className="w-5 h-5" />
      </button>
      <button aria-label="More options" className="rounded-full p-2 text-muted-foreground hover:bg-accent">
        <EllipsisVertical className="w-5 h-5" />
      </button>
    </header>
  );
}
