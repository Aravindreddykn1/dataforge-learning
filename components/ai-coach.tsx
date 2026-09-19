'use client';

import { FormEvent, useState } from 'react';
import { BrainCircuit, ChevronRight, LoaderCircle, Sparkles, X } from 'lucide-react';

type Evaluation = { headline: string; strengths: string[]; weakAreas: string[]; nextAction: string; why: string; question: string };

export default function AICoach() {
  const [open, setOpen] = useState(false);
  const [reflection, setReflection] = useState('');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function evaluate(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    const response = await fetch('/api/coach/evaluate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reflection }) });
    const data = await response.json();
    if (!response.ok) setError(data.error || 'Evaluation unavailable.'); else setEvaluation(data);
    setBusy(false);
  }

  return <><button className="coach-launcher" onClick={() => setOpen(true)} aria-label="Open AI Coach"><Sparkles size={16} /><span>AI Coach</span></button>{open && <div className="coach-modal-backdrop" onClick={() => setOpen(false)}><section className="coach-modal" onClick={event => event.stopPropagation()}><div className="coach-modal-head"><div><span className="eyebrow">DAILY SKILL CHECK</span><h2>Let the coach find your next edge.</h2></div><button className="coach-close" onClick={() => setOpen(false)} aria-label="Close AI Coach"><X size={18} /></button></div>{!evaluation ? <form onSubmit={evaluate}><p>Describe what you studied, where you hesitated, or what you want to improve today.</p><textarea value={reflection} onChange={event => setReflection(event.target.value)} placeholder="I practiced window functions, but I still confuse ROW_NUMBER and RANK..." maxLength={2000} /><div className="coach-form-footer"><span>Uses your mastery signals and reflection</span><button className="primary-button" disabled={busy}>{busy ? <><LoaderCircle className="spin" size={14} /> Evaluating...</> : <>Evaluate me <ChevronRight size={14} /></>}</button></div>{error && <div className="coach-error">{error}</div>}</form> : <div className="evaluation"><div className="evaluation-head"><Sparkles size={16} /><strong>{evaluation.headline}</strong></div><div className="evaluation-columns"><div><span className="eyebrow">STRENGTHS</span><ul>{evaluation.strengths.map(item => <li key={item}>{item}</li>)}</ul></div><div><span className="eyebrow">WEAK SIGNALS</span><ul>{evaluation.weakAreas.map(item => <li key={item}>{item}</li>)}</ul></div></div><div className="next-action"><span className="eyebrow">NEXT ACTION · 20 MIN</span><strong>{evaluation.nextAction}</strong><p>{evaluation.why}</p></div><div className="coach-question"><span className="eyebrow">ANSWER THIS NEXT</span><p>{evaluation.question}</p></div><button className="outline-button" onClick={() => setEvaluation(null)}>Run another check <ChevronRight size={13} /></button></div>}</section></div>}</>;
}
