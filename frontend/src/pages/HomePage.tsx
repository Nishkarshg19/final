import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  BookOpen,
  Award,
  Brain,
  Wallet,
  MessageSquare,
} from 'lucide-react';
import Navbar from '../components/layout/NavbarHome';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-900 to-primary-700 py-32 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-48 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-accent-500 opacity-20 blur-3xl"></div>
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-highlight-500 opacity-20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Connect, Learn, and Grow with{' '}
                <span className="text-highlight-400">MentorMatch</span>
              </h1>
              <p className="mt-6 text-xl text-primary-100">
                The ultimate platform connecting students with mentors,
                powered by AI, blockchain, and a vibrant community of learners and teachers.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="btn bg-white px-6 py-3 text-base font-medium text-primary-700 hover:bg-gray-50"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn bg-white px-6 py-3 text-base font-medium text-primary-700 hover:bg-gray-50"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="btn border border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white/10"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <img
                src="https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg"
                alt="Student learning"
                className="h-auto w-full rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose MentorMatch?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Our platform offers unique features designed to enhance your learning journey
            </p>
          </div>

          <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary-600" />,
                title: 'AI-Powered Matching',
                description:
                  'Our advanced AI pairs mentors and mentees based on skills, goals, and learning styles for the perfect match.',
              },
              {
                icon: <BookOpen className="h-8 w-8 text-primary-600" />,
                title: 'Premium Resources',
                description:
                  'Access a vast library of high-quality learning materials, curated by experts and mentors in the field.',
              },
              {
                icon: <Award className="h-8 w-8 text-primary-600" />,
                title: 'Chain-Mines Gamification',
                description:
                  'Complete assignments and challenges to earn points that unlock premium resources and features.',
              },
              {
                icon: <Brain className="h-8 w-8 text-primary-600" />,
                title: 'Smart AI Assistant',
                description:
                  'Get instant answers from our AI chatbot, with seamless escalation to human mentors when needed.',
              },
              {
                icon: <Wallet className="h-8 w-8 text-primary-600" />,
                title: 'Blockchain Integration',
                description:
                  'Connect your crypto wallet to unlock special features and purchase premium resources with earned points.',
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-primary-600" />,
                title: 'Direct Communication',
                description:
                  'Connect directly with mentors and peers through our integrated messaging platform.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose Your Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Select the role that best describes your journey
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Join as a Mentor',
                description:
                  'Share your knowledge, guide students, and make a difference in their learning journey.',
                image: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg',
                linkText: 'Start Mentoring',
                link: '/register?role=mentor',
              },
              {
                title: 'Join as a Student',
                description:
                  'Connect with expert mentors, access quality resources, and accelerate your learning.',
                image: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg',
                linkText: 'Start Learning',
                link: '/register?role=student',
              },
              {
                title: 'Join as Both',
                description:
                  'Learn from experts while sharing your own expertise in a hybrid role that maximizes growth.',
                image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
                linkText: 'Get Started',
                link: '/register?role=hybrid',
              },
            ].map((role, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={role.image}
                  alt={role.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{role.description}</p>
                  <div className="mt-6">
                    <Link
                      to={role.link}
                      className="btn btn-primary w-full"
                    >
                      {role.linkText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-600 text-white">
                  <BookOpen size={24} />
                </div>
                <span className="ml-2 text-xl font-bold">MentorMatch</span>
              </div>
              <p className="mt-4 text-gray-400">
                Connecting mentors and students through technology and community.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} MentorMatch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;