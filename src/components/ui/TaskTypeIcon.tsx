import React from 'react';
import { TaskType } from '../../types';
import { 
  Settings, 
  Server, 
  Bug, 
  Database, 
  Code, 
  Shield, 
  Wifi, 
  Layers 
} from 'lucide-react';

interface TaskTypeIconProps {
  type: TaskType;
  size?: number;
}

const TaskTypeIcon: React.FC<TaskTypeIconProps> = ({ type, size = 24 }) => {
  const getIcon = () => {
    switch (type) {
      case 'SYSTEM':
        return <Settings size={size} className="text-blue-400" />;
      case 'SERVER':
        return <Server size={size} className="text-cyan-400" />;
      case 'BUG':
        return <Bug size={size} className="text-red-400" />;
      case 'DATABASE':
        return <Database size={size} className="text-purple-400" />;
      case 'CODE':
        return <Code size={size} className="text-green-400" />;
      case 'SECURITY':
        return <Shield size={size} className="text-yellow-400" />;
      case 'NETWORK':
        return <Wifi size={size} className="text-indigo-400" />;
      case 'OTHER':
      default:
        return <Layers size={size} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex items-center justify-center rounded-full bg-opacity-20 p-1">
      {getIcon()}
    </div>
  );
};

export default TaskTypeIcon;