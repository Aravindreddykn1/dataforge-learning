'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';

export default function UpdatePasswordPage() {
  const router = useRouter(); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); if (password !== confirm) { setMessage('Passwords do not match.'); return; } setBusy(true); const { error } = await createClient().auth.updateUser({ password }); setMessage(error ? error.message : 'Password updated. Redirecting...'); if (!error) setTimeout(() => router.push('/'), 900); setBusy(false); }
  return <main className="auth-page centered-auth"><section className="auth-card"><div className="brand auth-brand"><span className="brand-mark">DF</span><span>DataForge</span></div><div className="auth-card-head"><span className="eyebrow">ACCOUNT RECOVERY</span><h2>Choose a new password</h2><p>Use at least 8 characters you will remember.</p></div><form onSubmit={submit}><label>New password<input required minLength={8} type="password" value={password} onChange={event => setPassword(event.target.value)} /></label><label>Confirm password<input required minLength={8} type="password" value={confirm} onChange={event => setConfirm(event.target.value)} /></label>{message && <p className="form-message">{message}</p>}<button className="auth-submit" disabled={busy}>{busy ? 'Updating...' : 'Update password'} <span>-&gt;</span></button></form></section></main>;
}
