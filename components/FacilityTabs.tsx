'use client';
import { useStore } from '@/store/useStore';
import { FACILITIES } from '@/lib/data';
import { riskScore, riskScoreCls } from '@/lib/utils';

export default function FacilityTabs() {
  const { currentFacility, setCurrentFacility, ratings, savedAssessments } = useStore();

  return (
    <div>
      <p className="sec-label">Select facility</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {FACILITIES.map((f) => {
          const fRatings = ratings[f.id] ?? {};
          const score = riskScore(fRatings);
          const scoreCls = riskScoreCls(score);
          const active = f.id === currentFacility;
          const saved = !!savedAssessments[f.id]?.timestamp;

          return (
            <button
              key={f.id}
              onClick={() => setCurrentFacility(f.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md border text-[13px] transition-all ${
                active
                  ? 'bg-brand-light border-brand-border text-brand font-semibold'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800'
              }`}
            >
              <span>{f.name}</span>
              {score > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded font-bold ${
                    scoreCls === 'h'
                      ? active ? 'bg-riskH-accent/20 text-riskH-accent' : 'bg-riskH-bg text-riskH'
                      : scoreCls === 'm'
                      ? active ? 'bg-riskM-accent/20 text-riskM-accent' : 'bg-riskM-bg text-riskM'
                      : active ? 'bg-riskL-accent/20 text-riskL-accent' : 'bg-riskL-bg text-riskL'
                  }`}
                >
                  {score}
                </span>
              )}
              {saved && (
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? 'bg-brand' : 'bg-riskL-accent'}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
