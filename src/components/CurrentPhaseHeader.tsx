import { getCurrentPhase, phaseDayNumber, phaseTotalDays, daysFromStart } from '../utils/date';
import { useApp } from '../context/AppContext';

export default function CurrentPhaseHeader() {
  const { data } = useApp();
  const phase = getCurrentPhase(data.phases);

  if (!phase) {
    return (
      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">当前阶段</span>
        </div>
        <div className="text-zinc-400 dark:text-zinc-500 text-sm">未设置阶段</div>
        <div className="mt-1 text-xs text-zinc-400">Day {daysFromStart() + 1}</div>
      </div>
    );
  }

  const dayNum = phaseDayNumber(phase);
  const total = phaseTotalDays(phase);
  const pct = Math.min(1, dayNum / total);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">当前阶段</span>
        <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">Day {dayNum} / {total}</span>
      </div>
      <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-1">{phase.name}</div>
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
        {phase.startDate.replace(/-/g, '.')} ~ {phase.endDate.replace(/-/g, '.')}
      </div>
      <div className="mt-3 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{Math.round(pct * 100)}%</div>
    </div>
  );
}
