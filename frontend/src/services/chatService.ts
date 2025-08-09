/**
 * AI and Chat service
 */

import apiClient, { handleApiError, createFormData } from '../utils/api';
import { API_CONFIG } from '../utils/config';
import { 
  ChatRequest, 
  ChatResponse, 
  SummarizationRequest, 
  SummarizationResponse,
  FileSummarizationResponse,
  ChatMessage 
} from '../types';

interface SummarizationOptions {
  maxLength?: number;
  minLength?: number;
}

export class ChatService {
  /**
   * Send chat message to AI
   */
  static async sendMessage(content: string): Promise<ChatResponse> {
    try {
      const response = await apiClient.post<ChatResponse>(API_CONFIG.ENDPOINTS.CHAT, {
        content,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Summarize text
   */
  static async summarizeText(
    text: string, 
    options: SummarizationOptions = {}
  ): Promise<SummarizationResponse> {
    try {
      const { maxLength, minLength } = options;
      
      const response = await apiClient.post<SummarizationResponse>(
        API_CONFIG.ENDPOINTS.SUMMARIZE, 
        {
          text,
          max_length: maxLength,
          min_length: minLength,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Summarize uploaded file
   */
  static async summarizeFile(
    file: File, 
    options: SummarizationOptions = {}
  ): Promise<FileSummarizationResponse> {
    try {
      const { maxLength = 150, minLength = 30 } = options;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('max_length', maxLength.toString());
      formData.append('min_length', minLength.toString());

      const response = await apiClient.post<FileSummarizationResponse>(
        API_CONFIG.ENDPOINTS.SUMMARIZE_FILE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Get chat history (if implemented in backend)
   */
  static async getChatHistory(
    limit: number = 50, 
    offset: number = 0
  ): Promise<ChatMessage[]> {
    try {
      const response = await apiClient.get<ChatMessage[]>('/api/chat/history', {
        params: { limit, offset },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  }
}
