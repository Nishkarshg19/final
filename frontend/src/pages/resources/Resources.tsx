import React, { useState } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Download,
  Search,
  Star,
  Clock,
  Tag,
  Lock,
  Filter,
  ThumbsUp,
  Award
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for resources
const mockResources = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'A comprehensive guide to JavaScript basics for beginners',
    type: 'course',
    author: 'Prof. Lisa Johnson',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviewCount: 156,
    premium: false,
    categories: ['Programming', 'Web Development'],
    created: '2023-05-15',
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Learn advanced React patterns used by professional developers',
    type: 'ebook',
    author: 'Alex Martinez',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviewCount: 87,
    premium: true,
    points: 250,
    categories: ['React', 'JavaScript', 'Web Development'],
    created: '2023-04-22',
  },
  {
    id: '3',
    title: 'Machine Learning Essentials',
    description: 'Core concepts and algorithms in modern machine learning',
    type: 'video',
    author: 'Dr. Robert Chen',
    thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    reviewCount: 203,
    premium: true,
    points: 350,
    categories: ['Machine Learning', 'AI', 'Python'],
    created: '2023-06-10',
  },
  {
    id: '4',
    title: 'CSS Grid Mastery',
    description: 'Everything you need to know about CSS Grid layouts',
    type: 'course',
    author: 'Sarah Davis',
    thumbnail: 'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviewCount: 119,
    premium: false,
    categories: ['CSS', 'Web Design', 'Web Development'],
    created: '2023-03-05',
  },
  {
    id: '5',
    title: 'Data Structures & Algorithms',
    description: 'Optimizing code performance with the right data structures',
    type: 'ebook',
    author: 'Prof. James Wilson',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviewCount: 78,
    premium: true,
    points: 300,
    categories: ['Algorithms', 'Computer Science', 'Programming'],
    created: '2023-05-28',
  },
  {
    id: '6',
    title: 'UI/UX Design Principles',
    description: 'Creating effective and beautiful user interfaces',
    type: 'video',
    author: 'Emma Wilson',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviewCount: 105,
    premium: false,
    categories: ['Design', 'UI/UX', 'Web Design'],
    created: '2023-06-18',
  },
];

const ResourceCard: React.FC<{
  resource: typeof mockResources[0];
  user: any;
  onUnlock: (resourceId: string) => void;
}> = ({ resource, user, onUnlock }) => {
  const getTypeIcon = () => {
    switch (resource.type) {
      case 'course':
        return <BookOpen size={18} />;
      case 'video':
        return <Video size={18} />;
      case 'ebook':
        return <FileText size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  return (
    <div className="card overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-40">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="h-full w-full object-cover"
        />
        {resource.premium && (
          <div className="absolute right-2 top-2 rounded-full bg-highlight-500 px-2 py-1 text-xs font-medium text-white">
            Premium
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-2 text-white">
          <div className="flex items-center space-x-1">
            <span className="text-highlight-400">{resource.rating}</span>
            <Star size={14} className="fill-highlight-400 text-highlight-400" />
            <span className="text-xs">({resource.reviewCount})</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center space-x-2">
          <span className={`rounded-full p-1 ${
            resource.type === 'course' 
              ? 'bg-primary-100 text-primary-700' 
              : resource.type === 'video'
                ? 'bg-accent-100 text-accent-700'
                : 'bg-highlight-100 text-highlight-700'
          }`}>
            {getTypeIcon()}
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {resource.type}
          </span>
        </div>
        <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{resource.description}</p>
        <div className="mt-3 flex items-center text-xs text-gray-500">
          <Clock size={14} className="mr-1" />
          {new Date(resource.created).toLocaleDateString()}
        </div>
        <div className="mt-4 flex items-center justify-between">
          {resource.premium ? (
            <div className="flex items-center text-highlight-600">
              <Award size={16} className="mr-1" />
              <span className="font-medium">{resource.points} points</span>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Free</div>
          )}
          <button
            className={`btn !py-1 !px-3 text-sm ${
              !resource.premium
                ? 'btn-primary'
                : user.points >= resource.points
                  ? 'btn-highlight'
                  : 'btn-outline cursor-not-allowed opacity-50'
            }`}
            disabled={resource.premium && user.points < resource.points}
            onClick={() => resource.premium && onUnlock(resource.id)}
          >
            {!resource.premium ? (
              'Access Now'
            ) : user.points >= resource.points ? (
              <span className="flex items-center">
                <Lock size={14} className="mr-1" /> Unlock
              </span>
            ) : (
              `Need ${resource.points - user.points} more`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Resources: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [activeType, setActiveType] = useState<'all' | 'course' | 'video' | 'ebook'>('all');
  const [resources, setResources] = useState(mockResources);

  const handleUnlock = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource || !resource.premium) return;
    
    // In a real app, this would be an API call to unlock the resource
    alert(`Resource "${resource.title}" unlocked for ${resource.points} points!`);
  };

  const filteredResources = resources.filter(resource => {
    let matchesSearch = true;
    let matchesFilter = true;
    let matchesType = true;
    
    // Search filter
    if (searchTerm) {
      matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.categories.some(cat => 
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Premium filter
    if (activeFilter === 'free') {
      matchesFilter = !resource.premium;
    } else if (activeFilter === 'premium') {
      matchesFilter = resource.premium;
    }
    
    // Type filter
    if (activeType !== 'all') {
      matchesType = resource.type === activeType;
    }
    
    return matchesSearch && matchesFilter && matchesType;
  });

  return (
    <DashboardLayout 
      title="Learning Resources" 
      description="Explore courses, e-books, videos, and more"
    >
      {/* Search & Filters */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full"
              placeholder="Search resources by title, description, or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <div className="flex space-x-1 rounded-md bg-gray-100 p-1">
            <button
              className={`flex-1 rounded-sm px-3 py-1.5 text-sm font-medium ${
                activeFilter === 'all'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={`flex-1 rounded-sm px-3 py-1.5 text-sm font-medium ${
                activeFilter === 'free'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveFilter('free')}
            >
              Free
            </button>
            <button
              className={`flex-1 rounded-sm px-3 py-1.5 text-sm font-medium ${
                activeFilter === 'premium'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveFilter('premium')}
            >
              Premium
            </button>
          </div>
        </div>
        
        <div>
          <div className="flex space-x-1 rounded-md bg-gray-100 p-1">
            <button
              className={`flex-1 rounded-sm px-3 py-1.5 text-sm font-medium ${
                activeType === 'all'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveType('all')}
            >
              All Types
            </button>
            <button
              className={`flex items-center justify-center rounded-sm px-2 py-1.5 text-sm font-medium ${
                activeType === 'course'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveType('course')}
            >
              <BookOpen size={16} />
            </button>
            <button
              className={`flex items-center justify-center rounded-sm px-2 py-1.5 text-sm font-medium ${
                activeType === 'video'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveType('video')}
            >
              <Video size={16} />
            </button>
            <button
              className={`flex items-center justify-center rounded-sm px-2 py-1.5 text-sm font-medium ${
                activeType === 'ebook'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveType('ebook')}
            >
              <FileText size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Points Display */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary-700 to-accent-700 p-6 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Your Chain-Mines Points</h3>
            <p className="text-primary-100">Unlock premium resources with your points</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-white/20 p-2">
              <Award size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold">{user?.points || 0}</div>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Top Categories</h2>
        <div className="flex flex-wrap gap-2">
          {['Web Development', 'Machine Learning', 'UI/UX Design', 'JavaScript', 'React', 'Python', 'Computer Science', 'CSS'].map((category, index) => (
            <button
              key={index}
              className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              onClick={() => setSearchTerm(category)}
            >
              <Tag size={14} className="mr-2" />
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              user={user || {}} 
              onUnlock={handleUnlock}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter settings</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
              setActiveType('all');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {/* Popular Resources */}
      {activeFilter === 'all' && activeType === 'all' && !searchTerm && (
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Most Popular Resources</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mockResources
              .sort((a, b) => b.reviewCount - a.reviewCount)
              .slice(0, 4)
              .map(resource => (
                <div key={resource.id} className="card overflow-hidden transition-all hover:shadow-md">
                  <div className="relative h-32">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-3 py-2 text-white">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp size={12} className="text-highlight-400" />
                        <span className="text-xs">{resource.reviewCount} users</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{resource.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star size={12} className="fill-highlight-400 text-highlight-400" />
                        <span className="text-xs font-medium">{resource.rating}</span>
                      </div>
                      <span className={`text-xs ${
                        resource.premium ? 'text-highlight-600' : 'text-success-600'
                      }`}>
                        {resource.premium ? 'Premium' : 'Free'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Resources;