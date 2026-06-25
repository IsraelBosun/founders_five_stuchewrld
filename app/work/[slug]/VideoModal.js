'use client';

import { useState, useEffect, useRef } from 'react';

export default function VideoModal({ videoUrl, gradient, label, fill }) {
  const [open, setOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setVideoError(false);
      videoRef.current?.play().catch(() => {});
    } else {
      document.body.style.overflow = '';
      videoRef.current?.pause();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!videoUrl) {
    return (
      <div style={{ width: '100%', ...(fill ? { height: '100%' } : { aspectRatio: '16/9' }), background: gradient, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444' }}>
            Video coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          width: '100%',
          ...(fill ? { height: '100%' } : { aspectRatio: '16/9' }),
          background: gradient,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <video
          src={videoUrl}
          muted
          playsInline
          preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label={`Play ${label}`}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '1px solid rgba(245,230,211,0.25)',
              background: 'rgba(245,230,211,0.08)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <svg width="16" height="20" viewBox="0 0 10 12" fill="#F5E6D3" style={{ marginLeft: '3px', opacity: 0.9 }}>
              <path d="M0 0 L10 6 L0 12 Z" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '24px',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          {videoError ? (
            <div style={{ color: '#888', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#F5E6D3', marginBottom: '0.5rem' }}>VIDEO UNAVAILABLE</p>
              <p>The video file was uploaded with the wrong format.</p>
              <p style={{ marginTop: '0.5rem' }}>Re-upload it from the admin panel to fix this.</p>
              <a href={videoUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: '#F5E6D3', textDecoration: 'underline' }}>
                Open raw file ↗
              </a>
            </div>
          ) : (
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              onClick={e => e.stopPropagation()}
              onError={() => setVideoError(true)}
              style={{ maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
      )}
    </>
  );
}
