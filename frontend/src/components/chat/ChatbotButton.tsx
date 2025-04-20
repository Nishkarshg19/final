import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './Chatbot';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 h-[500px] w-[350px] overflow-hidden rounded-lg bg-white shadow-xl sm:w-[400px]"
          >
            <div className="flex h-14 items-center justify-between bg-primary-600 px-4 text-white">
              <div className="flex items-center">
                <MessageSquare size={20} className="mr-2" />
                <h3 className="font-medium">AI Assistant</h3>
              </div>
            </div>
            <div className="relative h-[calc(100%-56px)]">
              {/* Close button inside the chatbot area */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 rounded-full p-1 hover:bg-gray-200"
              >
                <X size={20} />
              </button>
              <Chatbot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotButton;