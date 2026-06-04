'use client';
import { useStore } from '@/store/useStore';
import { FACILITIES, SYSTEMS } from '@/lib/data';
import { riskScore, avgRating, conditionLabel, conditionCls, riskScoreColorHex, badgeClass } from '@/lib/utils';
import FacilityTabs from '@/components/FacilityTabs';
import SystemRatingRow from '@/components/SystemRatingRow';
import RiskSchedule from '@/components/RiskSchedule';
import AccountabilityRegister from '@/components/AccountabilityRegister';

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

export default function AssessPage() {
  const { currentFacility, ratings, savedAssessments, saveAssessment, resetFacility, setRating } = useStore();

  const facility = FACILITIES.find((f) => f.id === currentFacility)!;
  const fRatings = ratings[currentFacility] ?? {};
  const score = riskScore(fRatings);
  const avg = avgRating(fRatings);
  const ratedCount = SYSTEMS.filter((s) => fRatings[s.id] !== undefined && fRatings[s.id] > 0).length;
  const saved = savedAssessments[currentFacility];
  const isAssessed = saved?.timestamp !== undefined && saved.timestamp !== '';

  const condAvgLabel = avg !== null ? conditionLabel(avg) : '—';
  const condAvgCls = avg !== null ? conditionCls(avg) : 'l';

  return (
    <div>
      <FacilityTabs />

      {/* Summary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-5">
        <MetricCard label="Facility" value={facility.name} sub={`${facility.type} · ${facility.region}`} />
        <MetricCard
          label="Risk score"
          value={String(score)}
          sub="out of 100"
          valueColor={riskScoreColorHex(score)}
        />
        <MetricCard
          label="Condition"
          value={condAvgLabel}
          sub={`${ratedCount}/${SYSTEMS.length} rated`}
          valueColor={avg !== null ? riskScoreColorHex(avg <= 2 ? 60 : avg <= 3 ? 40 : 10) : undefined}
        />
        <MetricCard label="Manager" value={facility.manager} sub={`${facility.region} region`} />
        <MetricCard
          label="Status"
          value={isAssessed ? 'Assessed' : 'Pending'}
          sub={isAssessed ? 'Saved' : 'Not yet saved'}
          valueColor={isAssessed ? '#3B6D11' : '#854F0B'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* System ratings card */}
        <div className="card p-5">
          <p className="sec-label">
            System condition ratings{' '}
            <span className="font-normal text-gray-300 normal-case tracking-normal">1 = Critical · 5 = Excellent</span>
          </p>
          {SYSTEMS.map((sys) => (
            <SystemRatingRow
              key={sys.id}
              system={sys}
              facilityId={currentFacility}
              rating={fRatings[sys.id] ?? 0}
            />
          ))}
          <div className="flex gap-2 mt-4 flex-wrap">
            <button
              onClick={() => saveAssessment(currentFacility)}
              className="px-4 py-2 bg-brand text-white text-[13px] font-semibold rounded-md hover:bg-brand-dark transition-colors"
            >
              Save assessment
            </button>
            <button
              onClick={() => resetFacility(currentFacility)}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[13px] rounded-md hover:border-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Risk schedule card */}
        <div className="card p-5">
          <p className="sec-label">Risk-prioritized schedule</p>
          <RiskSchedule facilityId={currentFacility} />
        </div>
      </div>

      {/* Accountability register */}
      <div className="card p-5">
        <AccountabilityRegister facilityId={currentFacility} />
      </div>
    </div>
  );
}
