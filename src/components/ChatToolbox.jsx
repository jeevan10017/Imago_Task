import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Clipboard,
  RefreshCcw,
  Volume2,
  Pause,
  Check 
} from "lucide-react";
import { useTheme } from "../ThemeContext";

const ChatToolbox = ({ onRefresh, onCopy, onTextToSpeech, isPlaying }) => {
  const { colors } = useTheme();
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleThumbsUp = () => {
    setFeedback(feedback === "up" ? null : "up");
  };

  const handleThumbsDown = () => {
    setFeedback(feedback === "down" ? null : "down");
  };

  const handleCopy = () => {
    setCopied(true); 
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const ToolButton = ({ onClick, children, isActive = false, tooltip }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`
          w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
          flex items-center justify-center 
          ${isActive ? 'bg-blue-100 text-blue-600' : `${colors.button.icon} ${colors.hover.bgSecondary}`}
          hover:scale-110 active:scale-95
          transition-all duration-200 rounded-lg mx-1 lg:mx-0 my-0 lg:my-1
          shadow-sm hover:shadow-md
        `}
      >
        {children}
      </button>
      {tooltip && (
        <div className="absolute left-12 lg:left-full lg:ml-2 top-1/2 transform -translate-y-1/2 
                       bg-gray-800 text-white text-xs px-2 py-1 rounded 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200
                       pointer-events-none whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </div>
  );

  return (
    <div className={`
      ${colors.bg.tertiary} ${colors.border.primary} border rounded-xl shadow-lg p-2
      flex lg:flex-col flex-row
      w-fit h-fit backdrop-blur-sm
    `}>
      <ToolButton onClick={handleRefresh} tooltip="Regenerate response">
        <RefreshCcw size={16} className={refreshing ? "animate-spin" : ""} />
      </ToolButton>

      <ToolButton
        onClick={handleThumbsUp}
        isActive={feedback === "up"}
        tooltip="Good response"
      >
        <ThumbsUp size={16} />
      </ToolButton>

      <ToolButton
        onClick={handleThumbsDown}
        isActive={feedback === "down"}
        tooltip="Poor response"
      >
        <ThumbsDown size={16} />
      </ToolButton>

      <div className="relative group">
        <button
          onClick={handleCopy}
          className={`
            w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
            flex items-center justify-center 
            ${colors.button.icon} ${colors.hover.bgSecondary}
            hover:scale-110 active:scale-95
            transition-all duration-200 rounded-lg mx-1 lg:mx-0 my-0 lg:my-1
            shadow-sm hover:shadow-md
          `}
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Clipboard size={16} />}
        </button>
        <div className="absolute left-12 lg:left-full lg:ml-2 top-1/2 transform -translate-y-1/2 
                       bg-gray-800 text-white text-xs px-2 py-1 rounded 
                       transition-opacity duration-200
                       pointer-events-none whitespace-nowrap z-50
                       ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}">
          {copied ? "Copied!" : "Copy to clipboard"}
        </div>
      </div>

      <ToolButton
        onClick={onTextToSpeech}
        tooltip={isPlaying ? "Stop reading" : "Read aloud"}
      >
        {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
      </ToolButton>
    </div>
  );
};

export default ChatToolbox;
