import React from 'react';
import { CheckCircle2, Moon, Sun, LogOut } from 'lucide-react';

export default function Navbar({ userName, darkMode, setDarkMode, onLogout }) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 sticky top-0 z-10 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="text-blue-600" size={24} />
          <span className="font-bold text-lg text-slate-800 dark:text-white">TaskFlow</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <span className="text-sm font-medium border-l border-slate-200 dark:border-slate-700 pl-3 text-slate-700 dark:text-slate-200">
            {userName}
          </span>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}