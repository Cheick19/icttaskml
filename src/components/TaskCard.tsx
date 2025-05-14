import React, { useState } from 'react';
import { Task } from '../types';
import { useAppContext } from '../context/AppContext';
import TaskTypeIcon from './ui/TaskTypeIcon';
import PriorityBadge from './ui/PriorityBadge';
import UserAvatar from './ui/UserAvatar';
import TaskDetails from './TaskDetails';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { users, updateTask } = useAppContext();
  const [showDetails, setShowDetails] = useState(false);
  
  const assignedUser = users.find(user => user.id === task.assignedTo);

  const handleStatusChange = (status: Task['status']) => {
    updateTask(task.id, { status });
  };

  return (
    <>
      <div 
        className="bg-gray-900/50 border border-blue-900/50 p-4 rounded-lg transition-all hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-start gap-3">
          <div>
            <TaskTypeIcon type={task.type} />
          </div>
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-1">{task.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{task.description}</p>
            
            <div className="flex justify-between items-center">
              <PriorityBadge priority={task.priority} />
              
              {assignedUser && (
                <div className="flex items-center gap-1">
                  <UserAvatar 
                    name={assignedUser.name} 
                    avatar={assignedUser.avatar} 
                    size="sm" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between gap-2 text-xs">
            <button 
              className={`px-2 py-1 rounded ${task.status === 'TODO' ? 'bg-blue-600 text-white' : 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50'}`}
              onClick={(e) => { e.stopPropagation(); handleStatusChange('TODO'); }}
            >
              To Do
            </button>
            <button 
              className={`px-2 py-1 rounded ${task.status === 'IN_PROGRESS' ? 'bg-purple-600 text-white' : 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/50'}`}
              onClick={(e) => { e.stopPropagation(); handleStatusChange('IN_PROGRESS'); }}
            >
              In Progress
            </button>
            <button 
              className={`px-2 py-1 rounded ${task.status === 'DONE' ? 'bg-green-600 text-white' : 'bg-green-900/30 text-green-300 hover:bg-green-800/50'}`}
              onClick={(e) => { e.stopPropagation(); handleStatusChange('DONE'); }}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <TaskDetails 
          task={task} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
};

export default TaskCard;