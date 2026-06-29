import { daysUntilGaokao, overallProgress } from '../utils/date';

export default function Countdown() {
  const days = daysUntilGaokao();
  const progress = overallProgress();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="text-[13px] text-zinc-400 dark:text-zinc-500 font-medium tracking-[0.02em]">距离高考</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[56px] font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight tabular-nums">{days}</span>
        <span className="text-lg text-zinc-400 dark:text-zinc-500 font-medium">天</span>
      </div>
      <div className="mt-5 h-[3px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mt-2 text-[13px] text-zinc-300 dark:text-zinc-600 font-medium">
        {Math.round(progress * 100)}%
      </div>
    </div>
  );
}
