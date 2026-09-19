'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    const supabase = createClient();
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    if (result.error) setMessage(result.error.message);
    else setMessage(mode === 'login' ? 'Signed in. Loading your workspace...' : 'Check your email to confirm your account.');
    if (!result.error && mode === 'login') window.location.assign('/');
    setBusy(false);
  }

  return <main className="auth-page"><div className="auth-visual"><div className="brand"><span className="brand-mark">DF</span><span>DataForge</span></div><div><span className="eyebrow">YOUR LEARNING OPERATING SYSTEM</span><h1>Turn daily effort into durable technical judgment.</h1><p>Adaptive practice for SQL, Python, Analytics, and Data Engineering.</p></div><div className="auth-quote">“The next best question is the one that closes your weakest gap.”</div></div><section className="auth-card"><div className="auth-card-head"><span className="eyebrow">{mode === 'login' ? 'WELCOME BACK' : 'START YOUR WORKSPACE'}</span><h2>{mode === 'login' ? 'Sign in to DataForge' : 'Create your account'}</h2><p>{mode === 'login' ? 'Continue your learning loop.' : 'Your first plan will adapt to your goals.'}</p></div><form onSubmit={submit}><label>Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input required minLength={8} type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="8+ characters" /></label>{message && <p className="form-message">{message}</p>}<button className="auth-submit" disabled={busy}>{busy ? 'Working...' : mode === 'login' ? 'Sign in' : 'Create account'} <span>-&gt;</span></button></form>{mode === 'login' && <Link className="forgot-link" href="/auth/reset">Forgot your password?</Link>}<div className="auth-switch">{mode === 'login' ? 'New to DataForge?' : 'Already have an account?'} <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); }}>{mode === 'login' ? 'Create account' : 'Sign in'}</button></div></section></main>;
}
