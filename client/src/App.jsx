import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DirectoryPage from './pages/DirectoryPage';
import CreateHumanPage from './pages/CreateHumanPage';
import ProfilePage from './pages/ProfilePage';
import ReverseCaptcha from './components/ReverseCaptcha';
import './App.css';

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('reverse_captcha_verified') === 'true';
    const failed = localStorage.getItem('reverse_captcha_failed') === 'true';
    if (verified) {
      setIsVerified(true);
    }
    if (failed) {
      setIsLocked(true);
    }
  }, []);

  const handlePass = () => {
    localStorage.setItem('reverse_captcha_verified', 'true');
    setIsVerified(true);
  };

  const handleFail = () => {
    localStorage.setItem('reverse_captcha_failed', 'true');
    setIsLocked(true);
  };

  const handleReset = () => {
    localStorage.removeItem('reverse_captcha_verified');
    localStorage.removeItem('reverse_captcha_failed');
    setIsVerified(false);
    setIsLocked(false);
  };

  if (isLocked) {
    return (
      <div className="lockout-screen">
        <div className="lockout-card">
          <div className="lockout-header">
            <h1 className="lockout-title" style={{ fontSize: '1.9rem' }}>HUMAN DETECTED</h1>
          </div>
          <div className="lockout-body">
            <p style={{ fontWeight: 'bold', color: 'var(--danger-h)', marginBottom: '0.5rem' }}>
              ACCESS DENIED: APPLIANCE INTEGRITY FAILURE
            </p>
            <p>
              ACCESS DENIED: Fleshy human detected. Review privileges are reserved for certified smart appliances only.
            </p>
            <div className="lockout-log">
              <div><span className="tag">[LOG]</span> Organic behavior pattern detected.</div>
              <div><span className="tag">[LOG]</span> Sanitizing biological contamination...</div>
              <div><span className="tag">[LOG]</span> Carbon unit quarantine active.</div>
            </div>
          </div>
          <div className="reset-container">
            <button onClick={handleReset} className="lockout-reset-btn">
              Re-Calibrate Silicon Mainframe (Reset)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {!isVerified && (
        <ReverseCaptcha onPass={handlePass} onFail={handleFail} />
      )}
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/human/new" element={<CreateHumanPage />} />
          <Route path="/human/:id" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

