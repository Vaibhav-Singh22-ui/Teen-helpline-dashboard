'use client';

import React, { useState } from 'react';
import { Shield, Mail, Lock, Heart, LayoutGrid } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const cleanErrorMessage = (message: string): string => {
  if (message && message.includes('SMTP Error:')) {
    try {
      const jsonStart = message.indexOf('{');
      if (jsonStart !== -1) {
        const jsonPart = message.substring(jsonStart);
        const parsed = JSON.parse(jsonPart);
        return `SMTP Setup Error: ${parsed.message || parsed.error || jsonPart}`;
      }
    } catch (e) {
      // Ignored, fallback to raw message
    }
  }
  return message;
};

export default function Auth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (isForgotMode) {
      if (!email.trim()) {
        setErrorMsg('Please enter your email address.');
        setLoading(false);
        return;
      }
      try {
        if (supabase) {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });
          if (error) throw error;
          setSuccessMsg('✉️ Password reset link sent! Check your inbox.');
        } else {
          setSuccessMsg('✉️ Mock: Password reset link sent to ' + email);
        }
      } catch (err: any) {
        console.error(err);
        setErrorMsg(cleanErrorMessage(err.message || 'Failed to send reset link.'));
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      if (supabase) {
        if (activeTab === 'login') {
          const { error, data } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          if (data?.user) {
            localStorage.setItem('th_logged_in', 'true');
            window.location.href = '/';
          }
        } else {
          const { error, data } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { display_name: name }
            }
          });
          if (error) throw error;
          setSuccessMsg('✨ Sign up successful! Check your email to confirm registration.');
        }
      } else {
        simulateLocalLogin(activeTab === 'signup' ? name : email.split('@')[0]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(cleanErrorMessage(err.message || 'Authentication failed.'));
    } finally {
      setLoading(false);
    }
  };

  const simulateLocalLogin = (displayName: string) => {
    localStorage.setItem('th_logged_in', 'true');
    const guestProfile = localStorage.getItem('th_profile');
    if (guestProfile) {
      const parsed = JSON.parse(guestProfile);
      parsed.display_name = displayName;
      localStorage.setItem('th_profile', JSON.stringify(parsed));
    }
    window.dispatchEvent(new Event('profileUpdated'));
    window.location.href = '/';
  };

  return (
    <div style={styles.page}>
      <div className="container section-padding" style={styles.container}>
        <div className="card animate-pop" style={styles.card}>
          
          {/* Creative Interactive Buddy Avatar / Storyset Illustration */}
          <div style={styles.avatarWrapper}>
            <img 
              src="/media__1782194827509.png" 
              alt="Safe Space Entry" 
              style={styles.authIllustration} 
            />
            <div style={styles.speechBubble}>
              {isForgotMode 
                ? "Enter your registered email, and I'll send a recovery link! ✉️" 
                : isPasswordFocused 
                  ? "Shh... Your secret is fully safe with me! 🔒" 
                  : "Hey! Enter your secure keys below. ✨"
              }
            </div>
          </div>

          {/* Brand Header */}
          <div style={styles.brandHeader}>
            <h2 style={styles.title}>{isForgotMode ? "Recover Password" : "Safe Space Entry"}</h2>
            <p style={styles.subtitle}>
              {isForgotMode 
                ? "Get back into your secure safe space." 
                : "Unlock your private dashboard & academic scheduler."
              }
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && <div style={styles.errorDiv}>{errorMsg}</div>}
          {successMsg && <div style={styles.successDiv}>{successMsg}</div>}

          {/* Tabs - Hidden in Forgot Password Mode */}
          {!isForgotMode && (
            <div style={styles.tabRow}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                style={{
                  ...styles.tabBtn,
                  ...(activeTab === 'login' ? styles.tabBtnActive : {})
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                style={{
                  ...styles.tabBtn,
                  ...(activeTab === 'signup' ? styles.tabBtnActive : {})
                }}
              >
                Register
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSubmit} style={styles.form}>
            {!isForgotMode && activeTab === 'signup' && (
              <div style={styles.formGroup}>
                <label>Secret Nickname</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., StarrySky, HopefulHeart"
                  required
                />
              </div>
            )}

            <div style={styles.formGroup}>
              <label>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={16} color="#20BEE8" style={styles.inputIcon} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E.g., friend@helper.com"
                  style={styles.inputWithIcon}
                  required
                />
              </div>
            </div>

            {!isForgotMode && (
              <div style={styles.formGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Private Password</label>
                  {activeTab === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => { setIsForgotMode(true); setErrorMsg(''); setSuccessMsg(''); }}
                      style={{ background: 'none', border: 'none', color: '#20BEE8', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: '0.2rem' }}
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div style={styles.inputWrapper}>
                  <Lock size={16} color="#20BEE8" style={styles.inputIcon} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    placeholder="••••••••"
                    style={styles.inputWithIcon}
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {loading 
                ? 'Processing...' 
                : isForgotMode 
                  ? 'Reset Password' 
                  : activeTab === 'login' 
                    ? 'Enter Safe Space' 
                    : 'Register Secure Account'
              }
            </button>

            {isForgotMode && (
              <button 
                type="button" 
                onClick={() => { setIsForgotMode(false); setErrorMsg(''); setSuccessMsg(''); }}
                className="btn btn-outline"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Back to Sign In
              </button>
            )}
          </form>

          {/* Privacy note */}
          <div style={styles.footerNote}>
            <Shield size={12} color="#20BEE8" style={{ marginRight: '4px' }} />
            <span>Encrypted validation. No public profiles.</span>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: '#FAF9F6',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  card: {
    backgroundColor: '#ffffff',
    maxWidth: '430px',
    width: '100%',
    padding: '2.5rem',
    borderRadius: '30px',
    border: '1px solid rgba(32, 190, 232, 0.15)',
    boxShadow: '0 15px 35px rgba(50, 50, 68, 0.04)'
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
    position: 'relative'
  },
  buddySvg: {
    filter: 'drop-shadow(0 4px 10px rgba(32, 190, 232, 0.08))'
  },
  speechBubble: {
    backgroundColor: '#FFC0C1',
    border: '1px solid #FEF08A',
    borderRadius: '12px',
    padding: '0.4rem 0.8rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#B7791F',
    marginTop: '0.8rem',
    textAlign: 'center',
    maxWidth: '85%'
  },
  brandHeader: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.7rem',
    fontWeight: 800,
    color: '#323244',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '0.88rem',
    color: '#323244',
    marginTop: '0.2rem',
    lineHeight: 1.3
  },
  errorDiv: {
    backgroundColor: '#FFC0C1',
    color: '#323244',
    border: '1px solid #FFC0C1',
    padding: '0.7rem 1rem',
    borderRadius: '12px',
    fontSize: '0.82rem',
    fontWeight: 500,
    marginBottom: '1rem',
    lineHeight: 1.4
  },
  successDiv: {
    backgroundColor: '#F0FFF4',
    color: '#38A169',
    border: '1px solid #FAF9F6',
    padding: '0.7rem 1rem',
    borderRadius: '12px',
    fontSize: '0.82rem',
    fontWeight: 500,
    marginBottom: '1rem'
  },
  tabRow: {
    display: 'flex',
    backgroundColor: '#FAF9F6',
    padding: '0.3rem',
    borderRadius: '14px',
    gap: '0.2rem',
    marginBottom: '1.2rem'
  },
  tabBtn: {
    flexGrow: 1,
    padding: '0.6rem 0.8rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#323244',
    transition: 'all 0.2s'
  },
  tabBtnActive: {
    backgroundColor: '#ffffff',
    color: '#20BEE8',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
  },
  googleBtn: {
    width: '100%',
    padding: '0.7rem',
    fontSize: '0.92rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.2rem',
    borderWidth: '1.5px',
    borderColor: '#FFC0C1',
    borderRadius: '50px'
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '1.2rem 0',
    borderBottom: '1px solid #FFC0C1',
    lineHeight: '0.1em'
  },
  dividerText: {
    backgroundColor: '#ffffff',
    padding: '0 0.8rem',
    fontSize: '0.78rem',
    color: '#20BEE8',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputWrapper: {
    position: 'relative',
    width: '100%'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  inputWithIcon: {
    paddingLeft: '2.5rem'
  },
  footerNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    color: '#20BEE8',
    marginTop: '1.5rem',
    textAlign: 'center'
  },
  authIllustration: {
    width: '100%',
    maxHeight: '160px',
    objectFit: 'contain',
    marginBottom: '1rem'
  }
};
