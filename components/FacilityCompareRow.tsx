import { Facility, SYSTEMS } from '@/lib/data';
import { riskScore, avgRating, conditionLabel, conditionCls, badgeClass, barColorHex, riskScoreColorHex } from '@/lib/utils';

interface Props {
  facility: Facility;
  ratings: Record<string, number>;
}

export default function FacilityCompareRow({ facility, ratings }: Props) {
  const score = riskScore(ratings);
  const avg = avgRating(ratings);
  const cond = avg !== null ? conditionLabel(avg) : 'Not rated';
  const cls = avg !== null ? conditionCls(avg) : 'l';

  const topSystems = [...SYSTEMS]
    .filter((s) => ratings[s.id] !== undefined && ratings[s.id] > 0)
    .map((s) => ({ ...s, r: ratings[s.id] }))
    .sort((a, b) => a.r - b.r)
    .slice(0, 3);

  return (
    <div className="flex items-stretch gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-40">
        <p className="text-[13px] font-semibold text-gray-900 leading-snug">{facility.name}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{facility.type} · Risk: <strong style={{ color: riskScoreColorHex(score) }}>{score}</strong></p>
        <span className={`badge ${badgeClass(cls)} mt-1.5 inline-block`}>{cond}</span>
      </div>
      <div className="flex-1 flex flex-col gap-1.5 justify-center">
        {topSystems.map((s) => (
          <div key={s.id} className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-400 w-[70px] flex-shrink-0 truncate">{s.name}</span>
            <div className="flex-1 h-2 bg-gray-100 rounded overflow-hidden">
              <div
                className="h-full rounded transition-[width] duration-300"
                style={{ width: `${Math.round((s.r / 5) * 100)}%`, backgroundColor: barColorHex(s.r) }}
              />
            </div>
            <span className="text-[11px] font-semibold w-6 text-right" style={{ color: barColorHex(s.r) }}>
              {s.r}/5
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
