'use client';
import { useStore } from '@/store/useStore';
import { GOV_ITEMS } from '@/lib/data';

interface Props { period: string }

export default function GovernanceScorecard({ period }: Props) {
  const { governanceChecks, toggleGovernance } = useStore();
  const periodChecks = governanceChecks[period] ?? {};
  const completedCount = GOV_ITEMS.filter((g) => periodChecks[g.id]).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="sec-label mb-0">Compliance &amp; governance scorecard</p>
        <span className="text-[12px] text-gray-400">
          {completedCount}/{GOV_ITEMS.length} complete
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {GOV_ITEMS.map((g) => {
          const done = !!periodChecks[g.id];
          return (
            <label
              key={g.id}
              className="flex items-center gap-2.5 p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 select-none transition-colors"
            >
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggleGovernance(period, g.id)}
                className="w-4 h-4 flex-shrink-0 rounded accent-brand cursor-pointer"
              />
              <span className={`text-[13px] leading-snug ${done ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                {g.name}
              </span>
              {done && (
                <svg className="ml-auto flex-shrink-0 text-riskL-accent" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
