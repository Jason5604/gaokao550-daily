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

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function WeekGrid() {
  const { data } = useApp();
  const days = getLast7Days();

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-3 font-medium">最近七天</div>
      <div className="flex justify-between">
        {days.map((d) => {
          const status = dayStatus(d, data.dailyLogs[d]);
          const date = new Date(d + 'T12:00:00');
          const weekday = date.getDay();
          const dayNum = date.getDate();
          const color =
            status === 'full'
              ? 'bg-emerald-400'
              : status === 'partial'
              ? 'bg-amber-400'
              : 'bg-zinc-100 dark:bg-zinc-800';
          const textColor = status !== 'none' ? 'text-white' : 'text-zinc-400 dark:text-zinc-500';
          return (
            <div key={d} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{WEEKDAYS[weekday]}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color} transition-colors`}>
                <span className={`text-xs font-semibold ${textColor}`}>{dayNum}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
