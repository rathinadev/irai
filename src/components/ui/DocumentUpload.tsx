'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import styles from './DocumentUpload.module.css';

interface DocumentUploadProps {
  onUploadComplete?: (fileInfo: any) => void;
}

export function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUploadAndAnalysis = (name: string) => {
    setFileName(name);
    setStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setStatus('analyzing');
          
          // Simulate AI analysis delay
          setTimeout(() => {
            setStatus('success');
            if (onUploadComplete) {
              onUploadComplete({
                fileName: name,
                documentType: 'blood_test',
                aiSummary: 'AI Analysis Complete: Routine findings. No critical alerts detected.',
              });
            }
            
            // Reset after 3 seconds
            setTimeout(() => {
              setStatus('idle');
              setProgress(0);
              setFileName('');
            }, 3000);
            
          }, 2500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      simulateUploadAndAnalysis(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      simulateUploadAndAnalysis(file.name);
    }
  };

  return (
    <Card className={styles.uploadCard} padding="lg">
      <div className={styles.header}>
        <h3>AI Document Analysis</h3>
        <p className={styles.subtitle}>Upload medical reports, prescriptions, or diet charts for automated insights.</p>
      </div>

      {status === 'idle' && (
        <div 
          className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className={styles.hiddenInput}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <div className={styles.iconCircle}>
            <UploadCloud size={32} className={styles.uploadIcon} />
          </div>
          <p className={styles.dropText}>
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p className={styles.supportedText}>PDF, JPG, PNG (max. 10MB)</p>
        </div>
      )}

      {(status === 'uploading' || status === 'analyzing') && (
        <div className={styles.processingZone}>
          <div className={styles.fileInfo}>
            <File size={24} className={styles.fileIcon} />
            <span className={styles.fileName}>{fileName}</span>
          </div>
          
          {status === 'uploading' ? (
            <>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className={styles.statusText}>Uploading document... {progress}%</p>
            </>
          ) : (
            <div className={styles.analyzingState}>
              <Loader2 size={24} className={styles.spinner} />
              <p className={styles.statusText}>IRAI AI is analyzing your document...</p>
            </div>
          )}
        </div>
      )}

      {status === 'success' && (
        <div className={styles.successZone}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h4>Analysis Complete</h4>
          <p className={styles.statusText}>Document successfully processed.</p>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.errorZone}>
          <AlertCircle size={48} className={styles.errorIcon} />
          <h4>Upload Failed</h4>
          <p className={styles.statusText}>Please try again.</p>
          <button className={styles.retryBtn} onClick={() => setStatus('idle')}>
            Retry
          </button>
        </div>
      )}
    </Card>
  );
}
