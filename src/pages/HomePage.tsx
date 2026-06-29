import { useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import CurrentPhaseHeader from '../components/CurrentPhaseHeader';
import TodayTasks from '../components/TodayTasks';
import FixedTasks from '../components/FixedTasks';
import Streak from '../components/Streak';
import WeekGrid from '../components/WeekGrid';
import { useApp } from '../context/AppContext';

function CompletionSummary() {
  const { data, getDayLog } = useApp();
  const today = new Date().toISOString().slice(0, 10);
  const log = getDayLog(today);
  if (!log) {
    return (
      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">今日完成</div>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">0%</div>
      </div>
    );
  }
  const phaseDone = Object.values(log.phaseCompletions).filter(Boolean).length;
  const fixedDone = Object.values(log.fixedCompletions).filter(Boolean).length;
  const done = phaseDone + fixedDone;
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">今日完成</div>
      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
        {done}<span className="text-sm font-normal text-zinc-400 dark:text-zinc-500"> 项</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 pb-8 pt-4 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Gaokao550</h1>
        <button onClick={() => navigate('/edit')} className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">编辑计划</button>
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
