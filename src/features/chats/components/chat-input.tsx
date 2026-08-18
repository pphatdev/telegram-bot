import { RefObject, useState } from "react";
import { X, Paperclip, Smile, Send, Image as ImageIcon, File as FileIcon, MapPin, Contact, Star, PlaySquare, Search } from "lucide-react";

interface ChatInputProps {
  replyTo: { author: string; text: string } | null;
  setReplyTo: (reply: { author: string; text: string } | null) => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  activeEmojiTab: 'emoji' | 'sticker' | 'gif';
  setActiveEmojiTab: (tab: 'emoji' | 'sticker' | 'gif') => void;
}

const EMOJIS = [
  { char: '😀', name: 'grinning face happy smile' },
  { char: '😃', name: 'grinning face with big eyes' },
  { char: '😄', name: 'grinning face with smiling eyes' },
  { char: '😁', name: 'beaming face with smiling eyes' },
  { char: '😆', name: 'grinning squinting face laugh' },
  { char: '😅', name: 'grinning face with sweat' },
  { char: '😂', name: 'face with tears of joy laugh' },
  { char: '🤣', name: 'rolling on the floor laughing rofl' },
  { char: '😊', name: 'smiling face with smiling eyes' },
  { char: '😇', name: 'smiling face with halo angel' },
  { char: '🙂', name: 'slightly smiling face' },
  { char: '🙃', name: 'upside-down face' },
  { char: '😉', name: 'winking face' },
  { char: '😌', name: 'relieved face' },
  { char: '😍', name: 'smiling face with heart-eyes love' },
  { char: '🥰', name: 'smiling face with hearts love' },
  { char: '😘', name: 'face blowing a kiss love' },
  { char: '😋', name: 'face savoring food yummy' },
  { char: '😛', name: 'face with tongue' },
  { char: '😜', name: 'winking face with tongue' },
  { char: '🤪', name: 'zany face crazy' },
  { char: '😎', name: 'smiling face with sunglasses cool' },
  { char: '🤩', name: 'star-struck star eyes' },
  { char: '🥳', name: 'partying face celebrate' },
  { char: '😏', name: 'smirking face' },
  { char: '😒', name: 'unamused face' },
  { char: '😞', name: 'disappointed face sad' },
  { char: '😔', name: 'pensive face sad' },
  { char: '😟', name: 'worried face' },
  { char: '😕', name: 'confused face' },
  { char: '🙁', name: 'slightly frowning face' },
  { char: '☹️', name: 'frowning face sad' },
  { char: '😣', name: 'persevering face' },
  { char: '😖', name: 'confounded face' },
  { char: '😫', name: 'tired face' },
  { char: '😩', name: 'weary face' },
  { char: '🥺', name: 'pleading face puppy eyes' },
  { char: '😢', name: 'crying face sad' },
  { char: '😭', name: 'loudly crying face sad sob' },
  { char: '😤', name: 'face with steam from nose angry' },
  { char: '😠', name: 'angry face mad' },
  { char: '😡', name: 'pouting face red mad' },
  { char: '🤬', name: 'face with symbols on mouth swear' },
  { char: '🤯', name: 'exploding head mind blown' },
  { char: '😳', name: 'flushed face blush' },
  { char: '🥵', name: 'hot face sweating' },
  { char: '🥶', name: 'cold face freezing' },
  { char: '😱', name: 'face screaming in fear' },
  { char: '😨', name: 'fearful face' },
  { char: '😰', name: 'anxious face with sweat' },
  { char: '😥', name: 'sad but relieved face' },
  { char: '😓', name: 'downcast face with sweat' },
  { char: '🤔', name: 'thinking face' },
  { char: '🤭', name: 'face with hand over mouth oops' },
  { char: '🤫', name: 'shushing face quiet shh' },
  { char: '🤥', name: 'lying face pinocchio' },
  { char: '😶', name: 'face without mouth speechless' },
  { char: '😐', name: 'neutral face' },
  { char: '😑', name: 'expressionless face' },
  { char: '😬', name: 'grimacing face yikes' },
  { char: '🙄', name: 'face with rolling eyes' },
  { char: '😯', name: 'hushed face surprise' },
  { char: '😦', name: 'frowning face with open mouth' },
  { char: '😧', name: 'anguished face' },
  { char: '😮', name: 'face with open mouth surprise' },
  { char: '😲', name: 'astonished face wow' },
  { char: '🥱', name: 'yawning face tired' },
  { char: '😴', name: 'sleeping face zzz' },
  { char: '🤤', name: 'drooling face' },
  { char: '😪', name: 'sleepy face' },
  { char: '😵', name: 'dizzy face' },
  { char: '🤐', name: 'zipper-mouth face secret' },
  { char: '🥴', name: 'woozy face drunk' },
  { char: '🤢', name: 'nauseated face sick' },
  { char: '🤮', name: 'face vomiting sick' },
  { char: '🤧', name: 'sneezing face sick' },
  { char: '😷', name: 'face with medical mask sick' },
  { char: '🤒', name: 'face with thermometer sick' },
  { char: '🤕', name: 'face with head-bandage sick' },
  { char: '🤑', name: 'money-mouth face rich' },
  { char: '🤠', name: 'cowboy hat face' },
  { char: '😈', name: 'smiling face with horns devil' },
  { char: '👿', name: 'angry face with horns devil' },
  { char: '👹', name: 'ogre monster' },
  { char: '👺', name: 'goblin monster' },
  { char: '🤡', name: 'clown face' },
  { char: '💩', name: 'pile of poo poop' },
  { char: '👻', name: 'ghost' },
  { char: '💀', name: 'skull dead' },
  { char: '👽', name: 'alien' },
  { char: '👾', name: 'alien monster space invader' },
  { char: '🤖', name: 'robot' },
  { char: '🎃', name: 'jack-o-lantern pumpkin halloween' },
  { char: '😺', name: 'smiling cat face' },
  { char: '😸', name: 'grinning cat face with smiling eyes' },
  { char: '😹', name: 'cat face with tears of joy' },
  { char: '😻', name: 'smiling cat face with heart-eyes' },
  { char: '😼', name: 'cat face with wry smile' },
  { char: '😽', name: 'kissing cat face' },
  { char: '🙀', name: 'weary cat face' },
  { char: '😿', name: 'crying cat face' },
  { char: '😾', name: 'pouting cat face' },
];

const STICKERS: { src?: string; name: string; char?: string }[] = [
  { src: "/stickers/pphat/0.webm", name: "pphat 😡 mad angry" },
  { src: "/stickers/pphat/1.webm", name: "pphat 😟 sad" },
  { src: "/stickers/pphat/2.webm", name: "pphat 😘 kiss love" },
  { src: "/stickers/pphat/3.webm", name: "pphat 😕 confused" },
  { src: "/stickers/pphat/4.webm", name: "pphat ☺️ blush smile" },
  { src: "/stickers/pphat/5.webm", name: "pphat 😉 wink" },
  { src: "/stickers/pphat/6.webm", name: "pphat 🤗 hug" },
  { src: "/stickers/pphat/7.webm", name: "pphat 👌 ok perfect" },
  { src: "/stickers/pphat/8.webm", name: "pphat 🌈 rainbow" },
  { src: "/stickers/pphat/9.webm", name: "pphat ❤️ heart love" },
  { src: "/stickers/pphat/10.webm", name: "pphat 😩 tired" },
  { src: "/stickers/pphat/11.webm", name: "pphat 😭 cry tears" },
  { src: "/stickers/pphat/12.webm", name: "pphat 🙂‍↕️ nod yes" },
  { src: "/stickers/pphat/13.webm", name: "pphat 😊 happy" },
  { src: "/stickers/pphat/14.webm", name: "pphat 🤤 drool" },
  { src: "/stickers/pphat/15.webm", name: "pphat 🤔 think" },
  { src: "/stickers/pphat/16.webm", name: "pphat 🤨 suspicious" },
  { src: "/stickers/pphat/17.webm", name: "pphat 🤯 mind blown wow" },
  { src: "/stickers/pphat/18.webm", name: "pphat 🫡 salute" },
  { src: "/stickers/pphat/19.webm", name: "pphat 🫥 invisible hide" },
  { src: "/stickers/pphat/20.webm", name: "pphat 🫩 stop" },
  { src: "/stickers/pphat/21.webm", name: "pphat 👍 thumbs up" },
  { src: "/stickers/pphat/22.webm", name: "pphat 😂 laugh joy" },
  { src: "/stickers/pphat/23.webm", name: "pphat 🥳 party celebrate" }
];

const GIFS = [
  { id: 1, name: 'funny cat laugh' },
  { id: 2, name: 'dog dance happy' },
  { id: 3, name: 'crying sad tears' },
  { id: 4, name: 'mind blown wow' },
  { id: 5, name: 'applause clap' },
  { id: 6, name: 'angry mad rage' },
  { id: 7, name: 'party celebrate' },
  { id: 8, name: 'hello wave hi' },
  { id: 9, name: 'goodbye wave bye' },
  { id: 10, name: 'yes nod agree' },
  { id: 11, name: 'no head shake deny' },
  { id: 12, name: 'hug love' },
];

export function ChatInput({
  replyTo,
  setReplyTo,
  inputRef,
  activeEmojiTab,
  setActiveEmojiTab
}: ChatInputProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmojis = EMOJIS.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredStickers = STICKERS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGifs = GIFS.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Reset search when switching tabs
  const handleTabChange = (tab: 'emoji' | 'sticker' | 'gif') => {
    setActiveEmojiTab(tab);
    setSearchQuery("");
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-3 pb-4 sm:px-8">
      {replyTo && (
        <div className="absolute inset-x-3 bottom-[calc(100%-16px)] sm:inset-x-8 z-0 flex items-center gap-2 rounded-t-xl bg-card/80 px-3 pb-5 pt-2 shadow-sm backdrop-blur-xl border-t border-x border-border">
          <div className="w-1 rounded-full bg-primary self-stretch my-0.5"></div>
          <div className="flex-1 min-w-0 pl-3 pr-2 py-0.5">
            <div className="font-semibold text-primary text-[13px] leading-tight">{replyTo.author}</div>
            <div className="text-muted-foreground truncate text-xs leading-tight mt-0.5">{replyTo.text}</div>
          </div>
          <button type="button" aria-label="Cancel reply" onClick={() => setReplyTo(null)} className="relative z-50 rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex items-end gap-2 relative z-10 rounded-xl bg-card px-3 py-2 shadow-sm">
        <div className="relative group/attach pb-1">
          <button aria-label="Attach file" className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="absolute bottom-full left-0 z-50 mb-2 flex flex-col gap-1 rounded-xl bg-card/95 backdrop-blur-md p-1.5 shadow-xl border border-border opacity-0 invisible transition-all group-hover/attach:visible group-hover/attach:opacity-100 scale-95 group-hover/attach:scale-100 w-48 origin-bottom-left">
            <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-accent transition-colors w-full text-left font-medium">
              <ImageIcon className="w-4 h-4 text-sky-500" /> Photo or Video
            </button>
            <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-accent transition-colors w-full text-left font-medium">
              <FileIcon className="w-4 h-4 text-emerald-500" /> Document
            </button>
            <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-accent transition-colors w-full text-left font-medium">
              <MapPin className="w-4 h-4 text-rose-500" /> Location
            </button>
            <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-accent transition-colors w-full text-left font-medium">
              <Contact className="w-4 h-4 text-amber-500" /> Contact
            </button>
          </div>
        </div>
        <textarea 
          ref={inputRef}
          rows={1} 
          placeholder="Write a message..." 
          aria-label="Write a message" 
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground field-sizing-content scrollbar-none [&::-webkit-scrollbar]:hidden"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setReplyTo(null);
            }
          }}
        />
        <div className="relative group/emoji pb-1">
          <button aria-label="Add emoji" className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <div className="absolute bottom-full right-0 z-50 mb-2 flex flex-col rounded-2xl bg-card/95 backdrop-blur-md shadow-2xl border border-border opacity-0 invisible transition-all group-hover/emoji:visible group-hover/emoji:opacity-100 scale-95 group-hover/emoji:scale-100 w-80 h-80 origin-bottom-right overflow-hidden">
            {/* Search Bar */}
            <div className="px-2 pt-2 pb-1 border-b border-border/50">
              <div className="flex items-center gap-2 rounded-lg bg-accent/50 px-2 py-1.5 text-sm transition focus-within:bg-accent focus-within:ring-1 focus-within:ring-ring">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeEmojiTab}s...`} 
                  className="w-full bg-transparent outline-none placeholder:text-muted-foreground" 
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-3">
              {activeEmojiTab === 'emoji' && (
                <div className="grid grid-cols-8 gap-1">
                  {filteredEmojis.map((emoji, i) => (
                    <button key={i} title={emoji.name} className="text-xl hover:bg-accent rounded-md p-1 transition-colors text-center">
                      {emoji.char}
                    </button>
                  ))}
                  {filteredEmojis.length === 0 && (
                    <div className="col-span-8 text-center py-8 text-sm text-muted-foreground">No emojis found.</div>
                  )}
                </div>
              )}
              {activeEmojiTab === 'sticker' && (
                <div className="grid grid-cols-4 gap-3">
                  {filteredStickers.map((sticker, i) => (
                    <button key={i} title={sticker.name} className="aspect-square bg-accent/30 rounded-xl hover:bg-accent transition-colors flex items-center justify-center text-4xl overflow-hidden p-1 relative">
                      {sticker.src ? (
                        sticker.src.endsWith('.webm') ? (
                          <video src={sticker.src} autoPlay loop muted playsInline className="w-full h-full object-contain pointer-events-none" />
                        ) : (
                          <img src={sticker.src} alt={sticker.name} className="w-full h-full object-contain pointer-events-none" />
                        )
                      ) : (
                        sticker.char
                      )}
                    </button>
                  ))}
                  {filteredStickers.length === 0 && (
                    <div className="col-span-4 text-center py-8 text-sm text-muted-foreground">No stickers found.</div>
                  )}
                </div>
              )}
              {activeEmojiTab === 'gif' && (
                <div className="grid grid-cols-2 gap-2">
                  {filteredGifs.map((gif) => (
                    <button key={gif.id} className="aspect-video bg-accent/40 rounded-lg hover:bg-accent transition-colors flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-purple-500/20" />
                      <PlaySquare className="w-8 h-8 text-foreground/30 group-hover:text-foreground/60 transition-colors z-10" />
                      <span className="absolute bottom-1 left-2 text-[10px] font-bold text-foreground/50 z-10">{gif.name}</span>
                    </button>
                  ))}
                  {filteredGifs.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-sm text-muted-foreground">No GIFs found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Tab Bar */}
            <div className="flex flex-row items-center justify-around gap-1 bg-card/80 backdrop-blur-md p-2 border-t border-border">
              <button 
                onClick={() => handleTabChange('emoji')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full py-1.5 text-sm font-medium transition-colors ${activeEmojiTab === 'emoji' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              >
                <Smile className="w-4 h-4" /> Emoji
              </button>
              <button 
                onClick={() => handleTabChange('sticker')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full py-1.5 text-sm font-medium transition-colors ${activeEmojiTab === 'sticker' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              >
                <Star className="w-4 h-4" /> Stickers
              </button>
              <button 
                onClick={() => handleTabChange('gif')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full py-1.5 text-sm font-medium transition-colors ${activeEmojiTab === 'gif' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              >
                <PlaySquare className="w-4 h-4" /> GIFs
              </button>
            </div>
          </div>
        </div>
        <button aria-label="Send message" disabled className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40">
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
