import React from "react";
import { Plus, Home, History, Compass, Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeContext";

const Sidebar = ({ onBackToDashboard }) => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <div className={`
      w-12 sm:w-16 lg:w-16 
      h-full max-h-screen
      ${colors.bg.secondary} 
      rounded-xl sm:rounded-2xl lg:rounded-3xl 
      ${colors.border.primary} border 
      flex flex-col items-center justify-between 
      py-2 px-1 sm:py-3 sm:px-2 lg:py-6 lg:px-2
      overflow-hidden shadow-sm
      flex-shrink-0
    `}>
      

      <div className="flex flex-col items-center space-y-2 sm:space-y-2.5 lg:space-y-3">
        <img
          src="./logo.png"
          alt="Logo"
          className={`
            w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8
            ${colors.border.secondary} 
            rounded-md sm:rounded-md lg:rounded-lg 
            shadow-sm
          `}
        />
        
        {/* New Chat Button */}
        <button 
          onClick={onBackToDashboard} 
          className="
            w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9
            bg-blue-500 rounded-md sm:rounded-lg 
            flex items-center justify-center 
            text-white hover:bg-blue-600 
            transition-colors duration-200
            active:scale-95
          "
        >
          <Plus size={12} className="sm:w-16 sm:h-16 lg:w-5 lg:h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center space-y-1.5 sm:space-y-2 lg:space-y-3">
        <button className={`
          w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9
          rounded-md sm:rounded-lg flex items-center justify-center 
          ${colors.button.icon} ${colors.hover.bg} 
          transition-colors duration-200
          active:scale-95
        `}>
          <Home size={16} className="sm:w-16 sm:h-16 lg:w-5 lg:h-5" />
        </button>
        
        <button className={`
          w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9
          rounded-md sm:rounded-lg flex items-center justify-center 
          ${colors.button.iconnonactive} ${colors.hover.bg} 
          transition-colors duration-200
          active:scale-95
        `}>
          <History size={16} className="sm:w-16 sm:h-16 lg:w-5 lg:h-5" />
        </button>
        
        <button className={`
          w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9
          rounded-md sm:rounded-lg flex items-center justify-center 
          ${colors.button.iconnonactive} ${colors.hover.bg} 
          transition-colors duration-200
          active:scale-95
        `}>
          <Compass size={16} className="sm:w-16 sm:h-16 lg:w-5 lg:h-5" />
        </button>
      </div>


      <button
        onClick={toggleTheme}
        className={`
          w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9
          rounded-md sm:rounded-lg flex items-center justify-center 
          ${colors.button.icon} ${colors.hover.bg} 
          transition-colors duration-200
          active:scale-95
        `}
      >
        {isDarkMode ? (
          <Sun size={16} className="sm:w-16 sm:h-16 lg:w-5 lg:h-5" />
        ) : (
          <Moon size={16} className="sm:w-16 sm:h-16 lg:w-5 lg:h-5" />
        )}
      </button>


      <div className="flex items-center justify-center">
        <img
          src="./mc.png"
          alt="User avatar"
          className={`
            w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9
            ${colors.border.secondary} border 
            rounded-md sm:rounded-lg shadow-sm
            hover:scale-105 transition-transform duration-200
          `}
        />
      </div>
    </div>
  );
};

export default Sidebar;