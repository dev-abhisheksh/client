import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

export default function LoginPage({ onNavigate }) {
  const { user, isAdmin, login, logout, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleNav = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

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
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setSuccessMsg('You have been logged out.');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-[var(--bg)]">
      {/* Ambient background decoration */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--bl) 0%, var(--go) 100%)',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="cd p-7 sm:p-9 shadow-2xl border border-[var(--ln)]">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--soft)] border border-[var(--ln)] mb-3 shadow-xs">
              <img
                src="/logo.png"
                alt="Bethesda Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span style="font-size:30px">🔒</span>';
                }}
              />
            </div>
            <div className="eb tracking-widest text-[11px] mb-1">
              BETHESDA CHARITABLE TRUST
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[var(--nv)] m-0">
              Admin Portal
            </h1>
            <p className="text-[13.5px] text-[var(--mu)] mt-1.5 leading-relaxed">
              Sign in to manage projects, galleries, and live site content.
            </p>
          </div>

          {/* Already Logged In View */}
          {user ? (
            <div className="space-y-5 text-center">
              <div className="p-4 rounded-xl bg-[var(--soft)] border border-[var(--ln)] text-left">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Active Session
                  </span>
                </div>
                <div className="text-[15px] font-bold text-[var(--nv)] mt-2">
                  {user.username || 'Admin'}
                </div>
                <div className="text-[13px] text-[var(--mu)]">{user.email}</div>
                <div className="text-[11.5px] text-[var(--mu)] mt-1 capitalize">
                  Role: <b className="text-[var(--bl)]">{user.role || 'Administrator'}</b>
                </div>
              </div>

              {successMsg && (
                <div className="p-3 text-[13px] rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {successMsg}
                </div>
              )}

              <div className="flex flex-col gap-2.5 pt-2">
                <Button
                  onClick={() => handleNav('home')}
                  variant="gold"
                  className="w-full text-center justify-center py-3 font-bold"
                >
                  ← Return to Website
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-center justify-center py-2.5 text-[13px]"
                >
                  Log Out
                </Button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-[13px] flex items-start gap-2.5 leading-snug">
                  <span className="text-[15px] shrink-0">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[13px] flex items-center gap-2.5 leading-snug">
                  <span className="text-[15px] shrink-0">✓</span>
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-[13px] font-bold text-[var(--nv)] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bethesda.org"
                    required
                    autoFocus
                    autoComplete="email"
                    disabled={submitting}
                    className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-[var(--soft)]/50 border border-[var(--ln)] text-[var(--tx)] text-[14px] placeholder-[var(--mu)] focus:outline-none focus:border-[var(--bl)] focus:ring-2 focus:ring-[var(--bl)]/20 transition-all"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mu)] select-none text-[15px]">
                    ✉
                  </span>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[13px] font-bold text-[var(--nv)]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[12px] font-semibold text-[var(--bl)] hover:underline cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    disabled={submitting}
                    className="w-full px-3.5 py-2.5 pl-10 pr-10 rounded-xl bg-[var(--soft)]/50 border border-[var(--ln)] text-[var(--tx)] text-[14px] placeholder-[var(--mu)] focus:outline-none focus:border-[var(--bl)] focus:ring-2 focus:ring-[var(--bl)]/20 transition-all"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mu)] select-none text-[15px]">
                    🔒
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || authLoading}
                  className="btn g w-full text-center justify-center py-3 font-bold text-[14px] shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Authenticating...' : 'Sign In to Admin Portal →'}
                </button>
              </div>

              {/* Back to Home */}
              <div className="text-center pt-2">
                <a
                  onClick={() => handleNav('home')}
                  className="text-[13px] text-[var(--mu)] hover:text-[var(--bl)] transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  ← Return to Website
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Discreet security note */}
        <p className="text-center text-[12px] text-[var(--mu)] mt-5">
          🔒 Protected Area. Unauthorized access attempts are monitored and recorded.
        </p>
      </div>
    </div>
  );
}
