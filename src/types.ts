export interface Phase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  tasks: string[];
}

export interface FixedTask {
  id: string;
  label: string;
}

export interface DayLog {
  phaseCompletions: Record<string, boolean>;
  fixedCompletions: Record<string, boolean>;
}

export interface AppData {
  phases: Phase[];
  fixedTasks: FixedTask[];
  dailyLogs: Record<string, DayLog>;
}
