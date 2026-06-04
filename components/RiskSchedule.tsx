'use client';
import { useStore } from '@/store/useStore';
import { SYSTEMS, REC_MAP } from '@/lib/data';

interface Props { facilityId: string }

export default function RiskSchedule({ facilityId }: Props) {
  const ratings = useStore((s) => s.ratings[facilityId] ?? {});

  const sorted = [...SYSTEMS]
    .filter((s) => ratings[s.id] !== undefined && ratings[s.id] > 0)
    .map((s) => ({ ...s, rating: ratings[s.id] }))
    .sort((a, b) => a.rating - b.rating);

  if (!sorted.length) {
    return (
      <p className="text-[13px] text-gray-400 py-4">Rate systems to generate schedule.</p>
    );
  }

  return (
    <div>
      {sorted.map((s, idx) => {
        const rec = REC_MAP[s.rating];
        const rankCls = rec.cls;
        return (
          <div key={s.id} className="flex items-center gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold ${
                rankCls === 'h' ? 'bg-riskH-bg text-riskH' :
                rankCls === 'm' ? 'bg-riskM-bg text-riskM' :
                'bg-riskL-bg text-riskL'
              }`}
            >
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900">{s.name}</p>
              <p className="text-[11px] text-gray-500">{rec.action} · {rec.tl}</p>
            </div>
            <span className={`badge badge-${rankCls} flex-shrink-0`}>{rec.label}</span>
          </div>
        );
      })}
    </div>
  );
}
