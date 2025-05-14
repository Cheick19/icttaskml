import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskCard from './TaskCard';
import { Status } from '../types';
import { Maximize2, Minimize2 } from 'lucide-react';

interface TaskListProps {
  status?: Status;
  onNewTaskClick: () => void;
}

const MIN_HEIGHT = 700; // Hauteur minimale fixée à 700px

const TaskList: React.FC<TaskListProps> = ({ status, onNewTaskClick }) => {
  const { getFilteredTasks } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [customHeight, setCustomHeight] = useState(MIN_HEIGHT);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

  const filteredTasks = getFilteredTasks();
  
  const tasksToShow = status 
    ? filteredTasks.filter(task => task.status === status)
    : filteredTasks;

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startYRef.current = e.clientY;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  const stopResize = () => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const handleResize = (e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const deltaY = e.clientY - startYRef.current;
    const newHeight = Math.max(MIN_HEIGHT, customHeight + deltaY);
    
    if (newHeight < window.innerHeight * 0.9) {
      setCustomHeight(newHeight);
    }
    startYRef.current = e.clientY;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResize);

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing, customHeight]);

  return (
    <div 
      ref={containerRef}
      className={`relative bg-gray-900/20 rounded-lg m-4 border border-gray-700 transition-all duration-300 ${
        tasksToShow.length ? 'p-4 min-h-[700px]' : 'p-8'
      }`}
      style={{
        minHeight: `${MIN_HEIGHT}px`,
        height: tasksToShow.length ? 'auto' : (expanded ? '90vh' : `${customHeight}px`)
      }}
    >
      {tasksToShow.length === 0 ? (
        <>
          {/* Zone de redimensionnement */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize hover:bg-gray-600/30 active:bg-gray-500/50"
            onMouseDown={startResize}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gray-500 rounded-full" />
          </div>
          
          {/* Bouton d'expansion */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors"
              aria-label={expanded ? "Minimize" : "Expand"}
            >
              {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
          
          {/* Contenu vide */}
          <div className="h-full flex flex-col items-center justify-center">
            <svg className="w-20 h-20 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-400 text-lg mb-2">No tasks found</p>
            <p className="text-gray-500 text-sm mb-6">
              {status 
                ? `No ${status.toLowerCase().replace('_', ' ')} tasks`
                : 'Create your first task to get started'}
            </p>
            <button 
              onClick={onNewTaskClick}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              + New Task
            </button>
          </div>
        </>
      ) : (
        /* Liste des tâches avec hauteur garantie */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
          {tasksToShow.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;