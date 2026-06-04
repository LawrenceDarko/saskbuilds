'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/assess', label: 'Assess' },
  { href: '/kpi',    label: 'KPIs' },
  { href: '/compare',label: 'Compare' },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[11px] font-semibold">SB</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900 leading-tight">SaskBuilds Asset Management</p>
            <p className="text-[11px] text-gray-400 leading-tight hidden sm:block">Preventive Maintenance &amp; Condition Assessment</p>
          </div>
        </div>
        <div className="flex gap-1">
          {TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors border ${
                  active
                    ? 'bg-brand-light border-brand-border text-brand'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
