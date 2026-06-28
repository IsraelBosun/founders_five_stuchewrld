'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { founderContentDefaults, mergeFounderContent } from '../data/founderContent';
import { bannerContentDefaults, mergeBannerContent } from '../data/bannerContent';
import { contactContentDefaults, mergeContactContent, normalizeSocials } from '../data/contactContent';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORIES = ['MUSIC', 'BRAND', 'CORPORATE', 'EVENTS', 'OUTREACH', 'BTS'];
const CUSTOM_CATEGORY = '__CUSTOM__';
const VIDEO_CDN = process.env.NEXT_PUBLIC_VIDEO_CDN;
const BANNER_VIDEO_KEY = 'banner-hero.mp4';
const BANNER_POSTER_KEY = 'banner-hero-poster.jpg';

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function normalizeCategory(value) {
  return (value || '').trim().replace(/\s+/g, ' ').toUpperCase();
}

function r2KeyFromUrl(url) {
  return (url || '').split('?')[0].split('#')[0].split('/').pop();
}

const EMPTY = {
  slug: '', title: '', client: '', category: 'BRAND', label: '',
  year: new Date().getFullYear().toString(),
  gradient: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
  hero_gradient: 'linear-gradient(160deg, #0a0a0a 0%, #111111 100%)',
  synopsis: '', story: '', credits: {}, testimonial: null,
  sort_order: 99, published: false, video_url: '', preview_url: '', thumbnail_url: '',
};

// ─── Login ────────────────────────────────────────────────────────────────────

function EyeIcon({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <p className="font-mono text-xs tracking-[0.2em] text-[#666] uppercase mb-8">STUCHEWRLD / Admin</p>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
          className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-[#e8e8e8] text-sm outline-none focus:border-white/30"
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required
            className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 pr-11 text-[#e8e8e8] text-sm outline-none focus:border-white/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-[#888] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full bg-[#f5e6d3] text-[#0a0a0a] py-3 text-sm font-medium rounded disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

// ─── Shell (tabs + header) ────────────────────────────────────────────────────

function Shell({ tab, setTab, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tabs = ['projects', 'banner', 'contact', 'bts', 'founder', 'logos'];

  function chooseTab(nextTab) {
    setTab(nextTab);
    setSidebarOpen(false);
  }

  return (
    <div className={`admin-shell min-h-screen bg-[#0a0a0a] text-[#e8e8e8] ${sidebarOpen ? 'admin-sidebar-open' : ''}`}>
      <header className="admin-header admin-shell-topbar border-b border-white/6 sticky top-0 bg-[#0a0a0a] z-30">
        <div className="admin-header-inner flex items-center justify-between">
          <span className="admin-title font-mono text-xs tracking-[0.2em] text-[#666] uppercase">STUCHEWRLD / Admin</span>
          <div className="admin-header-actions flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="admin-view-site">View site</a>
            <button
              type="button"
              onClick={() => setSidebarOpen(open => !open)}
              className="admin-menu-toggle"
              aria-label={sidebarOpen ? 'Close admin menu' : 'Open admin menu'}
              aria-expanded={sidebarOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <button
        type="button"
        className="admin-sidebar-scrim"
        aria-label="Close admin menu"
        onClick={() => setSidebarOpen(false)}
      />
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-sidebar-brand">
          <span className="admin-title font-mono text-xs tracking-[0.2em] text-[#666] uppercase">STUCHEWRLD</span>
          <small>Admin studio</small>
        </div>
        <nav className="admin-tabs">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => chooseTab(t)}
              className={`font-mono text-xs uppercase tracking-widest ${tab === t ? 'is-active text-[#f5e6d3]' : 'text-[#666] hover:text-[#888]'}`}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-actions">
          <a href="/" target="_blank" rel="noreferrer" className="admin-sidebar-link">View page</a>
          <button onClick={onLogout} className="admin-sign-out text-[#666] text-xs hover:text-[#888]">Sign out</button>
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

// ─── Project List ─────────────────────────────────────────────────────────────

function ProjectList({ projects, onAdd, onEdit, onToggle, onDelete }) {
  return (
    <div className="admin-page-panel">
      <div className="admin-page-actions flex justify-end mb-6">
        <button onClick={onAdd} className="bg-[#f5e6d3] text-[#0a0a0a] px-4 py-2 text-xs font-medium rounded">
          + New Project
        </button>
      </div>
      {projects.length === 0 ? (
        <p className="text-[#666] text-sm">No projects yet.</p>
      ) : (
        <>
        <div className="admin-table-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#666] font-mono text-xs tracking-widest uppercase text-left border-b border-white/6">
              <th className="pb-3 pr-6">Title</th>
              <th className="pb-3 pr-6">Client</th>
              <th className="pb-3 pr-6">Category</th>
              <th className="pb-3 pr-6">Year</th>
              <th className="pb-3 pr-6">Published</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="border-b border-white/6">
                <td className="py-3 pr-6 text-[#f5e6d3]">{p.title}</td>
                <td className="py-3 pr-6 text-[#888]">{p.client}</td>
                <td className="py-3 pr-6 font-mono text-xs text-[#666]">{p.category}</td>
                <td className="py-3 pr-6 text-[#888]">{p.year}</td>
                <td className="py-3 pr-6">
                  <button
                    onClick={() => onToggle(p)}
                    className={`text-xs px-2 py-1 rounded ${p.published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
                  >
                    {p.published ? 'Live' : 'Draft'}
                  </button>
                </td>
                <td className="py-3">
                  <div className="flex gap-3">
                    <button onClick={() => onEdit(p)} className="text-[#888] hover:text-[#e8e8e8] text-xs">Edit</button>
                    <button onClick={() => onDelete(p.id)} className="text-red-800 hover:text-red-500 text-xs">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="admin-project-cards">
          {projects.map(p => (
            <article key={p.id} className="admin-list-card">
              <div>
                <p className="text-[#f5e6d3] text-sm">{p.title}</p>
                <p className="text-[#888] text-xs mt-1">{p.client}</p>
              </div>
              <div className="admin-card-meta-grid">
                <span><b>Category</b>{p.category}</span>
                <span><b>Year</b>{p.year}</span>
              </div>
              <div className="admin-list-card-actions">
                <button
                  onClick={() => onToggle(p)}
                  className={`text-xs px-2 py-1 rounded ${p.published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
                >
                  {p.published ? 'Live' : 'Draft'}
                </button>
                <button onClick={() => onEdit(p)} className="text-[#888] hover:text-[#e8e8e8] text-xs">Edit</button>
                <button onClick={() => onDelete(p.id)} className="text-red-800 hover:text-red-500 text-xs">Delete</button>
              </div>
            </article>
          ))}
        </div>
        </>
      )}
    </div>
  );
}

// ─── Video Upload Field ───────────────────────────────────────────────────────

async function convertToMp4(file, onProgress) {
  const [{ FFmpeg }, { fetchFile, toBlobURL }] = await Promise.all([
    import('@ffmpeg/ffmpeg'),
    import('@ffmpeg/util'),
  ]);
  const ffmpeg = new FFmpeg();
  const base = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  ffmpeg.on('progress', ({ progress }) => onProgress(Math.round(Math.min(progress, 1) * 100)));
  const ext = file.name.split('.').pop().toLowerCase();
  await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));
  await ffmpeg.exec([
    '-i', `input.${ext}`,
    '-c:v', 'libx264', '-crf', '23', '-preset', 'medium',
    '-c:a', 'aac', '-movflags', '+faststart',
    'output.mp4',
  ]);
  const data = await ffmpeg.readFile('output.mp4');
  return new File([data.buffer], file.name.replace(/\.[^.]+$/, '.mp4'), { type: 'video/mp4' });
}

function captureVideoFrame(file) {
  return new Promise(resolve => {
    const blobUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'metadata';
    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => { URL.revokeObjectURL(blobUrl); resolve(blob); }, 'image/jpeg', 0.85);
    }, { once: true });
    video.addEventListener('loadeddata', () => { video.currentTime = 2; }, { once: true });
    video.addEventListener('error', () => { URL.revokeObjectURL(blobUrl); resolve(null); }, { once: true });
    video.src = blobUrl;
    video.load();
  });
}

function captureVideoFrameFromUrl(videoUrl, seconds) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const separator = videoUrl.includes('?') ? '&' : '?';
    const frameUrl = `${videoUrl}${separator}frameCapture=${Date.now()}-${seconds}`;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'auto';

    const cleanup = () => {
      video.removeAttribute('src');
      video.load();
    };

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          cleanup();
          if (blob) resolve(blob);
          else reject(new Error('Could not capture that frame.'));
        }, 'image/jpeg', 0.85);
      } catch (err) {
        cleanup();
        reject(new Error('Browser blocked frame capture. Check R2 CORS for GET access.'));
      }
    }, { once: true });

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(seconds, Math.max(video.duration - 0.1, 0));
    }, { once: true });

    video.addEventListener('error', () => {
      cleanup();
      reject(new Error('Could not load this video for frame capture.'));
    }, { once: true });

    video.src = frameUrl;
    video.load();
  });
}

function imageFileToJpegBlob(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1280;
      canvas.height = img.naturalHeight || 720;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        URL.revokeObjectURL(url);
        if (blob) resolve(blob);
        else reject(new Error('Could not prepare this image.'));
      }, 'image/jpeg', 0.88);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read this image.'));
    };
    img.src = url;
  });
}

async function uploadImageToR2(file, key) {
  const blob = await imageFileToJpegBlob(file);
  const presign = await fetch('/api/r2-presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: key, contentType: 'image/jpeg' }),
  }).then(r => r.json());

  if (!presign.url) throw new Error(presign.error || 'Could not get image upload URL.');

  await fetch(presign.url, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/jpeg' },
    body: blob,
  });

  return `${presign.publicUrl}?v=${Date.now()}`;
}

function VideoUpload({ label, field, slug, projectId, value, thumbnail, videoKey: customVideoKey, thumbKey: customThumbKey, deleteKeys, onChange, onThumbnailChange, onAutoSave, onPosterSaved, onDeleted }) {
  const [progress, setProgress] = useState(null);
  const [convertProgress, setConvertProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [posterStatus, setPosterStatus] = useState('');
  const [frameOptions, setFrameOptions] = useState([]);
  const [selectedPoster, setSelectedPoster] = useState('');
  const [posterPreviewVersion, setPosterPreviewVersion] = useState(Date.now());
  const [posterPreviewError, setPosterPreviewError] = useState(false);
  const [posterPreviewAttempts, setPosterPreviewAttempts] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [filename, setFilename] = useState('');
  const [localThumb, setLocalThumb] = useState(thumbnail || '');
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef(null);
  const posterInputRef = useRef(null);

  useEffect(() => {
    setLocalThumb(thumbnail || '');
    setPosterPreviewError(false);
    setPosterPreviewAttempts(0);
    setPosterPreviewVersion(Date.now());
  }, [thumbnail]);
  useEffect(() => () => frameOptions.forEach(option => URL.revokeObjectURL(option.previewUrl)), [frameOptions]);

  function getThumbKey() {
    return customThumbKey || `${slug || 'project'}-poster.jpg`;
  }

  function displayUrl(url) {
    if (!url) return '';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}adminPreview=${posterPreviewVersion}`;
  }

  function retryPosterPreview() {
    setPosterPreviewError(false);
    setPosterPreviewAttempts(0);
    setPosterPreviewVersion(Date.now());
  }

  function handlePosterPreviewError() {
    if (posterPreviewAttempts < 6) {
      window.setTimeout(() => {
        setPosterPreviewAttempts(count => count + 1);
        setPosterPreviewVersion(Date.now());
      }, 900);
      return;
    }
    setPosterPreviewError(true);
  }

  async function savePosterBlob(blob, selected = '') {
    setPosterStatus('saving');
    const thumbKey = getThumbKey();
    try {
      const presign = await fetch('/api/r2-presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: thumbKey, contentType: 'image/jpeg' }),
      }).then(r => r.json());

      if (!presign.url) throw new Error(presign.error || 'Could not get poster upload URL.');

      await fetch(presign.url, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/jpeg' },
        body: blob,
      });

      const versionedPublicUrl = `${presign.publicUrl}?v=${Date.now()}`;
      setLocalThumb(versionedPublicUrl);
      setSelectedPoster(selected);
      setPosterPreviewError(false);
      setPosterPreviewAttempts(0);
      setPosterPreviewVersion(Date.now());
      onThumbnailChange?.(versionedPublicUrl);

      if (projectId) {
        const { error } = await supabase.from('projects').update({ thumbnail_url: versionedPublicUrl }).eq('id', projectId);
        if (error) throw new Error(error.message);
      }

      onPosterSaved?.(versionedPublicUrl);
      setPosterStatus('done');
    } catch (err) {
      setPosterStatus('');
      alert('Could not save poster image:\n' + err.message);
    }
  }

  async function handlePosterFile(file) {
    if (!file) return;
    setPosterStatus('preparing');
    try {
      const blob = await imageFileToJpegBlob(file);
      await savePosterBlob(blob, 'custom');
    } catch (err) {
      setPosterStatus('');
      alert('Could not use that image:\n' + err.message);
    } finally {
      if (posterInputRef.current) posterInputRef.current.value = '';
    }
  }

  async function generateFrameOptions() {
    if (!value) return;
    setPosterStatus('generating');
    frameOptions.forEach(option => URL.revokeObjectURL(option.previewUrl));
    setFrameOptions([]);

    try {
      const times = [1, 2, 4, 6, 8];
      const frames = [];
      for (const seconds of times) {
        const blob = await captureVideoFrameFromUrl(value, seconds);
        frames.push({ seconds, blob, previewUrl: URL.createObjectURL(blob) });
      }
      setFrameOptions(frames);
      setPosterStatus('');
    } catch (err) {
      setPosterStatus('');
      alert('Could not generate frame options:\n' + err.message);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this video? It will be permanently removed from Cloudflare R2 and cannot be undone.')) return;
    setDeleting(true);

    const keys = deleteKeys || [value, thumbnail].filter(Boolean).map(r2KeyFromUrl);
    try {
      if (keys.length > 0) {
        const res = await fetch('/api/r2-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keys }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Delete failed');
      }
      if (projectId) {
        const { error } = await supabase.from('projects').update({ video_url: null, thumbnail_url: null }).eq('id', projectId);
        if (error) throw new Error(error.message);
      }
    } catch (err) {
      alert('Delete failed:\n' + err.message);
      setDeleting(false);
      return;
    }

    onChange('');
    onThumbnailChange?.('');
    setStatus('');
    setFilename('');
    setLocalThumb('');
    setDeleting(false);
    onDeleted?.();
  }

  async function processFile(file) {
    if (!file) return;
    setFilename(file.name);
    setProgress(0);

    // Convert non-MP4 to H.264 MP4 in the browser
    let fileToUpload = file;
    const needsConversion = file.type !== 'video/mp4' && !file.name.toLowerCase().endsWith('.mp4');
    if (needsConversion) {
      setStatus('converting');
      setConvertProgress(0);
      try {
        fileToUpload = await convertToMp4(file, setConvertProgress);
      } catch (err) {
        setStatus('');
        alert('Conversion failed — try Handbrake instead.\n\n' + err.message);
        return;
      }
    }

    setStatus('uploading');
    let thumbBlob;
    try {
      thumbBlob = await captureVideoFrame(fileToUpload);
    } catch {
      thumbBlob = null;
    }
    const videoContentType = 'video/mp4';
    const videoKey = customVideoKey || `${slug || 'project'}-${field === 'video_url' ? 'full' : 'preview'}.mp4`;
    const thumbKey = customThumbKey || `${slug || 'project'}-poster.jpg`;

    let videoPresign, thumbPresign;
    try {
      [videoPresign, thumbPresign] = await Promise.all([
        fetch('/api/r2-presign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: videoKey, contentType: videoContentType }),
        }).then(r => r.json()),
        thumbBlob
          ? fetch('/api/r2-presign', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename: thumbKey, contentType: 'image/jpeg' }),
            }).then(r => r.json())
          : Promise.resolve(null),
      ]);
    } catch (err) {
      setStatus('');
      setProgress(null);
      alert('Could not get upload URL — check your R2 credentials.\n\n' + err.message);
      return;
    }

    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = ev => {
          if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`R2 rejected the upload (${xhr.status}). Check your bucket CORS policy and that the bucket is public.`));
        };
        xhr.onerror = () => reject(new Error('Network error — check your internet connection and R2 endpoint.'));
        xhr.open('PUT', videoPresign.url);
        xhr.setRequestHeader('Content-Type', videoContentType);
        xhr.send(fileToUpload);
      });
    } catch (err) {
      setStatus('');
      setProgress(null);
      alert('Upload failed.\n\n' + err.message);
      return;
    }

    let thumbPublicUrl = '';
    if (thumbBlob && thumbPresign) {
      await fetch(thumbPresign.url, { method: 'PUT', headers: { 'Content-Type': 'image/jpeg' }, body: thumbBlob });
      thumbPublicUrl = `${thumbPresign.publicUrl}?v=${Date.now()}`;
      setLocalThumb(thumbPublicUrl);
      setPosterPreviewError(false);
      setPosterPreviewAttempts(0);
      setPosterPreviewVersion(Date.now());
      onThumbnailChange?.(thumbPublicUrl);
    }

    onChange(videoPresign.publicUrl);
    setStatus('done');
    setProgress(null);
    onAutoSave?.(videoPresign.publicUrl, thumbPublicUrl || undefined);
  }

  const hasVideo = status === 'done' || !!value;
  const displayThumb = localThumb;
  const displayThumbSrc = displayUrl(displayThumb);

  return (
    <div>
      <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-3">{label}</label>

      {hasVideo && (
        <div className="rounded-lg overflow-hidden mb-3 border border-white/10" style={{ background: '#050505' }}>
          {displayThumb && !posterPreviewError ? (
            <div className="grid md:grid-cols-[220px_1fr]">
              <div style={{ position: 'relative', minHeight: '124px', background: '#030303' }}>
                <img
                  src={displayThumbSrc}
                  alt="Current poster"
                  crossOrigin="anonymous"
                  className="w-full h-full"
                  onLoad={() => {
                    setPosterPreviewError(false);
                    setPosterPreviewAttempts(0);
                  }}
                  onError={handlePosterPreviewError}
                  style={{ aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', left: 10, bottom: 10, padding: '4px 7px', borderRadius: 999, background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(245,230,211,0.18)' }}>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#f5e6d3]">Current poster</span>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-center gap-2">
                <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Poster ready</p>
                <p className="text-[#888] text-sm truncate">{filename || r2KeyFromUrl(value)}</p>
                <p className="text-[#666] text-xs">This poster is what the homepage shows before the video preview plays.</p>
              </div>
            </div>
          ) : displayThumb && posterPreviewError ? (
            <div className="p-4">
              <p className="text-amber-300 text-xs">Poster saved, but the image preview could not load yet.</p>
              <p className="text-[#666] text-xs break-all mt-2">{displayThumb}</p>
              <button
                type="button"
                onClick={retryPosterPreview}
                className="mt-3 font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded border border-white/10 text-[#888] hover:text-[#f5e6d3] hover:border-white/20"
              >
                Retry preview
              </button>
            </div>
          ) : value ? (
            <div className="p-4">
              <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Poster missing</p>
              <p className="text-[#888] text-sm mt-2">Upload or generate a poster image for this project.</p>
            </div>
          ) : (
            <div className="p-4 text-[#666] text-xs">Video uploaded. Saving preview...</div>
          )}
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[#666] text-xs truncate max-w-xs">{filename || value?.split('/').pop()}</p>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-red-800 hover:text-red-500 ml-3 flex-shrink-0 disabled:opacity-40"
            >
              {deleting ? 'Deleting…' : 'Delete video'}
            </button>
          </div>
        </div>
      )}

      {hasVideo && (
        <div className="mb-3 rounded-lg border border-white/6 p-4 space-y-4" style={{ background: 'rgba(255,255,255,0.025)' }}>
          <div className="admin-upload-toolbar flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Poster image</p>
              <p className="text-[#888] text-sm mt-1">Upload a custom image or pick one generated from the video.</p>
            </div>
            <div className="admin-upload-actions flex items-center gap-2">
              <button
                type="button"
                onClick={() => posterInputRef.current?.click()}
                disabled={posterStatus === 'saving' || posterStatus === 'generating' || posterStatus === 'preparing'}
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded border border-white/10 text-[#888] hover:text-[#f5e6d3] hover:border-white/20 disabled:opacity-40"
              >
                Upload image
              </button>
              <button
                type="button"
                onClick={generateFrameOptions}
                disabled={!value || posterStatus === 'saving' || posterStatus === 'generating' || posterStatus === 'preparing'}
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded border border-white/10 text-[#888] hover:text-[#f5e6d3] hover:border-white/20 disabled:opacity-40"
              >
                {posterStatus === 'generating' ? 'Generating...' : 'Generate frames'}
              </button>
            </div>
            <input
              ref={posterInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={e => handlePosterFile(e.target.files?.[0])}
              className="hidden"
            />
          </div>

          {posterStatus && posterStatus !== 'generating' && (
            <p className={posterStatus === 'done' ? 'text-green-400 text-xs' : 'text-[#666] text-xs'}>
              {posterStatus === 'preparing' ? 'Preparing poster image...' : posterStatus === 'saving' ? 'Saving poster image...' : 'Poster image saved.'}
            </p>
          )}

          {frameOptions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#666]">Frame options</p>
                <p className="text-[#555] text-xs">Click a frame to save it</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {frameOptions.map(option => {
                  const selected = selectedPoster === `${option.seconds}s`;
                  return (
                    <button
                      key={option.seconds}
                      type="button"
                      onClick={() => savePosterBlob(option.blob, `${option.seconds}s`)}
                      disabled={posterStatus === 'saving'}
                      className="overflow-hidden rounded text-left disabled:opacity-50"
                      style={{
                        background: '#050505',
                        border: selected ? '1px solid #f5e6d3' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: selected ? '0 0 0 1px rgba(245,230,211,0.35)' : 'none',
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={option.previewUrl}
                          alt={`${option.seconds}s poster option`}
                          style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
                        />
                        {selected && (
                          <span
                            className="font-mono text-[9px] uppercase tracking-widest"
                            style={{
                              position: 'absolute',
                              top: 6,
                              right: 6,
                              color: '#0a0a0a',
                              background: '#f5e6d3',
                              borderRadius: 999,
                              padding: '3px 6px',
                            }}
                          >
                            Selected
                          </span>
                        )}
                      </div>
                      <span className="block px-2 py-1 font-mono text-[10px] text-[#888]">{option.seconds}s</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div
        onClick={() => !hasVideo && status !== 'uploading' && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); processFile(e.dataTransfer.files?.[0]); }}
        className="rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors"
        style={{
          height: hasVideo ? '48px' : '120px',
          cursor: hasVideo || status === 'uploading' ? 'default' : 'pointer',
          borderColor: dragOver ? 'rgba(245,230,211,0.4)' : hasVideo ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)',
          background: dragOver ? 'rgba(245,230,211,0.04)' : 'rgba(255,255,255,0.02)',
        }}
      >
        {status === 'converting' ? (
          <div className="w-full px-8 space-y-2">
            <p className="text-xs text-[#888] truncate text-center">{filename}</p>
            <div className="h-1 bg-white/10 rounded overflow-hidden">
              {convertProgress > 0
                ? <div className="h-full bg-amber-400/70 transition-all duration-200" style={{ width: `${convertProgress}%` }} />
                : <div className="h-full bg-amber-400/40 animate-pulse w-full" />
              }
            </div>
            <p className="text-xs text-[#666] text-center">
              {convertProgress > 0 ? `Converting ${convertProgress}%` : 'Loading converter…'}
            </p>
          </div>
        ) : status === 'uploading' ? (
          <div className="w-full px-8 space-y-2">
            <p className="text-xs text-[#888] truncate text-center">{filename}</p>
            <div className="h-1 bg-white/10 rounded overflow-hidden">
              <div className="h-full bg-[#f5e6d3] transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-[#666] text-center">{progress}%</p>
          </div>
        ) : hasVideo ? (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
            className="text-xs text-[#666] hover:text-[#888] underline"
          >
            Replace video
          </button>
        ) : (
          <>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            <p className="text-[#666] text-sm">Drop video here or <span className="text-[#f5e6d3]">click to browse</span></p>
            <p className="text-[#444] text-xs">MP4 recommended · pre-compress with Handbrake first</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file" accept="video/mp4,video/*"
          onChange={e => processFile(e.target.files?.[0])}
          className="hidden"
        />
      </div>
    </div>
  );
}

// ─── Credits Editor ───────────────────────────────────────────────────────────

function CreditsEditor({ value, onChange }) {
  const pairs = Object.entries(value || {});

  function update(index, key, val) {
    const next = [...pairs];
    next[index] = [key, val];
    onChange(Object.fromEntries(next));
  }

  function add() {
    onChange({ ...value, '': '' });
  }

  function remove(index) {
    onChange(Object.fromEntries(pairs.filter((_, i) => i !== index)));
  }

  return (
    <div className="space-y-2">
      {pairs.map(([k, v], i) => (
        <div key={i} className="credits-row flex gap-2">
          <input
            value={k} placeholder="Label" onChange={e => update(i, e.target.value, v)}
            className="flex-1 bg-[#111] border border-white/10 rounded px-3 py-2 text-xs text-[#888] outline-none focus:border-white/30"
          />
          <input
            value={v} placeholder="Value" onChange={e => update(i, k, e.target.value)}
            className="flex-1 bg-[#111] border border-white/10 rounded px-3 py-2 text-xs text-[#e8e8e8] outline-none focus:border-white/30"
          />
          <button onClick={() => remove(i)} className="text-red-800 hover:text-red-500 text-xs px-2">✕</button>
        </div>
      ))}
      <button onClick={add} className="text-xs text-[#666] hover:text-[#888]">+ Add credit</button>
    </div>
  );
}

// ─── Project Form ─────────────────────────────────────────────────────────────

function ProjectForm({ initial, onSave, onCancel, saving, onAutoSave }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [hasTestimonial, setHasTestimonial] = useState(!!initial?.testimonial);
  const initialCategory = normalizeCategory(initial?.category || EMPTY.category);
  const hasCustomCategory = initialCategory && !CATEGORIES.includes(initialCategory);
  const [categoryMode, setCategoryMode] = useState(hasCustomCategory ? CUSTOM_CATEGORY : initialCategory);
  const [customCategory, setCustomCategory] = useState(hasCustomCategory ? initialCategory : '');

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function updateCategoryMode(value) {
    setCategoryMode(value);
    if (value === CUSTOM_CATEGORY) {
      set('category', customCategory);
      return;
    }
    set('category', value);
  }

  function updateCustomCategory(value) {
    const normalized = normalizeCategory(value);
    setCustomCategory(normalized);
    set('category', normalized);
  }

  function handleTitleBlur() {
    if (!form.slug) set('slug', slugify(form.title));
    if (!form.label) set('label', `${form.category} · ${new Date().getFullYear()}`);
  }

  function submit(e) {
    e.preventDefault();
    const category = categoryMode === CUSTOM_CATEGORY ? normalizeCategory(customCategory) : normalizeCategory(form.category);
    if (!category || category === 'ALL') {
      alert('Choose a category or enter a custom category.');
      return;
    }
    onSave({ ...form, category, testimonial: hasTestimonial ? form.testimonial : null });
  }

  const field = (label, key, type = 'text', extra = {}) => (
    <div>
      <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">{label}</label>
      <input
        type={type} value={form[key] ?? ''} onChange={e => set(key, e.target.value)}
        className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        {...extra}
      />
    </div>
  );

  const textarea = (label, key, rows = 4) => (
    <div>
      <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">{label}</label>
      <textarea
        rows={rows} value={form[key] ?? ''} onChange={e => set(key, e.target.value)}
        className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30 resize-y"
      />
    </div>
  );

  return (
    <div className="admin-shell min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <header className="admin-header border-b border-white/6 sticky top-0 bg-[#0a0a0a] z-10">
        <div className="admin-header-inner flex items-center justify-between">
        <span className="admin-title font-mono text-xs tracking-[0.2em] text-[#666] uppercase">
          {initial?.id ? `Edit · ${initial.title}` : 'New Project'}
        </span>
        <div className="admin-form-actions flex gap-3">
          <button onClick={onCancel} className="text-[#666] text-xs px-3 py-2 hover:text-[#888]">← Back</button>
          <button
            onClick={submit} disabled={saving}
            className="bg-[#f5e6d3] text-[#0a0a0a] px-4 py-2 text-xs font-medium rounded disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save project'}
          </button>
        </div>
        </div>
      </header>

      <form onSubmit={submit} className="admin-page-panel admin-page-panel-narrow space-y-6">
        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div className="col-span-2">{field('Title', 'title', 'text', { onBlur: handleTitleBlur })}</div>
          {field('Slug', 'slug')}
          {field('Client', 'client')}
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Category</label>
            <select
              value={categoryMode} onChange={e => updateCategoryMode(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              <option value={CUSTOM_CATEGORY}>CUSTOM</option>
            </select>
            {categoryMode === CUSTOM_CATEGORY && (
              <input
                value={customCategory}
                onChange={e => updateCustomCategory(e.target.value)}
                placeholder="e.g. DOCUMENTARY"
                className="mt-3 w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
              />
            )}
          </div>
          {field('Label', 'label')}
          {field('Year', 'year')}
          {field('Sort order', 'sort_order', 'number')}
        </div>

        {textarea('Synopsis', 'synopsis', 3)}
        {textarea('Story', 'story', 6)}

        <div>
          <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-3">Credits</label>
          <CreditsEditor value={form.credits} onChange={val => set('credits', val)} />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest">Testimonial</label>
            <button
              type="button"
              onClick={() => {
                setHasTestimonial(h => !h);
                if (!form.testimonial) set('testimonial', { quote: '', author: '', role: '' });
              }}
              className={`text-xs px-2 py-1 rounded ${hasTestimonial ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
            >
              {hasTestimonial ? 'On' : 'Off'}
            </button>
          </div>
          {hasTestimonial && (
            <div className="space-y-3">
              <textarea
                rows={3} placeholder="Quote" value={form.testimonial?.quote ?? ''}
                onChange={e => set('testimonial', { ...form.testimonial, quote: e.target.value })}
                className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30 resize-y"
              />
              <div className="admin-form-grid grid grid-cols-2 gap-3">
                <input
                  placeholder="Author" value={form.testimonial?.author ?? ''}
                  onChange={e => set('testimonial', { ...form.testimonial, author: e.target.value })}
                  className="bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
                />
                <input
                  placeholder="Role / Company" value={form.testimonial?.role ?? ''}
                  onChange={e => set('testimonial', { ...form.testimonial, role: e.target.value })}
                  className="bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/6 pt-6">
          <VideoUpload
            label="Project video (MP4)"
            field="video_url"
            slug={form.slug}
            projectId={initial?.id}
            value={form.video_url}
            thumbnail={form.thumbnail_url}
            onChange={url => set('video_url', url)}
            onThumbnailChange={url => set('thumbnail_url', url)}
            onAutoSave={initial?.id ? (videoUrl, thumbUrl) => onAutoSave?.(initial.id, videoUrl, thumbUrl) : undefined}
          />
        </div>

        <div className="flex items-center gap-3 border-t border-white/6 pt-6">
          <span className="font-mono text-xs text-[#666] uppercase tracking-widest">Published</span>
          <button
            type="button" onClick={() => set('published', !form.published)}
            className={`text-xs px-3 py-1.5 rounded ${form.published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
          >
            {form.published ? 'Live' : 'Draft'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Logo Manager ─────────────────────────────────────────────────────────────

function BannerManager({ content, error, onRefresh }) {
  const defaultVideoUrl = VIDEO_CDN ? `${VIDEO_CDN}/${BANNER_VIDEO_KEY}` : '';
  const defaultPosterUrl = VIDEO_CDN ? `${VIDEO_CDN}/${BANNER_POSTER_KEY}` : '';
  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);
  const [posterUrl, setPosterUrl] = useState(defaultPosterUrl);
  const [form, setForm] = useState(mergeBannerContent(content));
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    const storedVideoUrl = localStorage.getItem('stuche-banner-video-url') || defaultVideoUrl;
    const storedPosterUrl = localStorage.getItem('stuche-banner-poster-url') || defaultPosterUrl;
    setVideoUrl(storedVideoUrl);
    setPosterUrl(storedPosterUrl);

    if (!VIDEO_CDN) return;

    fetch(defaultVideoUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) setVideoUrl(defaultVideoUrl);
      })
      .catch(() => {});

    fetch(defaultPosterUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) setPosterUrl(defaultPosterUrl);
      })
      .catch(() => {});
  }, [defaultPosterUrl, defaultVideoUrl]);

  useEffect(() => {
    setForm(mergeBannerContent(content));
  }, [content]);

  function saveVideoUrl(url) {
    setVideoUrl(url);
    if (url) localStorage.setItem('stuche-banner-video-url', url);
    else localStorage.removeItem('stuche-banner-video-url');
  }

  function savePosterUrl(url) {
    setPosterUrl(url);
    if (url) localStorage.setItem('stuche-banner-poster-url', url);
    else localStorage.removeItem('stuche-banner-poster-url');
  }

  function setField(field, value) {
    setForm(current => ({ ...current, [field]: value }));
  }

  async function saveCopy(e) {
    e.preventDefault();
    setSaving(true);
    setLocalError('');

    const payload = {
      ...bannerContentDefaults,
      ...form,
      id: 'main',
      updated_at: new Date().toISOString(),
    };
    delete payload.created_at;

    const { error: saveError } = await supabase
      .from('banner_content')
      .upsert(payload, { onConflict: 'id' });

    if (saveError) {
      setLocalError(saveError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    onRefresh?.();
  }

  return (
    <div className="admin-page-panel admin-page-panel-narrow">
      <div className="admin-card border border-white/6 rounded-lg p-6 space-y-5">
        <div>
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Homepage banner video</p>
          <p className="text-[#888] text-sm mt-3 leading-6">
            Upload the hero banner video here. It replaces the file the homepage uses automatically.
          </p>
        </div>

        {!VIDEO_CDN && (
          <p className="text-red-400 text-xs">
            NEXT_PUBLIC_VIDEO_CDN is not set, so the homepage cannot load the banner after upload.
          </p>
        )}

        <VideoUpload
          label="Banner video (MP4)"
          field="video_url"
          slug="banner"
          value={videoUrl}
          thumbnail={posterUrl}
          videoKey={BANNER_VIDEO_KEY}
          thumbKey={BANNER_POSTER_KEY}
          deleteKeys={[BANNER_VIDEO_KEY, BANNER_POSTER_KEY]}
          onChange={saveVideoUrl}
          onThumbnailChange={savePosterUrl}
        />

        <div className="border-t border-white/6 pt-5 space-y-2">
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Homepage reads</p>
          <p className="text-[#666] text-xs break-all">{defaultVideoUrl || 'Set NEXT_PUBLIC_VIDEO_CDN first'}</p>
          <p className="text-[#666] text-xs break-all">{defaultPosterUrl || 'Set NEXT_PUBLIC_VIDEO_CDN first'}</p>
        </div>
      </div>

      <form onSubmit={saveCopy} className="admin-card border border-white/6 rounded-lg p-6 mt-8 space-y-5">
        <div>
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Homepage banner text</p>
          <p className="text-[#888] text-sm mt-3 leading-6">
            This controls the hero copy and the manifesto text below it.
          </p>
        </div>

        {error && (
          <p className="text-yellow-400 text-xs leading-5">
            Banner text table is not ready yet. Run scripts/banner_content.sql in Supabase.
            <br />
            {error}
          </p>
        )}
        {localError && <p className="text-red-400 text-xs">{localError}</p>}

        <div>
          <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Top label</label>
          <input
            value={form.hero_eyebrow}
            onChange={e => setField('hero_eyebrow', e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Headline</label>
          <textarea
            value={form.hero_headline}
            onChange={e => setField('hero_headline', e.target.value)}
            rows={4}
            className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30 resize-y"
          />
        </div>

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Italic word</label>
            <input
              value={form.hero_headline_emphasis}
              onChange={e => setField('hero_headline_emphasis', e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Showreel label</label>
            <input
              value={form.showreel_label}
              onChange={e => setField('showreel_label', e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Scroll label</label>
            <input
              value={form.scroll_label}
              onChange={e => setField('scroll_label', e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Manifesto label</label>
            <input
              value={form.manifesto_label}
              onChange={e => setField('manifesto_label', e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Manifesto body</label>
          <textarea
            value={form.manifesto_body}
            onChange={e => setField('manifesto_body', e.target.value)}
            rows={5}
            className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30 resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
        >
          {saving ? 'Saving...' : 'Save banner text'}
        </button>
      </form>
    </div>
  );
}

function BtsEditPanel({ item, onSave }) {
  const [title, setTitle] = useState(item.title || '');
  const [label, setLabel] = useState(item.label || '');
  const [year, setYear] = useState(item.year || new Date().getFullYear().toString());
  const [sortOrder, setSortOrder] = useState((item.sort_order ?? 99).toString());
  const [published, setPublished] = useState(!!item.published);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(item.title || '');
    setLabel(item.label || '');
    setYear(item.year || new Date().getFullYear().toString());
    setSortOrder((item.sort_order ?? 99).toString());
    setPublished(!!item.published);
  }, [item]);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    await onSave(item.id, {
      title: title.trim(),
      label: label.trim() || `BTS - ${year}`,
      year,
      sort_order: parseInt(sortOrder) || 99,
      published,
      credits: { ...(item.credits || {}), Year: year },
    });
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="admin-form-grid grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div>
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Label</label>
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div>
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Year</label>
        <input
          value={year}
          onChange={e => setYear(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div>
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Sort order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => setPublished(v => !v)}
          className={`text-xs px-3 py-2 rounded ${published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
        >
          {published ? 'Live in Off Camera' : 'Draft'}
        </button>
      </div>
      <div className="col-span-2">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}

function BtsImageEditPanel({ image, onSave, onReplace }) {
  const [label, setLabel] = useState(image.label || '');
  const [altText, setAltText] = useState(image.alt_text || '');
  const [sortOrder, setSortOrder] = useState((image.sort_order ?? 99).toString());
  const [rotate, setRotate] = useState(image.rotate || '0deg');
  const [published, setPublished] = useState(!!image.published);
  const [saving, setSaving] = useState(false);
  const [replacing, setReplacing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setLabel(image.label || '');
    setAltText(image.alt_text || '');
    setSortOrder((image.sort_order ?? 99).toString());
    setRotate(image.rotate || '0deg');
    setPublished(!!image.published);
  }, [image]);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    await onSave(image.id, {
      label: label.trim(),
      alt_text: altText.trim() || null,
      sort_order: parseInt(sortOrder) || 99,
      rotate: rotate.trim() || '0deg',
      published,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
  }

  async function handleReplace(file) {
    if (!file) return;
    setReplacing(true);
    await onReplace(image, file);
    setReplacing(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <form onSubmit={submit} className="admin-form-grid grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Label</label>
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div className="col-span-2">
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Alt text</label>
        <input
          value={altText}
          onChange={e => setAltText(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div>
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Sort order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div>
        <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Rotation</label>
        <input
          value={rotate}
          onChange={e => setRotate(e.target.value)}
          placeholder="-2deg"
          className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
        />
      </div>
      <div className="col-span-2 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setPublished(v => !v)}
          className={`text-xs px-3 py-2 rounded ${published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
        >
          {published ? 'Live in BTS' : 'Draft'}
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={replacing}
          className="font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded border border-white/10 text-[#888] hover:text-[#f5e6d3] hover:border-white/20 disabled:opacity-40"
        >
          {replacing ? 'Replacing...' : 'Replace image'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={e => handleReplace(e.target.files?.[0])}
          className="hidden"
        />
      </div>
      <div className="col-span-2">
        <button
          type="submit"
          disabled={saving || !label.trim()}
          className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
        >
          {saving ? 'Saving...' : 'Save image details'}
        </button>
      </div>
    </form>
  );
}

function BtsImageManager({ images, error, onRefresh }) {
  const [label, setLabel] = useState('');
  const [altText, setAltText] = useState('');
  const [sortOrder, setSortOrder] = useState('99');
  const [rotate, setRotate] = useState('0deg');
  const [published, setPublished] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeEdit, setActiveEdit] = useState(null);
  const [localError, setLocalError] = useState('');
  const inputRef = useRef(null);

  function pickFile(nextFile) {
    if (!nextFile) return;
    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
    if (!label.trim()) setLabel(nextFile.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
  }

  async function save(e) {
    e.preventDefault();
    if (!file || !label.trim()) {
      setLocalError('Image and label are required.');
      return;
    }

    setSaving(true);
    setLocalError('');

    try {
      const key = `bts-${slugify(label)}-${Date.now()}.jpg`;
      const imageUrl = await uploadImageToR2(file, key);
      const { error: insertErr } = await supabase.from('bts_images').insert({
        label: label.trim(),
        alt_text: altText.trim() || null,
        image_url: imageUrl,
        sort_order: parseInt(sortOrder) || 99,
        rotate: rotate.trim() || '0deg',
        published,
      });
      if (insertErr) throw insertErr;

      setLabel('');
      setAltText('');
      setSortOrder('99');
      setRotate('0deg');
      setPublished(true);
      setFile(null);
      setPreview('');
      if (inputRef.current) inputRef.current.value = '';
      onRefresh();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function updateImage(id, update) {
    const { error: updateErr } = await supabase.from('bts_images').update(update).eq('id', id);
    if (updateErr) {
      alert('Could not update BTS image:\n' + updateErr.message);
      return;
    }
    setActiveEdit(null);
    onRefresh();
  }

  async function replaceImage(image, nextFile) {
    try {
      const oldKey = r2KeyFromUrl(image.image_url);
      const key = `bts-${slugify(image.label || 'image')}-${Date.now()}.jpg`;
      const imageUrl = await uploadImageToR2(nextFile, key);
      const { error: updateErr } = await supabase
        .from('bts_images')
        .update({ image_url: imageUrl, updated_at: new Date().toISOString() })
        .eq('id', image.id);
      if (updateErr) throw updateErr;

      if (oldKey) {
        await fetch('/api/r2-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keys: [oldKey] }),
        });
      }
      onRefresh();
    } catch (err) {
      alert('Could not replace BTS image:\n' + err.message);
    }
  }

  async function deleteImage(image) {
    if (!confirm(`Delete "${image.label}"? This removes the BTS image from the site.`)) return;
    const key = r2KeyFromUrl(image.image_url);
    try {
      if (key) {
        const res = await fetch('/api/r2-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keys: [key] }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Delete failed');
      }
      const { error: deleteErr } = await supabase.from('bts_images').delete().eq('id', image.id);
      if (deleteErr) throw deleteErr;
      onRefresh();
    } catch (err) {
      alert('Could not delete BTS image:\n' + err.message);
    }
  }

  return (
    <div className="admin-card border border-white/6 rounded-lg p-6 space-y-6">
      <div>
        <p className="font-mono text-xs text-[#666] uppercase tracking-widest">BTS images</p>
        <p className="text-[#888] text-sm mt-2">These images feed the homepage Off Camera polaroids and the BTS archive.</p>
      </div>

      {error && (
        <div className="rounded border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-amber-300 text-xs">BTS images table is not available yet.</p>
          <p className="text-[#888] text-xs mt-2">Run the SQL in scripts/bts_images.sql in Supabase, then refresh this page.</p>
          <p className="text-[#666] text-xs mt-2 break-all">{error}</p>
        </div>
      )}

      <form onSubmit={save} className="space-y-5">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          className="rounded-lg border border-dashed border-white/10 p-4 cursor-pointer hover:border-white/20 transition-colors"
        >
          {preview ? (
            <img src={preview} alt="" className="w-full max-h-72 object-cover rounded" />
          ) : (
            <div className="py-10 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-[#666]">Upload BTS image</p>
              <p className="text-[#888] text-sm mt-2">JPEG, PNG, or WebP</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={e => pickFile(e.target.files?.[0])}
            className="hidden"
          />
        </div>

        {(localError || error) && <p className="text-red-400 text-xs">{localError || 'Create the bts_images table before uploading.'}</p>}

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Label</label>
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="SET - CALL"
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Alt text</label>
            <input
              value={altText}
              onChange={e => setAltText(e.target.value)}
              placeholder="Behind the scenes on set"
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Sort order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Rotation</label>
            <input
              value={rotate}
              onChange={e => setRotate(e.target.value)}
              placeholder="-2deg"
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPublished(v => !v)}
            className={`text-xs px-3 py-2 rounded ${published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
          >
            {published ? 'Live in BTS' : 'Draft'}
          </button>
          <button
            type="submit"
            disabled={saving || error || !file || !label.trim()}
            className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
          >
            {saving ? 'Uploading...' : 'Save BTS image'}
          </button>
          {preview && (
            <button
              type="button"
              onClick={() => { setFile(null); setPreview(''); }}
              className="text-xs text-[#666] hover:text-[#888]"
            >
              Remove file
            </button>
          )}
        </div>
      </form>

      {images.length > 0 && (
        <div className="space-y-3">
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Uploaded BTS images</p>
          <div className="admin-bts-image-grid">
            {images.map(image => (
              <article key={image.id} className="border border-white/6 rounded overflow-hidden bg-black/20">
                <img
                  src={image.image_url}
                  alt={image.alt_text || image.label}
                  crossOrigin="anonymous"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-[#e8e8e8]">{image.label}</p>
                      <p className="font-mono text-xs text-[#666]">order: {image.sort_order} / {image.rotate || '0deg'}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${image.published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}>
                      {image.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveEdit(activeEdit === image.id ? null : image.id)}
                      className="text-[#888] hover:text-[#e8e8e8] text-xs"
                    >
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteImage(image)} className="text-red-800 hover:text-red-500 text-xs">Delete</button>
                  </div>
                </div>
                {activeEdit === image.id && (
                  <div className="border-t border-white/6 p-3">
                    <BtsImageEditPanel image={image} onSave={updateImage} onReplace={replaceImage} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BtsManager({ items, images, imageError, onRefresh, onImagesRefresh }) {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [sortOrder, setSortOrder] = useState('99');
  const [published, setPublished] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activePanel, setActivePanel] = useState(null);

  const slug = title ? `bts-${slugify(title)}` : 'bts-video';

  async function save(e) {
    e.preventDefault();
    if (!title.trim() || !videoUrl) {
      setError('Title and video are required.');
      return;
    }

    setError('');
    setSaving(true);

    const { error: insertErr } = await supabase.from('projects').insert({
      slug: `${slug}-${Date.now()}`,
      title: title.trim(),
      client: 'STUCHEWRLD Inc.',
      category: 'BTS',
      label: label.trim() || `BTS - ${year}`,
      year,
      gradient: 'linear-gradient(135deg, #12110d 0%, #0b0d10 48%, #050608 100%)',
      hero_gradient: 'linear-gradient(160deg, #17140d 0%, #0b0d10 42%, #050608 100%)',
      synopsis: 'A behind-the-scenes cut from the STUCHEWRLD archive.',
      story: 'Raw process footage from the work behind the frame.',
      credits: { Producer: 'STUCHEWRLD Inc.', Type: 'Behind the scenes', Year: year },
      testimonial: null,
      sort_order: parseInt(sortOrder) || 99,
      published,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl || null,
    });

    setSaving(false);
    if (insertErr) {
      setError(insertErr.message);
      return;
    }

    setTitle('');
    setLabel('');
    setYear(new Date().getFullYear().toString());
    setSortOrder('99');
    setPublished(true);
    setVideoUrl('');
    setThumbnailUrl('');
    onRefresh();
  }

  async function deleteItem(item) {
    if (!confirm(`Delete "${item.title}"? This removes the BTS record and its R2 video files.`)) return;
    const keys = [item.video_url, item.thumbnail_url].filter(Boolean).map(r2KeyFromUrl);

    if (keys.length > 0) {
      const res = await fetch('/api/r2-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert('Could not delete R2 files:\n' + (json.error || 'Delete failed'));
        return;
      }
    }

    await supabase.from('projects').delete().eq('id', item.id);
    onRefresh();
  }

  async function updateItemVideo(id, nextVideoUrl, nextThumbnailUrl) {
    const update = { video_url: nextVideoUrl };
    if (nextThumbnailUrl) update.thumbnail_url = nextThumbnailUrl;
    const { error: updateErr } = await supabase.from('projects').update(update).eq('id', id);
    if (updateErr) {
      alert('Could not update BTS video:\n' + updateErr.message);
      return;
    }
    onRefresh();
  }

  async function updateItemDetails(id, update) {
    const { error: updateErr } = await supabase.from('projects').update(update).eq('id', id);
    if (updateErr) {
      alert('Could not update BTS details:\n' + updateErr.message);
      return;
    }
    onRefresh();
  }

  function togglePanel(id, mode) {
    setActivePanel(current => current?.id === id && current?.mode === mode ? null : { id, mode });
  }

  return (
    <div className="admin-page-panel space-y-8">
      <form onSubmit={save} className="admin-card border border-white/6 rounded-lg p-6 mb-8 space-y-5">
        <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Upload BTS video</p>
        {error && <p className="text-red-400 text-xs">{error}</p>}

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Access Holdings BTS"
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Label</label>
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="BTS - ACCESS HOLDINGS"
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Year</label>
            <input
              value={year}
              onChange={e => setYear(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Sort order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setPublished(v => !v)}
              className={`text-xs px-3 py-2 rounded ${published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}
            >
              {published ? 'Live in Off Camera' : 'Draft'}
            </button>
          </div>
        </div>

        <VideoUpload
          label="BTS video (MP4)"
          field="video_url"
          slug={slug}
          value={videoUrl}
          thumbnail={thumbnailUrl}
          onChange={setVideoUrl}
          onThumbnailChange={setThumbnailUrl}
        />

        <button
          type="submit"
          disabled={saving || !title.trim() || !videoUrl}
          className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
        >
          {saving ? 'Saving...' : 'Save BTS video'}
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-[#666] text-sm">No BTS videos yet.</p>
      ) : (
        <div className="space-y-2">
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-4">Uploaded BTS videos</p>
          {items.map(item => (
            <div key={item.id} className="border border-white/6 rounded overflow-hidden">
              <div className="admin-list-row flex items-center gap-4 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#e8e8e8] truncate">{item.title}</p>
                  <p className="font-mono text-xs text-[#666]">{item.label} / order: {item.sort_order}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${item.published ? 'bg-green-900/40 text-green-400' : 'bg-white/5 text-[#666]'}`}>
                  {item.published ? 'Live' : 'Draft'}
                </span>
                <button
                  type="button"
                  onClick={() => togglePanel(item.id, 'edit')}
                  className={`text-xs ${activePanel?.id === item.id && activePanel?.mode === 'edit' ? 'text-[#f5e6d3]' : 'text-[#888] hover:text-[#f5e6d3]'}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => togglePanel(item.id, 'poster')}
                  className={`text-xs ${activePanel?.id === item.id && activePanel?.mode === 'poster' ? 'text-[#f5e6d3]' : 'text-[#888] hover:text-[#f5e6d3]'}`}
                >
                  Poster
                </button>
                <button onClick={() => deleteItem(item)} className="text-red-800 hover:text-red-500 text-xs">Delete</button>
              </div>

              {activePanel?.id === item.id && (
                <div className="border-t border-white/6 px-4 py-4 bg-black/20">
                  {activePanel.mode === 'edit' ? (
                    <BtsEditPanel item={item} onSave={updateItemDetails} />
                  ) : (
                    <VideoUpload
                      label="BTS poster and video"
                      field="video_url"
                      slug={item.slug || `bts-${slugify(item.title)}`}
                      projectId={item.id}
                      value={item.video_url}
                      thumbnail={item.thumbnail_url}
                      onChange={() => {}}
                      onThumbnailChange={() => {}}
                      onAutoSave={(nextVideoUrl, nextThumbnailUrl) => updateItemVideo(item.id, nextVideoUrl, nextThumbnailUrl)}
                      onPosterSaved={onRefresh}
                      onDeleted={onRefresh}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <BtsImageManager images={images} error={imageError} onRefresh={onImagesRefresh} />
    </div>
  );
}

function FounderManager({ content, error, onRefresh }) {
  const founder = mergeFounderContent(content);
  const [form, setForm] = useState(founder);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setForm(mergeFounderContent(content));
    setFile(null);
    setPreview('');
  }, [content]);

  function updateField(field, value) {
    setForm(current => ({ ...current, [field]: value }));
  }

  function pickFile(nextFile) {
    if (!nextFile) return;
    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setLocalError('');

    try {
      let imageUrl = form.image_url || founderContentDefaults.image_url;
      if (file) {
        const key = `founder-${Date.now()}.jpg`;
        imageUrl = await uploadImageToR2(file, key);
      }

      const payload = {
        ...form,
        id: 'main',
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      };
      delete payload.created_at;

      const { error: upsertErr } = await supabase.from('founder_content').upsert(payload, { onConflict: 'id' });
      if (upsertErr) throw upsertErr;

      setFile(null);
      setPreview('');
      if (inputRef.current) inputRef.current.value = '';
      onRefresh();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const imageSrc = preview || form.image_url || founderContentDefaults.image_url;

  return (
    <div className="admin-page-panel">
      <form onSubmit={save} className="admin-card border border-white/6 rounded-lg p-6 space-y-6">
        <div>
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Founder content</p>
          <p className="text-[#888] text-sm mt-2">This controls the homepage founder block and the full founder page.</p>
        </div>

        {error && (
          <div className="rounded border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-amber-300 text-xs">Founder content table is not available yet.</p>
            <p className="text-[#888] text-xs mt-2">Run the SQL in scripts/founder_content.sql in Supabase, then refresh this page.</p>
            <p className="text-[#666] text-xs mt-2 break-all">{error}</p>
          </div>
        )}
        {localError && <p className="text-red-400 text-xs">{localError}</p>}

        <div className="grid md:grid-cols-[260px_1fr] gap-5">
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-3">Founder image</label>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="block w-full overflow-hidden rounded border border-white/10 bg-black/30 text-left"
            >
              <img
                src={imageSrc}
                alt={form.image_alt || 'Founder image'}
                crossOrigin={imageSrc?.startsWith('http') ? 'anonymous' : undefined}
                className="w-full aspect-[3/4] object-cover"
              />
              <span className="block p-3 font-mono text-[10px] uppercase tracking-widest text-[#888]">
                {file ? 'New image selected' : 'Replace image'}
              </span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={e => pickFile(e.target.files?.[0])}
              className="hidden"
            />
          </div>

          <div className="admin-form-grid grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Section kicker</label>
              <input value={form.section_kicker || ''} onChange={e => updateField('section_kicker', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Image caption</label>
              <input value={form.image_caption || ''} onChange={e => updateField('image_caption', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Name</label>
              <input value={form.name || ''} onChange={e => updateField('name', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Role</label>
              <input value={form.role || ''} onChange={e => updateField('role', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
            </div>
            <div className="col-span-2">
              <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Image alt text</label>
              <input value={form.image_alt || ''} onChange={e => updateField('image_alt', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
            </div>
          </div>
        </div>

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Homepage founder block</p>
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Homepage quote</label>
            <textarea value={form.homepage_quote || ''} onChange={e => updateField('homepage_quote', e.target.value)} rows={3} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Homepage body</label>
            <textarea value={form.homepage_body || ''} onChange={e => updateField('homepage_body', e.target.value)} rows={4} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Profile label</label>
            <input value={form.homepage_profile_label || ''} onChange={e => updateField('homepage_profile_label', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Link text</label>
            <input value={form.homepage_link_text || ''} onChange={e => updateField('homepage_link_text', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
        </div>

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Founder page</p>
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Eyebrow</label>
            <input value={form.page_eyebrow || ''} onChange={e => updateField('page_eyebrow', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Page quote</label>
            <input value={form.page_quote || ''} onChange={e => updateField('page_quote', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Title</label>
            <input value={form.page_title || ''} onChange={e => updateField('page_title', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Lede</label>
            <textarea value={form.page_lede || ''} onChange={e => updateField('page_lede', e.target.value)} rows={3} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Story paragraph 1</label>
            <textarea value={form.story_body_one || ''} onChange={e => updateField('story_body_one', e.target.value)} rows={5} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Story paragraph 2</label>
            <textarea value={form.story_body_two || ''} onChange={e => updateField('story_body_two', e.target.value)} rows={5} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
        </div>

        <div className="admin-form-grid grid grid-cols-3 gap-4">
          {[1, 2, 3].map(number => {
            const titleKey = `note_${number === 1 ? 'one' : number === 2 ? 'two' : 'three'}_title`;
            const bodyKey = `note_${number === 1 ? 'one' : number === 2 ? 'two' : 'three'}_body`;
            return (
              <div key={number} className="space-y-3">
                <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Note {number}</p>
                <input value={form[titleKey] || ''} onChange={e => updateField(titleKey, e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
                <textarea value={form[bodyKey] || ''} onChange={e => updateField(bodyKey, e.target.value)} rows={4} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={saving || !!error}
          className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
        >
          {saving ? 'Saving...' : 'Save founder content'}
        </button>
      </form>
    </div>
  );
}

function ContactManager({ content, error, onRefresh }) {
  const contact = mergeContactContent(content);
  const [form, setForm] = useState(contact);
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    setForm(mergeContactContent(content));
  }, [content]);

  function setField(field, value) {
    setForm(current => ({ ...current, [field]: value }));
  }

  function updateSocial(index, field, value) {
    setForm(current => ({
      ...current,
      socials: current.socials.map((social, socialIndex) => (
        socialIndex === index ? { ...social, [field]: value } : social
      )),
    }));
  }

  function addSocial() {
    setForm(current => ({
      ...current,
      socials: [
        ...current.socials,
        { label: '', value: '', href: '', footer_label: '', show_footer: true },
      ],
    }));
  }

  function removeSocial(index) {
    setForm(current => ({
      ...current,
      socials: current.socials.filter((_, socialIndex) => socialIndex !== index),
    }));
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setLocalError('');

    const payload = {
      ...contactContentDefaults,
      ...form,
      id: 'main',
      socials: normalizeSocials(form.socials).filter(social => social.label || social.value || social.href),
      updated_at: new Date().toISOString(),
    };
    delete payload.created_at;

    const { error: saveError } = await supabase
      .from('contact_content')
      .upsert(payload, { onConflict: 'id' });

    if (saveError) {
      setLocalError(saveError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    onRefresh?.();
  }

  return (
    <div className="admin-page-panel">
      <form onSubmit={save} className="admin-card border border-white/6 rounded-lg p-6 space-y-6">
        <div>
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Contact content</p>
          <p className="text-[#888] text-sm mt-2">This controls the contact page, homepage booking CTA, and footer links.</p>
        </div>

        {error && (
          <div className="rounded border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-amber-300 text-xs">Contact content table is not available yet.</p>
            <p className="text-[#888] text-xs mt-2">Run the SQL in scripts/contact_content.sql in Supabase, then refresh this page.</p>
            <p className="text-[#666] text-xs mt-2 break-all">{error}</p>
          </div>
        )}
        {localError && <p className="text-red-400 text-xs">{localError}</p>}

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Contact label</label>
            <input value={form.contact_kicker || ''} onChange={e => setField('contact_kicker', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Footer brand</label>
            <input value={form.footer_brand || ''} onChange={e => setField('footer_brand', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Contact headline</label>
            <input value={form.contact_headline || ''} onChange={e => setField('contact_headline', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Contact body</label>
            <textarea value={form.contact_body || ''} onChange={e => setField('contact_body', e.target.value)} rows={3} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
        </div>

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Email</label>
            <input type="email" value={form.email || ''} onChange={e => setField('email', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Email button label</label>
            <input value={form.email_button_label || ''} onChange={e => setField('email_button_label', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">WhatsApp display</label>
            <input value={form.whatsapp_display || ''} onChange={e => setField('whatsapp_display', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">WhatsApp button label</label>
            <input value={form.whatsapp_button_label || ''} onChange={e => setField('whatsapp_button_label', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">WhatsApp URL</label>
            <input value={form.whatsapp_url || ''} onChange={e => setField('whatsapp_url', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Address</label>
            <input value={form.address || ''} onChange={e => setField('address', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Hours</label>
            <input value={form.hours || ''} onChange={e => setField('hours', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
        </div>

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Homepage booking CTA</p>
          </div>
          <div className="col-span-2">
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Heading</label>
            <textarea value={form.book_heading || ''} onChange={e => setField('book_heading', e.target.value)} rows={2} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Email CTA label</label>
            <input value={form.book_email_label || ''} onChange={e => setField('book_email_label', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">WhatsApp CTA label</label>
            <input value={form.book_whatsapp_label || ''} onChange={e => setField('book_whatsapp_label', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Social links</p>
            <button type="button" onClick={addSocial} className="text-xs text-[#f5e6d3] hover:text-white">+ Add link</button>
          </div>

          {form.socials.map((social, index) => (
            <div key={index} className="admin-card border border-white/6 rounded-lg p-4 space-y-3">
              <div className="admin-form-grid grid grid-cols-2 gap-3">
                <input placeholder="Label" value={social.label || ''} onChange={e => updateSocial(index, 'label', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
                <input placeholder="Display value" value={social.value || ''} onChange={e => updateSocial(index, 'value', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
                <input placeholder="URL" value={social.href || ''} onChange={e => updateSocial(index, 'href', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
                <input placeholder="Footer label" value={social.footer_label || ''} onChange={e => updateSocial(index, 'footer_label', e.target.value)} className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label className="inline-flex items-center gap-2 text-xs text-[#888]">
                  <input type="checkbox" checked={social.show_footer !== false} onChange={e => updateSocial(index, 'show_footer', e.target.checked)} />
                  Show in footer
                </label>
                <button type="button" onClick={() => removeSocial(index)} className="text-red-800 hover:text-red-500 text-xs">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
        >
          {saving ? 'Saving...' : 'Save contact content'}
        </button>
      </form>
    </div>
  );
}

function LogoManager({ logos, onRefresh }) {
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState('99');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function pickFile(f) {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    if (!name) setName(f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
  }

  function handleFileChange(e) { pickFile(e.target.files?.[0]); }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    pickFile(e.dataTransfer.files?.[0]);
  }

  async function upload(e) {
    e.preventDefault();
    if (!file || !name.trim()) { setError('Name and file are required.'); return; }
    setError('');
    setUploading(true);

    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${slugify(name)}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from('logos')
      .upload(filename, file, { upsert: true });

    if (uploadErr) { setError(uploadErr.message); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(filename);

    const { error: insertErr } = await supabase.from('client_logos').insert({
      name: name.trim(),
      logo_url: publicUrl,
      sort_order: parseInt(sortOrder) || 99,
    });

    if (insertErr) { setError(insertErr.message); setUploading(false); return; }

    setName(''); setSortOrder('99'); setFile(null); setPreview('');
    setUploading(false);
    onRefresh();
  }

  async function deleteLogo(logo) {
    if (!confirm(`Delete "${logo.name}"?`)) return;
    const filename = logo.logo_url.split('/').pop();
    await supabase.storage.from('logos').remove([filename]);
    await supabase.from('client_logos').delete().eq('id', logo.id);
    onRefresh();
  }

  return (
    <div className="admin-page-panel admin-page-panel-narrow">
      {/* Upload form */}
      <form onSubmit={upload} className="admin-card border border-white/6 rounded-lg p-6 mb-8 space-y-5">
        <p className="font-mono text-xs text-[#666] uppercase tracking-widest">Upload logo</p>
        {error && <p className="text-red-400 text-xs">{error}</p>}

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
          style={{
            height: '160px',
            borderColor: dragOver ? 'rgba(245,230,211,0.4)' : 'rgba(255,255,255,0.1)',
            background: dragOver ? 'rgba(245,230,211,0.04)' : 'rgba(255,255,255,0.02)',
          }}
        >
          {preview ? (
            <img
              src={preview} alt="preview"
              style={{ maxHeight: '100px', maxWidth: '80%', objectFit: 'contain' }}
            />
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p className="text-[#666] text-sm">Drop logo here or <span className="text-[#f5e6d3]">click to browse</span></p>
              <p className="text-[#444] text-xs">PNG · SVG · JPG · WebP</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp"
            onChange={handleFileChange} className="hidden"
          />
        </div>

        {preview && (
          <button type="button" onClick={() => { setFile(null); setPreview(''); }} className="text-xs text-[#666] hover:text-[#888]">
            ✕ Remove file
          </button>
        )}

        <div className="admin-form-grid grid grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Client name</label>
            <input
              value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Dhamana"
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-[#666] uppercase tracking-widest block mb-2">Sort order</label>
            <input
              type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-sm text-[#e8e8e8] outline-none focus:border-white/30"
            />
          </div>
        </div>

        <button
          type="submit" disabled={uploading || !file}
          className="bg-[#f5e6d3] text-[#0a0a0a] px-5 py-2.5 text-xs font-medium rounded disabled:opacity-40"
        >
          {uploading ? 'Uploading…' : 'Upload logo'}
        </button>
      </form>

      {/* Logo list */}
      {logos.length === 0 ? (
        <p className="text-[#666] text-sm">No logos yet.</p>
      ) : (
        <div className="space-y-2">
          <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-4">Uploaded logos</p>
          {logos.map(logo => (
            <div key={logo.id} className="admin-list-row admin-logo-row flex items-center gap-4 border border-white/6 rounded px-4 py-3">
              <div className="flex items-center justify-center flex-shrink-0 bg-white/5 rounded" style={{ width: '140px', height: '52px' }}>
                <img
                  src={logo.logo_url} alt={logo.name}
                  crossOrigin="anonymous"
                  style={{ maxHeight: '40px', maxWidth: '130px', width: 'auto', height: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#e8e8e8]">{logo.name}</p>
                <p className="font-mono text-xs text-[#666]">order: {logo.sort_order}</p>
              </div>
              <button onClick={() => deleteLogo(logo)} className="text-red-800 hover:text-red-500 text-xs">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState(undefined);
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [btsItems, setBtsItems] = useState([]);
  const [btsImages, setBtsImages] = useState([]);
  const [btsImagesError, setBtsImagesError] = useState('');
  const [bannerContent, setBannerContent] = useState(null);
  const [bannerContentError, setBannerContentError] = useState('');
  const [contactContent, setContactContent] = useState(null);
  const [contactContentError, setContactContentError] = useState('');
  const [founderContent, setFounderContent] = useState(null);
  const [founderContentError, setFounderContentError] = useState('');
  const [logos, setLogos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) { fetchProjects(); fetchBtsItems(); fetchBtsImages(); fetchBannerContent(); fetchContactContent(); fetchFounderContent(); fetchLogos(); }
  }, [session]);

  async function fetchProjects() {
    const { data } = await supabase.from('projects').select('*').neq('category', 'BTS').order('sort_order');
    setProjects(data ?? []);
  }

  async function fetchBtsItems() {
    const { data } = await supabase.from('projects').select('*').eq('category', 'BTS').order('sort_order');
    setBtsItems(data ?? []);
  }

  async function fetchBtsImages() {
    const { data, error } = await supabase.from('bts_images').select('*').order('sort_order');
    setBtsImages(data ?? []);
    setBtsImagesError(error?.message || '');
  }

  async function fetchBannerContent() {
    const { data, error } = await supabase.from('banner_content').select('*').eq('id', 'main').maybeSingle();
    setBannerContent(data ?? null);
    setBannerContentError(error?.message || '');
  }

  async function fetchContactContent() {
    const { data, error } = await supabase.from('contact_content').select('*').eq('id', 'main').maybeSingle();
    setContactContent(data ?? null);
    setContactContentError(error?.message || '');
  }

  async function fetchFounderContent() {
    const { data, error } = await supabase.from('founder_content').select('*').eq('id', 'main').maybeSingle();
    setFounderContent(data ?? null);
    setFounderContentError(error?.message || '');
  }

  async function fetchLogos() {
    const { data } = await supabase.from('client_logos').select('*').order('sort_order');
    setLogos(data ?? []);
  }

  async function togglePublished(project) {
    await supabase.from('projects').update({ published: !project.published }).eq('id', project.id);
    fetchProjects();
  }

  async function deleteProject(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  }

  async function autoSaveVideo(id, videoUrl, thumbUrl) {
    const update = { video_url: videoUrl };
    if (thumbUrl) update.thumbnail_url = thumbUrl;
    const { error } = await supabase.from('projects').update(update).eq('id', id);
    if (error) {
      alert(`Could not save video to database:\n${error.message}\n\nRun this in Supabase SQL editor:\nALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT;\nALTER TABLE projects ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;`);
    }
    fetchProjects();
  }

  async function saveProject(data) {
    setSaving(true);
    if (data.id) {
      const { id, ...update } = data;
      await supabase.from('projects').update(update).eq('id', id);
    } else {
      await supabase.from('projects').insert(data);
    }
    setSaving(false);
    setEditing(null);
    fetchProjects();
  }

  if (session === undefined) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#666] text-sm">Loading…</div>;
  }

  if (!session) return <LoginScreen />;

  if (editing !== null) {
    return (
      <ProjectForm
        initial={editing}
        onSave={saveProject}
        onCancel={() => setEditing(null)}
        saving={saving}
        onAutoSave={autoSaveVideo}
      />
    );
  }

  return (
    <Shell tab={tab} setTab={setTab} onLogout={() => supabase.auth.signOut()}>
      {tab === 'projects' && (
        <ProjectList
          projects={projects}
          onAdd={() => setEditing({ ...EMPTY })}
          onEdit={p => setEditing(p)}
          onToggle={togglePublished}
          onDelete={deleteProject}
        />
      )}
      {tab === 'banner' && (
        <BannerManager
          content={bannerContent}
          error={bannerContentError}
          onRefresh={fetchBannerContent}
        />
      )}
      {tab === 'contact' && (
        <ContactManager
          content={contactContent}
          error={contactContentError}
          onRefresh={fetchContactContent}
        />
      )}
      {tab === 'bts' && (
        <BtsManager
          items={btsItems}
          images={btsImages}
          imageError={btsImagesError}
          onRefresh={fetchBtsItems}
          onImagesRefresh={fetchBtsImages}
        />
      )}
      {tab === 'founder' && (
        <FounderManager
          content={founderContent}
          error={founderContentError}
          onRefresh={fetchFounderContent}
        />
      )}
      {tab === 'logos' && (
        <LogoManager logos={logos} onRefresh={fetchLogos} />
      )}
    </Shell>
  );
}
