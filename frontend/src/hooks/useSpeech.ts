/**
 * Speech recognition and synthesis hook
 */

import { useState, useRef, useEffect } from 'react';
import { UI_CONFIG, ERROR_MESSAGES } from '../utils/config';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

interface UseSpeechReturn {
  isRecording: boolean;
  isSpeaking: boolean;
  transcript: string;
  error: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  speak: (text: string, options?: SpeechOptions) => void;
  stopSpeaking: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  clearTranscript: () => void;
  clearError: () => void;
}

export const useSpeech = (): UseSpeechReturn => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    }

    // Cleanup on unmount
    return () => {
      stopRecording();
      stopSpeaking();
    };
  }, []);

  const startRecording = (): void => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError(ERROR_MESSAGES.SPEECH_NOT_SUPPORTED);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = UI_CONFIG.SPEECH.LANG;

    recognition.onstart = () => {
      setIsRecording(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const result = event.results[0][0];
      setTranscript(result.transcript);
    };

    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const stopRecording = (): void => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const speak = (text: string, options: SpeechOptions = {}): void => {
    if (!speechSynthRef.current) {
      setError('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options with defaults
    utterance.rate = options.rate ?? UI_CONFIG.SPEECH.RATE;
    utterance.pitch = options.pitch ?? UI_CONFIG.SPEECH.PITCH;
    utterance.volume = options.volume ?? UI_CONFIG.SPEECH.VOLUME;
    
    if (options.voice) {
      utterance.voice = options.voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      setError(`Speech synthesis error: ${event.error}`);
      setIsSpeaking(false);
    };

    speechSynthRef.current.speak(utterance);
  };

  const stopSpeaking = (): void => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  const getVoices = (): SpeechSynthesisVoice[] => {
    if (!speechSynthRef.current) return [];
    return speechSynthRef.current.getVoices();
  };

  const clearTranscript = (): void => {
    setTranscript('');
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    isRecording,
    isSpeaking,
    transcript,
    error,
    startRecording,
    stopRecording,
    speak,
    stopSpeaking,
    getVoices,
    clearTranscript,
    clearError,
  };
};
