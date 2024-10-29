import { User } from '../types';
import { Building2, Globe, Phone } from 'lucide-react';

interface UserCardProps {
  user: User;
  onViewDetails: (user: User) => void;
}

export function UserCard({ user, onViewDetails }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-600 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {user.company.name}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {user.website}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {user.phone}
          </p>
        </div>
        
        <button
          onClick={() => onViewDetails(user)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
}