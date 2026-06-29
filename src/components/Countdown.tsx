import { daysUntilGaokao, overallProgress } from '../utils/date';

export default function Countdown() {
  const days = daysUntilGaokao();
  const progress = overallProgress();

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl px-6 pt-6 pb-5 text-white">
      <p className="text-[13px] font-semibold text-white/70 uppercase tracking-[0.08em]">距离高考还有</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[72px] font-bold leading-none tracking-tight tabular-nums">{days}</span>
        <span className="text-lg font-medium text-white/70">天</span>
      </div>
      <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[13px] font-medium text-white/60">
        <span>{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
}
