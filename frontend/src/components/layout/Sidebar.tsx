import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, BookOpen, BookMarked, 
  MessageSquare, Award, GraduationCap, 
  Layers, ChevronRight
} from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  notifications?: number;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  isActive,
  notifications 
}) => {
  return (
    <Link 
      to={to}
      className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm ${
        isActive 
          ? 'bg-primary-50 text-primary-700 font-medium' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span>{label}</span>
      {notifications && notifications > 0 && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-800">
          {notifications}
        </span>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useUI();
  const { user } = useAuth();
  const location = useLocation();

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  if (!user) return null;

  // Get correct dashboard based on user role
  const getDashboardLink = () => {
    switch (user.role) {
      case 'mentor':
        return '/mentor-dashboard';
      case 'student':
        return '/student-dashboard';
      case 'hybrid':
        return '/hybrid-dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <>
      {/* Mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-50 w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white pb-4 pt-5 lg:translate-x-0 lg:flex"
      >
        <div className="px-4 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-600 text-white">
                  <BookOpen size={20} />
                </div>
                <span className="ml-2 text-xl font-semibold text-primary-900">MentorMatch</span>
              </Link>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 "
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col space-y-1 px-3 py-4">
          <SidebarLink
            to="/dashboard"
            icon={<Home size={18} />}
            label="Dashboard"
            isActive={location.pathname === '/dashboard' || location.pathname === getDashboardLink()}
          />
          
          <div className="pt-2 pb-1">
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
              Learning
            </p>
          </div>
          
          <SidebarLink
            to="/chain-mines"
            icon={<Layers size={18} />}
            label="Chain-Mines"
            isActive={location.pathname === '/chain-mines'}
          />
          
          <SidebarLink
            to="/resources"
            icon={<BookMarked size={18} />}
            label="Resources"
            isActive={location.pathname === '/resources'}
            notifications={3}
          />
          
          {user.role === 'mentor' || user.role === 'hybrid' ? (
            <>
              <div className="pt-2 pb-1">
                <p className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Mentoring
                </p>
              </div>
              
              <SidebarLink
                to="/mentee-requests"
                icon={<Users size={18} />}
                label="Mentee Requests"
                isActive={location.pathname === '/mentee-requests'}
                notifications={2}
              />
              
              <SidebarLink
                to="/mentor-assignments"
                icon={<GraduationCap size={18} />}
                label="Assignments"
                isActive={location.pathname === '/mentor-assignments'}
              />
            </>
          ) : null}
          
          {user.role === 'student' || user.role === 'hybrid' ? (
            <>
              <div className="pt-2 pb-1">
                <p className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Learning
                </p>
              </div>
              
              <SidebarLink
                to="/available-mentors"
                icon={<Users size={18} />}
                label="Available Mentors"
                isActive={location.pathname === '/available-mentors'}
              />
              
              <SidebarLink
                to="/my-assignments"
                icon={<BookOpen size={18} />}
                label="My Assignments"
                isActive={location.pathname === '/my-assignments'}
              />
            </>
          ) : null}
          
          <div className="pt-2 pb-1">
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
              Help
            </p>
          </div>
          
          <SidebarLink
            to="/chat"
            icon={<MessageSquare size={18} />}
            label="AI Chatbot"
            isActive={location.pathname === '/chat'}
          />
          
          <SidebarLink
            to="/leaderboard"
            icon={<Award size={18} />}
            label="Leaderboard"
            isActive={location.pathname === '/leaderboard'}
          />
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;