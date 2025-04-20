import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Mail, Lock, User, GraduationCap, 
  Briefcase, ArrowRight, RotateCw, Brain,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const [activeRole, setActiveRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Mentor specific fields
    expertise: '',
    experience: '',
    // Student specific fields
    interests: '',
    learningGoals: '',
  });
  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam && ['mentor', 'student', 'hybrid'].includes(roleParam)) {
      setActiveRole(roleParam);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.email.includes('@')) errors.push('Email is invalid');
    if (formData.password.length < 6) errors.push('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) errors.push('Passwords do not match');
    
    setFormErrors(errors);
    return errors.length === 0;
  };

  const validateStep2 = () => {
    const errors = [];
    
    if (activeRole === 'mentor' || activeRole === 'hybrid') {
      if (!formData.expertise.trim()) errors.push('Expertise is required for mentors');
      if (!formData.experience.trim()) errors.push('Experience is required for mentors');
    }
    
    if (activeRole === 'student' || activeRole === 'hybrid') {
      if (!formData.interests.trim()) errors.push('Interests are required for students');
      if (!formData.learningGoals.trim()) errors.push('Learning goals are required for students');
    }
    
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    if (step === 2 && validateStep2()) {
      try {
        await register(formData, activeRole);
        navigate('/dashboard');
      } catch (err) {
        console.error('Registration failed:', err);
      }
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
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                sign in to your existing account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mb-6">
              <div className="flex justify-between space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveRole('mentor')}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
                    activeRole === 'mentor'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Briefcase size={16} className="mr-1" />
                    <span>Mentor</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('student')}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
                    activeRole === 'student'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <GraduationCap size={16} className="mr-1" />
                    <span>Student</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('hybrid')}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
                    activeRole === 'hybrid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Brain size={16} className="mr-1" />
                    <span>Hybrid</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full 
                    ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {step > 1 ? <CheckCircle2 size={16} /> : '1'}
                  </div>
                  <span className="mt-1 text-xs">Account</span>
                </div>
                <div className={`h-1 w-16 ${step > 1 ? 'bg-primary-600' : 'bg-gray-200'}`} />
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full 
                    ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </div>
                  <span className="mt-1 text-xs">Profile</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-md bg-error-50 p-4 text-sm text-error-900">
                {error}
              </div>
            )}

            {formErrors.length > 0 && (
              <div className="mb-4 rounded-md bg-error-50 p-4">
                <h3 className="text-sm font-medium text-error-800">Please fix the following errors:</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-error-700">
                  {formErrors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="label block">
                      Full Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input pl-10 w-full"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

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
                        value={formData.email}
                        onChange={handleChange}
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
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="input pl-10 w-full"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="label block">
                      Confirm Password
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input pl-10 w-full"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Mentor Specific Fields */}
                  {(activeRole === 'mentor' || activeRole === 'hybrid') && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {activeRole === 'hybrid' ? 'Mentor Profile' : 'Your Expertise'}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="expertise" className="label block">
                              Areas of Expertise
                            </label>
                            <input
                              id="expertise"
                              name="expertise"
                              type="text"
                              required={activeRole === 'mentor' || activeRole === 'hybrid'}
                              value={formData.expertise}
                              onChange={handleChange}
                              className="input w-full"
                              placeholder="e.g., Web Development, Data Science, UX Design"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="experience" className="label block">
                              Years of Experience
                            </label>
                            <select
                              id="experience"
                              name="experience"
                              required={activeRole === 'mentor' || activeRole === 'hybrid'}
                              value={formData.experience}
                              onChange={handleChange}
                              className="input w-full"
                            >
                              <option value="">Select experience</option>
                              <option value="0-1">Less than 1 year</option>
                              <option value="1-3">1-3 years</option>
                              <option value="3-5">3-5 years</option>
                              <option value="5-10">5-10 years</option>
                              <option value="10+">10+ years</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Student Specific Fields */}
                  {(activeRole === 'student' || activeRole === 'hybrid') && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {activeRole === 'hybrid' ? 'Student Profile' : 'Your Learning Goals'}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="interests" className="label block">
                              Areas of Interest
                            </label>
                            <input
                              id="interests"
                              name="interests"
                              type="text"
                              required={activeRole === 'student' || activeRole === 'hybrid'}
                              value={formData.interests}
                              onChange={handleChange}
                              className="input w-full"
                              placeholder="e.g., Programming, Design, Marketing"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="learningGoals" className="label block">
                              Learning Goals
                            </label>
                            <textarea
                              id="learningGoals"
                              name="learningGoals"
                              rows={3}
                              required={activeRole === 'student' || activeRole === 'hybrid'}
                              value={formData.learningGoals}
                              onChange={handleChange}
                              className="input w-full"
                              placeholder="What do you hope to achieve?"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              <div className="flex justify-between">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary ${step === 1 ? 'w-full' : 'ml-auto'}`}
                >
                  {loading ? (
                    <>
                      <RotateCw size={20} className="animate-spin mr-2" />
                      {step === 1 ? 'Next' : 'Sign up'}
                    </>
                  ) : (
                    <>
                      {step === 1 ? 'Next' : 'Sign up'}
                      <ArrowRight size={20} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden w-0 flex-1 xl:block">
        <motion.div
          className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-800 to-accent-800 opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg"
          alt="People collaborating"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold">
              {activeRole === 'mentor' 
                ? 'Share your knowledge' 
                : activeRole === 'student' 
                  ? 'Accelerate your learning' 
                  : 'The best of both worlds'}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              {activeRole === 'mentor'
                ? 'Join our community of experts and help shape the next generation of professionals.'
                : activeRole === 'student'
                  ? 'Connect with expert mentors who can guide you on your learning journey.'
                  : 'Learn from experts while sharing your own knowledge. Grow in both directions.'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;