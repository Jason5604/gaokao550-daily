import { useApp } from '../context/AppContext';

export default function FixedTasks() {
  const { data, toggleFixedTask, getDayLog } = useApp();

  const today = new Date().toISOString().slice(0, 10);
  const dayLog = getDayLog(today);
  const completions = dayLog?.fixedCompletions ?? {};
  const enabled = data.fixedTasks.filter(t => t.enabled);

  if (enabled.length === 0) return null;

  const doneCount = enabled.filter(t => completions[t.id]).length;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">每日固定</span>
        <span className="ml-auto text-xs text-zinc-400">{doneCount}/{enabled.length}</span>
      </div>
      <div className="space-y-1">
        {enabled.map((task) => {
          const done = completions[task.id] ?? false;
          return (
            <button
              key={task.id}
              onClick={() => toggleFixedTask(task.id)}
              className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  done
                    ? 'bg-amber-500 border-amber-500 scale-110'
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
                {task.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
