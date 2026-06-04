import { KpiItem } from '@/lib/data';

interface Props { item: KpiItem }

export default function KpiRow({ item }: Props) {
  const onTarget = item.higherBetter ? item.actual >= item.target : item.actual <= item.target;
  const pct = item.higherBetter
    ? Math.min(100, Math.round((item.actual / item.target) * 100))
    : Math.min(100, Math.round((item.target / item.actual) * 100));
  const barColor = onTarget ? '#639922' : pct >= 75 ? '#EF9F27' : '#E24B4A';
  const statusCls = onTarget ? 'badge-l' : pct >= 75 ? 'badge-m' : 'badge-h';
  const statusTxt = onTarget ? 'On target' : pct >= 75 ? 'Near target' : 'Below target';
  const actualColor = onTarget ? 'text-riskL' : 'text-riskH';

  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-[13px] text-gray-800 flex-[1.5] min-w-0">{item.name}</span>
      <span className="text-[12px] text-gray-400 flex-[0.7] text-right">{item.target}{item.unit}</span>
      <div className="flex-[2] h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
      <span className={`text-[13px] font-semibold flex-[0.7] text-right ${actualColor}`}>
        {item.actual}{item.unit}
      </span>
      <span className={`badge ${statusCls} flex-shrink-0 w-[88px] text-center`}>{statusTxt}</span>
    </div>
  );
}
