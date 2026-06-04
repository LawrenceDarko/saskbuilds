'use client';
import { useStore } from '@/store/useStore';
import { System } from '@/lib/data';
import { ratingButtonClass } from '@/lib/utils';

interface Props {
  system: System;
  facilityId: string;
  rating: number;
}

export default function SystemRatingRow({ system, facilityId, rating }: Props) {
  const setRating = useStore((s) => s.setRating);

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-[13px] font-medium text-gray-900 w-28 flex-shrink-0">{system.name}</span>
      <div className="flex gap-1">
        {([1, 2, 3, 4, 5] as const).map((n) => (
          <button
            key={n}
            onClick={() => setRating(facilityId, system.id, n)}
            className={`w-7 h-7 rounded-md border text-[11px] font-semibold flex items-center justify-center transition-all ${
              rating === n
                ? ratingButtonClass(n)
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
