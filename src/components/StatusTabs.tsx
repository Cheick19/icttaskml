import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Status } from '../types';

const StatusTabs: React.FC = () => {
  const { selectedStatus, setSelectedStatus, getTasksByStatus } = useAppContext();

  const tabs: Array<{ label: string; value: Status | 'ALL' }> = [
    { label: 'All Tasks', value: 'ALL' },
    { label: 'To Do', value: 'TODO' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'DONE' },
  ];

  return (
    <div className="flex border-b border-blue-800/50">
      {tabs.map((tab) => {
        const count = tab.value === 'ALL' 
          ? getTasksByStatus('ALL').length 
          : getTasksByStatus(tab.value as Status).length;
        
        const isActive = selectedStatus === tab.value;
        
        return (
          <button
            key={tab.value}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              isActive
                ? 'text-cyan-300 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-blue-300'
            }`}
            onClick={() => setSelectedStatus(tab.value)}
          >
            {tab.label}
            {count > 0 && (
              <span className={`ml-2 px-1.5 py-0.5 rounded-md text-xs ${
                isActive ? 'bg-cyan-900/50 text-cyan-300' : 'bg-blue-900/30 text-blue-400'
              }`}>
                {count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StatusTabs;