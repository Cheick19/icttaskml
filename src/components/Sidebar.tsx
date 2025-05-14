import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings, 
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: 'dashboard' | 'tasks' | 'team' | 'settings';
  onViewChange: (view: 'dashboard' | 'tasks' | 'team' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onViewChange }) => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', value: 'dashboard' as const },
    { icon: <FolderKanban size={20} />, label: 'Tasks', value: 'tasks' as const },
    { icon: <Users size={20} />, label: 'Team', value: 'team' as const },
    { icon: <Settings size={20} />, label: 'Settings', value: 'settings' as const },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900/95 border-r border-blue-900/50 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:transform-none md:z-auto
        `}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4 md:hidden">
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => {
                      onViewChange(item.value);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${currentView === item.value
                        ? 'bg-blue-900/30 text-cyan-300 border-l-2 border-cyan-400' 
                        : 'text-gray-400 hover:bg-blue-900/20 hover:text-blue-300'}
                    `}
                    aria-current={currentView === item.value ? "page" : undefined}
                  >
                    <span className="flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-left">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;