import { useApp } from '../context/AppContext';

function countStreak(logs: Record<string, unknown>): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 400; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (logs[key]) {
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
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">连续打卡</div>
      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
        {streak}
        <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500 ml-1">天</span>
      </div>
    </div>
  );
}
