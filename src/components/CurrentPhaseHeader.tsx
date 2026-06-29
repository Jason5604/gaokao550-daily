import { getCurrentPhase, phaseDayNumber, phaseTotalDays, daysFromStart } from '../utils/date';
import { useApp } from '../context/AppContext';

export default function CurrentPhaseHeader() {
  const { data } = useApp();
  const phase = getCurrentPhase(data.phases);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="text-[13px] text-zinc-400 dark:text-zinc-500 font-medium tracking-[0.02em]">当前阶段</div>
      {phase ? (
        <>
          <div className="mt-1.5 text-xl font-bold text-zinc-900 dark:text-zinc-100">{phase.name}</div>
          <div className="flex items-center gap-3 mt-2 text-[13px] text-zinc-400 dark:text-zinc-500">
            <span>{phase.startDate.replace(/-/g, '.')} ~ {phase.endDate.replace(/-/g, '.')}</span>
            <span className="w-[1px] h-3 bg-zinc-200 dark:bg-zinc-700" />
            <span>Day {phaseDayNumber(phase)} / {phaseTotalDays(phase)}</span>
          </div>
          <div className="mt-3 h-[3px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(1, phaseDayNumber(phase) / phaseTotalDays(phase)) * 100}%` }}
            />
          </div>
        </>
      ) : (
        <div className="mt-1.5 text-zinc-300 dark:text-zinc-600">未设置阶段 · Day {daysFromStart() + 1}</div>
      )}
    </div>
  );
}
