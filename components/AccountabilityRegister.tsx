'use client';
import { useStore } from '@/store/useStore';
import { SYSTEMS, FACILITIES, DUE_TEXT } from '@/lib/data';

interface Props { facilityId: string }

function dotCls(rating: number | undefined): string {
  if (rating === undefined || rating === 0) return 'bg-gray-300';
  if (rating <= 1) return 'bg-riskH-accent';
  if (rating <= 3) return 'bg-riskM-accent';
  return 'bg-riskL-accent';
}

function dueTextCls(rating: number | undefined): string {
  if (rating === undefined || rating === 0) return 'text-gray-400';
  if (rating <= 1) return 'text-riskH font-semibold';
  if (rating <= 3) return 'text-riskM font-medium';
  return 'text-riskL';
}

export default function AccountabilityRegister({ facilityId }: Props) {
  const ratings = useStore((s) => s.ratings[facilityId] ?? {});
  const facility = FACILITIES.find((f) => f.id === facilityId)!;

  return (
    <div>
      <div className="flex items-center gap-2 pb-1.5 border-b border-gray-200 mb-1">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-[1.2]">System</span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-1">Responsible team</span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-1">Manager</span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-shrink-0 w-28 text-right">Next action</span>
      </div>
      {SYSTEMS.map((s) => {
        const r = ratings[s.id];
        const due = r ? DUE_TEXT[r] : 'Not rated';
        return (
          <div key={s.id} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotCls(r)}`} />
            <span className="text-[13px] font-medium text-gray-900 flex-[1.2] min-w-0 truncate">{s.name}</span>
            <span className="text-[12px] text-gray-500 flex-1 min-w-0 truncate">{s.owner}</span>
            <span className="text-[12px] text-gray-500 flex-1 min-w-0 truncate">{facility.manager}</span>
            <span className={`text-[12px] flex-shrink-0 w-28 text-right ${dueTextCls(r)}`}>{due}</span>
          </div>
        );
      })}
    </div>
  );
}
