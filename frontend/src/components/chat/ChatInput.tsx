/**
 * Chat input component with voice and file upload
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { FileService } from '../../services/fileService';
import { useSpeech } from '../../hooks/useSpeech';
import { APP_CONFIG } from '../../utils/config';
import {
  IoMdSend,
  IoMdMic,
  IoMdMicOff,
  GrFormAttachment,
  IoCameraOutline,
} from 'react-icons/io';

const ChatInput = ({
  value,
  onChange,
  onSend,
  onFileUpload,
  disabled = false,
  placeholder = "Type your message here...",
}) => {
  const router = useRouter();
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  
  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    clearTranscript,
    error: speechError,
  } = useSpeech();

  // Handle transcript from speech recognition
  React.useEffect(() => {
    if (transcript) {
      onChange(transcript);
      clearTranscript();
    }
  }, [transcript, onChange, clearTranscript]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (value.trim() && onSend) {
      onSend(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      FileService.handleFileInput(e, (file, error) => {
        if (error) {
          alert(error);
          return;
        }
        onFileUpload(file);
      });
    }
    
    // Reset file input
    setFileInputKey(Date.now());
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="chat-input-container">
      {/* Error display */}
      {speechError && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {speechError}
          <button
            type="button"
            className="btn-close"
            onClick={() => clearError()}
            aria-label="Close"
          />
        </div>
      )}

      {/* Input area */}
      <div className="d-flex align-items-end gap-2 p-3 bg-white border-top">
        {/* Voice input button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleVoiceToggle}
          disabled={disabled}
          className={`voice-btn ${isRecording ? 'recording' : ''}`}
          title={isRecording ? "Stop recording" : "Start voice input"}
        >
          {isRecording ? (
            <IoMdMic size={20} className="text-danger" />
          ) : (
            <IoMdMicOff size={20} />
          )}
        </Button>

        {/* Text input */}
        <div className="flex-grow-1">
          <Textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={APP_CONFIG.MAX_MESSAGE_LENGTH}
            rows={1}
            onKeyPress={handleKeyPress}
            className="border-0 shadow-none resize-none"
          />
        </div>

        {/* Vision/Camera button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/vision')}
          disabled={disabled}
          title="Open camera for image analysis"
        >
          <IoCameraOutline size={20} />
        </Button>

        {/* File upload button */}
        <div className="position-relative">
          <input
            key={fileInputKey}
            type="file"
            id="file-upload"
            className="d-none"
            onChange={handleFileChange}
            accept=".txt,.pdf,.png,.jpg,.jpeg"
            disabled={disabled}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={disabled}
            title="Upload file for summarization"
          >
            <GrFormAttachment size={20} />
          </Button>
        </div>

        {/* Send button */}
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          title="Send message"
        >
          <IoMdSend size={18} />
        </Button>
      </div>

      {/* Recording indicator */}
      {isRecording && (
        <div className="text-center py-2 bg-light border-top">
          <small className="text-danger">
            🎤 Recording... Click the microphone to stop
          </small>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
