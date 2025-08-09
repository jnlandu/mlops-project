/**
 * Chat message component
 */

import React from 'react';
import Image from 'next/image';
import { formatDate, copyToClipboard } from '../../utils/helpers';
import { 
  RiFileCopyLine, 
  AiOutlineSound,
  RiThumbUpLine,
  RiThumbDownLine,
  LuRefreshCcw 
} from 'react-icons/ri';

const ChatMessage = ({
  message,
  onSpeak,
  onCopy,
  onLike,
  onDislike,
  onRegenerate,
  isLast = false,
  showActions = true,
}) => {
  const { text, sender, timestamp, isError = false } = message;

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (onCopy) {
      onCopy(success);
    }
  };

  const handleSpeak = () => {
    if (onSpeak) {
      onSpeak(text);
    }
  };

  return (
    <div className={`d-flex ${sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
      {/* Avatar */}
      <div className={`${sender === 'bot' ? 'me-2 mt-2' : 'text-justify mt-1'}`}>
        {sender === 'bot' ? (
          <Image
            src="/assets/images/okapi.jpg"
            alt="AI Assistant"
            width={32}
            height={32}
            className="rounded-circle"
          />
        ) : (
          <Image
            src="/assets/icons/user.svg"
            alt="User"
            width={32}
            height={32}
            className="rounded-circle"
          />
        )}
      </div>

      {/* Message Content */}
      <div className={`${sender === 'user' ? 'user-message ms-2' : 'bot-message'} me-1 mt-1`}>
        <div 
          className={`
            message-bubble p-3 rounded-3 
            ${sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}
            ${isError ? 'border border-danger' : ''}
          `}
        >
          <p className="mb-0 message-text">
            {text}
          </p>
          
          {timestamp && (
            <small className={`d-block mt-1 ${sender === 'user' ? 'text-white-50' : 'text-muted'}`}>
              {formatDate(timestamp)}
            </small>
          )}
        </div>

        {/* Message Actions (for bot messages) */}
        {sender === 'bot' && showActions && isLast && (
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCopy}
                title="Copy message"
              >
                <RiFileCopyLine size={16} />
              </button>
              
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleSpeak}
                title="Read aloud"
              >
                <AiOutlineSound size={16} />
              </button>
              
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onLike && onLike(message)}
                title="Like"
              >
                <RiThumbUpLine size={16} />
              </button>
              
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onDislike && onDislike(message)}
                title="Dislike"
              >
                <RiThumbDownLine size={16} />
              </button>
              
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onRegenerate && onRegenerate(message)}
                title="Regenerate response"
              >
                <LuRefreshCcw size={16} />
              </button>
            </div>
            
            <small className="text-muted">
              {text.length} characters
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
