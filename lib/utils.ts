import { SYSTEMS } from './data';

export function riskScore(ratings: Record<string, number>): number {
  let total = 0, count = 0;
  for (const sys of SYSTEMS) {
    const r = ratings[sys.id];
    if (r !== undefined && r > 0) {
      total += (6 - r) * sys.weight;
      count++;
    }
  }
  return count === 0 ? 0 : Math.round((total / count) * 10);
}

export function avgRating(ratings: Record<string, number>): number | null {
  const vals = SYSTEMS.map(s => ratings[s.id]).filter((v): v is number => v !== undefined && v > 0);
  if (!vals.length) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

export function conditionLabel(avg: number): string {
  if (avg <= 1.5) return 'Critical';
  if (avg <= 2.5) return 'Poor';
  if (avg <= 3.5) return 'Fair';
  if (avg <= 4.2) return 'Good';
  return 'Excellent';
}

// Returns 'h' | 'm' | 'l' matching the prototype's CSS class suffix
export function conditionCls(avg: number): 'h' | 'm' | 'l' {
  if (avg <= 2) return 'h';
  if (avg <= 3) return 'm';
  return 'l';
}

export function riskScoreCls(score: number): 'h' | 'm' | 'l' {
  if (score > 50) return 'h';
  if (score > 30) return 'm';
  return 'l';
}

// Tailwind class strings — full strings so Tailwind can scan them
export function badgeClass(cls: 'h' | 'm' | 'l'): string {
  if (cls === 'h') return 'bg-riskH-bg text-riskH';
  if (cls === 'm') return 'bg-riskM-bg text-riskM';
  return 'bg-riskL-bg text-riskL';
}

export function dotClass(cls: 'h' | 'm' | 'l' | 'na'): string {
  if (cls === 'h') return 'bg-riskH-accent';
  if (cls === 'm') return 'bg-riskM-accent';
  if (cls === 'l') return 'bg-riskL-accent';
  return 'bg-gray-300';
}

export function dueDateClass(rating: number): 'h' | 'm' | 'l' {
  if (rating <= 1) return 'h';
  if (rating <= 3) return 'm';
  return 'l';
}

export function dueDateTextClass(cls: 'h' | 'm' | 'l'): string {
  if (cls === 'h') return 'text-riskH font-semibold';
  if (cls === 'm') return 'text-riskM font-medium';
  return 'text-riskL';
}

// For Recharts and inline styles — returns hex colour values
export function barColorHex(rating: number): string {
  if (rating <= 2) return '#E24B4A';
  if (rating === 3) return '#EF9F27';
  return '#639922';
}

export function riskScoreColorHex(score: number): string {
  if (score > 50) return '#A32D2D';
  if (score > 30) return '#854F0B';
  return '#3B6D11';
}

// Active rating button colour
export function ratingButtonClass(rating: number): string {
  if (rating === 1) return 'bg-riskH-accent text-white border-riskH-accent';
  if (rating <= 3) return 'bg-riskM-accent text-white border-riskM-accent';
  return 'bg-riskL-accent text-white border-riskL-accent';
}
