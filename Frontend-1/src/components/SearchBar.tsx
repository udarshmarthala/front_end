import React from 'react';
import { Search, SortAsc } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortField: 'name' | 'username';
  onSortChange: (field: 'name' | 'username') => void;
}

export function SearchBar({ searchTerm, onSearchChange, sortField, onSortChange }: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onSortChange('name')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            sortField === 'name'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <SortAsc className="w-4 h-4" />
          Sort by Name
        </button>
        <button
          onClick={() => onSortChange('username')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            sortField === 'username'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <SortAsc className="w-4 h-4" />
          Sort by Username
        </button>
      </div>
    </div>
  );
}