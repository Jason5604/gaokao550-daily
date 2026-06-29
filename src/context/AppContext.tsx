import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { AppData, Phase, FixedTask, DayLog } from '../types';
import { loadData, saveData } from '../utils/storage';
import { todayStr } from '../utils/date';

interface AppContextType {
  data: AppData;
  refresh: () => void;
  addPhase: (p: Omit<Phase, 'id'>) => void;
  updatePhase: (id: string, p: Partial<Phase>) => void;
  deletePhase: (id: string) => void;
  reorderPhases: (phases: Phase[]) => void;
  addFixedTask: (label: string) => void;
  removeFixedTask: (id: string) => void;
  updateFixedTask: (id: string, label: string) => void;
  togglePhaseTask: (taskName: string) => void;
  toggleFixedTask: (taskId: string) => void;
  getDayLog: (date: string) => DayLog | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

let idCounter = Date.now();
function genId() {
  return String(++idCounter);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadData());

  const refresh = useCallback(() => {
    setData(loadData());
  }, []);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const addPhase = useCallback((p: Omit<Phase, 'id'>) => {
    setData(prev => ({ ...prev, phases: [...prev.phases, { ...p, id: genId() }] }));
  }, []);

  const updatePhase = useCallback((id: string, p: Partial<Phase>) => {
    setData(prev => ({
      ...prev,
      phases: prev.phases.map(ph => (ph.id === id ? { ...ph, ...p } : ph)),
    }));
  }, []);

  const deletePhase = useCallback((id: string) => {
    setData(prev => ({ ...prev, phases: prev.phases.filter(ph => ph.id !== id) }));
  }, []);

  const reorderPhases = useCallback((phases: Phase[]) => {
    setData(prev => ({ ...prev, phases }));
  }, []);

  const addFixedTask = useCallback((label: string) => {
    setData(prev => ({
      ...prev,
      fixedTasks: [...prev.fixedTasks, { id: genId(), label }],
    }));
  }, []);

  const removeFixedTask = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      fixedTasks: prev.fixedTasks.filter(t => t.id !== id),
    }));
  }, []);

  const updateFixedTask = useCallback((id: string, label: string) => {
    setData(prev => ({
      ...prev,
      fixedTasks: prev.fixedTasks.map(t => (t.id === id ? { ...t, label } : t)),
    }));
  }, []);

  const getDayLog = useCallback(
    (date: string): DayLog | undefined => data.dailyLogs[date],
    [data.dailyLogs]
  );

  const togglePhaseTask = useCallback((taskName: string) => {
    const today = todayStr();
    setData(prev => {
      const logs = { ...prev.dailyLogs };
      const dayLog: DayLog = logs[today] ? { ...logs[today] } : { phaseCompletions: {}, fixedCompletions: {} };
      dayLog.phaseCompletions = { ...dayLog.phaseCompletions };
      dayLog.phaseCompletions[taskName] = !dayLog.phaseCompletions[taskName];
      logs[today] = dayLog;
      return { ...prev, dailyLogs: logs };
    });
  }, []);

  const toggleFixedTask = useCallback((taskId: string) => {
    const today = todayStr();
    setData(prev => {
      const logs = { ...prev.dailyLogs };
      const dayLog: DayLog = logs[today] ? { ...logs[today] } : { phaseCompletions: {}, fixedCompletions: {} };
      dayLog.fixedCompletions = { ...dayLog.fixedCompletions };
      dayLog.fixedCompletions[taskId] = !dayLog.fixedCompletions[taskId];
      logs[today] = dayLog;
      return { ...prev, dailyLogs: logs };
    });
  }, []);

  return (
    <AppContext.Provider value={{ data, refresh, addPhase, updatePhase, deletePhase, reorderPhases, addFixedTask, removeFixedTask, updateFixedTask, togglePhaseTask, toggleFixedTask, getDayLog }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
