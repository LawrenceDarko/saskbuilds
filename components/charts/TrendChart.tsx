'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { KPI_DATA, PERIODS } from '@/lib/data';

interface Props { currentPeriod: string }

export default function TrendChart({ currentPeriod }: Props) {
  const data = PERIODS.map((p) => ({
    period: p.replace(' 2025', ''),
    value: KPI_DATA[p].deferred,
    active: p === currentPeriod,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickFormatter={(v) => `$${v}M`}
          axisLine={false}
          tickLine={false}
          width={38}
        />
        <Tooltip
          formatter={(v: number) => [`$${v}M`, 'Deferred Maintenance']}
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e5e7eb' }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.active ? '#185FA5' : '#B5D4F4'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
