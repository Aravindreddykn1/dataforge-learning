'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/browser';

export default function ResetPage() {
  const [email, setEmail] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setBusy(true); const supabase = createClient(); const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/update-password` }); setMessage(error ? error.message : 'If an account exists for that email, a reset link is on its way.'); setBusy(false); }
  return <main className="auth-page centered-auth"><section className="auth-card"><div className="brand auth-brand"><span className="brand-mark">DF</span><span>DataForge</span></div><div className="auth-card-head"><span className="eyebrow">ACCOUNT RECOVERY</span><h2>Reset your password</h2><p>We will email you a secure, one-time recovery link.</p></div><form onSubmit={submit}><label>Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label>{message && <p className="form-message">{message}</p>}<button className="auth-submit" disabled={busy}>{busy ? 'Sending...' : 'Send reset link'} <span>-&gt;</span></button></form><Link className="forgot-link" href="/auth/login">Back to sign in</Link></section></main>;
}
