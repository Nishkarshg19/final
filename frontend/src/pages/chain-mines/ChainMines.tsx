import React, { useState } from 'react';
import {
  Trophy, Award, Star, CheckCircle, Lock,
  Clock, Flame, Book, Zap, DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for challenges
const mockChallenges = [
  {
    id: '1',
    title: 'Complete Your First Course',
    description: 'Finish any course to 100% completion',
    points: 100,
    completed: true,
    difficulty: 'easy',
  },
  {
    id: '2',
    title: 'Connect with 3 Mentors',
    description: 'Establish mentorship with three different experts',
    points: 150,
    completed: false,
    progress: 2,
    maxProgress: 3,
    difficulty: 'medium',
  },
  {
    id: '3',
    title: 'Achieve 5-Day Streak',
    description: 'Login and engage with content for 5 consecutive days',
    points: 200,
    completed: false,
    progress: 3,
    maxProgress: 5,
    difficulty: 'medium',
  },
  {
    id: '4',
    title: 'Complete Coding Challenge',
    description: 'Solve the advanced algorithmic problem',
    points: 300,
    completed: false,
    locked: true,
    difficulty: 'hard',
  },
];

// Mock data for leaderboard
const mockLeaderboard = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    points: 1250,
    rank: 1,
  },
  {
    id: '2',
    name: 'Sarah Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    points: 980,
    rank: 2,
  },
  {
    id: '3',
    name: 'Mike Davis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    points: 875,
    rank: 3,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    points: 730,
    rank: 4,
  },
  {
    id: '5',
    name: 'James Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    points: 690,
    rank: 5,
  },
];

// Mock data for achievements
const mockAchievements = [
  {
    id: '1',
    title: 'Fast Learner',
    description: 'Completed first course in record time',
    icon: <Zap size={24} className="text-highlight-500" />,
    date: '2023-06-10',
  },
  {
    id: '2',
    title: 'Knowledge Seeker',
    description: 'Accessed 20 different learning resources',
    icon: <Book size={24} className="text-primary-500" />,
    date: '2023-06-05',
  },
  {
    id: '3',
    title: 'Dedicated Student',
    description: 'Maintained a 7-day learning streak',
    icon: <Flame size={24} className="text-error-500" />,
    date: '2023-05-28',
  },
];

const ChainMines: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('challenges');
  
  if (!user) return null;

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'challenges':
        return (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2"
          >
            {mockChallenges.map(challenge => (
              <div 
                key={challenge.id} 
                className={`card overflow-hidden ${
                  challenge.locked ? 'opacity-70' : ''
                }`}
              >
                <div className={`p-6 ${
                  challenge.completed 
                    ? 'border-l-4 border-success-500' 
                    : challenge.locked 
                      ? 'border-l-4 border-gray-300' 
                      : ''
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                        {challenge.locked && <Lock size={16} className="text-gray-400" />}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{challenge.description}</p>
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      challenge.completed 
                        ? 'bg-success-100 text-success-700' 
                        : 'bg-primary-100 text-primary-700'
                    }`}>
                      {challenge.completed ? (
                        <CheckCircle size={20} />
                      ) : (
                        <span className="text-sm font-medium">{challenge.points}</span>
                      )}
                    </div>
                  </div>
                  
                  {!challenge.completed && !challenge.locked && challenge.progress !== undefined && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-medium text-primary-600">
                          {challenge.progress}/{challenge.maxProgress}
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-primary-600"
                          style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        challenge.difficulty === 'easy' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : challenge.difficulty === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    
                    {challenge.completed ? (
                      <span className="text-sm font-medium text-success-600">Completed</span>
                    ) : challenge.locked ? (
                      <button className="btn btn-outline !py-1 !px-3 opacity-50" disabled>
                        Locked
                      </button>
                    ) : (
                      <button className="btn btn-primary !py-1 !px-3">
                        {challenge.progress !== undefined ? 'Continue' : 'Start'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );
      
      case 'leaderboard':
        return (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="grid grid-cols-1 divide-y divide-gray-200">
                {mockLeaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`p-4 transition-colors ${
                      entry.id === user.id ? 'bg-primary-50' : ''
                    } ${index < 3 ? 'bg-highlight-50/50' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                        {entry.rank}
                      </div>
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="ml-3 h-10 w-10 rounded-full"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {entry.name}
                            {entry.id === user.id && (
                              <span className="ml-2 text-xs text-gray-500">(You)</span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <span className="text-lg font-medium text-gray-900">
                              {entry.points}
                            </span>
                            <Award size={16} className="text-highlight-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="mt-2 flex justify-end">
                        <span className={`flex items-center space-x-1 text-xs font-medium ${
                          index === 0 
                            ? 'text-yellow-600' 
                            : index === 1 
                              ? 'text-gray-500' 
                              : 'text-amber-700'
                        }`}>
                          <Trophy size={14} />
                          <span>
                            {index === 0 
                              ? 'Gold Champion' 
                              : index === 1 
                                ? 'Silver Champion' 
                                : 'Bronze Champion'}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      
      case 'achievements':
        return (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {mockAchievements.map(achievement => (
              <div key={achievement.id} className="card overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-gray-100 p-3">
                      {achievement.icon}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        );
      
      case 'rewards':
        return (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-6 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 p-6 text-white shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-100">Your Balance</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <h2 className="text-3xl font-bold">{user.points}</h2>
                    <span className="rounded-full bg-white/20 px-2 py-1 text-xs">
                      ChainCoins
                    </span>
                  </div>
                </div>
                <div className="rounded-full bg-white/10 p-3">
                  <DollarSign size={24} />
                </div>
              </div>
            </div>
            
            <h3 className="mb-4 text-lg font-medium text-gray-900">Available Rewards</h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: '1',
                  title: '1-Month Premium Access',
                  description: 'Unlock all premium courses and resources for 30 days',
                  points: 500,
                  image: 'https://images.pexels.com/photos/7172886/pexels-photo-7172886.jpeg?auto=compress&cs=tinysrgb&w=600'
                },
                {
                  id: '2',
                  title: 'Private Mentor Session',
                  description: '1-hour private session with a mentor of your choice',
                  points: 750,
                  image: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=600'
                },
                {
                  id: '3',
                  title: 'Certificate of Excellence',
                  description: 'Digital certificate for your profile and resume',
                  points: 1000,
                  image: 'https://images.pexels.com/photos/8294606/pexels-photo-8294606.jpeg?auto=compress&cs=tinysrgb&w=600'
                },
              ].map(reward => (
                <div key={reward.id} className="card overflow-hidden">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-medium text-gray-900">{reward.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{reward.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Award size={16} className="text-highlight-500" />
                        <span className="font-medium text-highlight-600">{reward.points}</span>
                      </div>
                      <button 
                        className={`btn !py-1 !px-3 ${
                          user.points >= reward.points 
                            ? 'btn-primary' 
                            : 'btn-outline opacity-50'
                        }`}
                        disabled={user.points < reward.points}
                      >
                        {user.points >= reward.points ? 'Redeem' : 'Need more points'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout 
      title="Chain-Mines" 
      description="Complete challenges, earn points, and climb the leaderboard"
    >
      {/* Header with Points */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary-800 to-accent-800 p-8 text-white shadow-lg">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center">
            <Award size={32} className="mr-4" />
            <div>
              <p className="text-sm font-medium text-primary-100">Your Points</p>
              <h2 className="text-3xl font-bold">{user.points}</h2>
            </div>
          </div>
          
          <div className="flex items-center">
            <Trophy size={32} className="mr-4" />
            <div>
              <p className="text-sm font-medium text-primary-100">Rank</p>
              <h2 className="text-3xl font-bold">#24</h2>
            </div>
          </div>
          
          <div className="flex items-center">
            <Star size={32} className="mr-4" />
            <div>
              <p className="text-sm font-medium text-primary-100">Level</p>
              <h2 className="text-3xl font-bold">5</h2>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-100">Level Progress</span>
            <span className="text-sm font-medium text-white">
              {user.points}/1000
            </span>
          </div>
          <div className="mt-2 h-2.5 w-full rounded-full bg-primary-900/50">
            <div
              className="h-2.5 rounded-full bg-highlight-500"
              style={{ width: `${(user.points / 1000) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'challenges', label: 'Challenges', icon: <Zap size={16} /> },
            { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={16} /> },
            { id: 'achievements', label: 'Achievements', icon: <Award size={16} /> },
            { id: 'rewards', label: 'Rewards', icon: <DollarSign size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 border-b-2 px-1 pb-4 pt-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default ChainMines;