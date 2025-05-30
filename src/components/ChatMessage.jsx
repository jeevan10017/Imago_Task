import React,{useState} from "react";
import { Edit, ArrowUp } from "lucide-react";
import { useTheme } from "../ThemeContext";
import ChatToolbox from "./ChatToolbox";

const ChatMessage = ({ question, onBackToDashboard }) => {
  const { colors } = useTheme();
  const [showChart, setShowChart] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const chatAnswer = {
    text: "Based on your quarterly sales data, I've analyzed the trends and created a comprehensive visualization. Here's what the data reveals:",
    points: [
      {
        title: "Q4 Performance",
        description: "showed the strongest growth with a 23% increase compared to Q3, driven primarily by holiday season sales and new product launches."
      },
      {
        title: "Regional Analysis",
        description: "indicates that the North American market contributed 45% of total revenue, while European markets showed consistent 8% quarter-over-quarter growth."
      }
    ],
    summary: "The data suggests a positive trajectory with opportunities for expansion in emerging markets and continued focus on seasonal campaigns."
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="flex justify-between items-start mb-3 sm:mb-4 lg:mb-6 relative z-10">
        <button 
          onClick={onBackToDashboard}
          className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 ${colors.bg.tertiary} rounded-lg sm:rounded-xl shadow-sm ${colors.border.primary} border flex items-center justify-center ${colors.button.icon} hover:opacity-80 transition-opacity duration-200 flex-shrink-0`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
        
        <div className={`flex items-start gap-2 sm:gap-3 flex-1 ml-2 sm:ml-3 justify-end`}>
          <button className={`${colors.text.muted} hover:${colors.text.secondary} transition-colors duration-200 ${colors.bg.tertiary} rounded-xl sm:rounded-2xl px-2 py-2 sm:px-3 sm:py-3 shadow-sm ${colors.border.primary} border flex-shrink-0 self-start`}>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <div className={`${colors.bg.tertiary} rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 shadow-sm ${colors.border.primary} border flex items-start gap-2 sm:gap-3 w-fit max-w-md min-w-0`}>
            <img 
              src="./mc.png"
              alt="User logo"
              className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${colors.border.secondary} border rounded-md sm:rounded-lg p-0 shadow-sm flex-shrink-0 mt-0`}
            />
            <div className={`${colors.text.primary} font-medium text-sm sm:text-base min-w-0 flex-1`}>
              <div className="whitespace-normal break-words leading-relaxed">
                {question}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex gap-3 sm:gap-4 lg:gap-8 min-h-0 overflow-hidden">
        <div className={`flex-1 ${colors.bg.tertiary} rounded-xl sm:rounded-2xl shadow-sm ${colors.border.primary} border overflow-hidden flex flex-col`}>
          <div className={`sticky top-0 ${colors.bg.tertiary} p-3 sm:p-4 lg:p-6 pb-0 z-10`}>
           <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
  <img 
    src="./logo.png"
    alt="User logo"
    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${colors.border.secondary}  flex-shrink-0 mt-0`}
  />
  <h2 className={`text-base sm:text-lg font-semibold ${colors.text.primary}`}>Imago AI</h2>
</div>

            <hr className={`border-t ${colors.border.secondary}`} />
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4 lg:p-6 pt-3 sm:pt-4 lg:pt-4 pb-8 lg:pb-6">
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <p className={`${colors.text.secondary} leading-relaxed text-sm sm:text-base`}>
                {chatAnswer.text}
              </p>

              <div className={`${colors.bg.input} rounded-xl p-4 ${colors.border.primary} border`}>
                {showChart ? (
                  <div className="space-y-4">
                    <h3 className={`font-semibold ${colors.text.primary} text-sm`}>Quarterly Sales Performance</h3>
                    <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-end justify-around p-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-blue-500 rounded-t" style={{height: '60px'}}></div>
                        <span className={`text-xs ${colors.text.muted} mt-2`}>Q1</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-green-500 rounded-t" style={{height: '80px'}}></div>
                        <span className={`text-xs ${colors.text.muted} mt-2`}>Q2</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-yellow-500 rounded-t" style={{height: '70px'}}></div>
                        <span className={`text-xs ${colors.text.muted} mt-2`}>Q3</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-purple-500 rounded-t" style={{height: '100px'}}></div>
                        <span className={`text-xs ${colors.text.muted} mt-2`}>Q4</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>

              {/* Answer Points */}
              <div className="space-y-3 sm:space-y-4">
                {chatAnswer.points.map((point, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0`}></div>
                    <div className="text-sm sm:text-base">
                      <span className={`font-semibold ${colors.text.primary}`}>{point.title}</span>
                      <span className={`${colors.text.secondary}`}> {point.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={`${colors.text.secondary} leading-relaxed text-sm sm:text-base`}>
                {chatAnswer.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                <button className={`px-3 py-2 ${colors.bg.accent} text-white rounded-lg text-sm hover:opacity-90 transition-opacity duration-200 flex items-center gap-2`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Your Reports
                </button>
                <button className={`px-3 py-2 ${colors.bg.tertiary} ${colors.border.primary} border rounded-lg text-sm ${colors.text.primary} hover:opacity-80 transition-opacity duration-200 flex items-center gap-2`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
                <button className={`px-3 py-2 ${colors.bg.tertiary} ${colors.border.primary} border rounded-lg text-sm ${colors.text.primary} hover:opacity-80 transition-opacity duration-200 flex items-center gap-2`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  More Sources
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbox - Right side center for large screens */}
        <div className="hidden lg:flex lg:items-center">
          <ChatToolbox />
        </div>
      </div>
      
      {/* Mobile Toolbox */}
      <div className="flex lg:hidden justify-start mt-3 mb-3">
        <ChatToolbox />
      </div>
    </div>
  );
};


export default ChatMessage;