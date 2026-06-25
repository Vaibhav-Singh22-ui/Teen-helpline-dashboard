'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    // In Next.js client component, verify we have the token
    const hash = window.location.hash;
    if (!hash && !window.location.search.includes('type=recovery')) {
      setErrorMsg("Ensure you arrived here from your password reset email link.");
    }
  }, []);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      if (supabase) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setSuccessMsg('✨ Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setSuccessMsg('✨ Mock: Password updated successfully! Redirecting...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to update password. Try requesting a new reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div className="container section-padding" style={styles.container}>
        <div className="card animate-pop" style={styles.card}>
          
          {/* Creative Interactive Buddy Avatar / Storyset Illustration */}
          <div style={styles.avatarWrapper}>
            <img 
              src="/media__1782194827509.png" 
              alt="Reset Password" 
              style={styles.authIllustration} 
            />
            <div style={styles.speechBubble}>
              {isPasswordFocused 
                ? "Make it strong and keep it secret! 🔒" 
                : "Enter your new password below! 🔑"
              }
            </div>
          </div>

          {/* Brand Header */}
          <div style={styles.brandHeader}>
            <h2 style={styles.title}>Create New Password</h2>
            <p style={styles.subtitle}>Choose a secure password for your account.</p>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && <div style={styles.errorDiv}>{errorMsg}</div>}
          {successMsg && <div style={styles.successDiv}>{successMsg}</div>}

          {/* Form */}
          <form onSubmit={handleResetSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>New Private Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} color="#20BEE8" style={styles.inputIcon} />
                <input 
                  type={showPassword ? "text" : "password"}
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

            <div style={styles.formGroup}>
              <label>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} color="#20BEE8" style={styles.inputIcon} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  style={styles.inputWithIcon}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '0.2rem 0' }}>
              <input 
                type="checkbox" 
                id="show-pass"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                style={{ marginRight: '6px', cursor: 'pointer' }}
              />
              <label htmlFor="show-pass" style={{ fontSize: '0.82rem', color: '#20BEE8', cursor: 'pointer', fontWeight: 500 }}>
                Show Password
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {loading ? 'Updating Password...' : 'Save Password'}
            </button>
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
    paddingLeft: '2.5rem',
    width: '100%',
    paddingRight: '1rem',
    backgroundColor: '#FAF9F6',
    border: '1.5px solid #E2E8F0',
    borderRadius: '12px',
    height: '42px',
    outline: 'none',
    fontSize: '0.9rem',
    color: '#323244'
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
