import React, { useState, useEffect } from 'react';
import API from './services/api';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import AnalyticsCards from './components/AnalyticsCards';
import TaskControls from './components/TaskControls';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import Pagination from './components/Pagination';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('task_user') || 'null'));
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState('');

  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0, completionRate: 0 });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Filters & Sorting & Pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      loadTasks();
      loadAnalytics();
    }
  }, [user, search, statusFilter, priorityFilter, sortBy, order, page]);

  const handleAuth = async (formData, loginMode) => {
    setAuthError('');
    try {
      const endpoint = loginMode ? '/auth/login' : '/auth/register';
      const payload = loginMode ? { email: formData.email, password: formData.password } : formData;
      const res = await API.post(endpoint, payload);
      localStorage.setItem('task_user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('task_user');
    setUser(null);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tasks', {
        params: { search, status: statusFilter, priority: priorityFilter, sortBy, order, page, limit: 6 },
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const res = await API.get('/tasks/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTask = async (taskData, taskId) => {
    try {
      if (taskId) {
        await API.put(`/tasks/${taskId}`, taskData);
      } else {
        await API.post('/tasks', taskData);
      }
      setModalOpen(false);
      setSelectedTask(null);
      loadTasks();
      loadAnalytics();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      loadTasks();
      loadAnalytics();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'Done' ? 'Todo' : 'Done';
    try {
      await API.put(`/tasks/${task._id}`, { status: nextStatus });
      loadTasks();
      loadAnalytics();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <AuthForm
        onSubmit={handleAuth}
        error={authError}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar
        userName={user.name}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <AnalyticsCards stats={analytics} />

        <TaskControls
          search={search}
          setSearch={(v) => { setSearch(v); setPage(1); }}
          statusFilter={statusFilter}
          setStatusFilter={(v) => { setStatusFilter(v); setPage(1); }}
          priorityFilter={priorityFilter}
          setPriorityFilter={(v) => { setPriorityFilter(v); setPage(1); }}
          sortBy={sortBy}
          order={order}
          setSort={(sb, ord) => { setSortBy(sb); setOrder(ord); }}
          onOpenCreateModal={() => { setSelectedTask(null); setModalOpen(true); }}
        />

        <section>
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">No tasks found. Create one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggleStatus={handleToggleStatus}
                  onEdit={(t) => { setSelectedTask(t); setModalOpen(true); }}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </section>
      </main>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedTask(null); }}
        onSubmit={handleSaveTask}
        initialTask={selectedTask}
      />
    </div>
  );
}