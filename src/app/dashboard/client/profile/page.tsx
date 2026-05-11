'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DocumentUpload } from '@/components/ui/DocumentUpload';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { mockDocuments } from '@/data/mock-data';
import { FileText, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function ClientProfile() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState(mockDocuments);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return p;
        }
        return p + 10;
      });
    }, 200);

    // Complete after 2.5s
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        const newDoc = {
          id: `d${Date.now()}`,
          fileName: file.name,
          uploadDate: new Date().toISOString(),
          documentType: 'report',
          aiSummary: 'AI Analysis Complete: Found minor inflammation markers. Recommend increased hydration and restorative yoga.',
          keyFindings: ['Slightly elevated inflammation markers', 'Hydration levels low'],
          healthIndicators: [
            { label: 'Inflammation', value: 'Elevated', status: 'warning' as const },
            { label: 'Blood Pressure', value: 'Normal', status: 'normal' as const }
          ]
        };
        setDocuments(prev => [newDoc, ...prev]);
        setProgress(0);
      }, 500);
    }, 2500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Profile & Documents</h1>
        <p className={styles.subtitle}>Manage your personal information and AI health insights.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.leftCol}>
          <Card padding="lg" className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <Avatar src={user?.avatar} alt={user?.name || ''} size="xl" />
              <div className={styles.profileInfo}>
                <h2>{user?.name}</h2>
                <p className={styles.email}>{user?.email}</p>
                <Badge variant={user?.tier === 'transform' ? 'gold' : 'primary'}>
                  {user?.tier} Plan Member
                </Badge>
              </div>
            </div>
            
            <div className={styles.infoSection}>
              <h3>Personal Details</h3>
              <div className={styles.infoGrid}>
                <div>
                  <label>Phone</label>
                  <p>+91 98765 43210</p>
                </div>
                <div>
                  <label>Date of Birth</label>
                  <p>12 May 1990</p>
                </div>
                <div>
                  <label>Gender</label>
                  <p>Female</p>
                </div>
                <div>
                  <label>Location</label>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>
          </Card>

          <Card padding="lg" className={styles.uploadCard}>
            <DocumentUpload onUploadComplete={handleUpload} />
          </Card>
        </div>

        <div className={styles.rightCol}>
          <Card padding="lg" className={styles.docsCard}>
            <div className={styles.cardHeader}>
              <h3>Previously Analyzed Documents</h3>
              <Badge variant="outline">{documents.length} total</Badge>
            </div>

            <div className={styles.docList}>
              {isAnalyzing && (
                <div className={styles.analyzingCard}>
                  <div className={styles.analyzingHeader}>
                    <Loader2 size={24} className={styles.spinner} />
                    <span>AI is analyzing your document...</span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
              {documents.map((doc) => (
                <div key={doc.id} className={styles.docItem}>
                  <div className={styles.docHeader}>
                    <div className={styles.docTitleGroup}>
                      <FileText size={20} className={styles.docIcon} />
                      <span className={styles.docName}>{doc.fileName}</span>
                    </div>
                    <span className={styles.docDate}>
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className={styles.docSummary}>
                    <p>{doc.aiSummary}</p>
                  </div>

                  <div className={styles.indicators}>
                    {doc.healthIndicators.map((indicator, i) => (
                      <div key={i} className={`${styles.indicator} ${styles[indicator.status]}`}>
                        {indicator.status === 'warning' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                        <span>{indicator.label}: {indicator.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
