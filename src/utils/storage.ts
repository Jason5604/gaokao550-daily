import type { AppData } from '../types';
import { DEFAULT_PHASES, DEFAULT_FIXED_TASKS } from './defaults';

const KEY = 'gaokao550';

function defaultData(): AppData {
  return {
    phases: JSON.parse(JSON.stringify(DEFAULT_PHASES)),
    fixedTasks: JSON.parse(JSON.stringify(DEFAULT_FIXED_TASKS)),
    dailyLogs: {},
  };
}

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw);
      return {
        phases: Array.isArray(d.phases) ? d.phases : defaultData().phases,
        fixedTasks: Array.isArray(d.fixedTasks) ? d.fixedTasks : defaultData().fixedTasks,
        dailyLogs: d.dailyLogs || {},
      };
    }
  } catch { /* ignore */ }
  return defaultData();
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}
