import React, { useState, useEffect } from 'react';
import { Lock, Delete, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasscodeLockProps {
  onUnlock: () => void;
  correctPasscode?: string;
}

export function PasscodeLock({ onUnlock, correctPasscode = '1234' }: PasscodeLockProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (passcode.length === 4) {
      if (passcode === correctPasscode) {
        // Success: delay slightly for visual feedback then unlock
        setTimeout(() => onUnlock(), 200);
      } else {
        // Error
        setError(true);
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
          setPasscode('');
          setError(false);
        }, 500);
      }
    }
  }, [passcode, correctPasscode, onUnlock]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [passcode]);

  const handleNumberClick = (num: string) => {
    if (passcode.length < 4) {
      setPasscode(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPasscode(prev => prev.slice(0, -1));
    setError(false);
  };

  const dots = [0, 1, 2, 3];

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/80 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className={cn("flex flex-col items-center max-w-sm w-full px-8", shaking && "animate-shake")}>
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(13,148,136,0.2)] dark:shadow-[0_0_40px_rgba(13,148,136,0.1)]">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-[22px] font-semibold mb-2 tracking-tight text-foreground">Enter Passcode</h2>
        <p className="text-muted-foreground text-[15px] mb-12 h-5">
          {error ? <span className="text-destructive font-medium">Incorrect passcode</span> : "Please enter your passcode"}
        </p>

        <div className="flex gap-5 mb-16 h-4 items-center">
          {dots.map(i => (
            <div 
              key={i} 
              className={cn(
                "w-3.5 h-3.5 rounded-full transition-all duration-200",
                passcode.length > i 
                  ? "bg-primary scale-110" 
                  : "bg-primary/20 scale-100",
                error && passcode.length > i && "bg-destructive"
              )} 
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-x-12 gap-y-6 w-full max-w-70">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="w-16 h-16 rounded-full flex items-center justify-center text-[28px] font-light hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors mx-auto text-foreground"
            >
              {num}
            </button>
          ))}
          <button 
            className="w-16 h-16 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors mx-auto text-primary"
            onClick={() => {
              // Trigger biometric auth in a real app
            }}
          >
            <Fingerprint className="w-7 h-7" />
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            className="w-16 h-16 rounded-full flex items-center justify-center text-[28px] font-light hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors mx-auto text-foreground"
          >
            0
          </button>
          <button 
            onClick={handleDelete}
            className="w-16 h-16 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors mx-auto text-foreground"
          >
            <Delete className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
