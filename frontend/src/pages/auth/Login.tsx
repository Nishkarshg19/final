import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock, ArrowRight, RotateCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from URL params if available
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam && ['mentor', 'student', 'hybrid'].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-600 text-white">
                <BookOpen size={24} />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">MentorMatch</span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mb-6">
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => setRole('mentor')}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    role === 'mentor'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Mentor
                </button>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    role === 'student'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('hybrid')}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    role === 'hybrid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Hybrid
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-md bg-error-50 p-4 text-sm text-error-900">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="label block">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input pl-10 w-full"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label block">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input pl-10 w-full"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <RotateCw size={20} className="animate-spin mr-2" />
                ) : (
                  <ArrowRight size={20} className="mr-2" />
                )}
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden w-0 flex-1 xl:block">
        <motion.div
          className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-700 to-accent-700 opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
          alt="People working on laptops"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold">
              {role === 'mentor' 
                ? 'Welcome back, Mentor!' 
                : role === 'student' 
                  ? 'Ready to continue learning?' 
                  : 'Welcome to your dual journey!'}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              {role === 'mentor'
                ? 'Sign in to connect with your mentees, share knowledge, and track their progress.'
                : role === 'student'
                  ? 'Sign in to access your learning resources, connect with mentors, and continue your educational journey.'
                  : 'Sign in to switch seamlessly between teaching and learning, making the most of both worlds.'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;