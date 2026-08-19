"use client";

import { useState, useRef } from "react";
import { ChatSidebar } from "@/features/chats/components/chat-sidebar";
import { ChatHeader } from "@/features/chats/components/chat-header";
import { ChatMessage } from "@/features/chats/components/chat-message";
import { ChatInput } from "@/features/chats/components/chat-input";

export default function ChatPage() {
  const [mobileView, setMobileView] = useState<'sidebar' | 'chat'>('sidebar');
  const [replyTo, setReplyTo] = useState<{ author: string; text: string } | null>(null);
  const [activeEmojiTab, setActiveEmojiTab] = useState<'emoji' | 'sticker' | 'gif'>('emoji');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleReply = (author: string, text: string) => {
    setReplyTo({ author, text });
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  
  return (
    <main className="flex h-screen bg-background p-1">
      <ChatSidebar mobileView={mobileView} setMobileView={setMobileView} />

      <section className={`glass min-w-0 flex-1 flex-col overflow-hidden lg:rounded-l-none rounded-[16px] bg-chat-pattern ${mobileView === 'chat' ? 'flex animate-in fade-in slide-in-from-right-8 lg:animate-none duration-300' : 'hidden lg:flex'}`}>
        <ChatHeader setMobileView={setMobileView} />
        
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden px-3 sm:px-8">
          <div className="flex-1 overflow-y-auto py-6">
            <div className="mx-auto mb-5 w-fit rounded-full bg-card/90 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              Today, August 18
            </div>
            
            <ChatMessage 
              author="Quang Le"
              authorInitials="QL"
              authorColorClass="bg-sky-500"
              text="Good morning! Ready to shape the next chapter of our launch?"
              time="10:12"
              onReply={handleReply}
            />
            
            <ChatMessage 
              align="end"
              text="I have the latest timeline and notes ready. What should we work on first?"
              time="10:13"
              onReply={handleReply}
              isOwnMessage
            />
            
            <ChatMessage 
              author="Michael Chen"
              authorInitials="MC"
              authorColorClass="bg-emerald-500"
              text="Let’s lock the onboarding flow first. The new draft feels much clearer."
              time="10:16"
              onReply={handleReply}
              reactions={[{ emoji: "👍", count: 2 }]}
            />
            
            <ChatMessage 
              align="end"
              text="Perfect. I’ll review the screens and share a final checklist before lunch."
              time="10:18"
              onReply={handleReply}
              isOwnMessage
              reactions={[{ emoji: "❤️" }]}
            />
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
    </main>
  );
}
