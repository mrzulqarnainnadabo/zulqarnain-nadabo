'use client';

import { useEffect, useState } from 'react';

function readPreference() {
  try {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = readPreference();
    setTheme(initial);
    setMounted(true);
    document.documentElement.classList.toggle('dark', initial === 'dark');

    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    const syncSystemPreference = (event) => {
      let stored = null;
      try { stored = window.localStorage.getItem('theme'); } catch {}
      if (stored !== 'dark' && stored !== 'light') {
        const next = event.matches ? 'dark' : 'light';
        setTheme(next);
        document.documentElement.classList.toggle('dark', next === 'dark');
      }
    };

    media?.addEventListener?.('change', syncSystemPreference);
    return () => media?.removeEventListener?.('change', syncSystemPreference);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try { window.localStorage.setItem('theme', next); } catch {}
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 text-[#cdd8c9]"
        aria-label="Theme preference"
        disabled
      >
        <span className="text-sm" aria-hidden="true">◐</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 transition-colors hover:border-gold/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-goldl"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
