import { daysUntilGaokao, overallProgress } from '../utils/date';

export default function Countdown() {
  const days = daysUntilGaokao();
  const progress = overallProgress();

  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 p-6 shadow-lg">
      <div className="text-xs text-zinc-400 mb-1 font-medium tracking-wide">距离高考</div>
      <div className="text-5xl font-bold text-white tabular-nums tracking-tight">
        {days}
        <span className="text-xl font-normal text-zinc-400 ml-1">天</span>
      </div>
      <div className="mt-4 h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)',
          }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-zinc-500">
        <span>已过 {Math.round(progress * 343)} 天</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
}
