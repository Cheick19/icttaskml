import React from 'react';
import { Priority } from '../../types';

interface PriorityBadgeProps {
  priority: Priority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'LOW':
        return 'text-blue-300';
      case 'MEDIUM':
        return 'text-cyan-300';
      case 'HIGH':
        return 'text-purple-300';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <span className={`font-semibold text-sm ${getPriorityStyles()}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;