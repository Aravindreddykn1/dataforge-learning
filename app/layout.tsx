import type { Metadata } from 'next';
import './globals.css';
import './glass.css';

export const metadata: Metadata = {
  title: 'DataForge | Learning OS',
  description: 'Adaptive learning for Data Engineering and Analytics.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
