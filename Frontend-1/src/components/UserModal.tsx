import { X } from 'lucide-react';
import { User } from '../types';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-900">@{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
              <div className="space-y-2">
                <p className="text-gray-900">{user.address.street}, {user.address.suite}</p>
                <p className="text-gray-900">{user.address.city}, {user.address.zipcode}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Company</h3>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">{user.company.name}</p>
                <p className="text-gray-600 italic">"{user.company.catchPhrase}"</p>
                <p className="text-gray-600">{user.company.bs}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Website</h3>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800"
              >
                {user.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}