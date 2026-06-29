import { useApp } from '../context/AppContext';

function countStreak(logs: Record<string, unknown>): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 400; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (logs[d.toISOString().slice(0, 10)]) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export default function Streak() {
  const { data } = useApp();
  const streak = countStreak(data.dailyLogs as Record<string, unknown>);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-lg flex-shrink-0">
        🔥
      </div>
      <div>
        <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em]">连续打卡</p>
        <p className="mt-0.5 text-2xl font-bold text-stone-800 dark:text-stone-100 tabular-nums">
          {streak}<span className="text-base font-medium text-stone-400 dark:text-stone-500"> 天</span>
        </p>
      </div>
    </div>
  );
}
