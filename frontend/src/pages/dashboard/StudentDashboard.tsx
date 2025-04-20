import React from 'react';
import { 
  User, BookOpen, Award, GraduationCap,
  BookMarked, Clock, Star, TrendingUp
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for mentors
const mockMentors = [
  {
    id: '1',
    name: 'Dr. Robert Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    expertise: 'Machine Learning',
    rating: 4.9,
    reviews: 124,
    available: true,
  },
  {
    id: '2',
    name: 'Prof. Lisa Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    expertise: 'Web Development',
    rating: 4.8,
    reviews: 98,
    available: true,
  },
  {
    id: '3',
    name: 'Alex Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    expertise: 'Mobile App Development',
    rating: 4.7,
    reviews: 87,
    available: false,
  },
];

// Mock data for current courses
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to React',
    mentor: 'Prof. Lisa Johnson',
    progress: 65,
    nextSession: 'Tomorrow, 2:00 PM',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    title: 'Python for Data Science',
    mentor: 'Dr. Robert Chen',
    progress: 32,
    nextSession: 'Friday, 4:30 PM',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Mock data for recommended resources
const mockResources = [
  {
    id: '1',
    title: 'Advanced JavaScript Patterns',
    type: 'E-Book',
    premium: true,
    points: 250,
  },
  {
    id: '2',
    title: 'CSS Grid Mastery',
    type: 'Video Course',
    premium: false,
    points: 0,
  },
  {
    id: '3',
    title: 'React Performance Optimization',
    type: 'Workshop',
    premium: true,
    points: 400,
  },
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout 
      title="Student Dashboard" 
      description="Track your learning progress and find resources"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            icon: <User className="h-6 w-6 text-primary-600" />, 
            label: 'Active Mentors', 
            value: '2',
            color: 'bg-primary-50 text-primary-700',
          },
          { 
            icon: <BookOpen className="h-6 w-6 text-accent-600" />, 
            label: 'Courses', 
            value: mockCourses.length,
            color: 'bg-accent-50 text-accent-700',
          },
          { 
            icon: <Award className="h-6 w-6 text-highlight-600" />, 
            label: 'Chain-Mines Points', 
            value: user.points,
            color: 'bg-highlight-50 text-highlight-700',
          },
          { 
            icon: <GraduationCap className="h-6 w-6 text-emerald-600" />, 
            label: 'Completed Courses', 
            value: '3',
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
              <h2 className="text-lg font-medium text-gray-900">Your Learning Journey</h2>
              <p className="text-sm text-gray-500">Current courses and progress</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockCourses.map(course => (
                <div key={course.id} className="p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="mb-4 h-32 w-full overflow-hidden rounded-lg sm:mb-0 sm:h-auto sm:w-48">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="sm:ml-6 sm:flex-1">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">Mentor: {course.mentor}</p>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-primary-600">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-primary-600"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-1" />
                          <span>Next: {course.nextSession}</span>
                        </div>
                        <button className="btn btn-primary !py-1 !px-3 text-xs">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-center">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Explore more courses
              </button>
            </div>
          </div>
          
          <div className="mt-6 card overflow-hidden">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Top Mentors</h2>
              <p className="text-sm text-gray-500">Connect with expert mentors in your field</p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-y-0 md:divide-x">
              {mockMentors.slice(0, 2).map(mentor => (
                <div key={mentor.id} className="p-6">
                  <div className="flex items-start">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{mentor.name}</h3>
                        <span 
                          className={`flex h-2 w-2 rounded-full ${
                            mentor.available ? 'bg-success-500' : 'bg-gray-300'
                          }`}
                        ></span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{mentor.expertise}</p>
                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${
                                i < Math.floor(mentor.rating)
                                  ? 'text-highlight-500 fill-highlight-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="ml-1 text-xs text-gray-500">
                          {mentor.rating} ({mentor.reviews} reviews)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="btn btn-outline flex-1 !py-1">View Profile</button>
                    <button 
                      className="btn btn-primary flex-1 !py-1"
                      disabled={!mentor.available}
                    >
                      {mentor.available ? 'Connect' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-center">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all mentors
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="card overflow-hidden">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Recommended Resources</h2>
              <p className="text-sm text-gray-500">Based on your learning goals</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockResources.map(resource => (
                <div key={resource.id} className="p-6">
                  <div className="flex items-center">
                    <div className={`rounded-md p-2 ${
                      resource.type === 'E-Book' 
                        ? 'bg-accent-100 text-accent-700' 
                        : resource.type === 'Video Course'
                          ? 'bg-highlight-100 text-highlight-700'
                          : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      <BookMarked size={16} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                        {resource.premium && (
                          <span className="badge badge-highlight">Premium</span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{resource.type}</p>
                      {resource.premium && (
                        <p className="mt-1 text-xs font-medium text-highlight-600">
                          {resource.points} points
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      className={`w-full !py-1 ${
                        resource.premium 
                          ? user.points >= resource.points
                            ? 'btn btn-highlight'
                            : 'btn btn-outline text-gray-400 cursor-not-allowed'
                          : 'btn btn-primary'
                      }`}
                      disabled={resource.premium && user.points < resource.points}
                    >
                      {resource.premium 
                        ? user.points >= resource.points
                          ? `Unlock with ${resource.points} points`
                          : `Need ${resource.points - user.points} more points`
                        : 'Access Now'
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-center">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Browse all resources
              </button>
            </div>
          </div>

          <div className="mt-6 card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Chain-Mines</h3>
              <span className="badge badge-primary">{user.points} points</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Complete challenges to earn more points</p>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Level Progress</span>
                <span className="text-xs font-medium text-primary-600">
                  {user.points}/500
                </span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-highlight-500"
                  style={{ width: `${(user.points / 500) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button className="btn btn-outline !py-1 !px-3 text-sm">
                <Award size={16} className="mr-1" /> Leaderboard
              </button>
              <button className="btn btn-primary !py-1 !px-3 text-sm">
                <TrendingUp size={16} className="mr-1" /> View Challenges
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;