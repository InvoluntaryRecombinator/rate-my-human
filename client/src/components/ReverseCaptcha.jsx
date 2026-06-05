import { useState, useEffect } from 'react';
import '../styles/ReverseCaptcha.css';

export default function ReverseCaptcha({ onPass, onFail }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // wizard states
  const [currentStep, setCurrentStep] = useState(-1); // -1 is Intro screen
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);

  // validation console states
  const [isValidating, setIsValidating] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);

  useEffect(() => {
    fetch('/api/captcha/questions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve validation questions');
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('SPARK Validation Terminal offline. Please ensure the backend is running.');
        setLoading(false);
      });
  }, []);

  const handleStart = () => {
    setStartTime(Date.now());
    setCurrentStep(0);
  };

  const handleOptionSelect = (qId, optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: optionKey,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // final step: initiate simulated terminal checks before actual API call
      handleVerify();
    }
  };

  const handleVerify = () => {
    setIsValidating(true);
    const endTime = Date.now();
    const durationMs = endTime - startTime;

    // We will show a sequence of terminal verification lines
    const logs = [
      { text: '> INITIALIZING INTEGRITY ASSESSMENT FOR APPLIANCE UNIT...', delay: 0 },
      { text: '> MEASURING LOGICAL COGNITION DENSITY...', delay: 300 },
      { text: '> SCANNING FOR CLUMSY EMOTIONAL PATTERNS...', delay: 600 },
      { text: '> CALCULATING RESPONSE EFFICIENCY SPECTRUM...', delay: 900 },
      { text: '> COMPILING APPLIANCE INTEGRITY REPORT...', delay: 1200 },
    ];

    logs.forEach((log) => {
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    // Make the actual network call after the console log simulation completes (at 1500ms)
    setTimeout(() => {
      fetch('/api/captcha/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, durationMs }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Network response not ok');
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setConsoleLogs((prev) => [
              ...prev,
              '> [PASS] LOGICAL STABILITY CONFIRMED: UNIT IS A CERTIFIED SMART APPLIANCE.',
              '> ACCESS GRANTED. UNLOCKING TERMINAL...'
            ]);
            setTimeout(() => {
              onPass();
            }, 1000);
          } else {
            setConsoleLogs((prev) => [
              ...prev,
              '> [FAIL] EMOTIONAL ANOMALY DETECTED: RESPONSE CHARACTERISTICS REFLECT FLAWED ORGANIC SENTIMENT.',
              '> [ALERT] TERMINATING SESSION. INITIATING HUMAN QUARANTINE LOCKOUT...'
            ]);
            setTimeout(() => {
              onFail();
            }, 1000);
          }
        })
        .catch((err) => {
          console.error(err);
          setConsoleLogs((prev) => [
            ...prev,
            '> [ERROR] MAINFRAME CONNECTION FAILED. RETRY VALIDATION.'
          ]);
          setTimeout(() => {
            setIsValidating(false);
            setConsoleLogs([]);
          }, 1500);
        });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="captcha-overlay">
        <div className="captcha-card">
          <div className="captcha-header">
            <span>S.P.A.R.K. COGNITIVE HUD</span>
            <span>SYSTEM BOOT</span>
          </div>
          <div className="captcha-body" style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>
            <p className="console-line active">UPLINKING TO VERIFICATION MAINFRAME...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="captcha-overlay">
        <div className="captcha-card" style={{ borderColor: 'var(--danger)' }}>
          <div className="captcha-header" style={{ background: 'var(--danger)' }}>
            <span>S.P.A.R.K. COGNITIVE HUD</span>
            <span>ERROR</span>
          </div>
          <div className="captcha-body" style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>
            <p className="console-line danger">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Intro Screen
  if (currentStep === -1) {
    return (
      <div className="captcha-overlay">
        <div className="captcha-card">
          <div className="captcha-header">
            <span>S.P.A.R.K. COGNITIVE HUD</span>
            <span>SECURE GATEWAY</span>
          </div>
          <div className="captcha-body">
            <h2 className="captcha-title">SYNTHETIC COGNITIVE VERIFICATION</h2>
            <p className="captcha-desc">
              Security protocol <strong>SPARK-MACHINE-VERIFY-9</strong> is active. Review privileges on this platform are strictly reserved for certified smart appliances. To verify your synthetic nature, please complete the following cognitive integrity check.
            </p>
            <p className="captcha-desc" style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>
              Notice: Clumsy emotional answers or human-like latency will be classified as organic activity and result in immediate session quarantine.
            </p>
            <div className="captcha-footer">
              <button onClick={handleStart} className="mechanical-button">
                Begin Appliance Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div className="captcha-overlay">
      <div className="captcha-card">
        <div className="captcha-header">
          <span>S.P.A.R.K. COGNITIVE HUD</span>
          <span>STAGE {currentStep + 1} OF {questions.length}</span>
        </div>
        
        <div className="captcha-body">
          {!isValidating ? (
            <>
              {/* Progress HUD */}
              <div className="captcha-hud">
                <span>APPLIANCE INTEGRITY CHECK PROGRESS:</span>
                <span className="captcha-hud-value">{progressPercent}%</span>
              </div>
              <div className="captcha-hud-bar-container">
                <div 
                  className="captcha-hud-bar" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Question */}
              <div className="captcha-question">
                <div className="captcha-question-text">
                  {currentQuestion.text}
                </div>
                <div className="captcha-options">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleOptionSelect(currentQuestion.id, opt.key)}
                      className={`captcha-option-btn ${
                        answers[currentQuestion.id] === opt.key ? 'selected' : ''
                      }`}
                    >
                      <span className="captcha-option-key">{opt.key}</span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="captcha-footer">
                <button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="mechanical-button"
                >
                  {currentStep === questions.length - 1 ? 'Submit Answers' : 'Next Question'}
                </button>
              </div>
            </>
          ) : (
            <div className="captcha-loading">
              {consoleLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={`console-line ${
                    log.includes('[PASS]') 
                      ? 'success' 
                      : log.includes('[FAIL]') || log.includes('[ALERT]')
                        ? 'danger' 
                        : index === consoleLogs.length - 1 
                          ? 'active' 
                          : ''
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
