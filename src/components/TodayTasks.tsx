import { getCurrentPhase } from '../utils/date';
import { useApp } from '../context/AppContext';

export default function TodayTasks() {
  const { data, togglePhaseTask, getDayLog } = useApp();
  const phase = getCurrentPhase(data.phases);

  if (!phase) return null;

  const today = new Date().toISOString().slice(0, 10);
  const dayLog = getDayLog(today);
  const completions = dayLog?.phaseCompletions ?? {};

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-3">今日任务</div>
      <div className="space-y-2">
        {phase.tasks.map((task) => {
          const done = completions[task] ?? false;
          return (
            <button
              key={task}
              onClick={() => togglePhaseTask(task)}
              className="w-full flex items-center gap-3 text-left py-1.5"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  done
                    ? 'bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100'
                    : 'border-zinc-300 dark:border-zinc-600'
                }`}
              >
                {done && (
                  <svg className="w-3 h-3 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`text-sm ${done ? 'line-through text-zinc-300 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-200'}`}>
                {task}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
