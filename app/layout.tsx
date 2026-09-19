import type { Metadata } from 'next';
import './globals.css';
import './glass.css';
import './evaluation.css';
import './interview.css';
import './mastery.css';
import './mastery-detail.css';
import './leaderboard.css';
import AICoach from '@/components/ai-coach';

export const metadata: Metadata = {
  title: 'DataForge | Learning OS',
  description: 'Adaptive learning for Data Engineering and Analytics.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<AICoach /></body></html>;
}
