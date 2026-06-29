import { START_DATE, GAOKAO_DATE } from './defaults';

export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayStr(): string {
  return formatDate(new Date());
}

export function daysBetween(a: string, b: string): number {
  const diff = parseDate(b).getTime() - parseDate(a).getTime();
  return Math.round(diff / 86400000);
}

export function daysFromStart(): number {
  return daysBetween(START_DATE, todayStr());
}

export function daysUntilGaokao(): number {
  const d = daysBetween(todayStr(), GAOKAO_DATE);
  return Math.max(0, d);
}

export function overallProgress(): number {
  const total = daysBetween(START_DATE, GAOKAO_DATE);
  const elapsed = daysFromStart();
  return Math.min(1, Math.max(0, elapsed / total));
}

export function getCurrentPhase<T extends { startDate: string; endDate: string }>(phases: T[]): T | null {
  const today = todayStr();
  for (const p of phases) {
    if (today >= p.startDate && today <= p.endDate) return p;
  }
  return null;
}

export function phaseDayNumber(phase: { startDate: string }): number {
  return daysBetween(phase.startDate, todayStr()) + 1;
}

export function phaseTotalDays(phase: { startDate: string; endDate: string }): number {
  return daysBetween(phase.startDate, phase.endDate) + 1;
}

export function getLast7Days(): string[] {
  const result: string[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    result.push(formatDate(d));
  }
  return result;
}
