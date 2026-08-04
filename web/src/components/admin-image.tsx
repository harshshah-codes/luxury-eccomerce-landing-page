'use client';

import { useRef, useState } from 'react';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mh_admin_token');
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: form
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data.url as string;
}

// ---------- Upload button ----------
export function ImageUploader({ onUpload, label = 'Upload', small }: {
  onUpload: (url: string) => void;
  label?: string;
  small?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const url = await uploadImage(file);
      onUpload(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  return (
    <div className="admin__upload">
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden />
      <button
        type="button"
        className={`admin__btn admin__btn--outline${small ? ' admin__btn--small' : ''}`}
        onClick={() => inputRef.current?.click()}
        disabled={busy}
      >
        {busy ? 'Uploading…' : label}
      </button>
      {error && <div className="admin__upload-error">{error}</div>}
    </div>
  );
}

// ---------- Single image URL field with upload ----------
export function ImageUrlField({ id, label, value, onChange }: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="admin__field">
      <label className="admin__field-label" htmlFor={id}>{label}</label>
      <div className="admin__image-url">
        <input
          type="text"
          id={id}
          value={value}
          placeholder="https://res.cloudinary.com/…"
          onChange={e => onChange(e.target.value)}
        />
        <ImageUploader onUpload={onChange} label="Upload" small />
        {value && (
          <div className="admin__img-preview">
            <img src={value} alt="" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} onLoad={e => { (e.currentTarget as HTMLImageElement).style.display = ''; }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Row inside a multi-image editor ----------
export function ImageUrlRow({ index, value, onValue, onRemove }: {
  index: number;
  value: string;
  onValue: (v: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="admin__image-row">
      <div className="admin__image-row-preview">
        {value ? <img src={value} alt="" /> : <span>—</span>}
      </div>
      <div className="admin__image-row-main">
        <input
          type="text"
          value={value}
          placeholder="Image URL"
          onChange={e => onValue(e.target.value)}
        />
        <ImageUploader onUpload={onValue} label="Upload" small />
      </div>
      <button type="button" className="admin__icon-btn admin__icon-btn--danger" onClick={onRemove} title="Remove image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      {index === 0 && value && <div className="admin__image-cover">Cover</div>}
    </div>
  );
}
