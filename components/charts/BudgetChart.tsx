'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { FACILITIES } from '@/lib/data';
import { riskScore } from '@/lib/utils';

interface Props {
  ratings: Record<string, Record<string, number>>;
}

const COLORS = ['#185FA5', '#1D9E75', '#D85A30', '#7F77DD'];

export default function BudgetChart({ ratings }: Props) {
  const data = FACILITIES.map((f, idx) => {
    const score = riskScore(ratings[f.id] ?? {});
    return {
      name: f.short,
      recommended: Math.round(f.budget * (0.5 + score / 100)),
      colorIdx: idx,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 32, left: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickFormatter={(v) => `$${v}K`}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11, fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
          width={68}
        />
        <Tooltip
          formatter={(v: number) => [`$${v.toLocaleString()}K`, 'Recommended']}
          contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e5e7eb' }}
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
        />
        <Bar dataKey="recommended" radius={[0, 4, 4, 0]}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.colorIdx % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
