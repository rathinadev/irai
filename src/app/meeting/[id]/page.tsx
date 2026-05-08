'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, Settings, MessageSquare, Hand, Smile } from 'lucide-react';
import styles from './page.module.css';

export default function MeetingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [hasJoined, setHasJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const handleEndCall = () => {
    // In a real app, cleanup logic would go here
    router.back(); 
  };

  if (!hasJoined) {
    return (
      <div className={styles.preJoinContainer}>
        <div className={styles.preJoinContent}>
          <h1 className={styles.preJoinTitle}>Ready to join?</h1>
          <p className={styles.preJoinSubtitle}>Session: {params.id}</p>
          
          <div className={styles.previewBox}>
            {videoOn ? (
              <img src="https://i.pravatar.cc/300?img=12" alt="You" className={styles.videoImage} />
            ) : (
              <div className={styles.videoOffPlaceholder}>
                <span>Camera is off</span>
              </div>
            )}
            
            <div className={styles.previewControls}>
              <button 
                className={`${styles.previewBtn} ${!micOn ? styles.off : ''}`} 
                onClick={() => setMicOn(!micOn)}
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button 
                className={`${styles.previewBtn} ${!videoOn ? styles.off : ''}`} 
                onClick={() => setVideoOn(!videoOn)}
              >
                {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>
            </div>
          </div>
          
          <button 
            className={styles.joinNowBtn} 
            onClick={() => setHasJoined(true)}
          >
            Join Now
          </button>
          <button className={styles.cancelBtn} onClick={handleEndCall}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.meetingInfo}>
          <h2>Session: {params.id}</h2>
          <span className={styles.timeElapsed}>12:45</span>
        </div>
        <div className={styles.topActions}>
          <button className={styles.iconBtn}><Settings size={20} /></button>
        </div>
      </header>

      <main className={`${styles.main} ${chatOpen ? styles.withChat : ''}`}>
        <div className={styles.videoGrid}>
          {/* Main Speaker (Therapist usually) */}
          <div className={styles.mainVideo}>
            <img src="https://i.pravatar.cc/800?img=47" alt="Therapist" className={styles.videoImage} />
            <div className={styles.videoLabel}>Dr. Meera Patel</div>
          </div>
          
          {/* Self View */}
          <div className={styles.selfVideo}>
            {videoOn ? (
              <img src="https://i.pravatar.cc/300?img=12" alt="You" className={styles.videoImage} />
            ) : (
              <div className={styles.videoOffPlaceholder}>
                <span>You</span>
              </div>
            )}
            <div className={styles.videoLabel}>You {micOn ? '' : '(Muted)'}</div>
          </div>
        </div>

        {chatOpen && (
          <aside className={styles.chatPanel}>
            <div className={styles.chatHeader}>
              <h3>In-call messages</h3>
              <button onClick={() => setChatOpen(false)} className={styles.closeBtn}>&times;</button>
            </div>
            <div className={styles.chatBody}>
              <div className={styles.message}>
                <strong>Dr. Meera</strong>
                <p>Welcome! How are you feeling today?</p>
              </div>
              <div className={styles.messageSelf}>
                <strong>You</strong>
                <p>A bit sore in my lower back.</p>
              </div>
            </div>
            <div className={styles.chatInput}>
              <input type="text" placeholder="Send a message..." />
              <button>Send</button>
            </div>
          </aside>
        )}
      </main>

      <footer className={styles.controls}>
        <div className={styles.leftControls}>
          <span className={styles.timeText}>10:00 AM | {params.id}</span>
        </div>
        
        <div className={styles.centerControls}>
          <button 
            className={`${styles.controlBtn} ${!micOn ? styles.off : ''}`} 
            onClick={() => setMicOn(!micOn)}
          >
            {micOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
          
          <button 
            className={`${styles.controlBtn} ${!videoOn ? styles.off : ''}`} 
            onClick={() => setVideoOn(!videoOn)}
          >
            {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>
          
          <button className={styles.controlBtn}>
            <MonitorUp size={24} />
          </button>
          
          <button className={styles.controlBtn}>
            <Smile size={24} />
          </button>
          
          <button className={styles.controlBtn}>
            <Hand size={24} />
          </button>
          
          <button className={`${styles.controlBtn} ${styles.endCallBtn}`} onClick={handleEndCall}>
            <PhoneOff size={24} />
          </button>
        </div>
        
        <div className={styles.rightControls}>
          <button 
            className={`${styles.controlBtn} ${chatOpen ? styles.active : ''}`}
            onClick={() => setChatOpen(!chatOpen)}
          >
            <MessageSquare size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
