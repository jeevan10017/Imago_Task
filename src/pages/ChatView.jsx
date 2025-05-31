import { useTheme } from "../ThemeContext";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

const ChatView = ({ 
  showChat, 
  currentQuestion, 
  currentChatData,
  onBackToDashboard,
  message,
  setMessage,
  onSubmit,
  attachedFile,
  onFileAttach,
  onRemoveFile,
  showSuggestions,
  onInputFocus,
  onInputBlur,
  onSuggestionClick
}) => {
  const { colors } = useTheme();

  return (
    <div 
      className={`absolute inset-0 ${colors.bg.secondary} rounded-xl sm:rounded-2xl lg:rounded-3xl ${colors.border.primary} border p-3 sm:p-6 lg:p-8 flex flex-col transition-transform duration-700 ease-out ${
        showChat ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <ChatMessage 
        question={currentQuestion}
        chatData={currentChatData} 
        onBackToDashboard={onBackToDashboard}
      />
      
      <ChatInput
        message={message}
        setMessage={setMessage}
        onSubmit={onSubmit}
        placeholder="Ask anything from here"
        attachedFile={attachedFile}
        onFileAttach={onFileAttach}
        onRemoveFile={onRemoveFile}
        showSuggestions={showSuggestions}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
        onSuggestionClick={onSuggestionClick}
      />
    </div>
  );
};

export default ChatView;