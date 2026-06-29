import { useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import CurrentPhaseHeader from '../components/CurrentPhaseHeader';
import TodayTasks from '../components/TodayTasks';
import FixedTasks from '../components/FixedTasks';
import Streak from '../components/Streak';
import WeekGrid from '../components/WeekGrid';
import ReminderBanner from '../components/ReminderBanner';
import { useApp } from '../context/AppContext';
import { getCurrentPhase } from '../utils/date';

function CompletionSummary() {
  const { data, getDayLog } = useApp();
  const today = new Date().toISOString().slice(0, 10);
  const log = getDayLog(today);
  const phase = getCurrentPhase(data.phases);
  const phaseCount = phase?.tasks.length ?? 0;
  const fixedCount = data.fixedTasks.filter(t => t.enabled).length;
  const total = phaseCount + fixedCount;

  const phaseDone = log ? Object.values(log.phaseCompletions).filter(Boolean).length : 0;
  const fixedDone = log ? Object.values(log.fixedCompletions).filter(Boolean).length : 0;
  const done = phaseDone + fixedDone;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-lg flex-shrink-0">
        {total > 0 ? `${pct}%` : '—'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em]">今日完成</p>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-2xl font-bold text-stone-800 dark:text-stone-100 tabular-nums">{done}</span>
          {total > 0 && (
            <span className="text-sm font-medium text-stone-400 dark:text-stone-500">/ {total}</span>
          )}
        </div>
        {total > 0 && (
          <div className="mt-2 h-1 bg-stone-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-neutral-950">
      <div className="max-w-md mx-auto px-4 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between pt-5 pb-4 px-1">
          <div>
            <h1 className="text-lg font-bold text-stone-800 dark:text-stone-100 tracking-tight">高考打卡</h1>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">Gaokao550 Daily</p>
          </div>
          <button onClick={() => navigate('/edit')} className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            编辑计划
          </button>
        </div>

        <div className="space-y-3">
          <ReminderBanner />
          <Countdown />
          <CurrentPhaseHeader />
          <TodayTasks />
          <FixedTasks />
          <div className="grid grid-cols-2 gap-3">
            <CompletionSummary />
            <Streak />
          </div>
          <WeekGrid />
        </div>
      </div>
    </div>
  );
}
