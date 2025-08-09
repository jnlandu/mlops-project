/**
 * Main chat page - refactored with proper organization
 */

'use client';

import React, { useState } from 'react';
import { useAuth } from '../src/hooks/useAuth';
import { useChat } from '../src/hooks/useChat';
import { useSpeech } from '../src/hooks/useSpeech';
import { ChatService } from '../src/services/chatService';
import { FileService } from '../src/services/fileService';

// Components
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import ChatContainer from '../src/components/chat/ChatContainer';
import ChatInput from '../src/components/chat/ChatInput';
import { AlertModal } from '../src/components/ui/Modal';

// Utils
import { APP_CONFIG, ERROR_MESSAGES } from '../src/utils/config';

const HomePage = () => {
  const { user } = useAuth();
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    isLoading,
    error: chatError,
    sendMessage,
    clearMessages,
    endOfMessagesRef,
  } = useChat();

  const { speak, isSpeaking, stopSpeaking } = useSpeech();

  // UI state
  const [notification, setNotification] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle sending messages
  const handleSendMessage = async (message = currentMessage) => {
    if (!message.trim()) return;

    try {
      await sendMessage(message);
    } catch (error) {
      showError(error.message);
    }
  };

  // Handle file upload and summarization
  const handleFileUpload = async (file) => {
    try {
      setNotification('Processing file...');
      
      const result = await ChatService.summarizeFile(file);
      
      // Add file summary as a chat message
      const summaryMessage = `📄 **File Summary for "${result.filename}"**\n\n${result.summary}\n\n*Original: ${result.original_length} words → Summary: ${result.summary_length} words*`;
      
      await sendMessage(`Summarize this file: ${file.name}`, summaryMessage);
      
      setNotification('File processed successfully!');
      setTimeout(() => setNotification(''), 3000);
      
    } catch (error) {
      showError(`File processing failed: ${error.message}`);
    }
  };

  // Handle text-to-speech
  const handleSpeak = (text) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  // Handle message actions
  const handleCopyNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  const handleLike = (message) => {
    // TODO: Implement message rating
    console.log('Liked message:', message.id);
  };

  const handleDislike = (message) => {
    // TODO: Implement message rating
    console.log('Disliked message:', message.id);
  };

  const handleRegenerate = async (message) => {
    // Find the user message that prompted this response
    const messageIndex = messages.findIndex(m => m.id === message.id);
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1];
      if (userMessage.sender === 'user') {
        try {
          await sendMessage(userMessage.text);
        } catch (error) {
          showError(error.message);
        }
      }
    }
  };

  // Error handling
  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  return (
    <ProtectedRoute>
      <div className="d-flex flex-column vh-100">
        {/* Header */}
        <Header />

        {/* Welcome Section */}
        <div className="welcome-container">
          <Welcome
            textHeader="Start chatting or summarizing your texts with OkapiChat!"
            textBody="A text summarization and conversational application built with React, Next.js, and FastAPI."
          />
        </div>

        {/* Notification Bar */}
        {notification && (
          <div className="alert alert-info alert-dismissible mx-3 mb-0" role="alert">
            {notification}
            <button
              type="button"
              className="btn-close"
              onClick={() => setNotification('')}
              aria-label="Close"
            />
          </div>
        )}

        {/* Chat Error Display */}
        {chatError && (
          <div className="alert alert-danger mx-3 mb-0" role="alert">
            {chatError}
          </div>
        )}

        {/* Main Chat Area */}
        <div className="container-fluid flex-grow-1 d-flex flex-column">
          <div className="row flex-grow-1">
            <div className="col-12 col-lg-8 mx-auto d-flex flex-column">
              
              {/* Chat Messages */}
              <ChatContainer
                messages={messages}
                isLoading={isLoading}
                onSpeak={handleSpeak}
                onCopy={handleCopyNotification}
                onLike={handleLike}
                onDislike={handleDislike}
                onRegenerate={handleRegenerate}
                endOfMessagesRef={endOfMessagesRef}
                className={messages.length > 0 ? 'border rounded-3 bg-white' : ''}
              />

              {/* Input Area */}
              <div className="mt-auto">
                <div className="mb-2 text-center">
                  <small className="text-muted">
                    Ask a question. Type or speak it.
                  </small>
                </div>
                
                <ChatInput
                  value={currentMessage}
                  onChange={setCurrentMessage}
                  onSend={handleSendMessage}
                  onFileUpload={handleFileUpload}
                  disabled={isLoading}
                  placeholder="Type your message here..."
                />
                
                {/* Footer */}
                <div className="text-center mt-2">
                  <small className="text-muted">
                    OkapiChat can make mistakes.
                    <br />
                    This is a test application. We are working on improving it. Your feedback is{' '}
                    <a
                      href="mailto:jnlandu00@gmail.com"
                      className="text-decoration-none"
                    >
                      welcome
                    </a>
                    .
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Modal */}
        <AlertModal
          isOpen={showErrorModal}
          onClose={closeErrorModal}
          title="Error"
          message={errorMessage}
          variant="danger"
        />
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
