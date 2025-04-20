import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatbotButton from '../chat/ChatbotButton';
import { useUI } from '../../contexts/UIContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const { isSidebarOpen } = useUI();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />

      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:pl-64' : ''
        }`}
      >
        {(title || description) && (
          <div className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          </div>
        )}
        
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <ChatbotButton />
    </div>
  );
};

export default DashboardLayout;