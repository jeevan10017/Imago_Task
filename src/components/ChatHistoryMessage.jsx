import React from "react";
import { useTheme } from "../ThemeContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const ChatHistoryMessage = ({ chat, isExpanded, onChatToggle, onChatSelect }) => {
  const { colors } = useTheme();

  const handleChatClick = (e) => {
    if (!e.target.closest('button')) {
      onChatToggle(chat.id);
    }
  };

  const handleViewFullChat = (e) => {
    e.stopPropagation();
    onChatSelect(chat);
  };

  const handleContinueChat = (e) => {
    e.stopPropagation();
    onChatSelect(chat);
  };

  return (
    <div 
      className={`${colors.bg.tertiary} rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm ${colors.border.primary} border opacity-95 cursor-pointer hover:opacity-100 transition-all duration-300 ${
        isExpanded ? 'ring-2 ring-blue-500/20' : ''
      }`}
      onClick={handleChatClick}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <img 
          src="./logo.png"
          alt="Chat logo"
          className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${colors.border.secondary} flex-shrink-0 mt-1`}
        />
        
        <div className="flex-1 min-w-0 relative">
          <div className="absolute -top-2 right-0 z-10">
            <span className={`${colors.text.muted} text-xs sm:text-sm whitespace-nowrap`}>
              {chat.timestamp}
            </span>
          </div>
          
          <div className="mb-2 pr-16 sm:pr-20">
            <h3 className={`font-semibold ${colors.text.primary} text-sm sm:text-base line-clamp-2`}>
              {chat.question}
            </h3>
          </div>
          
          <p className={`${colors.text.secondary} text-sm line-clamp-2 leading-relaxed`}>
            {chat.preview}
          </p>
          
          <div 
            className={`overflow-hidden transition-all duration-500 ease-out ${
              isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-3 pt-3 border-t border-gray-200/20">
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className={`${colors.text.secondary} text-sm leading-relaxed`}>
                    {chat.fullContent.text}
                  </p>
                  
                  <div className="space-y-2 ml-4">
                    {chat.fullContent.points.map((point, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="w-1.5 h-1.5 bg-[#FF3B3B] rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-sm">
                          <span className={`font-semibold ${colors.text.primary}`}>{point.title}</span>
                          <span className={`${colors.text.secondary}`}> {point.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className={`${colors.text.secondary} text-sm leading-relaxed mt-3`}>
                    {chat.fullContent.summary}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <button 
                    onClick={handleViewFullChat}
                    className={`px-3 py-1.5 ${colors.bg.accent} text-white rounded-lg text-xs hover:opacity-110 transition-opacity duration-200`}
                  >
                    View Full Chat
                  </button>
                  <button 
                    onClick={handleContinueChat}
                    className={`px-3 py-1.5 ${colors.bg.input} ${colors.border.primary} border rounded-lg text-xs ${colors.text.primary} hover:opacity-80 transition-opacity duration-200`}
                  >
                    Continue Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryMessage;