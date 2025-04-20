import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  User, LogOut, ChevronDown, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

import Logo from './Logo';

const Navbar: React.FC = () => {
  const { user, logout, connectWallet, walletConnected, walletAddress } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
          
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-semibold text-primary-900">MentorMatch</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {!walletConnected ? (
                  <button 
                    onClick={() => connectWallet()} 
                    className="btn btn-outline flex items-center space-x-2"
                  >
                    <Wallet size={16} />
                    <span>Connect Wallet</span>
                  </button>
                ) : (
                  <div className="hidden md:flex items-center space-x-2 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    <Wallet size={14} className="text-primary-600" />
                    <span className="truncate max-w-[120px]">
                      {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
                    </span>
                  </div>
                )}

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="ml-2 hidden text-sm font-medium text-gray-700 md:block">
                        {user.name}
                      </span>
                      <ChevronDown size={16} className="ml-1 text-gray-500" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="border-b border-gray-100 px-4 py-2">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <div className="mt-1 flex items-center">
                            <span className="mr-1 text-xs text-gray-500">Points:</span>
                            <span className="text-xs font-medium text-highlight-600">{user.points}</span>
                          </div>
                        </div>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="flex items-center">
                            <User size={16} className="mr-2" />
                            Profile
                          </div>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <LogOut size={16} className="mr-2" />
                            Sign out
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;