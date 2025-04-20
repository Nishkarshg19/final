import React, { useState } from 'react';
import { Users, MessageSquare, BookOpen, Award, Twitch as Switch, BookMarked, Brain, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

// Import components that would be shared with the other dashboards
// This is a simplified version - in a real app, we would use the actual components
import MentorDashboard from './MentorDashboard';
import StudentDashboard from './StudentDashboard';

const HybridDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeRole, setActiveRole] = useState<'mentor' | 'student'>('student');

  if (!user) return null;

  return (
    <DashboardLayout 
      title="Hybrid Dashboard" 
      description="Switch between your mentor and student roles"
    >
      {/* Role Toggle */}
      <div className="mx-auto mb-8 flex w-full max-w-sm items-center justify-center rounded-lg bg-white p-1 shadow-sm">
        <button
          onClick={() => setActiveRole('student')}
          className={`relative flex flex-1 items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm font-medium transition-all ${
            activeRole === 'student'
              ? 'bg-primary-600 text-white'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <BookOpen size={16} />
          <span>Student Mode</span>
        </button>
        <button
          onClick={() => setActiveRole('mentor')}
          className={`relative flex flex-1 items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm font-medium transition-all ${
            activeRole === 'mentor'
              ? 'bg-primary-600 text-white'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Users size={16} />
          <span>Mentor Mode</span>
        </button>
      </div>

      {/* Stats Row - Always visible */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            icon: <Brain className="h-6 w-6 text-primary-600" />, 
            label: 'Current Role', 
            value: activeRole === 'student' ? 'Student' : 'Mentor',
            color: 'bg-primary-50 text-primary-700',
          },
          { 
            icon: <Award className="h-6 w-6 text-highlight-600" />, 
            label: 'Chain-Mines Points', 
            value: user.points,
            color: 'bg-highlight-50 text-highlight-700',
          },
          { 
            icon: <MessageSquare className="h-6 w-6 text-accent-600" />, 
            label: 'Active Connections', 
            value: activeRole === 'student' ? '2' : '3',
            color: 'bg-accent-50 text-accent-700',
          },
          { 
            icon: <Wallet className="h-6 w-6 text-emerald-600" />, 
            label: 'Wallet Status', 
            value: 'Connected',
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

      {/* Role-Specific Dashboard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {activeRole === 'student' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="card overflow-hidden">
                  <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Your Learning Journey</h2>
                    <p className="text-sm text-gray-500">Current courses and progress</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Introduction to React</h3>
                        <p className="text-sm text-gray-500">Prof. Lisa Johnson</p>
                      </div>
                      <div className="badge badge-primary">In Progress</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-primary-600">65%</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-primary-600"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-sm text-gray-600">
                      Next session: Tomorrow, 2:00 PM
                    </p>
                    
                    <div className="flex justify-end space-x-2">
                      <button className="btn btn-outline">View Details</button>
                      <button className="btn btn-primary">Continue Learning</button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 card overflow-hidden">
                  <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Recommended Mentors</h2>
                    <p className="text-sm text-gray-500">Based on your interests</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <div className="flex items-start">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                          alt="Alex Martinez"
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium text-gray-900">Alex Martinez</h3>
                            <div className="flex items-center">
                              <span className="text-sm text-yellow-500">4.8</span>
                              <svg className="ml-1 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Mobile App Development Expert</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="btn btn-outline !py-1">View Profile</button>
                        <button className="btn btn-primary !py-1">Request Mentorship</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="card overflow-hidden">
                  <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Premium Resources</h2>
                    <p className="text-sm text-gray-500">Unlock with Chain-Mines points</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="rounded-md bg-accent-100 p-2 text-accent-700">
                          <BookMarked size={16} />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Advanced React Patterns</h3>
                            <span className="badge badge-highlight">Premium</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">E-Book + Video Series</p>
                          <p className="mt-1 text-xs font-medium text-highlight-600">
                            250 points
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="btn btn-highlight w-full !py-1">
                          Unlock with 250 points
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                    <span className="badge badge-secondary">2 events</span>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900">Web Development Workshop</p>
                      <p className="mt-1 text-xs text-gray-500">Friday, 3:00 PM - 5:00 PM</p>
                      <div className="mt-3 flex justify-end">
                        <button className="btn btn-outline !py-1 !px-3 text-xs">Add to Calendar</button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-900">AI Ethics Discussion</p>
                      <p className="mt-1 text-xs text-gray-500">Saturday, 2:00 PM - 3:30 PM</p>
                      <div className="mt-3 flex justify-end">
                        <button className="btn btn-outline !py-1 !px-3 text-xs">Add to Calendar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Mentor View
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="card overflow-hidden">
                  <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Your Mentees</h2>
                    <p className="text-sm text-gray-500">Students you are currently mentoring</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <div className="flex items-center">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                          alt="Emma Wilson"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Emma Wilson</h3>
                            <span className="flex items-center text-xs text-gray-500">
                              Last active: 2 hours ago
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Web Development</span>
                            <span className="text-xs font-medium text-primary-600">
                              78% complete
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                            <div
                              className="h-1.5 rounded-full bg-primary-600"
                              style={{ width: '78%' }}
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
                  </div>
                </div>
                
                <div className="mt-6 card overflow-hidden">
                  <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Mentorship Requests</h2>
                    <p className="text-sm text-gray-500">Students waiting for your guidance</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Brandon"
                        alt="Brandon Taylor"
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">Brandon Taylor</h3>
                        <p className="text-xs text-gray-500">React Native</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      "I need help with React Native navigation concepts. I've been struggling with this for a while and would appreciate your guidance."
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button className="btn btn-outline flex-1 !py-1">Decline</button>
                      <button className="btn btn-primary flex-1 !py-1">Accept</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="card overflow-hidden">
                  <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Your Teaching Resources</h2>
                    <p className="text-sm text-gray-500">Materials you've shared with mentees</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="rounded-md bg-primary-100 p-2 text-primary-600">
                          <BookOpen size={16} />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">JavaScript Fundamentals</h3>
                          <p className="text-xs text-gray-500">Course Materials • 12 lessons</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button className="btn btn-outline !py-1 !px-3 text-xs">
                          Edit Resources
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Mentor Stats</h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Avg. Rating</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">4.9</span>
                        <svg className="ml-1 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Students Helped</span>
                      <span className="text-sm font-medium text-gray-900">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Resources Shared</span>
                      <span className="text-sm font-medium text-gray-900">37</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Hours Mentored</span>
                      <span className="text-sm font-medium text-gray-900">128</span>
                    </div>
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
                      <BookMarked size={20} />
                    </div>
                    <span className="mt-2 text-sm font-medium">Add Resources</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default HybridDashboard;