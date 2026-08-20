import React from 'react';

export default function AnalyticsCards({ stats }) {
  const { totalTasks = 0, completedTasks = 0, pendingTasks = 0, completionRate = 0 } = stats;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">Total Tasks</p>
        <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-white">{totalTasks}</p>
      </div>
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
        <p className="text-2xl font-bold mt-1 text-emerald-600">{completedTasks}</p>
      </div>
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
        <p className="text-2xl font-bold mt-1 text-amber-600">{pendingTasks}</p>
      </div>
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">Completion Rate</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-2xl font-bold text-slate-800 dark:text-white">{completionRate}%</span>
          <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}