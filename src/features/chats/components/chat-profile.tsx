import { X, Phone, AtSign, Info, Bell, Image, FileText, Link2, Mic, Trash2, Ban } from "lucide-react";

interface ChatProfileProps {
  onClose: () => void;
}

export function ChatProfile({ onClose }: ChatProfileProps) {
  return (
    <aside className="flex w-full h-full md:w-100 md:h-[85vh] lg:w-87.5 lg:h-full md:rounded-3xl lg:rounded-none shrink-0 flex-col overflow-hidden bg-background md:border lg:border-y-0 lg:border-r-0 lg:border-l border-border animate-in slide-in-from-bottom-8 md:zoom-in-95 lg:zoom-in-100 lg:slide-in-from-right-8 duration-300 md:shadow-2xl lg:shadow-none">
      <header className="flex h-17 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
        <h2 className="text-[16px] font-semibold">User Info</h2>
        <button onClick={onClose} aria-label="Close profile" className="rounded-full p-2 text-muted-foreground hover:bg-accent">
          <X className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center py-8 border-b border-border bg-card/30">
          <div className="grid size-24 place-items-center rounded-full bg-sky-500 text-3xl font-semibold text-white shadow-md mb-4">
            QL
          </div>
          <h1 className="text-xl font-semibold">Quang Le</h1>
          <p className="text-[14px] text-muted-foreground mt-1">last seen recently</p>
        </div>

        {/* Info Section */}
        <div className="p-4 border-b border-border">
          <div className="text-[13px] font-semibold text-primary mb-3">Info</div>
          <div className="flex items-center gap-4 mb-4">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="text-[15px] font-medium">+1 234 567 8900</div>
              <div className="text-[13px] text-muted-foreground">Mobile</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <AtSign className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="text-[15px] font-medium">@quangle</div>
              <div className="text-[13px] text-muted-foreground">Username</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Info className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="text-[15px] font-medium line-clamp-2">Building amazing products and helping teams grow.</div>
              <div className="text-[13px] text-muted-foreground">Bio</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div className="text-[15px] font-medium">Notifications</div>
            </div>
            <button className="w-10 h-6 rounded-full bg-primary/20 flex items-center p-0.5">
              <div className="w-5 h-5 rounded-full bg-primary shadow-sm transform translate-x-4"></div>
            </button>
          </div>
        </div>

        {/* Shared Media */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13px] font-semibold text-primary">Shared Media</div>
          </div>
          <button className="flex w-full items-center justify-between py-2.5 text-left hover:bg-accent/50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center gap-4">
              <div className="grid size-9 place-items-center rounded-lg bg-blue-500/10 text-blue-500"><Image className="w-5 h-5" /></div>
              <div className="text-[15px] font-medium">42 Photos and Videos</div>
            </div>
          </button>
          <button className="flex w-full items-center justify-between py-2.5 text-left hover:bg-accent/50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center gap-4">
              <div className="grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-500"><FileText className="w-5 h-5" /></div>
              <div className="text-[15px] font-medium">12 Files</div>
            </div>
          </button>
          <button className="flex w-full items-center justify-between py-2.5 text-left hover:bg-accent/50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center gap-4">
              <div className="grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-500"><Link2 className="w-5 h-5" /></div>
              <div className="text-[15px] font-medium">8 Shared Links</div>
            </div>
          </button>
          <button className="flex w-full items-center justify-between py-2.5 text-left hover:bg-accent/50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center gap-4">
              <div className="grid size-9 place-items-center rounded-lg bg-purple-500/10 text-purple-500"><Mic className="w-5 h-5" /></div>
              <div className="text-[15px] font-medium">5 Voice Messages</div>
            </div>
          </button>
        </div>

        {/* Actions */}
        <div className="p-4">
          <button className="flex w-full items-center gap-4 py-2.5 text-left hover:bg-destructive/10 rounded-lg px-2 -mx-2 transition-colors text-destructive">
            <Ban className="w-5 h-5" />
            <div className="text-[15px] font-medium">Block User</div>
          </button>
          <button className="flex w-full items-center gap-4 py-2.5 text-left hover:bg-destructive/10 rounded-lg px-2 -mx-2 transition-colors text-destructive">
            <Trash2 className="w-5 h-5" />
            <div className="text-[15px] font-medium">Delete Chat</div>
          </button>
        </div>
      </div>
    </aside>
  );
}
