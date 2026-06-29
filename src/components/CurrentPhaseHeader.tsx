import { getCurrentPhase, phaseDayNumber, phaseTotalDays, daysFromStart } from '../utils/date';
import { useApp } from '../context/AppContext';

export default function CurrentPhaseHeader() {
  const { data } = useApp();
  const phase = getCurrentPhase(data.phases);

  if (!phase) {
    return (
      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">当前阶段</div>
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
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">当前阶段</div>
      <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{phase.name}</div>
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
        {phase.startDate.replace(/-/g, '.')} ~ {phase.endDate.replace(/-/g, '.')}
      </div>
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
        Day {dayNum} / {total}
      </div>
      <div className="mt-2 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <div className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
        {Math.round(pct * 100)}%
      </div>
    </div>
  );
}
