import { getLast7Days } from '../utils/date';
import { useApp } from '../context/AppContext';

function dayStatus(date: string, log: unknown): 'full' | 'partial' | 'none' {
  if (!log) return 'none';
  const l = log as { phaseCompletions?: Record<string, boolean>; fixedCompletions?: Record<string, boolean> };
  const allTasks = { ...(l.phaseCompletions ?? {}), ...(l.fixedCompletions ?? {}) };
  const entries = Object.values(allTasks);
  if (entries.length === 0) return 'none';
  const done = entries.filter(Boolean).length;
  if (done === entries.length) return 'full';
  if (done > 0) return 'partial';
  return 'none';
}

export default function WeekGrid() {
  const { data } = useApp();
  const days = getLast7Days();

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-3">最近七天</div>
      <div className="flex gap-2">
        {days.map((d) => {
          const status = dayStatus(d, data.dailyLogs[d]);
          const label = new Date(d + 'T12:00:00').toLocaleDateString('zh-CN', { weekday: 'short' });
          const color =
            status === 'full'
              ? 'bg-zinc-900 dark:bg-zinc-100'
              : status === 'partial'
              ? 'bg-zinc-400 dark:bg-zinc-500'
              : 'bg-zinc-100 dark:bg-zinc-800';
          return (
            <div key={d} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-lg ${color}`} />
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
