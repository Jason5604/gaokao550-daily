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
    <div className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="text-[13px] text-zinc-400 dark:text-zinc-500 font-medium tracking-[0.02em]">连续打卡</div>
      <div className="mt-1.5 flex items-baseline gap-0.5">
        <span className="text-[32px] font-bold text-zinc-900 dark:text-zinc-100 leading-none tabular-nums">{streak}</span>
        <span className="text-sm text-zinc-400 dark:text-zinc-500 font-medium">天</span>
      </div>
    </div>
  );
}
