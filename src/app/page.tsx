"use client";

import { useState, useRef, useEffect } from "react";
import { ChatSidebar } from "@/features/chats/components/chat-sidebar";
import { ChatHeader } from "@/features/chats/components/chat-header";
import { ChatMessage } from "@/features/chats/components/chat-message";
import { ChatInput } from "@/features/chats/components/chat-input";
import { ChatProfile } from "@/features/chats/components/chat-profile";
import { PasscodeLock } from "@/features/auth/components/passcode-lock";

export default function ChatPage() {
  const [mobileView, setMobileView] = useState<'sidebar' | 'chat'>('sidebar');
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(330);
  const [innerSearchQuery, setInnerSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<{ author: string; text: string } | null>(null);
  const [activeEmojiTab, setActiveEmojiTab] = useState<'emoji' | 'sticker' | 'gif'>('emoji');
  const [isLocked, setIsLocked] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleReply = (author: string, text: string) => {
    setReplyTo({ author, text });
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Lock app with Ctrl+L or Cmd+L for demo purposes
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setIsLocked(true);
        return;
      }

      if (e.key === 'Escape') {
        if (showProfile) {
          setShowProfile(false);
        } else if (activeChatId !== null) {
          setActiveChatId(null);
          setMobileView('sidebar');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChatId, showProfile]);

  useEffect(() => {
    if (!showProfile) return;
    const checkWidth = () => {
      // 375 (min chat width) + 350 (profile width) = 725
      // Only auto-hide on desktop (>=1024px) when there isn't enough room for side-by-side
      if (window.innerWidth >= 1024 && window.innerWidth < sidebarWidth + 725) {
        setShowProfile(false);
      }
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [sidebarWidth, showProfile]);
  
  return (
    <main className="flex h-screen bg-background lg:p-2 relative overflow-hidden">
      {/* Ambient Spatial Gradients */}
      <div className="absolute inset-0 bg-chat-pattern opacity-40 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-7000 delay-1000" />
      <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-5000" />

      <div className="relative z-10 flex h-full w-full gap-2">
      {isLocked && (
        <PasscodeLock 
          onUnlock={() => setIsLocked(false)} 
          correctPasscode="1234" 
        />
      )}

      <ChatSidebar 
        mobileView={mobileView} 
        setMobileView={setMobileView} 
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
      />

      {activeChatId === null ? (
        <section className={`bg-background/40 backdrop-blur-3xl rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_2px_12px_rgba(255,255,255,0.2)_inset] min-w-93.75 flex-1 flex-col overflow-hidden relative ${mobileView === 'chat' ? 'flex animate-in fade-in slide-in-from-right-8 lg:animate-none duration-300' : 'hidden lg:flex'}`}>
          <div className="flex flex-1 items-center justify-center relative z-10">
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full px-6 py-2 text-[14px] font-medium text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.02)_inset] border border-white/10">
              Select a chat to start messaging
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className={`bg-background/40 backdrop-blur-3xl rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_2px_12px_rgba(255,255,255,0.2)_inset] min-w-93.75 flex-1 flex-col overflow-hidden relative ${mobileView === 'chat' && !showProfile ? 'flex animate-in fade-in slide-in-from-right-8 lg:animate-none duration-300' : 'hidden lg:flex'}`}>
            <ChatHeader 
              setMobileView={setMobileView} 
              closeChat={() => {
                setActiveChatId(null);
                setMobileView('sidebar');
                setIsSearchOpen(false);
                setInnerSearchQuery('');
              }}
              onProfileClick={() => setShowProfile(!showProfile)}
              innerSearchQuery={innerSearchQuery}
              setInnerSearchQuery={setInnerSearchQuery}
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
        
        <div className="mx-auto flex w-full max-w-4xl min-w-93.75 flex-1 flex-col overflow-hidden px-3 sm:px-8">
          <div className="flex-1 overflow-y-auto py-6">
            <div className="mx-auto mb-5 w-fit rounded-full bg-card/90 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              Today, August 18
            </div>
            
            {[
              { id: 1, author: "Quang Le", authorInitials: "QL", authorColorClass: "bg-sky-500", text: "Good morning! Ready to shape the next chapter of our launch?", time: "10:12" },
              { id: 2, align: "end", text: "I have the latest timeline and notes ready. What should we work on first?", time: "10:13", isOwnMessage: true },
              { id: 3, author: "Michael Chen", authorInitials: "MC", authorColorClass: "bg-emerald-500", text: "Let’s lock the onboarding flow first. The new draft feels much clearer.", time: "10:16", reactions: [{ emoji: "👍", count: 2 }] },
              { id: 4, align: "end", text: "Perfect. I’ll review the screens and share a final checklist before lunch.", time: "10:18", isOwnMessage: true, reactions: [{ emoji: "❤️" }] }
            ].filter(msg => msg.text.toLowerCase().includes(innerSearchQuery.toLowerCase())).map((msg) => (
              <ChatMessage 
                key={msg.id}
                author={msg.author}
                authorInitials={msg.authorInitials}
                authorColorClass={msg.authorColorClass}
                text={msg.text}
                time={msg.time}
                align={msg.align as any}
                isOwnMessage={msg.isOwnMessage}
                reactions={msg.reactions}
                onReply={handleReply}
              />
            ))}
          </div>
          
          <ChatInput 
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            inputRef={inputRef}
            activeEmojiTab={activeEmojiTab}
            setActiveEmojiTab={setActiveEmojiTab}
          />
        </div>
          </section>
          
          {showProfile && (
            <div className={mobileView === 'chat' ? 'absolute inset-0 z-50 flex md:items-center md:justify-center md:bg-black/20 md:backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none lg:static lg:block lg:w-auto lg:h-auto' : 'hidden lg:block'}>
              <ChatProfile onClose={() => setShowProfile(false)} />
            </div>
          )}
        </>
      )}
      </div>
    </main>
  );
}
