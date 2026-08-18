import { Search, Pencil, Menu, User, Archive } from "lucide-react";

interface ChatSidebarProps {
  mobileView: 'sidebar' | 'chat';
  setMobileView: (view: 'sidebar' | 'chat') => void;
}

export function ChatSidebar({ mobileView, setMobileView }: ChatSidebarProps) {
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
          <input className="w-full bg-transparent outline-none placeholder:text-primary-foreground/70" placeholder="Search" />
        </label>
        <div role="tablist" aria-label="Conversation types" className="mt-3 flex gap-1 rounded-xl bg-primary-foreground/10 p-1">
          <button role="tab" aria-selected="true" className="flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition bg-primary-foreground text-primary shadow-sm">All</button>
          <button role="tab" aria-selected="false" className="flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition text-primary-foreground/75 hover:bg-primary-foreground/10">Personal</button>
          <button role="tab" aria-selected="false" className="flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition text-primary-foreground/75 hover:bg-primary-foreground/10">Group</button>
          <button role="tab" aria-selected="false" className="flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition text-primary-foreground/75 hover:bg-primary-foreground/10">Channel</button>
        </div>
      </div>
      <nav aria-label="Chats" className="flex-1 overflow-y-auto py-2">
        <button onClick={() => setMobileView('chat')} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-accent/60">
          <span className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white bg-slate-500">★</span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[15px] font-medium">Saved Messages</span>
                <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Personal</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">10:42</span>
            </span>
            <span className="mt-0.5 block truncate text-sm text-muted-foreground">You: Launch notes and ideas</span>
          </span>
        </button>
        <button onClick={() => setMobileView('chat')} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition bg-accent">
          <span className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white bg-sky-500">QL</span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[15px] font-medium">Q3 launch planning</span>
                <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Group</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">10:18</span>
            </span>
            <span className="mt-0.5 block truncate text-sm text-muted-foreground">You: Let’s review the timeline</span>
          </span>
        </button>
        <button onClick={() => setMobileView('chat')} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-accent/60">
          <span className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white bg-emerald-500">PT</span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[15px] font-medium">Product team</span>
                <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Group</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">Yesterday</span>
            </span>
            <span className="mt-0.5 block truncate text-sm text-muted-foreground">Maya: The new draft is ready</span>
          </span>
        </button>
        <button onClick={() => setMobileView('chat')} className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-accent/60">
          <span className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white bg-violet-500">DR</span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[15px] font-medium">Design review</span>
                <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">Channel</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">Friday</span>
            </span>
            <span className="mt-0.5 block truncate text-sm text-muted-foreground">Alex sent an image</span>
          </span>
        </button>
      </nav>
      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
          <User className="w-4 h-4" /> Contacts
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
          <Archive className="w-4 h-4" /> Archived Chats
        </button>
      </div>
    </aside>
  );
}
