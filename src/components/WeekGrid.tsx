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
    <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] border-l-4 border-indigo-500 pl-3 mb-4">
        最近七天
      </p>
      <div className="flex justify-between">
        {days.map((d) => {
          const status = dayStatus(d, data.dailyLogs[d]);
          const date = new Date(d + 'T12:00:00');
          const isToday = d === new Date().toISOString().slice(0, 10);
          return (
            <div key={d} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-semibold text-stone-400 dark:text-stone-500">{WEEKDAYS[date.getDay()]}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                status === 'full' ? 'bg-indigo-500' :
                status === 'partial' ? 'bg-indigo-200 dark:bg-indigo-800' :
                'bg-stone-100 dark:bg-neutral-800'
              } ${isToday ? 'ring-2 ring-indigo-300 dark:ring-indigo-600 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900' : ''}`}>
                <span className={`text-sm font-bold ${
                  status === 'full' ? 'text-white' :
                  status === 'partial' ? 'text-indigo-600 dark:text-indigo-300' :
                  'text-stone-400 dark:text-stone-600'
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
