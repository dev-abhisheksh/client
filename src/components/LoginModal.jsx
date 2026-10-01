import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function LoginModal({ isOpen, onClose }) {
  const { user, isAdmin, login, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setError('');
      setSuccessMsg('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      await login({ email: email.trim().toLowerCase(), password });
      setSuccessMsg('Authentication successful! Refreshing admin access...');
      // Refresh page to immediately activate admin privileges across the entire site
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      setSubmitting(true);
      await logout();
      setSuccessMsg('Logged out successfully! Refreshing...');
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch (err) {
      setError(err.message || 'Failed to logout.');
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Modal Card */}
        <div className="cd p-7 sm:p-9 shadow-2xl border border-[var(--ln)] relative bg-[var(--card)] rounded-2xl">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[var(--soft)] text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--ln)] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            aria-label="Close Login Modal"
          >
            ✕
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--soft)] border border-[var(--ln)] mb-3 shadow-xs">
              <img
                src="/logo.png"
                alt="Bethesda Logo"
                className="w-9 h-9 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span style="font-size:26px">🔒</span>';
                }}
              />
            </div>
            <div className="eb tracking-widest text-[10px] mb-1">
              BETHESDA CHARITABLE TRUST
            </div>
            <h2 className="text-[22px] sm:text-[24px] font-bold text-[var(--nv)] m-0">
              {user ? 'Admin Session' : 'Admin Portal'}
            </h2>
            <p className="text-[13px] text-[var(--mu)] mt-1 leading-relaxed">
              {user
                ? 'You are currently logged in with admin privileges.'
                : 'Sign in to edit projects, upload photos, and manage site content.'}
            </p>
          </div>

          {/* Error & Success Feedback Banners */}
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <span className="text-sm">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <span className="text-sm">✓</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Already Logged In View */}
          {user ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[var(--soft)] border border-[var(--ln)] text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Active Admin Session
                  </span>
                </div>
                <div className="text-sm font-semibold text-[var(--tx)]">
                  {user.username || user.email}
                </div>
                <div className="text-xs text-[var(--mu)]">
                  Role: <span className="font-mono capitalize font-bold text-[var(--nv)]">{user.role}</span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-red-600 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors cursor-pointer"
                >
                  {submitting ? 'Logging out...' : 'Log Out'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[var(--bl)] hover:bg-[var(--nv)] transition-colors shadow-xs cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--nv)] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bethesdatrust.org"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)] transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[var(--nv)]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-[var(--bl)] font-medium hover:underline cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[var(--bl)] hover:bg-[var(--nv)] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin text-sm">⏳</span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In to Admin Portal →</span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-[var(--ln)] text-center text-[11px] text-[var(--mu)]">
            <span>Bethesda Charitable Trust • Internal CMS Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
