import React from 'react';
import { Status } from '../../types';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'TODO':
        return 'bg-blue-900/30 text-blue-300 border-blue-500';
      case 'IN_PROGRESS':
        return 'bg-purple-900/30 text-purple-300 border-purple-500';
      case 'DONE':
        return 'bg-green-900/30 text-green-300 border-green-500';
      default:
        return 'bg-gray-900/30 text-gray-300 border-gray-500';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'TODO':
        return 'To Do';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'DONE':
        return 'Done';
      default:
        return status;
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusStyles()}`}
    >
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;