import React, { createContext, useState, useContext } from 'react';

interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isChatbotOpen: boolean;
  toggleChatbot: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const initialUIContext: UIContextType = {
  isSidebarOpen: false,
  toggleSidebar: () => {},
  isChatbotOpen: false,
  toggleChatbot: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
};

const UIContext = createContext<UIContextType>(initialUIContext);

export const useUI = () => useContext(UIContext);

export const UIProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleChatbot = () => setIsChatbotOpen(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const value = {
    isSidebarOpen,
    toggleSidebar,
    isChatbotOpen,
    toggleChatbot,
    isDarkMode,
    toggleDarkMode,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};