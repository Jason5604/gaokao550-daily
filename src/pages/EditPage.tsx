import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Phase } from '../types';

function PhaseEditor({ phase }: { phase: Phase }) {
  const { updatePhase, deletePhase } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(phase.name);
  const [start, setStart] = useState(phase.startDate);
  const [end, setEnd] = useState(phase.endDate);
  const [tasks, setTasks] = useState(phase.tasks);
  const [newTask, setNewTask] = useState('');

  function save() {
    updatePhase(phase.id, { name, startDate: start, endDate: end, tasks: tasks.filter(Boolean) });
    setEditing(false);
  }

  function addTask() {
    const t = newTask.trim();
    if (t && !tasks.includes(t)) {
      setTasks([...tasks, t]);
      setNewTask('');
    }
  }

  function removeTask(idx: number) {
    setTasks(tasks.filter((_, i) => i !== idx));
  }

  if (!editing) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-bold text-stone-800 dark:text-stone-100">{phase.name}</h4>
            <p className="text-sm text-stone-400 dark:text-stone-500 mt-0.5">{phase.startDate.replace(/-/g, '.')} — {phase.endDate.replace(/-/g, '.')}</p>
            <p className="text-sm text-stone-400 dark:text-stone-500 truncate max-w-[200px]">{phase.tasks.join(' · ')}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0 mt-1">
            <button onClick={() => setEditing(true)} className="text-xs font-semibold text-indigo-500 hover:text-indigo-600">编辑</button>
            <button onClick={() => deletePhase(phase.id)} className="text-xs font-semibold text-red-400 hover:text-red-500">删除</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">阶段名称</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1.5 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800" />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">开始</label>
            <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full mt-1.5 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">结束</label>
            <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full mt-1.5 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">任务列表</label>
          <div className="mt-1.5 space-y-1">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 dark:bg-neutral-800/50">
                <span className="text-sm text-stone-700 dark:text-stone-300 flex-1">{t}</span>
                <button onClick={() => removeTask(i)} className="text-xs text-stone-400 hover:text-red-400 transition-colors">✕</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="添加任务" className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 placeholder:text-stone-300 dark:placeholder:text-stone-600" />
            <button onClick={addTask} className="px-3 py-1.5 text-sm rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold">添加</button>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={save} className="px-4 py-1.5 text-sm rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold">保存</button>
          <button onClick={() => setEditing(false)} className="px-4 py-1.5 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-neutral-800 transition-colors font-semibold">取消</button>
        </div>
      </div>
    </div>
  );
}

function FixedTaskManager() {
  const { data, addFixedTask, removeFixedTask, toggleFixedTaskEnabled } = useApp();
  const [newLabel, setNewLabel] = useState('');

  function handleAdd() {
    const t = newLabel.trim();
    if (t) {
      addFixedTask(t);
      setNewLabel('');
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] border-l-4 border-amber-400 pl-3 mb-3">每日固定任务</p>
      <div className="space-y-1 mb-3">
        {data.fixedTasks.map(t => (
          <div key={t.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 dark:bg-neutral-800/50">
            <button onClick={() => toggleFixedTaskEnabled(t.id)} className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors ${t.enabled ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' : 'bg-stone-200 text-stone-400 dark:bg-neutral-700 dark:text-stone-500'}`}>
              {t.enabled ? '开' : '关'}
            </button>
            <span className={`text-sm flex-1 ${t.enabled ? 'text-stone-700 dark:text-stone-300' : 'text-stone-300 dark:text-stone-600 line-through'}`}>
              {t.label}
            </span>
            <button onClick={() => removeFixedTask(t.id)} className="text-xs text-stone-400 hover:text-red-400 transition-colors">✕</button>
          </div>
        ))}
        {data.fixedTasks.length === 0 && (
          <p className="text-sm text-stone-400 text-center py-3">暂无固定任务</p>
        )}
      </div>
      <div className="flex gap-2">
        <input value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} placeholder="添加固定任务" className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 placeholder:text-stone-300 dark:placeholder:text-stone-600" />
        <button onClick={handleAdd} className="px-3 py-1.5 text-sm rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold">添加</button>
      </div>
    </div>
  );
}

export default function EditPage() {
  const navigate = useNavigate();
  const { data, addPhase, refresh } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [newName, setNewName] = useState('');
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');
  const [newTasks, setNewTasks] = useState<string[]>(['上系统课', '刷专题', '复习错题']);
  const [newTaskInput, setNewTaskInput] = useState('');

  function handleReset() {
    localStorage.removeItem('gaokao550');
    refresh();
    setConfirmReset(false);
  }

  function handleAdd() {
    if (!newName || !newStart || !newEnd) return;
    addPhase({ name: newName, startDate: newStart, endDate: newEnd, tasks: newTasks.filter(Boolean) });
    setShowAdd(false);
    setNewName('');
    setNewStart('');
    setNewEnd('');
    setNewTasks(['上系统课', '刷专题', '复习错题']);
  }

  function addNewTask() {
    const t = newTaskInput.trim();
    if (t && !newTasks.includes(t)) {
      setNewTasks([...newTasks, t]);
      setNewTaskInput('');
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-neutral-950">
      <div className="max-w-md mx-auto px-4 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between pt-5 pb-4 px-1">
          <div>
            <h1 className="text-lg font-bold text-stone-800 dark:text-stone-100 tracking-tight">编辑计划</h1>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">管理阶段与任务</p>
          </div>
          <button onClick={() => navigate('/')} className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            返回首页
          </button>
        </div>

        <div className="space-y-3">
          <FixedTaskManager />

          <div className="pt-2">
            <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] border-l-4 border-indigo-400 pl-3 mb-3">学习阶段</p>
            <div className="space-y-3">
              {data.phases.map((p) => (<PhaseEditor key={p.id} phase={p} />))}
            </div>
          </div>

          {showAdd && (
            <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">阶段名称</label>
                  <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="例如：数学基础阶段" className="w-full mt-1.5 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 placeholder:text-stone-300 dark:placeholder:text-stone-600" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">开始</label>
                    <input type="date" value={newStart} onChange={e => setNewStart(e.target.value)} className="w-full mt-1.5 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">结束</label>
                    <input type="date" value={newEnd} onChange={e => setNewEnd(e.target.value)} className="w-full mt-1.5 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-[0.05em]">任务列表</label>
                  <div className="mt-1.5 space-y-1">
                    {newTasks.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 dark:bg-neutral-800/50">
                        <span className="text-sm text-stone-700 dark:text-stone-300 flex-1">{t}</span>
                        <button onClick={() => setNewTasks(newTasks.filter((_, j) => j !== i))} className="text-xs text-stone-400 hover:text-red-400 transition-colors">✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input value={newTaskInput} onChange={e => setNewTaskInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNewTask()} placeholder="添加任务" className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 placeholder:text-stone-300 dark:placeholder:text-stone-600" />
                    <button onClick={addNewTask} className="px-3 py-1.5 text-sm rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold">添加</button>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={handleAdd} className="px-4 py-1.5 text-sm rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold">添加阶段</button>
                  <button onClick={() => setShowAdd(false)} className="px-4 py-1.5 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-neutral-800 transition-colors font-semibold">取消</button>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setShowAdd(true)} className="w-full py-3 text-sm rounded-2xl border-2 border-dashed border-stone-200 dark:border-neutral-700 text-stone-400 dark:text-stone-500 hover:border-stone-300 dark:hover:border-neutral-600 transition-colors font-semibold">
            + 新增阶段
          </button>

          {/* Reset */}
          <div className="pt-6 border-t border-stone-100 dark:border-neutral-800">
            {confirmReset ? (
              <div className="flex gap-2">
                <button onClick={handleReset} className="flex-1 py-2.5 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold">确认清除</button>
                <button onClick={() => setConfirmReset(false)} className="flex-1 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-neutral-700 text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-neutral-800 transition-colors font-semibold">取消</button>
              </div>
            ) : (
              <button onClick={() => setConfirmReset(true)} className="w-full py-2.5 text-sm rounded-xl border border-red-200 dark:border-red-900 text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors font-semibold">
                清除所有打卡数据
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
