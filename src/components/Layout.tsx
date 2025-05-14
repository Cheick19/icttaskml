import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Team from './Team';
import Settings from './Settings';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'tasks' | 'team' | 'settings'>('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'team':
        return <Team />;
      case 'settings':
        return <Settings />;
      default:
        return children;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar - version corrigée sans espace */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      
      {/* Contenu principal - version corrigée */}
      <div className="flex-1 flex flex-col md:pl-0"> {/* Retrait du margin-left */}
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-950 relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
          
          {/* Main content - version ajustée */}
          <div className="relative z-10 w-full max-w-none p-4 md:p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;