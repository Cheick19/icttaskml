import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BarChart3, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import TaskTypeIcon from './ui/TaskTypeIcon';
import StatusBadge from './ui/StatusBadge';
import UserAvatar from './ui/UserAvatar';

const Dashboard: React.FC = () => {
  const { tasks, projects, users } = useAppContext();

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'DONE').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    highPriority: tasks.filter(t => t.priority === 'HIGH').length,
  };

  const recentTasks = [...tasks]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900/30 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/30 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">High Priority</p>
              <p className="text-2xl font-bold text-white">{stats.highPriority}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-blue-900/30 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentTasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg">
                <TaskTypeIcon type={task.type} size={20} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white font-medium truncate">{task.title}</h3>
                    <StatusBadge status={task.status} />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {task.assignedTo && (
                      <UserAvatar
                        name={users.find(u => u.id === task.assignedTo)?.name || ''}
                        avatar={users.find(u => u.id === task.assignedTo)?.avatar}
                        size="sm"
                      />
                    )}
                    <span className="text-xs text-gray-500">
                      Updated {new Date(task.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Overview */}
        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Projects Overview</h2>
          <div className="space-y-4">
            {projects.map(project => {
              const projectTasks = tasks.filter(t => project.tasks.includes(t.id));
              const completedTasks = projectTasks.filter(t => t.status === 'DONE').length;
              const progress = (completedTasks / projectTasks.length) * 100;

              return (
                <div key={project.id} className="p-3 bg-gray-900/30 rounded-lg">
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{completedTasks} of {projectTasks.length} tasks completed</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;