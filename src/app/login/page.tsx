import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-chat-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-[10%] right-[10%] w-125 h-125 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-[10%] left-[10%] w-150 h-150 bg-secondary/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-7000 delay-1000" />
      
      {/* Header/Logo (if we want it outside the form) */}
      {/* <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white ml-[-2px] mt-[1px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.067 11.218L21.464 2.127c.854-.427 1.77.307 1.488 1.189l-5.69 17.069c-.276.828-1.428.917-1.854.14L10.96 12.64 3.167 12.87c-.896.027-1.393-1.01-.735-1.638l-4.148-3.056c-.76-.56-1.077-1.474-.836-2.222 1.341-4.024 4.542-6.52 7.747-6.52 1.95 0 3.738.835 5.093 2.17.658-.629 1.155-1.666.259-1.638L2.067 11.218z" opacity="0.8" />
            <path d="M2.067 11.218c-.68.252-1.026 1.002-.821 1.68l3.195 9.584c.243.729 1.258.828 1.674.146l3.864-6.44-8.083-4.85 1.096-3.284 10.144 6.086 4.606 3.454c.734.551 1.791.134 2.05-.72l2.368-7.892-20.1 8.24z" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">Telegram</span>
      </div> */}

      <div className="z-10 w-full px-4 flex justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
