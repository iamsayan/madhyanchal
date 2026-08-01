import { Loader2, Sparkles } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center space-y-4 py-16">
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute h-16 w-16 rounded-full bg-amber-500/20 blur-xl dark:bg-amber-500/10" />
        {/* Spinner */}
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
        <Sparkles className="absolute h-4 w-4 animate-pulse text-amber-400" />
      </div>
      <p className="animate-pulse text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Loading...
      </p>
    </div>
  );
}
