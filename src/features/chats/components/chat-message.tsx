import { ReactNode } from "react";
import { Smile, Reply, CornerUpLeft, Copy, Trash2, Edit2 } from "lucide-react";
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from "@/components/ui/context-menu";

interface Reaction {
  emoji: string;
  count?: number;
}

interface ChatMessageProps {
  align?: "start" | "end";
  author?: string;
  authorInitials?: string;
  authorColorClass?: string;
  text?: string;
  time: string;
  isOwnMessage?: boolean;
  reactions?: Reaction[];
  children?: ReactNode;
  onReply?: (author: string, text: string) => void;
}

export function ChatMessage({
  align = "start",
  author,
  authorInitials,
  authorColorClass = "bg-sky-500",
  text,
  time,
  isOwnMessage,
  reactions,
  children,
  onReply,
}: ChatMessageProps) {
  const isEnd = align === "end";
  const authorName = author || (isOwnMessage ? "You" : "User");
  const replyText = text || "Message";

  const handleReplyClick = () => {
    if (onReply) {
      onReply(authorName, replyText);
    }
  };

  const bubbleClasses = align === "start"
    ? "rounded-[22px] rounded-bl-md px-4 py-2.5 text-sm leading-6"
    : "rounded-[22px] rounded-br-md px-4 py-2.5 text-sm leading-6";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={`group/msg mb-3 flex items-end gap-2 ${isEnd ? 'relative justify-end' : ''}`}>
          
          {!isEnd && authorInitials && (
            <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ${authorColorClass}`}>
              {authorInitials}
            </span>
          )}

          <Bubble align={align} variant="glass" className={(isEnd || reactions?.length) ? 'mb-2' : ''}>
            <BubbleContent className={bubbleClasses}>
              {!isEnd && author && (
                <p className={`mb-0.5 text-[13px] font-semibold text-${authorColorClass.split('-')[1]}-500`}>
                  {author}
                </p>
              )}
              {children || <p>{text}</p>}
              <span className={`mt-1 block text-[11px] ${isEnd ? 'opacity-70' : 'text-muted-foreground'} text-right`}>
                {time}
              </span>
            </BubbleContent>
            
            {reactions && reactions.length > 0 && (
              <BubbleReactions side="bottom" align={isEnd ? "start" : "end"} className={isEnd ? "-translate-x-2" : "translate-x-2"}>
                {reactions.map((r, i) => (
                  <span key={i} className="flex items-center gap-0.5">
                    <span className="px-1 text-[11px]">{r.emoji}</span>
                    {r.count && <span className="px-1 text-[10px] font-medium">{r.count}</span>}
                  </span>
                ))}
              </BubbleReactions>
            )}
          </Bubble>

          <div className={isEnd ? "absolute right-2 -bottom-2 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover/msg:opacity-100" : `mb-2 flex items-center gap-1 opacity-0 transition-opacity group-hover/msg:opacity-100 ${reactions?.length ? 'mb-4' : ''}`}>
            <div className="relative group/react">
              <button aria-label="React" className={`rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground ${isEnd ? 'bg-background shadow-sm border border-border' : ''}`}>
                <Smile className="w-4 h-4" />
              </button>
              <div className="absolute bottom-full left-1/2 z-50 mb-1 flex -translate-x-1/2 flex-col items-center gap-1 rounded-full bg-card px-1.5 py-2 shadow-md border border-border opacity-0 invisible transition-all group-hover/react:visible group-hover/react:opacity-100 scale-95 group-hover/react:scale-100">
                <button className="text-lg hover:scale-125 transition-transform py-1">👍</button>
                <button className="text-lg hover:scale-125 transition-transform py-1">❤️</button>
                <button className="text-lg hover:scale-125 transition-transform py-1">😂</button>
                <button className="text-lg hover:scale-125 transition-transform py-1">🔥</button>
              </div>
            </div>
            
            <button aria-label="Reply" onClick={handleReplyClick} className={`rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground ${isEnd ? 'bg-background shadow-sm border border-border' : ''}`}>
              <Reply className="w-4 h-4" />
            </button>
          </div>

        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48 overflow-visible">
        <div className="absolute bottom-[calc(100%+8px)] left-0 flex w-full justify-between items-center gap-1 rounded-full bg-popover px-3 py-1.5 shadow-md border border-border">
          <button className="text-lg hover:scale-125 transition-transform px-1">👍</button>
          <button className="text-lg hover:scale-125 transition-transform px-1">❤️</button>
          <button className="text-lg hover:scale-125 transition-transform px-1">😂</button>
          <button className="text-lg hover:scale-125 transition-transform px-1">🔥</button>
        </div>
        <ContextMenuItem onClick={handleReplyClick} className="gap-2 cursor-pointer">
          <CornerUpLeft className="w-4 h-4" /> Reply
        </ContextMenuItem>
        {isEnd && (
          <ContextMenuItem className="gap-2 cursor-pointer">
            <Edit2 className="w-4 h-4" /> Edit
          </ContextMenuItem>
        )}
        <ContextMenuItem className="gap-2 cursor-pointer">
          <Copy className="w-4 h-4" /> Copy Text
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
          <Trash2 className="w-4 h-4" /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
