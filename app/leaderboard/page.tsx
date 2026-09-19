import Link from 'next/link';
import { ArrowLeft, Crown, Flame } from 'lucide-react';

const learners = [['Rohan', 2340, 12], ['Priya', 2110, 10], ['Kiran', 1920, 9], ['Arvind', 0, 0]] as const;

export default function LeaderboardPage() {
  return <main className="profile-page"><div className="profile-wrap"><Link href="/" className="back-link"><ArrowLeft size={15} /> Back to dashboard</Link><header className="profile-header"><div className="large-avatar"><Crown size={22} /></div><div><span className="eyebrow">WEEKLY PRACTICE</span><h1>Leaderboard</h1><p>Compare practice effort without turning learning into a popularity contest.</p></div></header><section className="leaderboard-card">{learners.map(([name, xp, streak], index) => <div className={`leader-row ${name === 'Arvind' ? 'you' : ''}`} key={name}><span className="leader-rank">#{index + 1}</span><span className="avatar">{name.slice(0, 2).toUpperCase()}</span><span className="leader-name"><strong>{name}{name === 'Arvind' ? ' (you)' : ''}</strong><small><Flame size={11} /> {streak} day streak</small></span><strong className="leader-xp">{xp.toLocaleString()} XP</strong></div>)}</section></div></main>;
}
