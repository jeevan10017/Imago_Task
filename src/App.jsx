import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Sidebar from "./components/Sidebar";
import DashboardView from "./pages/DashboardView";
import ChatView from "./pages/ChatView";

const ChatAppContent = () => {
  const { colors } = useTheme();
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [attachedFile, setAttachedFile] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      setCurrentQuestion(message);
      setShowChat(true);
      setMessage("");
      setAttachedFile("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setCurrentQuestion(suggestionText);
    setShowChat(true);
    setShowSuggestions(false);
  };

  const handleBackToDashboard = () => {
    setShowChat(false);
    setCurrentQuestion("");
    setAttachedFile("");
    setShowSuggestions(false);
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
    <div className={`h-screen max-h-screen ${colors.bg.primary} p-3 sm:p-6 lg:p-12 flex gap-2 sm:gap-4 lg:gap-8 overflow-hidden relative`}>

      <Sidebar 
        onBackToDashboard={handleBackToDashboard}
      />

      <div className="flex-1 relative overflow-hidden">

        <DashboardView 
          showChat={showChat}
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