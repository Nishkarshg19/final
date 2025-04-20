
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import MentorDashboard from './pages/dashboard/MentorDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import HybridDashboard from './pages/dashboard/HybridDashboard';
import ChainMines from './pages/chain-mines/ChainMines';
import Resources from './pages/resources/Resources';
import ChatBot from './pages/chat/ChatBot';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/mentor-dashboard" element={
              <PrivateRoute>
                <MentorDashboard />
              </PrivateRoute>
            } />
            <Route path="/student-dashboard" element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            } />
            <Route path="/hybrid-dashboard" element={
              <PrivateRoute>
                <HybridDashboard />
              </PrivateRoute>
            } />
            <Route path="/chain-mines" element={
              <PrivateRoute>
                <ChainMines />
              </PrivateRoute>
            } />
            <Route path="/resources" element={
              <PrivateRoute>
                <Resources />
              </PrivateRoute>
            } />
            <Route path="/chat" element={
              <PrivateRoute>
                <ChatBot />
              </PrivateRoute>
            } />
            
            {/* Catch all not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UIProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;