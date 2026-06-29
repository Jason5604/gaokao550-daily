import type { Phase, FixedTask } from '../types';

export const GAOKAO_DATE = '2027-06-07';
export const START_DATE = '2026-06-29';

export const DEFAULT_PHASES: Phase[] = [
  {
    id: 'math-1',
    name: '数学基础阶段',
    startDate: '2026-06-29',
    endDate: '2026-08-15',
    tasks: ['上系统课', '刷专题', '复习错题'],
  },
  {
    id: 'eng-1',
    name: '英语基础阶段',
    startDate: '2026-08-16',
    endDate: '2026-10-15',
    tasks: ['阅读', '背单词', '语法填空', '作文'],
  },
  {
    id: 'geo-1',
    name: '地理基础阶段',
    startDate: '2026-10-16',
    endDate: '2026-12-15',
    tasks: ['上系统课', '刷专题', '复习错题'],
  },
];

export const DEFAULT_FIXED_TASKS: FixedTask[] = [
  { id: 'eng-reading', label: '英语阅读' },
  { id: 'eng-words', label: '背单词' },
  { id: 'eng-writing', label: '作文/读后续写' },
  { id: 'chn-reading', label: '语文阅读' },
  { id: 'chn-writing', label: '作文素材/模板' },
];
