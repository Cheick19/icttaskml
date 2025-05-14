import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, FolderKanban } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Modal from './ui/Modal';
import ProjectForm from './ProjectForm';

const ProjectList: React.FC = () => {
  const { t } = useTranslation();
  const { projects, tasks } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{t('projects.title')}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <Plus size={16} />
          {t('projects.new')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const completedTasks = projectTasks.filter(t => t.status === 'DONE').length;
          const progress = projectTasks.length > 0 
            ? (completedTasks / projectTasks.length) * 100 
            : 0;

          return (
            <div key={project.id} className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-900/30 rounded-lg">
                  <FolderKanban className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {t('projects.tasks')}: {projectTasks.length}
                  </span>
                  <span className="text-gray-400">
                    {t('projects.completed')}: {completedTasks}
                  </span>
                </div>

                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{Math.round(progress)}% {t('projects.complete')}</span>
                  <span>{projectTasks.length - completedTasks} {t('projects.remaining')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('projects.new')}
      >
        <ProjectForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProjectList;