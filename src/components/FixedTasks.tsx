import { useApp } from '../context/AppContext';

export default function FixedTasks() {
  const { data, toggleFixedTask, getDayLog } = useApp();

  const today = new Date().toISOString().slice(0, 10);
  const dayLog = getDayLog(today);
  const completions = dayLog?.fixedCompletions ?? {};
  const enabled = data.fixedTasks.filter(t => t.enabled);

  if (enabled.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] border-l-4 border-amber-400 pl-3">
          每日固定
        </p>
        <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
          {enabled.filter(t => completions[t.id]).length}/{enabled.length}
        </span>
      </div>
      <div className="mt-1 -ml-1">
        {enabled.map((task) => {
          const done = completions[task.id] ?? false;
          return (
            <button
              key={task.id}
              onClick={() => toggleFixedTask(task.id)}
              className="w-full flex items-center gap-3 text-left py-2.5 px-1 rounded-xl hover:bg-stone-50 dark:hover:bg-neutral-800/40 transition-colors"
            >
              <span className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all duration-200 border-2 ${done ? 'bg-amber-500 border-amber-500' : 'border-stone-300 dark:border-stone-600'}`}>
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`text-sm ${done ? 'line-through text-stone-300 dark:text-stone-600' : 'text-stone-700 dark:text-stone-300'}`}>
                {task.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
