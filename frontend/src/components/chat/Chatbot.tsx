import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'loading';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEscalateButton, setShowEscalateButton] = useState(false);
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

    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      text: '',
      sender: 'loading',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, loadingMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      setIsLoading(false);
      setMessages(prev => 
        prev.filter(msg => msg.sender !== 'loading').concat({
          id: Date.now().toString(),
          text: getAIResponse(input),
          sender: 'ai',
          timestamp: new Date(),
        })
      );

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

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleEscalateToMentor = () => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "I've sent a request to our available mentors. Someone will connect with you shortly to help answer your question in more detail.",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    setShowEscalateButton(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'loading' ? (
                <div className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2">
                  <Loader2 size={16} className="animate-spin text-gray-500" />
                  <span className="text-gray-500">Thinking...</span>
                </div>
              ) : (
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showEscalateButton && (
          <div className="my-4 flex justify-center">
            <button
              onClick={handleEscalateToMentor}
              className="rounded-full bg-highlight-500 px-4 py-2 text-sm font-medium text-white hover:bg-highlight-600 focus:outline-none focus:ring-2 focus:ring-highlight-500 focus:ring-offset-2"
            >
              Connect with a mentor
            </button>
          </div>
        )}
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
            placeholder="Type your message..."
            className="input flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="btn btn-primary aspect-square !p-2"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;