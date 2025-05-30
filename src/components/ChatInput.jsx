import React,{useState,useRef} from "react";
import { Mic, Send, ImagePlus,Lightbulb, Eye } from "lucide-react";
import {useTheme} from "../ThemeContext";

const ChatInput = ({ 
  message, 
  setMessage, 
  onSubmit, 
  placeholder = "What is UI/UX?", 
  attachedFile, 
  onFileAttach, 
  onRemoveFile,
  showSuggestions,
  onInputFocus,
  onInputBlur,
  onSuggestionClick
}) => {
  const { colors, isDarkMode } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState('hidden');
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
      handleHideSuggestions();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setAnimationState('entering');
    setIsAnimating(true);
    
    setTimeout(() => {
      setAnimationState('visible');
    }, 400);
    
    onInputFocus && onInputFocus();
  };

  const handleBlur = (e) => {
    if (suggestionsRef.current && suggestionsRef.current.contains(e.relatedTarget)) {
      return;
    }
    handleHideSuggestions();
  };

  const handleHideSuggestions = () => {
    setAnimationState('exiting');
    
    setTimeout(() => {
      setIsAnimating(false);
      setIsFocused(false);
      setAnimationState('hidden');
      onInputBlur && onInputBlur();
    }, 400);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    handleHideSuggestions();
    onSuggestionClick && onSuggestionClick(suggestion);
    inputRef.current?.focus();
  };

  const suggestions = [
    {
      text: "Create a visualization for quarterly sales data",
      icon: <ImagePlus size={16} className="text-blue-500" />,
      category: "Data"
    },
    {
      text: "Analyze customer feedback trends",
      icon: <Lightbulb size={16} className="text-orange-500" />,
      category: "Analysis"
    },
    {
      text: "Generate a market research report",
      icon: <Eye size={16} className="text-green-500" />,
      category: "Research"
    },
    {
      text: "Summarize project documentation",
      icon: <Eye size={16} className="text-indigo-500" />,
      category: "Summary"
    }
  ];

  const getAnimationClass = () => {
    switch(animationState) {
      case 'entering':
        return 'animate-slideUpFromBottom opacity-100';
      case 'visible':
        return 'opacity-100 translate-y-0';
      case 'exiting':
        return 'animate-slideDownToTop opacity-0';
      default:
        return 'opacity-0 translate-y-full';
    }
  };

  return (
    <div className="mt-3 sm:mt-4 lg:mt-6 relative z-20 flex-shrink-0" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {attachedFile && (
        <div className={`mb-2 flex items-center gap-2 p-3 ${colors.bg.tertiary} ${colors.border.primary} border rounded-xl max-w-4xl mx-auto shadow-sm`}>
          <div className="p-2 bg-blue-500 rounded-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className={`text-sm font-medium ${colors.text.primary}`}>{attachedFile}</span>
          <button
            onClick={onRemoveFile}
            className={`ml-auto ${colors.text.muted} hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="relative flex items-center max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onFileAttach}
          className={`absolute left-4 p-2 ${colors.button.iconnonactive} transition-colors z-10 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        <button
          type="button"
          className={`absolute left-12 p-2 ${colors.button.iconnonactive} transition-colors z-10 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-green-50'}`}
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full pl-20 pr-14 py-4 ${colors.bg.input} ${
            isFocused 
              ? 'border-blue-500 ring-4 ring-blue-100 shadow-lg' 
              : colors.border.primary
          } border rounded-2xl focus:outline-none transition-all duration-300 text-base ${colors.text.primary} ${isDarkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} font-medium`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        />

        <button
          type="button"
          onClick={() => {
            onSubmit();
            handleHideSuggestions();
          }}
          disabled={!message.trim()}
          className={`absolute right-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {(showSuggestions && animationState !== 'hidden') && (
        <div 
          ref={suggestionsRef}
          className={`mt-3 max-w-4xl mx-auto ${colors.bg.secondary} ${colors.border.primary} border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm ${isDarkMode ? 'bg-zinc-800/70' : 'bg-white/95'} transition-all duration-400 ease-out ${getAnimationClass()}`}
        >
          <div className="p-2">
            <div className={`text-xs font-semibold ${colors.text.muted} uppercase tracking-wide px-3 py-2 mb-1`}>
              Quick Suggestions
            </div>
            <div className="grid gap-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className={`w-full text-left px-4 py-3 ${colors.text.primary} ${colors.hover.bg} transition-all duration-200 rounded-xl text-base flex items-center gap-3 transform hover:scale-[1.01]`}
                  style={{
                    animationDelay: animationState === 'entering' ? `${index * 80}ms` : '0ms',
                    fontFamily: "system-ui, -apple-system, sans-serif"
                  }}
                >
                  <div className={`flex-shrink-0 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-200`}>
                    {suggestion.icon}
                  </div>
                  <div className="flex-1">
                    <div className={colors.text.primary}>
                      {suggestion.text}
                    </div>
                    <div className={`text-xs ${colors.text.muted} mt-0.5`}>
                      {suggestion.category}
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className={`w-4 h-4 ${colors.text.muted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className={`h-2 bg-gradient-to-t ${isDarkMode ? 'from-zinc-900 to-transparent' : 'from-white to-transparent'}`}></div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUpFromBottom {
          from { 
            opacity: 0; 
            transform: translateY(100%) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideDownToTop {
          from { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
          to { 
            opacity: 0; 
            transform: translateY(100%) scale(0.95);
          }
        }
        
        .animate-slideUpFromBottom {
          animation: slideUpFromBottom 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-slideDownToTop {
          animation: slideDownToTop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
export default ChatInput;