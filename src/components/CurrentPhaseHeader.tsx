import { getCurrentPhase, phaseDayNumber, phaseTotalDays, daysFromStart } from '../utils/date';
import { useApp } from '../context/AppContext';

export default function CurrentPhaseHeader() {
  const { data } = useApp();
  const phase = getCurrentPhase(data.phases);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] border-l-4 border-indigo-500 pl-3">
        当前阶段
      </p>
      {phase ? (
        <>
          <h3 className="mt-3 text-lg font-bold text-stone-800 dark:text-stone-100">{phase.name}</h3>
          <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">
            {phase.startDate.replace(/-/g, '.')} — {phase.endDate.replace(/-/g, '.')} &middot; Day {phaseDayNumber(phase)} / {phaseTotalDays(phase)}
          </p>
          <div className="mt-3 h-1.5 bg-stone-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(1, phaseDayNumber(phase) / phaseTotalDays(phase)) * 100}%` }}
            />
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm text-stone-400 dark:text-stone-500">
          未设置阶段 &middot; Day {daysFromStart() + 1}
        </p>
      )}
    </div>
  );
}
