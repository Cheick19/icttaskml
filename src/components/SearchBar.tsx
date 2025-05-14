import React from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <div className="relative flex items-center w-full max-w-md">
      <div className="absolute left-3 text-gray-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-blue-900/50 text-white rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 text-gray-400 hover:text-white"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;