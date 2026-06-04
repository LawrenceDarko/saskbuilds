'use client';
import { create } from 'zustand';
import { INITIAL_RATINGS, GOV_ITEMS } from '@/lib/data';

function buildInitialGovChecks(): Record<string, Record<string, boolean>> {
  const checks: Record<string, Record<string, boolean>> = {};
  for (const item of GOV_ITEMS) {
    for (const [period, value] of Object.entries(item.defaults)) {
      if (!checks[period]) checks[period] = {};
      checks[period][item.id] = value;
    }
  }
  return checks;
}

interface SavedAssessment {
  timestamp: string;
}

interface StoreState {
  currentFacility: string;
  currentPeriod: string;
  ratings: Record<string, Record<string, number>>;
  savedAssessments: Record<string, SavedAssessment>;
  governanceChecks: Record<string, Record<string, boolean>>;

  setCurrentFacility: (id: string) => void;
  setCurrentPeriod: (period: string) => void;
  setRating: (facilityId: string, systemId: string, rating: number) => void;
  saveAssessment: (facilityId: string) => void;
  resetFacility: (facilityId: string) => void;
  toggleGovernance: (period: string, milestoneId: string) => void;
}

export const useStore = create<StoreState>()((set) => ({
  currentFacility: 'f1',
  currentPeriod: 'Q1 2025',
  ratings: structuredClone(INITIAL_RATINGS),
  savedAssessments: { f1: { timestamp: '' }, f2: { timestamp: '' }, f3: { timestamp: '' }, f4: { timestamp: '' } },
  governanceChecks: buildInitialGovChecks(),

  setCurrentFacility: (id) => set({ currentFacility: id }),
  setCurrentPeriod: (period) => set({ currentPeriod: period }),

  setRating: (facilityId, systemId, rating) =>
    set((state) => ({
      ratings: {
        ...state.ratings,
        [facilityId]: {
          ...(state.ratings[facilityId] ?? {}),
          [systemId]: rating,
        },
      },
    })),

  saveAssessment: (facilityId) =>
    set((state) => ({
      savedAssessments: {
        ...state.savedAssessments,
        [facilityId]: { timestamp: new Date().toISOString() },
      },
    })),

  resetFacility: (facilityId) =>
    set((state) => {
      const next = { ...state.ratings };
      delete next[facilityId];
      const nextSaved = { ...state.savedAssessments };
      delete nextSaved[facilityId];
      return { ratings: next, savedAssessments: nextSaved };
    }),

  toggleGovernance: (period, milestoneId) =>
    set((state) => ({
      governanceChecks: {
        ...state.governanceChecks,
        [period]: {
          ...(state.governanceChecks[period] ?? {}),
          [milestoneId]: !(state.governanceChecks[period]?.[milestoneId] ?? false),
        },
      },
    })),
}));
