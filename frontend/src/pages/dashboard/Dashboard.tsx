import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      // Redirect to role-specific dashboard
      switch (user.role) {
        case 'mentor':
          navigate('/mentor-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'hybrid':
          navigate('/hybrid-dashboard');
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  return (
    <DashboardLayout title="Dashboard" description="Welcome to your MentorMatch dashboard">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;