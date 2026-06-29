import { useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import CurrentPhaseHeader from '../components/CurrentPhaseHeader';
import TodayTasks from '../components/TodayTasks';
import FixedTasks from '../components/FixedTasks';
import Streak from '../components/Streak';
import WeekGrid from '../components/WeekGrid';
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

  if (total === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1 font-medium">今日完成</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">0</span>
          <span className="text-sm text-zinc-400 dark:text-zinc-500">项</span>
        </div>
      </div>
    );
  }

  const phaseDone = log ? Object.values(log.phaseCompletions).filter(Boolean).length : 0;
  const fixedDone = log ? Object.values(log.fixedCompletions).filter(Boolean).length : 0;
  const done = phaseDone + fixedDone;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1 font-medium">今日完成</div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{done}</span>
        <span className="text-sm text-zinc-400 dark:text-zinc-500">/ {total}</span>
      </div>
      <div className="mt-2 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-0.5 text-xs text-zinc-400">{pct}%</div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 pb-8 pt-3 space-y-3">
      <div className="flex items-center justify-between mb-1 px-0.5">
        <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Gaokao550</h1>
        <button onClick={() => navigate('/edit')} className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors font-medium">编辑计划</button>
      </div>
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
  );
}
