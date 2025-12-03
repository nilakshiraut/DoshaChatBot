import React from 'react';
import botLogo from '../assets/bot_logo.png';

const MessageBubble = ({ message, onOptionSelect }) => {
  const isBot = message.sender === 'bot';
  const isQuestion = message.isQuestion && message.options;

  const handleOptionClick = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  return (
    <div className={`message ${isBot ? '' : 'message-user'}`}>
      <div className="message-avatar">
        {isBot ? (
          <img
            src={botLogo}
            alt="Bot Avatar"
            style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
          </svg>
        )}
      </div>
      <div className="message-content">
        <div className={`message-bubble ${isBot ? 'bubble-bot' : 'bubble-user'}`}>
          <p>{message.text}</p>
          {isQuestion && (
            <div className="message-options">
              {message.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        {message.timestamp && (
          <span className="message-time">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;