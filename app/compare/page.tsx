'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { FACILITIES, SYSTEMS } from '@/lib/data';
import { riskScore, riskScoreColorHex } from '@/lib/utils';
import dynamic from 'next/dynamic';
import FacilityCompareRow from '@/components/FacilityCompareRow';

const CompareChart = dynamic(() => import('@/components/charts/CompareChart'), {
  ssr: false,
  loading: () => <div className="h-[220px] bg-gray-50 rounded animate-pulse" />,
});

const BudgetChart = dynamic(() => import('@/components/charts/BudgetChart'), {
  ssr: false,
  loading: () => <div className="h-[180px] bg-gray-50 rounded animate-pulse" />,
});

function MetricCard({ label, value, sub, valueColor }: { label: string; value: string; sub: string; valueColor?: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-4 py-3.5">
      <p className="text-[12px] text-gray-500 mb-1">{label}</p>
      <p className="text-[22px] font-medium leading-none" style={valueColor ? { color: valueColor } : {}}>
        {value}
      </p>
      <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

export default function ComparePage() {
  const { ratings, savedAssessments } = useStore();
  const [selectedIds, setSelectedIds] = useState<string[]>(FACILITIES.map((f) => f.id));

  const toggle = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const selectedFacilities = FACILITIES.filter((f) => selectedIds.includes(f.id));

  // Portfolio risk items: all systems rated ≤ 2, sorted by risk contribution desc
  type RiskItem = { facilityShort: string; systemName: string; rating: number; score: number };
  const allRisks: RiskItem[] = [];
  for (const f of selectedFacilities) {
    for (const s of SYSTEMS) {
      const r = ratings[f.id]?.[s.id];
      if (r !== undefined && r > 0 && r <= 2) {
        allRisks.push({ facilityShort: f.short, systemName: s.name, rating: r, score: (6 - r) * s.weight });
      }
    }
  }
  allRisks.sort((a, b) => b.score - a.score);

  const scores = selectedFacilities.map((f) => riskScore(ratings[f.id] ?? {}));
  const maxScore = scores.length ? Math.max(...scores) : 0;
  const highestRiskFacility = selectedFacilities[scores.indexOf(maxScore)];
  const totalBudget = FACILITIES.reduce((sum, f) => sum + f.budget, 0);
  const assessedCount = FACILITIES.filter((f) => savedAssessments[f.id]?.timestamp !== '').length;

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <MetricCard
          label="Facilities assessed"
          value={`${assessedCount}/${FACILITIES.length}`}
          sub="of portfolio"
        />
        <MetricCard
          label="Highest risk"
          value={highestRiskFacility?.short ?? '—'}
          sub={`Score: ${maxScore}`}
          valueColor="#A32D2D"
        />
        <MetricCard
          label="Critical items"
          value={String(allRisks.filter((r) => r.rating === 1).length)}
          sub="across portfolio"
          valueColor="#A32D2D"
        />
        <MetricCard label="Total budget" value={`$${totalBudget}K`} sub="annual estimate" />
      </div>

      {/* Portfolio overview chart */}
      <div className="card p-5 mb-4">
        <p className="sec-label">Portfolio condition overview — all facilities</p>
        <CompareChart ratings={ratings} selectedIds={selectedIds} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Facility-by-facility breakdown */}
        <div className="card p-5">
          <p className="sec-label">Facility-by-facility breakdown</p>
          {selectedFacilities.map((f) => (
            <FacilityCompareRow key={f.id} facility={f} ratings={ratings[f.id] ?? {}} />
          ))}
          {selectedFacilities.length === 0 && (
            <p className="text-[13px] text-gray-400 py-4">Select at least one facility above.</p>
          )}
        </div>

        {/* Portfolio high-risk items */}
        <div className="card p-5">
          <p className="sec-label">Highest-risk items — portfolio-wide</p>
          {allRisks.slice(0, 8).map((r, idx) => (
            <div key={idx} className="flex items-center gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-riskH-bg text-riskH text-[11px] font-semibold">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">{r.systemName}</p>
                <p className="text-[11px] text-gray-500">{r.facilityShort}</p>
              </div>
              <span className={`badge ${r.rating === 1 ? 'badge-h' : 'badge-m'}`}>
                {r.rating === 1 ? 'Critical' : 'Poor'}
              </span>
            </div>
          ))}
          {allRisks.length === 0 && (
            <p className="text-[13px] text-gray-400 py-4">No systems rated Critical or Poor.</p>
          )}
        </div>
      </div>

      {/* Budget allocation chart */}
      <div className="card p-5">
        <p className="sec-label">Budget allocation recommendation</p>
        <BudgetChart ratings={ratings} />
      </div>
    </div>
  );
}
