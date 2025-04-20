import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Clock, ExternalLink, RotateCcw } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'mentor';
  timestamp: Date;
  name?: string;
  avatar?: string;
}

const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI learning assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEscalateButton, setShowEscalateButton] = useState(false);
  const [availableMentors, setAvailableMentors] = useState([
    {
      id: '1',
      name: 'Dr. Robert Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      expertise: 'Machine Learning',
      available: true,
    },
    {
      id: '2',
      name: 'Prof. Lisa Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      expertise: 'Web Development',
      available: true,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsLoading(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: getAIResponse(input),
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);

      // Show escalate button randomly to simulate AI not knowing answer
      if (Math.random() > 0.7) {
        setShowEscalateButton(true);
      }
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "Based on my knowledge, here's what I can tell you...",
      "I understand your query. Here's what I know about that topic.",
      "Let me provide you with some information on that.",
      "I'm happy to help with that question.",
      "I'm not entirely sure about that. Would you like me to connect you with a mentor?",
    ];

    // Select a random response
    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add more context based on common questions
    if (userInput.toLowerCase().includes('javascript')) {
      return `${baseResponse} JavaScript is a programming language that enables interactive web pages. It's a core technology of the World Wide Web, alongside HTML and CSS.`;
    } else if (userInput.toLowerCase().includes('python')) {
      return `${baseResponse} Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.`;
    } else if (userInput.toLowerCase().includes('course') || userInput.toLowerCase().includes('learn')) {
      return `${baseResponse} We have several courses available on various topics. Would you like me to recommend something specific based on your interests?`;
    }
    
    return baseResponse;
  };

  const handleEscalateToMentor = (mentorId: string) => {
    // Find the mentor
    const mentor = availableMentors.find(m => m.id === mentorId);
    
    if (!mentor) return;
    
    // Add a system message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: `You've been connected with ${mentor.name}, an expert in ${mentor.expertise}. They will assist you with your question.`,
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    
    // Simulate mentor response after a delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `Hi there! I understand you have a question I might be able to help with. Could you please provide a bit more detail about what you're trying to learn?`,
          sender: 'mentor',
          timestamp: new Date(),
          name: mentor.name,
          avatar: mentor.avatar,
        },
      ]);
    }, 2000);
    
    setShowEscalateButton(false);
  };

  const resetConversation = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI learning assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    setShowEscalateButton(false);
  };

  return (
    <DashboardLayout title="AI Chat Assistant" description="Get help with your questions and learning journey">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <Bot size={24} />
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-medium text-gray-900">AI Learning Assistant</h2>
                  <p className="text-sm text-gray-500">Powered by Groq</p>
                </div>
              </div>
              <button 
                onClick={resetConversation}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                title="Reset conversation"
              >
                <RotateCcw size={20} />
              </button>
            </div>
            
            <div className="h-[calc(100vh-300px)] overflow-y-auto p-6">
              <div className="space-y-6">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender !== 'user' && (
                      <div className="mr-3 flex-shrink-0">
                        {message.sender === 'mentor' && message.avatar ? (
                          <img
                            src={message.avatar}
                            alt={message.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                            <Bot size={20} />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : message.sender === 'mentor'
                            ? 'bg-highlight-100 text-gray-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.sender === 'mentor' && message.name && (
                        <div className="mb-1 text-xs font-medium text-highlight-600">
                          {message.name}
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <div className="mt-1 flex items-center justify-end space-x-2">
                        <Clock size={12} className="text-gray-400" />
                        <p className="text-xs text-gray-400">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="ml-3 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                          <User size={20} className="text-gray-600" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="mr-3 flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        <Bot size={20} />
                      </div>
                    </div>
                    <div className="max-w-[75%] rounded-lg bg-gray-100 px-4 py-2">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {showEscalateButton && (
                  <div className="flex justify-center">
                    <div className="rounded-lg bg-highlight-50 p-4 text-center">
                      <p className="text-sm text-gray-700">
                        Would you like to connect with a mentor for more detailed assistance?
                      </p>
                      <div className="mt-4 flex justify-center space-x-4">
                        {availableMentors.map(mentor => (
                          <button
                            key={mentor.id}
                            onClick={() => handleEscalateToMentor(mentor.id)}
                            className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow"
                          >
                            <img
                              src={mentor.avatar}
                              alt={mentor.name}
                              className="h-12 w-12 rounded-full"
                            />
                            <p className="mt-2 text-sm font-medium">{mentor.name}</p>
                            <p className="text-xs text-gray-500">{mentor.expertise}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="input flex-1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="btn btn-primary"
                >
                  <Send size={18} className="mr-2" /> Send
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Chat Tips</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0 text-primary-600">•</span>
                Ask specific questions for more accurate answers
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0 text-primary-600">•</span>
                Include context about your learning level
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0 text-primary-600">•</span>
                For complex topics, consider connecting with a mentor
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0 text-primary-600">•</span>
                Use follow-up questions to dive deeper into a topic
              </li>
            </ul>
          </div>
          
          <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Suggested Topics</h3>
            <div className="mt-4 space-y-3">
              {[
                'How to start learning JavaScript?',
                'What are the best resources for Python?',
                'Explain the basics of machine learning',
                'What is the difference between SQL and NoSQL?',
              ].map((topic, index) => (
                <button
                  key={index}
                  onClick={() => setInput(topic)}
                  className="w-full rounded-md border border-gray-200 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 rounded-lg bg-primary-50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-primary-900">Need More Help?</h3>
              <ExternalLink size={18} className="text-primary-700" />
            </div>
            <p className="mt-2 text-sm text-primary-700">
              For more complex topics, schedule a live session with one of our expert mentors.
            </p>
            <button className="btn btn-primary mt-4 w-full">
              Find a Mentor
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatBot;