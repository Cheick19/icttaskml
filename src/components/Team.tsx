import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import UserAvatar from './ui/UserAvatar';

const Team: React.FC = () => {
  const { users, tasks } = useAppContext();

  const getUserStats = (userId: string) => {
    const userTasks = tasks.filter(task => task.assignedTo === userId);
    return {
      total: userTasks.length,
      completed: userTasks.filter(task => task.status === 'DONE').length,
      inProgress: userTasks.filter(task => task.status === 'IN_PROGRESS').length,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => {
          const stats = getUserStats(user.id);
          
          return (
            <div key={user.id} className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <UserAvatar name={user.name} avatar={user.avatar} size="lg" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                  <p className="text-sm text-cyan-400">ICT Specialist 2</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail size={16} />
                  <span>ccisse@icrc.org</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone size={16} />
                  <span>+223 75997769</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin size={16} />
                  <span>GAO Mali</span>
                </div>
              </div>

              <div className="border-t border-blue-900/30 pt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                    <p className="text-xs text-gray-400">Total Tasks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
                    <p className="text-xs text-gray-400">In Progress</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.completed}</p>
                    <p className="text-xs text-gray-400">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;