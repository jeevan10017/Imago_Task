import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import ChatHistoryMessage from "../components/ChatHistoryMessage";

const ChatHistoryView = ({ 
  showHistory, 
  onBackToDashboard,
  onChatSelect
}) => {
  const { colors } = useTheme();
  const [expandedChatId, setExpandedChatId] = useState(1); // First chat expanded by default

  const chatHistory = [
    {
      id: 1,
      question: "What is UI/UX Design?",
      timestamp: "2 hours ago",
      preview: "UI/UX stands for User Interface (UI) and User Experience (UX), two essential aspects of designing digital products...",
      fullContent: {
        text: "UI/UX stands for User Interface (UI) and User Experience (UX), two essential aspects of designing digital products such as websites, mobile apps, and software.",
        points: [
          {
            title: "UI (User Interface)",
            description: "design is about crafting the visual elements of a digital product, such as buttons, icons, typography, colours, and layout. The goal of UI is to create an appealing, cohesive look and feel that makes it easy for users to navigate and interact with the product."
          },
          {
            title: "UX (User Experience)",
            description: "design focuses on the overall experience a user has when interacting with a product. It involves researching user needs and behaviours to ensure the product is intuitive, accessible, and enjoyable to use. UX design considers the flow, structure, and functionality of the product to create a smooth and satisfying user journey."
          }
        ],
        summary: "Together, UI/UX design ensures a product is not only visually attractive but also functional and user-friendly, leading to an engaging and effective experience for users."
      }
    },
    {
      id: 2,
      question: "How to create effective wireframes?",
      timestamp: "1 day ago",
      preview: "Wireframing is a crucial step in the design process that helps you plan the structure and layout...",
      fullContent: {
        text: "Wireframing is a crucial step in the design process that helps you plan the structure and layout of your digital product before diving into visual design and development.",
        points: [
          {
            title: "Start with Low-Fidelity Sketches",
            description: "Begin with simple pen-and-paper sketches or basic digital wireframes. Focus on layout, content hierarchy, and user flow without getting distracted by colors, fonts, or detailed graphics."
          },
          {
            title: "Define Clear Content Hierarchy",
            description: "Organize information based on importance and user needs. Use different sizes, spacing, and positioning to guide the user's eye through the interface logically."
          },
          {
            title: "Consider User Journey",
            description: "Map out how users will navigate through your product. Ensure that wireframes support the natural flow of user actions and make it easy to complete key tasks."
          }
        ],
        summary: "Effective wireframes serve as a blueprint for your design, helping you identify potential usability issues early and communicate your vision clearly to stakeholders and developers."
      }
    },
    {
      id: 3,
      question: "Best practices for mobile app design",
      timestamp: "3 days ago",
      preview: "Mobile app design requires careful consideration of user behavior, screen constraints, and touch interactions...",
      fullContent: {
        text: "Mobile app design requires careful consideration of user behavior, screen constraints, and touch interactions to create an optimal user experience on smaller devices.",
        points: [
          {
            title: "Touch-Friendly Interface Design",
            description: "Design buttons and interactive elements with adequate size (minimum 44px) and spacing to prevent accidental taps. Consider thumb reach zones and one-handed usage patterns."
          },
          {
            title: "Optimize for Performance",
            description: "Minimize loading times, optimize images, and reduce the number of steps required to complete tasks. Users expect fast, responsive interactions on mobile devices."
          },
          {
            title: "Prioritize Content",
            description: "With limited screen space, focus on essential content and features. Use progressive disclosure to reveal additional information when needed without overwhelming the user."
          }
        ],
        summary: "Successful mobile app design balances functionality with simplicity, ensuring users can accomplish their goals quickly and efficiently while enjoying a smooth, intuitive experience."
      }
    },
    {
      id: 4,
      question: "Color theory in web design",
      timestamp: "1 week ago",
      preview: "Understanding color psychology and how different colors affect user emotions and behavior is essential...",
      fullContent: {
        text: "Understanding color psychology and how different colors affect user emotions and behavior is essential for creating effective and engaging web designs.",
        points: [
          {
            title: "Color Psychology Basics",
            description: "Different colors evoke different emotional responses. Blue conveys trust and professionalism, red creates urgency and excitement, green represents growth and nature, while neutral colors provide balance and sophistication."
          },
          {
            title: "Create Visual Hierarchy",
            description: "Use color contrast and saturation to guide user attention to important elements like call-to-action buttons, headings, and key information. High contrast improves readability and accessibility."
          },
          {
            title: "Maintain Brand Consistency",
            description: "Develop a cohesive color palette that aligns with your brand identity and use it consistently across all design elements. This helps build brand recognition and creates a unified user experience."
          }
        ],
        summary: "Effective use of color in web design not only enhances visual appeal but also improves usability, guides user behavior, and strengthens brand identity."
      }
    }
  ];

  const handleChatToggle = (chatId) => {
    setExpandedChatId(expandedChatId === chatId ? null : chatId);
  };

  return (
    <div 
      className={`absolute inset-0 ${colors.bg.secondary} rounded-xl sm:rounded-2xl lg:rounded-3xl ${colors.border.primary} border p-3 sm:p-6 lg:p-8 flex flex-col transition-transform duration-700 ease-out ${
        showHistory ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8 relative z-10">
        <button 
          onClick={onBackToDashboard}
          className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 ${colors.bg.tertiary} rounded-lg sm:rounded-xl shadow-sm ${colors.border.primary} border flex items-center justify-center ${colors.button.icon} hover:opacity-80 transition-opacity duration-200 flex-shrink-0`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
        
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${colors.text.primary}`}>
          Chat History
        </h1>
        
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"></div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide space-y-3 sm:space-y-4 pr-2">
          {chatHistory.map((chat) => (
            <ChatHistoryMessage
              key={chat.id}
              chat={chat}
              isExpanded={expandedChatId === chat.id}
              onChatToggle={handleChatToggle}
              onChatSelect={onChatSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryView;