import React, { useState, useEffect } from "react";
import { ImagePlus, Lightbulb, Eye } from "lucide-react";
import { useTheme } from "../ThemeContext";

const SuggestionCards = ({ onSuggestionClick, isInputFocused }) => {
  const { colors } = useTheme();
  const [animationState, setAnimationState] = useState('visible'); 

  const suggestions = [
    {
      text: "Create an image for my presentation",
      icon: <ImagePlus size={16} className="text-blue-500 sm:w-5 sm:h-5" />,
      bColor: "#055da3",
      bColor1: "#2196F3",
    },
    {
      text: "What to do with kids' art",
      icon: <Lightbulb size={16} className="text-orange-500 sm:w-5 sm:h-5" />,
      bColor: "#b06a04",
      bColor1: "#FF9800",
    },
    {
      text: "Find the decade that a photo is from",
      icon: <Eye size={16} className="text-green-500 sm:w-5 sm:h-5" />,
      bColor: "#047808",
      bColor1: "#4CAF50",
    },
  ];

  useEffect(() => {
    if (isInputFocused) {
      setAnimationState('hiding');
    } else {
      // Delay showing cards when input loses focus
      const timer = setTimeout(() => {
        setAnimationState('visible');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInputFocused]);

  const getAnimationClass = () => {
    switch(animationState) {
      case 'hiding':
        return 'animate-slideDownToTop opacity-0';
      case 'visible':
        return 'animate-slideUpFromBottom opacity-100';
      default:
        return 'opacity-100';
    }
  };

  return (
    <div className={`flex flex-col sm:flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-12 max-w-4xl w-full items-center px-8 sm:px-2 transition-all duration-400 ${getAnimationClass()}`}>
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.text)}
          className={`relative w-full sm:w-64 lg:w-64 h-32 sm:h-32 lg:h-48 ${colors.bg.card} rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 pr-4 sm:pr-6 lg:pr-8 pb-4 sm:pb-6 lg:pb-8 flex flex-col justify-between text-left ${colors.border.primary} border  transition-all duration-300`}
          style={{
            background: `
              linear-gradient(${colors.bg.card === 'bg-zinc-800' ? '#27272A' : 'white'}, ${colors.bg.card === 'bg-zinc-800' ? '#27272A' : 'white'}) padding-box,
              linear-gradient(135deg, ${suggestion.bColor} 0%, transparent 70%) border-box
            `,
            border: "1px solid transparent",
            backgroundClip: "padding-box, border-box",
            animationDelay: animationState === 'visible' ? `${index * 100}ms` : '0ms'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `
              linear-gradient(${colors.bg.card === 'bg-zinc-800' ? '#27272A' : 'white'}, ${colors.bg.card === 'bg-zinc-800' ? '#27272A' : 'white'}) padding-box,
              linear-gradient(135deg, ${suggestion.bColor1} 0%, transparent 50%) border-box
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `
              linear-gradient(${colors.bg.card === 'bg-zinc-800' ? '#27272A' : 'white'}, ${colors.bg.card === 'bg-zinc-800' ? '#27272A' : 'white'}) padding-box,
              linear-gradient(135deg, ${suggestion.bColor} 0%, transparent 50%) border-box
            `;
          }}
        >
          <p className={`${colors.text.tertiary} text-sm sm:text-sm lg:text-base leading-relaxed flex-1 font-normal`}>
            {suggestion.text}
          </p>
                   
          <div
            className={`absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center ${colors.bg.secondary} rounded-tl-lg lg:rounded-tl-xl`}
            style={{
              background: `
                linear-gradient(${colors.bg.secondary === 'bg-zinc-900' ? '#18181B' : '#f3f4f6'}, ${colors.bg.secondary === 'bg-zinc-900' ? '#18181B' : '#f3f4f6'}) padding-box,
                linear-gradient(135deg, ${suggestion.bColor} 0%, transparent 50%) border-box
              `,
              border: "0.5px solid transparent",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <div className={`absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center ${colors.bg.tertiary} ${colors.border.primary} border hover:scale-110 transition-transform`}>
              <div className={`w-5 h-5 sm:w-6 sm:h-6 ${suggestion.bgColor} rounded-md flex items-center justify-center`}>
                {suggestion.icon}
              </div>
            </div>
          </div>
        </button>
      ))}
      
      <style jsx>{`
        @keyframes slideUpFromBottom {
          from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9);
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
            transform: translateY(-50px) scale(0.9);
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

export default SuggestionCards;