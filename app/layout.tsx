import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nvoke',
  description: 'Write a function. Invoke it. That is the whole tool.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
