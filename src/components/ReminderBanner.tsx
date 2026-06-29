import { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export default function ReminderBanner() {
  const { data, getDayLog } = useApp();
  const [dismissed, setDismissed] = useState(false);
  const [notifPerm, setNotifPerm] = useState<NotificationPermission>('default');
  const intervalRef = useRef<number>();

  const today = new Date().toISOString().slice(0, 10);
  const log = getDayLog(today);
  const all = { ...(log?.phaseCompletions ?? {}), ...(log?.fixedCompletions ?? {}) };
  const vals = Object.values(all);
  const allDone = vals.length > 0 && vals.every(Boolean);

  // Read initial permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotifPerm(Notification.permission);
    }
  }, []);

  // Update tab title
  useEffect(() => {
    document.title = allDone ? 'Gaokao550' : '⚠ 还未打卡';
    return () => { document.title = 'Gaokao550'; };
  }, [allDone]);

  // Schedule notification + title check
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const l = getDayLog(today);
      const a = { ...(l?.phaseCompletions ?? {}), ...(l?.fixedCompletions ?? {}) };
      const v = Object.values(a);
      const done = v.length > 0 && v.every(Boolean);
      document.title = done ? 'Gaokao550' : '⚠ 还未打卡';

      if (!done && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Gaokao550', {
          body: '今日还未打卡，快去完成任务！',
          icon: '/gaokao550-daily/icon-192.png',
        });
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(intervalRef.current);
  }, [getDayLog, today]);

  function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(setNotifPerm);
    }
  }

  if (allDone || dismissed) return null;
  if (vals.length === 0) return null;

  const remaining = vals.length - vals.filter(Boolean).length;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-3.5 flex items-center gap-3">
      <span className="text-lg flex-shrink-0">⏰</span>
      <p className="text-sm text-amber-800 dark:text-amber-200 flex-1">
        还有 <strong>{remaining}</strong> 个任务未完成
      </p>
      <div className="flex items-center gap-2 flex-shrink-0">
        {notifPerm === 'default' && (
          <button onClick={requestPermission} className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700">
            通知
          </button>
        )}
        <button onClick={() => setDismissed(true)} className="text-xs text-amber-400 hover:text-amber-600">
          忽略
        </button>
      </div>
    </div>
  );
}
