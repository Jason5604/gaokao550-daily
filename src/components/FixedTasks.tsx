import { useApp } from '../context/AppContext';

export default function FixedTasks() {
  const { data, toggleFixedTask, getDayLog } = useApp();

  const today = new Date().toISOString().slice(0, 10);
  const dayLog = getDayLog(today);
  const completions = dayLog?.fixedCompletions ?? {};
  const enabled = data.fixedTasks.filter(t => t.enabled);

  if (enabled.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] text-zinc-400 dark:text-zinc-500 font-medium tracking-[0.02em]">每日固定</span>
        <span className="text-[13px] text-zinc-300 dark:text-zinc-600 font-medium">
          {enabled.filter(t => completions[t.id]).length} / {enabled.length}
        </span>
      </div>
      <div className="space-y-1">
        {enabled.map((task) => {
          const done = completions[task.id] ?? false;
          return (
            <button
              key={task.id}
              onClick={() => toggleFixedTask(task.id)}
              className="w-full flex items-center gap-3 text-left py-2.5 px-1"
            >
              <span className={`w-[20px] h-[20px] rounded-full border-[1.5px] flex-shrink-0 flex items-center justify-center transition-all duration-200 ${done ? 'bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100' : 'border-zinc-300 dark:border-zinc-600'}`}>
                {done && (
                  <svg className="w-[11px] h-[11px] text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`text-sm tracking-[0.01em] transition-colors duration-200 ${done ? 'line-through text-zinc-300 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-200'}`}>
                {task.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
