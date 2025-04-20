import React from 'react';
import { 
  Users, MessageSquare, Award, BookOpen,
  Clock, Heart, TrendingUp, Wallet
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for mentees
const mockMentees = [
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    subject: 'Web Development',
    lastActive: '2 hours ago',
    progress: 78,
  },
  {
    id: '2',
    name: 'Michael Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    subject: 'Python Programming',
    lastActive: '1 day ago',
    progress: 45,
  },
  {
    id: '3',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    subject: 'UI/UX Design',
    lastActive: '5 hours ago',
    progress: 92,
  },
];

// Mock data for requests
const mockRequests = [
  {
    id: '1',
    name: 'Brandon Taylor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Brandon',
    subject: 'React Native',
    message: 'I need help with React Native navigation concepts.',
    dateRequested: '2023-06-15',
  },
  {
    id: '2',
    name: 'Jessica Wong',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    subject: 'Node.js',
    message: 'Looking for guidance on building RESTful APIs with Express.',
    dateRequested: '2023-06-14',
  },
];

const MentorDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout 
      title="Mentor Dashboard" 
      description="Manage your mentees and requests"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            icon: <Users className="h-6 w-6 text-primary-600" />, 
            label: 'Active Mentees', 
            value: mockMentees.length,
            color: 'bg-primary-50 text-primary-700',
          },
          { 
            icon: <MessageSquare className="h-6 w-6 text-accent-600" />, 
            label: 'New Requests', 
            value: mockRequests.length,
            color: 'bg-accent-50 text-accent-700',
          },
          { 
            icon: <Award className="h-6 w-6 text-highlight-600" />, 
            label: 'Mentor Rating', 
            value: '4.9/5',
            color: 'bg-highlight-50 text-highlight-700',
          },
          { 
            icon: <BookOpen className="h-6 w-6 text-emerald-600" />, 
            label: 'Resources Shared', 
            value: '47',
            color: 'bg-emerald-50 text-emerald-700',
          },
        ].map((stat, index) => (
          <div key={index} className="card overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className={`rounded-md p-2 ${stat.color.split(' ')[0]}`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Your Mentees</h2>
              <p className="text-sm text-gray-500">Manage and track your mentees' progress</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockMentees.map(mentee => (
                <div key={mentee.id} className="p-6">
                  <div className="flex items-center">
                    <img
                      src={mentee.avatar}
                      alt={mentee.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{mentee.name}</h3>
                        <span className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" /> {mentee.lastActive}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500">{mentee.subject}</span>
                        <span className="text-xs font-medium text-primary-600">
                          {mentee.progress}% complete
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                        <div
                          className="h-1.5 rounded-full bg-primary-600"
                          style={{ width: `${mentee.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="btn btn-outline !py-1 !px-3 text-xs">
                      <MessageSquare size={14} className="mr-1" /> Message
                    </button>
                    <button className="btn btn-primary !py-1 !px-3 text-xs">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-center">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all mentees
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="card overflow-hidden">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Mentee Requests</h2>
              <p className="text-sm text-gray-500">Students waiting for your guidance</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockRequests.map(request => (
                <div key={request.id} className="p-6">
                  <div className="flex items-center">
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{request.name}</h3>
                      <p className="text-xs text-gray-500">{request.subject}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">"{request.message}"</p>
                  <div className="mt-4 flex space-x-2">
                    <button className="btn btn-outline flex-1 !py-1">Decline</button>
                    <button className="btn btn-primary flex-1 !py-1">Accept</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-center">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all requests
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="card flex flex-col items-center p-4 transition-all hover:shadow-md">
              <div className="rounded-full bg-accent-100 p-3 text-accent-600">
                <Wallet size={20} />
              </div>
              <span className="mt-2 text-sm font-medium">Earnings</span>
            </button>
            <button className="card flex flex-col items-center p-4 transition-all hover:shadow-md">
              <div className="rounded-full bg-highlight-100 p-3 text-highlight-600">
                <TrendingUp size={20} />
              </div>
              <span className="mt-2 text-sm font-medium">Statistics</span>
            </button>
            <button className="card flex flex-col items-center p-4 transition-all hover:shadow-md">
              <div className="rounded-full bg-success-100 p-3 text-success-600">
                <BookOpen size={20} />
              </div>
              <span className="mt-2 text-sm font-medium">Resources</span>
            </button>
            <button className="card flex flex-col items-center p-4 transition-all hover:shadow-md">
              <div className="rounded-full bg-error-100 p-3 text-error-600">
                <Heart size={20} />
              </div>
              <span className="mt-2 text-sm font-medium">Favorites</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;