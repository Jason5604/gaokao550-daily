import { getCurrentPhase } from '../utils/date';
import { useApp } from '../context/AppContext';

export default function TodayTasks() {
  const { data, togglePhaseTask, getDayLog } = useApp();
  const phase = getCurrentPhase(data.phases);

  if (!phase || phase.tasks.length === 0) return null;

  const today = new Date().toISOString().slice(0, 10);
  const dayLog = getDayLog(today);
  const completions = dayLog?.phaseCompletions ?? {};
  const doneCount = Object.values(completions).filter(Boolean).length;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-violet-400" />
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">今日任务</span>
        <span className="ml-auto text-xs text-zinc-400">{doneCount}/{phase.tasks.length}</span>
      </div>
      <div className="space-y-1">
        {phase.tasks.map((task) => {
          const done = completions[task] ?? false;
          return (
            <button
              key={task}
              onClick={() => togglePhaseTask(task)}
              className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  done
                    ? 'bg-violet-500 border-violet-500 scale-110'
                    : 'border-zinc-300 dark:border-zinc-600'
                }`}
              >
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`text-sm transition-colors ${done ? 'line-through text-zinc-300 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-200'}`}>
                {task}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
