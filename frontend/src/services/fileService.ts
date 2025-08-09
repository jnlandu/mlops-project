/**
 * File processing service
 */

import { validateFile } from '../utils/helpers';
import { ERROR_MESSAGES } from '../utils/config';

interface FilePreview {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  fileType: 'image' | 'document' | 'unknown';
}

type FileCallback = (file: File | null, error: string | null) => void;

export class FileService {
  /**
   * Read file content as text
   */
  static readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const validation = validateFile(file);
      if (!validation.isValid) {
        reject(new Error(validation.errors.join(', ')));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to read file as text'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  /**
   * Read file content as data URL (for images)
   */
  static readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const validation = validateFile(file);
      if (!validation.isValid) {
        reject(new Error(validation.errors.join(', ')));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to read file as data URL'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  /**
   * Get file type from file name
   */
  static getFileType(fileName: string): 'image' | 'document' | 'unknown' {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const imageTypes = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
    const documentTypes = ['pdf', 'txt', 'doc', 'docx'];
    
    if (extension && imageTypes.includes(extension)) {
      return 'image';
    }
    
    if (extension && documentTypes.includes(extension)) {
      return 'document';
    }
    
    return 'unknown';
  }

  /**
   * Create file preview object
   */
  static createFilePreview(file: File): FilePreview {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      fileType: this.getFileType(file.name),
    };
  }

  /**
   * Handle file drop event
   */
  static handleFileDrop(event: DragEvent, callback: FileCallback): void {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length === 0) return;

    const file = files[0]; // Take only the first file
    if (!file) {
      callback(null, 'No file selected');
      return;
    }
    
    const validation = validateFile(file);
    if (!validation.isValid) {
      callback(null, validation.errors.join(', '));
      return;
    }

    callback(file, null);
  }

  /**
   * Handle file input change
   */
  static handleFileInput(event: Event, callback: FileCallback): void {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target?.files || []);
    if (files.length === 0) return;

    const file = files[0]; // Take only the first file
    if (!file) {
      callback(null, 'No file selected');
      return;
    }
    
    const validation = validateFile(file);
    if (!validation.isValid) {
      callback(null, validation.errors.join(', '));
      return;
    }

    callback(file, null);
  }

  /**
   * Download text as file
   */
  static downloadAsFile(
    content: string, 
    filename: string, 
    mimeType: string = 'text/plain'
  ): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}
