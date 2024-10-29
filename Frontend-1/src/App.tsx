import { useState, useEffect, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { User } from './types';
import { UserCard } from './components/UserCard';
import { UserModal } from './components/UserModal';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'username'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const compareValue = sortDirection === 'asc' ? 1 : -1;
        return a[sortField].toLowerCase() > b[sortField].toLowerCase()
          ? compareValue
          : -compareValue;
      });
  }, [users, searchTerm, sortField, sortDirection]);

  const toggleSort = (field: 'name' | 'username') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">User Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => toggleSort('name')}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${
                  sortField === 'name' ? 'bg-indigo-50 border-indigo-200' : 'border-gray-300'
                }`}
              >
                Name
                <ArrowUpDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleSort('username')}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${
                  sortField === 'username' ? 'bg-indigo-50 border-indigo-200' : 'border-gray-300'
                }`}
              >
                Username
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onViewDetails={setSelectedUser}
              />
            ))}
          </div>
        )}

        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
}

export default App;