'use client';
import { useStore } from '@/store/useStore';
import { KPI_DATA, PERIODS, YOY_BASELINES } from '@/lib/data';
import dynamic from 'next/dynamic';
import KpiRow from '@/components/KpiRow';
import GovernanceScorecard from '@/components/GovernanceScorecard';

const TrendChart = dynamic(() => import('@/components/charts/TrendChart'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-50 rounded animate-pulse" />,
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

export default function KpiPage() {
  const { currentPeriod, setCurrentPeriod } = useStore();
  const d = KPI_DATA[currentPeriod];

  const metTarget = d.items.filter((k) =>
    k.higherBetter ? k.actual >= k.target : k.actual <= k.target
  ).length;

  const avgComp = Math.round(
    d.items.reduce((sum, k) => {
      const pct = k.higherBetter
        ? Math.min(100, Math.round((k.actual / k.target) * 100))
        : Math.min(100, Math.round((k.target / k.actual) * 100));
      return sum + pct;
    }, 0) / d.items.length
  );

  // YoY trend items — compare to Q1 2025 baseline
  const trendItems = [
    { name: 'Deferred maintenance', val: `$${d.deferred}M`, curr: d.deferred, baseline: YOY_BASELINES.deferred, lowerBetter: true },
    { name: 'PM completion rate',   val: `${d.items[0].actual}%`, curr: d.items[0].actual, baseline: YOY_BASELINES.pmCompletion, lowerBetter: false },
    { name: 'Work orders on schedule', val: `${d.items[5].actual}%`, curr: d.items[5].actual, baseline: YOY_BASELINES.workOrders, lowerBetter: false },
    { name: 'Mean time to repair',  val: `${d.items[1].actual} days`, curr: d.items[1].actual, baseline: YOY_BASELINES.mttr, lowerBetter: true },
  ];

  return (
    <div>
      {/* Period selector */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPeriod(p)}
            className={`px-3.5 py-1.5 rounded-md border text-[12px] font-medium transition-colors ${
              p === currentPeriod
                ? 'bg-brand-light border-brand-border text-brand'
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <MetricCard label="Period" value={currentPeriod} sub="Provincial portfolio" />
        <MetricCard
          label="KPIs on target"
          value={`${metTarget}/${d.items.length}`}
          sub="indicators met"
          valueColor={metTarget >= 4 ? '#3B6D11' : metTarget >= 2 ? '#854F0B' : '#A32D2D'}
        />
        <MetricCard
          label="Avg. completion"
          value={`${avgComp}%`}
          sub="of target achieved"
          valueColor={avgComp >= 80 ? '#3B6D11' : avgComp >= 60 ? '#854F0B' : '#A32D2D'}
        />
        <MetricCard label="Deferred maintenance" value={`$${d.deferred}M`} sub="portfolio total" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* KPI rows */}
        <div className="card p-5">
          <p className="sec-label">Maintenance performance indicators</p>
          <div className="flex items-center gap-2.5 pb-2 mb-1 border-b border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-[1.5]">KPI</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-[0.7] text-right">Target</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-[2] pl-2">Progress</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-[0.7] text-right">Actual</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest w-[88px] text-right">Status</span>
          </div>
          {d.items.map((item, idx) => (
            <KpiRow key={idx} item={item} />
          ))}
        </div>

        {/* Trend chart + YoY movement */}
        <div className="card p-5">
          <p className="sec-label">Portfolio trend — deferred maintenance ($M)</p>
          <TrendChart currentPeriod={currentPeriod} />

          <p className="sec-label mt-4">Year-over-year KPI movement</p>
          <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100 mb-1">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex-1">Metric</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest w-16 text-right">Current</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest w-20 text-right">Change</span>
          </div>
          {trendItems.map((t) => {
            const improved = t.lowerBetter ? t.curr < t.baseline : t.curr > t.baseline;
            const same = t.curr === t.baseline;
            const cls = same ? 'flat' : improved ? 'up' : 'down';
            const chgLabel = same ? 'No change' : improved ? 'Improving' : 'Declining';
            const chgClass =
              cls === 'up' ? 'bg-riskL-bg text-riskL' :
              cls === 'down' ? 'bg-riskH-bg text-riskH' :
              'bg-gray-100 text-gray-500';
            return (
              <div key={t.name} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                <span className="text-[13px] text-gray-800 flex-1">{t.name}</span>
                <span className="text-[13px] font-semibold text-gray-900 w-16 text-right">{t.val}</span>
                <span className={`badge ${chgClass} w-20 text-center`}>{chgLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Governance scorecard */}
      <div className="card p-5">
        <GovernanceScorecard period={currentPeriod} />
      </div>
    </div>
  );
}
