import { getLast7Days } from '../utils/date';
import { useApp } from '../context/AppContext';

function dayStatus(date: string, log: unknown): 'full' | 'partial' | 'none' {
  if (!log) return 'none';
  const l = log as Record<string, Record<string, boolean>>;
  const all = { ...(l.phaseCompletions ?? {}), ...(l.fixedCompletions ?? {}) };
  const vals = Object.values(all);
  if (vals.length === 0) return 'none';
  const done = vals.filter(Boolean).length;
  if (done === vals.length) return 'full';
  if (done > 0) return 'partial';
  return 'none';
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function WeekGrid() {
  const { data } = useApp();
  const days = getLast7Days();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="text-[13px] text-zinc-400 dark:text-zinc-500 font-medium tracking-[0.02em] mb-4">最近七天</div>
      <div className="flex justify-between">
        {days.map((d) => {
          const status = dayStatus(d, data.dailyLogs[d]);
          const date = new Date(d + 'T12:00:00');
          return (
            <div key={d} className="flex flex-col items-center gap-1.5">
              <span className="text-[12px] text-zinc-400 dark:text-zinc-500 font-medium">{WEEKDAYS[date.getDay()]}</span>
              <div className={`w-[36px] h-[36px] rounded-xl flex items-center justify-center transition-colors ${
                status === 'full' ? 'bg-zinc-900 dark:bg-zinc-100' :
                status === 'partial' ? 'bg-zinc-300 dark:bg-zinc-600' :
                'bg-zinc-100 dark:bg-zinc-800'
              }`}>
                <span className={`text-sm font-semibold ${
                  status !== 'none' ? 'text-white dark:text-zinc-900' : 'text-zinc-400 dark:text-zinc-600'
                }`}>
                  {date.getDate()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
