import React from 'react';
import { Menu, Search, Bell, UserCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SearchBar from './SearchBar';
import UserAvatar from './ui/UserAvatar';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { currentUser } = useAppContext();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-blue-900/50">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="text-blue-400 hover:text-blue-300 md:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text tracking-wide">
          ICT GAO MKA TASKS
        </div>
      </div>

      <div className="hidden md:block flex-1 mx-8">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-blue-400 hover:text-blue-300 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <UserAvatar 
            name={currentUser?.name} 
            avatar={currentUser?.avatar_url}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;