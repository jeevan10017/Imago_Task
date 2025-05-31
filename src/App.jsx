import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Sidebar from "./components/Sidebar";
import DashboardView from "./pages/DashboardView";
import ChatView from "./pages/ChatView";
import ChatHistoryView from "./pages/ChatHistoryView";

const ChatAppContent = () => {
  const { colors } = useTheme();
  const [activePage, setActivePage] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentChatData, setCurrentChatData] = useState(null); 
  const [attachedFile, setAttachedFile] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(`${window.innerHeight}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    const handleScroll = () => {
      setTimeout(setVH, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = () => {
    if (message.trim()) {
      setCurrentQuestion(message);
      setCurrentChatData(null); 
      setShowChat(true);
      setShowHistory(false);
      setMessage("");
      setAttachedFile("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setCurrentQuestion(suggestionText);
    setCurrentChatData(null); 
    setShowChat(true);
    setShowHistory(false);
    setShowSuggestions(false);
  };

  const handleBackToDashboard = () => {
    setShowChat(false);
    setActivePage("dashboard");
    setShowHistory(false);
    setCurrentQuestion("");
    setCurrentChatData(null); 
    setAttachedFile("");
    setShowSuggestions(false);
  };

  const handleShowHistory = () => {
    setActivePage("history");
    setShowHistory(true);
    setShowChat(false);
    setShowSuggestions(false);
  };

  const handleChatSelect = (chat) => {
    setCurrentQuestion(chat.question);
    setCurrentChatData(chat);
    setShowChat(true);
    setShowHistory(false);
  };

  const handleFileAttach = () => {
    setAttachedFile("quarterly_sales_data.xlsx");
  };

  const handleRemoveFile = () => {
    setAttachedFile("");
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div 
      className={`${colors.bg.primary} p-1 sm:p-6 lg:p-12 flex gap-1 sm:gap-4 lg:gap-8 overflow-hidden relative`}
      style={{ 
        height: viewportHeight,
        maxHeight: viewportHeight,
        minHeight: viewportHeight
      }}
    >
      <Sidebar 
        onBackToDashboard={handleBackToDashboard}
        onShowHistory={handleShowHistory}
        activePage={activePage}
      />

      <div className="flex-1 relative overflow-hidden">
        <DashboardView 
          showChat={showChat || showHistory}
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
          onSuggestionClick={handleSuggestionClick}
          attachedFile={attachedFile}
          onFileAttach={handleFileAttach}
          onRemoveFile={handleRemoveFile}
          showSuggestions={showSuggestions}
          onInputFocus={handleInputFocus}
          onInputBlur={handleInputBlur}
        />

        <ChatView 
          showChat={showChat}
          currentQuestion={currentQuestion}
          currentChatData={currentChatData} 
          onBackToDashboard={handleBackToDashboard}
          message={message}
          setMessage={setMessage}
           onSubmit={handleSubmit}
          attachedFile={attachedFile}
          onFileAttach={handleFileAttach}
          onRemoveFile={handleRemoveFile}
          showSuggestions={showSuggestions}
          onInputFocus={handleInputFocus}
          onInputBlur={handleInputBlur}
          onSuggestionClick={handleSuggestionClick}
        />

        <ChatHistoryView
          showHistory={showHistory}
          onBackToDashboard={handleBackToDashboard}
          onChatSelect={handleChatSelect}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ChatAppContent />
    </ThemeProvider>
  );
};

export default App;