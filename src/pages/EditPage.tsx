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
      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">{phase.name}</div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{phase.startDate.replace(/-/g, '.')} ~ {phase.endDate.replace(/-/g, '.')}</div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{phase.tasks.join(' · ')}</div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => setEditing(true)} className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">编辑</button>
            <button onClick={() => deletePhase(phase.id)} className="text-xs text-red-400 hover:text-red-600">删除</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="space-y-3">
        <div>
          <label className="text-xs text-zinc-400 dark:text-zinc-500">阶段名称</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-zinc-400 dark:text-zinc-500">开始日期</label>
            <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-zinc-400 dark:text-zinc-500">结束日期</label>
            <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
          </div>
        </div>
        <div>
          <label className="text-xs text-zinc-400 dark:text-zinc-500">任务列表</label>
          <div className="mt-1 space-y-1">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-zinc-800 dark:text-zinc-200 flex-1">{t}</span>
                <button onClick={() => removeTask(i)} className="text-xs text-red-400 hover:text-red-600">✕</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="添加任务" className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
            <button onClick={addTask} className="px-3 py-1.5 text-sm rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">添加</button>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={save} className="px-4 py-1.5 text-sm rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">保存</button>
          <button onClick={() => setEditing(false)} className="px-4 py-1.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">取消</button>
        </div>
      </div>
    </div>
  );
}

export default function EditPage() {
  const navigate = useNavigate();
  const { data, addPhase, refresh } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  function handleReset() {
    localStorage.removeItem('gaokao550');
    refresh();
    setConfirmReset(false);
  }
  const [newName, setNewName] = useState('');
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');
  const [newTasks, setNewTasks] = useState<string[]>(['上系统课', '刷专题', '复习错题']);
  const [newTaskInput, setNewTaskInput] = useState('');

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
    <div className="max-w-md mx-auto px-4 pb-8 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">编辑计划</h1>
        <button onClick={() => navigate('/')} className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">返回</button>
      </div>
      <div className="space-y-3">
        {data.phases.map((p) => (<PhaseEditor key={p.id} phase={p} />))}
      </div>
      {showAdd && (
        <div className="mt-3 rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500">阶段名称</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="例如：数学基础阶段" className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-zinc-400 dark:text-zinc-500">开始日期</label>
                <input type="date" value={newStart} onChange={e => setNewStart(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-zinc-400 dark:text-zinc-500">结束日期</label>
                <input type="date" value={newEnd} onChange={e => setNewEnd(e.target.value)} className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500">任务列表</label>
              <div className="mt-1 space-y-1">
                {newTasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm text-zinc-800 dark:text-zinc-200 flex-1">{t}</span>
                    <button onClick={() => setNewTasks(newTasks.filter((_, j) => j !== i))} className="text-xs text-red-400 hover:text-red-600">✕</button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input value={newTaskInput} onChange={e => setNewTaskInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNewTask()} placeholder="添加任务" className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600" />
                <button onClick={addNewTask} className="px-3 py-1.5 text-sm rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">添加</button>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={handleAdd} className="px-4 py-1.5 text-sm rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">添加阶段</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-1.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">取消</button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setShowAdd(true)} className="mt-3 w-full py-3 text-sm rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">+ 新增阶段</button>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        {confirmReset ? (
          <div className="flex gap-2">
            <button onClick={handleReset} className="flex-1 py-2.5 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors">确认清除</button>
            <button onClick={() => setConfirmReset(false)} className="flex-1 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">取消</button>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)} className="w-full py-2.5 text-sm rounded-xl border border-red-200 dark:border-red-900 text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
            清除所有打卡数据
          </button>
        )}
      </div>
    </div>
  );
}
