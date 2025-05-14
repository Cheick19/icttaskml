import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { 
  Calendar,
  Clock,
  Edit2,
  Trash2,
  X
} from 'lucide-react';
import { Task } from '../types';
import { useAppContext } from '../context/AppContext';
import TaskTypeIcon from './ui/TaskTypeIcon';
import PriorityBadge from './ui/PriorityBadge';
import StatusBadge from './ui/StatusBadge';
import UserAvatar from './ui/UserAvatar';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  const { t } = useTranslation();
  const { users, updateTask, deleteTask } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isDeleting, setIsDeleting] = useState(false);

  const assignedUser = users.find(user => user.id === task.assignedTo);

  const handleUpdate = async () => {
    try {
      await updateTask(task.id, editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-blue-900/50 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-center p-4 bg-gray-900 border-b border-blue-900/30">
          <div className="flex items-center gap-3">
            <TaskTypeIcon type={task.type} />
            <h2 className="text-xl font-semibold text-white">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="bg-gray-800 border border-blue-900/50 rounded px-2 py-1"
                />
              ) : (
                task.title
              )}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => setIsDeleting(true)}
                  className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">{t('tasks.description')}</h3>
            {isEditing ? (
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="w-full bg-gray-800 border border-blue-900/50 rounded-lg p-3 text-white"
                rows={4}
              />
            ) : (
              <p className="text-white">{task.description}</p>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">{t('tasks.type')}</h3>
              {isEditing ? (
                <select
                  value={editedTask.type}
                  onChange={(e) => setEditedTask({ ...editedTask, type: e.target.value as Task['type'] })}
                  className="w-full bg-gray-800 border border-blue-900/50 rounded px-3 py-2"
                >
                  {Object.entries(t('tasks.types', { returnObjects: true })).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <TaskTypeIcon type={task.type} size={16} />
                  <span className="text-white">{t(`tasks.types.${task.type}`)}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">{t('tasks.priority')}</h3>
              {isEditing ? (
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as Task['priority'] })}
                  className="w-full bg-gray-800 border border-blue-900/50 rounded px-3 py-2"
                >
                  {Object.entries(t('tasks.priorities', { returnObjects: true })).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              ) : (
                <PriorityBadge priority={task.priority} />
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">{t('tasks.status')}</h3>
              {isEditing ? (
                <select
                  value={editedTask.status}
                  onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as Task['status'] })}
                  className="w-full bg-gray-800 border border-blue-900/50 rounded px-3 py-2"
                >
                  {Object.entries(t('tasks.statuses', { returnObjects: true })).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              ) : (
                <StatusBadge status={task.status} />
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">{t('tasks.assignedTo')}</h3>
              {isEditing ? (
                <select
                  value={editedTask.assignedTo}
                  onChange={(e) => setEditedTask({ ...editedTask, assignedTo: e.target.value })}
                  className="w-full bg-gray-800 border border-blue-900/50 rounded px-3 py-2"
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              ) : (
                assignedUser && (
                  <div className="flex items-center gap-2">
                    <UserAvatar 
                      name={assignedUser.name} 
                      avatar={assignedUser.avatar} 
                      size="sm" 
                    />
                    <span className="text-white">{assignedUser.name}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Created: {format(task.createdAt, 'PPP')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Updated: {format(task.updatedAt, 'PPP')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-blue-900/30">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-md transition-colors"
              >
                {t('tasks.cancel')}
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                {t('tasks.update')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-red-900/50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-2">{t('tasks.deleteConfirmTitle')}</h3>
            <p className="text-gray-400 mb-6">{t('tasks.deleteConfirmMessage')}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-md transition-colors"
              >
                {t('tasks.cancel')}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                {t('tasks.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;