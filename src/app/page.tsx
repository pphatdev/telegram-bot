"use client";

import { useState, useRef, useEffect } from "react";
import { ChatSidebar } from "@/features/chats/components/chat-sidebar";
import { ChatHeader } from "@/features/chats/components/chat-header";
import { ChatMessage } from "@/features/chats/components/chat-message";
import { ChatInput } from "@/features/chats/components/chat-input";
import { ChatProfile } from "@/features/chats/components/chat-profile";

export default function ChatPage() {
  const [mobileView, setMobileView] = useState<'sidebar' | 'chat'>('sidebar');
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(330);
  const [innerSearchQuery, setInnerSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<{ author: string; text: string } | null>(null);
  const [activeEmojiTab, setActiveEmojiTab] = useState<'emoji' | 'sticker' | 'gif'>('emoji');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleReply = (author: string, text: string) => {
    setReplyTo({ author, text });
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      if (window.innerWidth < sidebarWidth + 725) {
        setShowProfile(false);
      }
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [sidebarWidth, showProfile]);
  
  return (
    <main className="flex h-screen bg-background p-1">
      <ChatSidebar 
        mobileView={mobileView} 
        setMobileView={setMobileView} 
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
      />

      {activeChatId === null ? (
        <section className={`glass min-w-[375px] flex-1 flex-col overflow-hidden bg-chat-pattern ${mobileView === 'chat' ? 'flex animate-in fade-in slide-in-from-right-8 lg:animate-none duration-300' : 'hidden lg:flex'}`}>
          <div className="flex flex-1 items-center justify-center">
            <div className="bg-card/40 backdrop-blur-md rounded-full px-6 py-2 text-[14px] font-medium text-foreground shadow-sm border border-white/5">
              Select a chat to start messaging
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className={`glass min-w-[375px] flex-1 flex-col overflow-hidden bg-chat-pattern ${mobileView === 'chat' && !showProfile ? 'flex animate-in fade-in slide-in-from-right-8 lg:animate-none duration-300' : 'hidden lg:flex'}`}>
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
        
        <div className="mx-auto flex w-full max-w-4xl min-w-[375px] flex-1 flex-col overflow-hidden px-3 sm:px-8">
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
    </main>
  );
}
