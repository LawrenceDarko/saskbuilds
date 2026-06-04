'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { SYSTEMS, FACILITIES } from '@/lib/data';

interface Props {
  ratings: Record<string, Record<string, number>>;
  selectedIds: string[];
}

const COLORS = ['#185FA5', '#1D9E75', '#D85A30', '#7F77DD'];

export default function CompareChart({ ratings, selectedIds }: Props) {
  const data = SYSTEMS.map((sys) => {
    const entry: Record<string, string | number> = { system: sys.name };
    selectedIds.forEach((fId) => {
      const f = FACILITIES.find((x) => x.id === fId)!;
      const r = ratings[fId]?.[sys.id] ?? 0;
      // Y-axis: risk contribution score (6 - rating) * 10, matches prototype's compareChart
      entry[f.short] = r > 0 ? Math.round((6 - r) * 10) : 0;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
        <XAxis
          dataKey="system"
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          angle={-18}
          textAnchor="end"
          height={44}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          width={28}
          domain={[0, 50]}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e5e7eb' }}
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
        {selectedIds.map((fId, idx) => {
          const f = FACILITIES.find((x) => x.id === fId)!;
          return (
            <Bar
              key={fId}
              dataKey={f.short}
              fill={COLORS[idx % COLORS.length]}
              radius={[3, 3, 0, 0]}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
