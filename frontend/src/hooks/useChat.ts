/**
 * Chat functionality hook
 */

import { useState, useRef, useEffect, RefObject } from 'react';
import { ChatService } from '../services/chatService';
import { generateId } from '../utils/helpers';
import { APP_CONFIG, UI_CONFIG, ERROR_MESSAGES } from '../utils/config';
import { ChatMessage } from '../types';

interface UseChatReturn {
  messages: ChatMessage[];
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
  sendMessage: (message?: string) => Promise<ChatMessage | void>;
  clearMessages: () => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, newText: string) => void;
  endOfMessagesRef: RefObject<HTMLDivElement>;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ 
        behavior: UI_CONFIG.ANIMATIONS.SCROLL_BEHAVIOR 
      });
    }
  }, [messages]);

  const sendMessage = async (message: string = currentMessage): Promise<ChatMessage | void> => {
    if (!message.trim()) return;

    // Validate message length
    if (message.length > APP_CONFIG.MAX_MESSAGE_LENGTH) {
      setError(ERROR_MESSAGES.MESSAGE_TOO_LONG);
      return;
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await ChatService.sendMessage(message);
      
      const botMessage: ChatMessage = {
        id: generateId(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
      
      return botMessage;
    } catch (error: any) {
      setError(error.message);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: generateId(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = (): void => {
    setMessages([]);
    setError(null);
  };

  const deleteMessage = (messageId: string): void => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const editMessage = (messageId: string, newText: string): void => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, text: newText } : msg
      )
    );
  };

  return {
    messages,
    currentMessage,
    setCurrentMessage,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    deleteMessage,
    editMessage,
    endOfMessagesRef,
  };
};
