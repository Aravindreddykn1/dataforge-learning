'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, RotateCcw } from 'lucide-react';
import { masteryCurriculum } from '@/lib/mastery-data';

export default function TopicPracticePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: rawTopic } = use(params);
  const topicName = decodeURIComponent(rawTopic).replace(/-/g, ' ');
  const topic = masteryCurriculum.find(item => item.name.toLowerCase() === topicName.toLowerCase()) || masteryCurriculum[0];
  const [index, setIndex] = useState(0); const [selected, setSelected] = useState<number | null>(null); const [score, setScore] = useState(0); const [done, setDone] = useState(false);
  const question = topic.questions[index];
  const options = ['Explain the concept in your own words', 'Write a small implementation or query', 'Identify an edge case and test it', 'Skip it and guess later'];
  const correct = 1;
  const next = () => { if (selected === null) return; const nextScore = score + (selected === correct ? 1 : 0); if (index === topic.questions.length - 1) { setScore(nextScore); setDone(true); } else { setScore(nextScore); setIndex(value => value + 1); setSelected(null); } };
  const reset = () => { setIndex(0); setSelected(null); setScore(0); setDone(false); };
  const progress = Math.round(((index + (done ? 1 : 0)) / topic.questions.length) * 100);
  return <main className="practice-page"><div className="practice-wrap"><Link href="/" className="back-link"><ArrowLeft size={15} /> Back to dashboard</Link><header className="practice-header"><div><span className="eyebrow">TOPIC PRACTICE</span><h1>{topic.name}</h1><p>Ten focused questions from fundamentals to advanced reasoning.</p></div><div className="practice-score"><strong>{score}</strong><small>/ {topic.questions.length} correct</small></div></header>{!done ? <section className="practice-card"><div className="practice-progress"><span>Question {index + 1} of {topic.questions.length}</span><span>{progress}%</span></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><span className="practice-number">0{index + 1}</span><h2>{question.prompt}</h2><div className="practice-options">{options.map((option, optionIndex) => <button className={selected === optionIndex ? 'selected' : ''} onClick={() => setSelected(optionIndex)} key={option}><span>0{optionIndex + 1}</span>{option}</button>)}</div><div className="practice-actions"><span>Select the strongest interview-ready response.</span><button className="primary-button" disabled={selected === null} onClick={next}>{index === topic.questions.length - 1 ? 'Finish practice' : 'Next question'} <ChevronRight size={14} /></button></div></section> : <section className="practice-card practice-complete"><span className="eyebrow">PRACTICE COMPLETE</span><div className="practice-final-score">{Math.round((score / topic.questions.length) * 100)}%</div><h2>{topic.name} signal updated</h2><p>You answered {score} of {topic.questions.length} prompts with the strongest response. Review the explanations below and return later for retention practice.</p><div className="practice-review">{topic.questions.map((item, itemIndex) => <article key={item.prompt}><span>0{itemIndex + 1}</span><div><strong>{item.prompt}</strong><small>{item.explanation}</small><small>Example: {item.example}</small></div></article>)}</div><button className="outline-button" onClick={reset}><RotateCcw size={14} /> Practice again</button></section>}</div></main>;
}
