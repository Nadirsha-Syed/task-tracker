import React from 'react';
import { CheckCircle, Circle, Edit2, Trash2, Clock } from 'lucide-react';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold text-slate-800 dark:text-white ${task.status === 'Done' ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
            {task.title}
          </h3>
          <button
            onClick={() => onToggleStatus(task)}
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {task.status === 'Done' ? (
              <CheckCircle className="text-emerald-500" size={20} />
            ) : (
              <Circle size={20} />
            )}
          </button>
        </div>
        {task.description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded font-medium ${getPriorityStyle(task.priority)}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="flex items-center gap-1 text-slate-400">
              <Clock size={12} />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            title="Edit task"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}