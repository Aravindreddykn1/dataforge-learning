'use client';

import Link from 'next/link';
import { ArrowLeft, KeyRound, LogOut, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/browser';

export default function SettingsPage() {
  async function signOut() { if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) await createClient().auth.signOut(); window.location.assign('/auth/login'); }
  return <main className="profile-page"><div className="profile-wrap"><Link className="back-link" href="/profile"><ArrowLeft size={15} /> Back to profile</Link><header className="profile-header"><div className="large-avatar"><ShieldCheck size={22} /></div><div><span className="eyebrow">ACCOUNT SETTINGS</span><h1>Keep your workspace yours.</h1><p>Security and account controls for DataForge.</p></div></header><div className="settings-list"><Link href="/auth/reset" className="settings-row"><KeyRound size={18} /><span><strong>Reset password</strong><small>Send a secure recovery email</small></span><ArrowLeft className="settings-arrow" size={15} /></Link><button className="settings-row danger" onClick={signOut}><LogOut size={18} /><span><strong>Sign out</strong><small>End this session on this device</small></span><ArrowLeft className="settings-arrow" size={15} /></button></div></div></main>;
}
