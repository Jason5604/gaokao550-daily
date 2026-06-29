import { daysUntilGaokao, overallProgress } from '../utils/date';

export default function Countdown() {
  const days = daysUntilGaokao();
  const progress = overallProgress();

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">距离高考</div>
      <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
        {days}
        <span className="text-lg font-normal text-zinc-400 dark:text-zinc-500 ml-1">天</span>
      </div>
      <div className="mt-3 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
        {Math.round(progress * 100)}%
      </div>
    </div>
  );
}
