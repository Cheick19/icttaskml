import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import StatusTabs from './StatusTabs';
import TaskList from './TaskList';
import Modal from './ui/Modal';
import TaskForm from './TaskForm';
import { Status } from '../types';

interface TasksContainerProps {
  status?: keyof typeof Status;
}

const borderClasses = "border border-blue-900/30";
const panelClasses = `rounded-lg overflow-hidden ${borderClasses} bg-gray-900/30 backdrop-blur-sm`;

const TasksContainer: React.FC<TasksContainerProps> = ({ status }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className={panelClasses}>
      <div className={`flex justify-between items-center p-4 ${borderClasses}`}>
        <StatusTabs />
        <button 
          onClick={handleOpenModal}
          className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors"
          aria-label="Add new task"
        >
          <Plus size={16} aria-hidden="true" />
          <span>New Task</span>
        </button>
      </div>

      <TaskList 
          status={status} 
          onNewTaskClick={handleOpenModal} 
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Task"
      >
        <TaskForm onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default TasksContainer;