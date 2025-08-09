/**
 * Chat container component
 */

import React from 'react';
import ChatMessage from './ChatMessage';
import LoadingSpinner from '../ui/LoadingSpinner';

const ChatContainer = ({
  messages = [],
  isLoading = false,
  onSpeak,
  onCopy,
  onLike,
  onDislike,
  onRegenerate,
  endOfMessagesRef,
  className = '',
}) => {
  const containerClasses = [
    'chat-container',
    'flex-grow-1',
    'overflow-auto',
    'px-3',
    'py-2',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleCopy = (success) => {
    if (onCopy) {
      onCopy(success ? 'Message copied!' : 'Failed to copy message');
    }
  };

  return (
    <div className={containerClasses}>
      {messages.length === 0 && !isLoading ? (
        <div className="text-center text-muted py-5">
          <h5>Welcome to OkapiChat!</h5>
          <p>Start a conversation by typing a message or uploading a file to summarize.</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id || index}
              message={message}
              onSpeak={onSpeak}
              onCopy={handleCopy}
              onLike={onLike}
              onDislike={onDislike}
              onRegenerate={onRegenerate}
              isLast={index === messages.length - 1}
              showActions={true}
            />
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="d-flex justify-content-start mb-3">
              <div className="me-2 mt-2">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LoadingSpinner size="sm" />
                </div>
              </div>
              <div className="bg-light p-3 rounded-3">
                <LoadingSpinner text="AI is thinking..." size="sm" />
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Scroll anchor */}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatContainer;
