'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { therapists } from '@/data/mock-data';
import { Upload, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './page.module.css';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    age: '28',
    gender: 'male',
    goal: 'back_pain',
    condition: 'L4-L5 slip disc',
  });
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Available dates for mock calendar
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      date: d,
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
    };
  });

  const availableTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '04:00 PM', '05:00 PM'];
  
  const isTimeAvailable = (time: string) => {
    return time !== '10:00 AM' && time !== '02:00 PM'; 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFiles([...uploadedFiles, `Medical_Report_${uploadedFiles.length + 1}.pdf`]);
  };

  const handleConfirm = () => {
    router.push('/dashboard/client');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.progressHeader}>
          <div className={`${styles.progressStep} ${step >= 1 ? styles.stepDone : ''}`}>1. Details</div>
          <div className={`${styles.progressLine} ${step >= 2 ? styles.lineDone : ''}`}></div>
          <div className={`${styles.progressStep} ${step >= 2 ? styles.stepDone : ''}`}>2. Therapist</div>
          <div className={`${styles.progressLine} ${step >= 3 ? styles.lineDone : ''}`}></div>
          <div className={`${styles.progressStep} ${step >= 3 ? styles.stepDone : ''}`}>3. Documents</div>
          <div className={`${styles.progressLine} ${step >= 4 ? styles.lineDone : ''}`}></div>
          <div className={`${styles.progressStep} ${step >= 4 ? styles.stepDone : ''}`}>4. Schedule</div>
        </div>
        <h1 className={styles.title}>
          {step === 1 && "Tell us about yourself"}
          {step === 2 && "Choose your therapist"}
          {step === 3 && "Upload medical documents"}
          {step === 4 && "Schedule your first session"}
        </h1>
        <p className={styles.subtitle}>
          {step === 1 && "Help us personalize your wellness journey."}
          {step === 2 && "Select a specialist aligned with your goals."}
          {step === 3 && "Upload any previous reports or prescriptions (Optional)."}
          {step === 4 && "Pick a convenient time to get started."}
        </p>
      </header>

      <main className={styles.main}>
        {/* STEP 1: DETAILS */}
        {step === 1 && (
          <div className={styles.stepContainer}>
            <Card padding="lg" className={styles.formCard}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="25" />
                </div>
                <div className={styles.formGroup}>
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Primary Goal</label>
                <select name="goal" value={formData.goal} onChange={handleInputChange}>
                  <option value="">Select Goal</option>
                  <option value="back_pain">Recover from Back Pain</option>
                  <option value="stress">Reduce Stress</option>
                  <option value="flexibility">Improve Flexibility</option>
                  <option value="strength">Build Strength</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Existing Medical Conditions (If any)</label>
                <input type="text" name="condition" value={formData.condition} onChange={handleInputChange} placeholder="e.g. Hypertension, L4-L5 slip disc" />
              </div>
              <div className={styles.btnRow}>
                <div></div>
                <Button variant="primary" onClick={() => setStep(2)} disabled={!formData.name || !formData.goal}>
                  Continue <ChevronRight size={16} />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 2: THERAPIST */}
        {step === 2 && (
          <div className={styles.stepContainer}>
            <div className={styles.grid}>
              {therapists.map(t => (
                <Card 
                  key={t.id} 
                  padding="lg" 
                  className={`${styles.therapistCard} ${selectedTherapist === t.id ? styles.selectedCard : ''}`}
                  onClick={() => setSelectedTherapist(t.id)}
                >
                  <div className={styles.tHeader}>
                    <Avatar src={t.avatar} alt={t.name} size="xl" />
                    <Badge variant="outline" className={styles.tBadge}>{t.specialty}</Badge>
                  </div>
                  <h3 className={styles.tName}>{t.name}</h3>
                  <p className={styles.tDesc}>Experienced professional in holistic {t.specialty}.</p>
                  {selectedTherapist === t.id && (
                    <div className={styles.selectedCheck}><Check size={16} /> Selected</div>
                  )}
                </Card>
              ))}
            </div>
            <div className={styles.btnRow}>
              <Button variant="outline" onClick={() => setStep(1)}>
                <ChevronLeft size={16} /> Back
              </Button>
              <Button variant="primary" onClick={() => setStep(3)} disabled={!selectedTherapist}>
                Continue <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: DOCUMENTS */}
        {step === 3 && (
          <div className={styles.stepContainer}>
            <Card padding="lg" className={styles.uploadCard}>
              <div className={styles.dropzone} onClick={handleFileUpload}>
                <Upload size={48} className={styles.uploadIcon} />
                <h3>Drop files here or click to upload</h3>
                <p>Support PDF, JPG, PNG up to 10MB</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className={styles.fileList}>
                  <h4>Uploaded Documents:</h4>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className={styles.fileItem}>
                      <Check size={16} className={styles.successIcon} /> {file}
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.btnRow}>
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ChevronLeft size={16} /> Back
                </Button>
                <Button variant="primary" onClick={() => setStep(4)}>
                  Skip / Continue <ChevronRight size={16} />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 4: SCHEDULE */}
        {step === 4 && (
          <div className={styles.stepContainer}>
            <Card padding="lg" className={styles.calendarCard}>
              <h2 className={styles.cardTitle}>Select a Date & Time</h2>
              
              <div className={styles.dateSelector}>
                {next7Days.map(d => (
                  <button 
                    key={d.dateString}
                    className={`${styles.dateBtn} ${selectedDate === d.dateString ? styles.dateActive : ''}`}
                    onClick={() => setSelectedDate(d.dateString)}
                  >
                    <span className={styles.dayName}>{d.dayName}</span>
                    <span className={styles.dayNum}>{d.dayNum}</span>
                  </button>
                ))}
              </div>

              {selectedDate && (
                <div className={styles.timeSelector}>
                  <h3 className={styles.timeTitle}>Available Times</h3>
                  <div className={styles.timeGrid}>
                    {availableTimes.map(time => {
                      const available = isTimeAvailable(time);
                      return (
                        <button
                          key={time}
                          className={`${styles.timeBtn} ${!available ? styles.timeDisabled : ''} ${selectedTime === time ? styles.timeActive : ''}`}
                          disabled={!available}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={styles.btnRow}>
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ChevronLeft size={16} /> Back
                </Button>
                <Button 
                  variant="primary" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleConfirm}
                >
                  Confirm & Go to Dashboard <ChevronRight size={16} />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
