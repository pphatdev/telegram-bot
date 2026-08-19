import { X, Phone, AtSign, Info, Bell, Image, FileText, Link2, Mic, Trash2, Ban } from "lucide-react";

interface ChatProfileProps {
  onClose: () => void;
}

export function ChatProfile({ onClose }: ChatProfileProps) {
  return (
    <aside className="flex w-full h-full md:w-100 md:h-[85vh] lg:w-87.5 lg:h-full md:rounded-[32px] lg:rounded-[32px] shrink-0 flex-col overflow-hidden bg-background/40 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_2px_12px_rgba(255,255,255,0.2)_inset] animate-in slide-in-from-bottom-8 md:zoom-in-95 lg:zoom-in-100 lg:slide-in-from-right-8 duration-300 relative">
      <div className="flex-1 overflow-y-auto relative">
        <button onClick={onClose} aria-label="Close profile" className="absolute top-4 right-4 z-50 rounded-full p-2 text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          <X className="w-5 h-5" />
        </button>
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-10 pb-8 border-b border-white/5 bg-black/5 dark:bg-white/5 relative">
          <div className="grid size-24 place-items-center rounded-full bg-sky-500 text-3xl font-semibold text-white shadow-md mb-4">
            QL
          </div>
          <h1 className="text-xl font-semibold">Quang Le</h1>
          <p className="text-[14px] text-muted-foreground mt-1">last seen recently</p>
        </div>

        {/* Info Section */}
        <div className="p-4 border-b border-white/5">
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
        <div className="p-4 border-b border-white/5">
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
