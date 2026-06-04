import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SaskBuilds — Asset Management System',
  description: 'Saskatchewan public sector facilities — preventive maintenance and condition assessment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>
        <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-4 mt-8 border-t border-gray-100">
          <p className="text-[11px] text-gray-300">© 2025 Government of Saskatchewan — SaskBuilds Infrastructure Division</p>
        </footer>
      </body>
    </html>
  );
}
