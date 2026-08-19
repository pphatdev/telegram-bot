"use client";

import React, { useState } from 'react';
import { Bot, ArrowRight, Loader2, KeyRound, AtSign, Lock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'apiKey' | 'credentials'>('apiKey');
  const [token, setToken] = useState('1234567890:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsawa');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = loginMethod === 'apiKey' ? token.length > 20 : (username && password.length >= 6);
    if (isValid) {
      setIsLoading(true);
      // Simulate API call to validate the bot token
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = '/'; // redirect to main app
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-105 bg-background/40 backdrop-blur-3xl rounded-[36px] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_2px_12px_rgba(255,255,255,0.2)_inset] relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Decorative background gradients */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-[24px] bg-gradient-to-b from-primary/30 to-primary/5 flex items-center justify-center mb-6 shadow-[0_8px_32px_rgba(13,148,136,0.3),0_1px_1px_rgba(255,255,255,0.4)_inset] backdrop-blur-xl border border-white/10">
          <Bot className="w-10 h-10 text-primary drop-shadow-md" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          Sign in to Bot Panel
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-[15px]">
          Please enter your Telegram Bot Token. You can get one from <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">@BotFather</a>.
        </p>

        <form onSubmit={handleLogin} className="w-full">
          <div className="relative flex bg-black/5 dark:bg-white/5 rounded-[24px] p-1.5 mb-6 border border-white/10 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)_inset]">
            <div 
              className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-background/80 rounded-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.2)_inset] transition-transform duration-500 cubic-bezier(0.16,1,0.3,1)"
              style={{ transform: loginMethod === 'apiKey' ? 'translateX(0)' : 'translateX(100%)' }}
            />
            <button
              type="button"
              onClick={() => setLoginMethod('apiKey')}
              className={`relative z-10 flex-1 rounded-[18px] py-2 text-[14px] font-semibold transition-colors duration-300 ${
                loginMethod === 'apiKey'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground/80'
              }`}
            >
              API Key
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('credentials')}
              className={`relative z-10 flex-1 rounded-[18px] py-2 text-[14px] font-semibold transition-colors duration-300 ${
                loginMethod === 'credentials'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground/80'
              }`}
            >
              Credentials
            </button>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            {loginMethod === 'apiKey' ? (
              <div className="relative animate-in fade-in zoom-in-95 duration-300">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="1234567890:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsawa"
                  className="w-full h-14 pl-12 pr-4 rounded-[20px] bg-black/5 dark:bg-white/5 border border-white/10 focus:bg-background/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 text-[15px] font-mono shadow-[0_2px_10px_rgba(0,0,0,0.02)_inset]"
                  autoFocus
                  spellCheck={false}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <AtSign className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or Email"
                    className="w-full h-14 pl-12 pr-4 rounded-[20px] bg-black/5 dark:bg-white/5 border border-white/10 focus:bg-background/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 text-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.02)_inset]"
                    autoFocus
                    required
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-14 pl-12 pr-4 rounded-[20px] bg-black/5 dark:bg-white/5 border border-white/10 focus:bg-background/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 text-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.02)_inset]"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}
            
            <label className="flex items-center gap-3 cursor-pointer group mt-2">
              <div className="w-5 h-5 rounded-[6px] border border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-all bg-black/5 dark:bg-white/5 shadow-[0_1px_2px_rgba(0,0,0,0.1)_inset]">
                <div className="w-3 h-3 bg-primary rounded-[3px] opacity-100 shadow-[0_0_8px_rgba(13,148,136,0.5)]" />
              </div>
              <span className="text-[15px] font-medium text-foreground/80 select-none">Remember this bot</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || (loginMethod === 'apiKey' ? token.length < 20 : (!username || password.length < 6))}
            className="group relative w-full h-14 rounded-full bg-linear-to-b from-primary/90 to-teal-500 text-white font-semibold text-[16px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(13,148,136,0.3),0_1px_1px_rgba(255,255,255,0.4)_inset] hover:shadow-[0_12px_28px_rgba(13,148,136,0.5),0_1px_1px_rgba(255,255,255,0.5)_inset] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 overflow-hidden backdrop-blur-md border border-black/10 dark:border-white/10"
          >
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            
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

        <div className="mt-6 text-center">
          <p className="text-[14px] text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
