import React, { useState } from "react";
import SuggestionCards from "../components/SuggestionCards";
import ChatInput from "../components/ChatInput";
import { useTheme } from "../ThemeContext";

const DashboardView = ({
  showChat,
  message,
  setMessage,
  onSubmit,
  onSuggestionClick,
  attachedFile,
  onFileAttach,
  onRemoveFile,
  showSuggestions,
  onInputFocus,
  onInputBlur
}) => {
  const { colors } = useTheme();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
    onInputFocus && onInputFocus();
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    onInputBlur && onInputBlur();
  };

  const handleSuggestionClick = (suggestion) => {
    setIsInputFocused(true);
    onSuggestionClick && onSuggestionClick(suggestion);
  };

  return (
    <div
      className={`absolute inset-0 ${colors.bg.secondary} rounded-xl sm:rounded-2xl lg:rounded-3xl ${colors.border.primary} border p-4 sm:p-6 lg:p-8 flex flex-col transition-transform duration-700 ease-out ${
        showChat ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div
        className="absolute right-4 sm:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-contain bg-no-repeat bg-center opacity-90 pointer-events-none z-0 hidden lg:block"
        style={{
          backgroundImage: `url('./robot.png')`,
          backgroundSize: "contain",
        }}
      />

      <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-col gap-2 sm:gap-3 lg:gap-4 relative z-10 flex-shrink-0">
        <h1
          className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal leading-tight ${colors.text.secondary}`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          <span className="bg-gradient-to-r from-[#2F82EF] to-[#FF3B3B] bg-clip-text text-transparent font-medium">
            Hi Milano Cherry
          </span>
        </h1>
        <p
          className={`text-base sm:text-lg lg:text-xl xl:text-3xl font-normal leading-relaxed ${colors.text.muted}`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          How can I help you today
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center lg:justify-start relative z-10 min-h-0 overflow-hidden">
        <SuggestionCards 
          onSuggestionClick={handleSuggestionClick} 
          isInputFocused={isInputFocused}
        />
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSubmit={onSubmit}
        placeholder="Ask anything from here"
        attachedFile={attachedFile}
        onFileAttach={onFileAttach}
        onRemoveFile={onRemoveFile}
        showSuggestions={showSuggestions}
        onInputFocus={handleInputFocus}
        onInputBlur={handleInputBlur}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
};

export default DashboardView;