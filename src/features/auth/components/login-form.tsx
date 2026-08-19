"use client";

import React, { useState } from 'react';
import { Bot, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('1234567890:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsawa');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length > 20) {
      setIsLoading(true);
      // Simulate API call to validate the bot token
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = '/'; // redirect to main app
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-105 glass rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Decorative background gradients */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(13,148,136,0.3)]">
          <Bot className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          Sign in to Bot Panel
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-[15px]">
          Please enter your Telegram Bot Token. You can get one from <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">@BotFather</a>.
        </p>

        <form onSubmit={handleLogin} className="w-full">
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound className="w-5 h-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="1234567890:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsawa"
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[14px] font-mono"
                autoFocus
                spellCheck={false}
              />
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer group mt-2">
              <div className="w-5 h-5 rounded border border-border flex items-center justify-center group-hover:border-primary transition-colors bg-background/50">
                <div className="w-3 h-3 bg-primary rounded-sm opacity-100" />
              </div>
              <span className="text-[15px] text-foreground select-none">Remember this bot</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || token.length < 20}
            className="group relative w-full h-14 rounded-xl bg-linear-to-r from-primary to-teal-400 text-primary-foreground font-medium text-[16px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(13,148,136,0.4)] hover:shadow-[0_6px_25px_rgba(13,148,136,0.6)] active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin relative z-10" />
            ) : (
              <span className="flex items-center gap-2 relative z-10">
                Sign In
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
