export interface Facility {
  id: string;
  name: string;
  short: string;
  type: string;
  manager: string;
  region: string;
  budget: number; // in $K
}

export interface System {
  id: string;
  name: string;
  weight: number;
  owner: string;
}

export interface KpiItem {
  name: string;
  target: number;
  actual: number;
  unit: string;
  higherBetter: boolean;
}

export interface KpiPeriod {
  period: string;
  items: KpiItem[];
  deferred: number; // in $M
}

export interface GovItem {
  id: string;
  name: string;
  defaults: Record<string, boolean>;
}

export const FACILITIES: Facility[] = [
  { id: 'f1', name: 'Regina Courthouse', short: 'Regina CH', type: 'Courthouse', manager: 'D. Braun', region: 'South', budget: 420 },
  { id: 'f2', name: 'Prince Albert Correctional', short: 'PA Corr.', type: 'Correctional', manager: 'S. Okafor', region: 'North', budget: 580 },
  { id: 'f3', name: 'Moose Jaw Health Centre', short: 'MJ Health', type: 'Health', manager: 'L. Tremblay', region: 'South', budget: 310 },
  { id: 'f4', name: 'Saskatoon Gov. Office', short: 'Sask. Gov.', type: 'Gov. Office', manager: 'R. Mehta', region: 'Central', budget: 250 },
];

export const SYSTEMS: System[] = [
  { id: 'hvac',     name: 'HVAC',          weight: 1.4, owner: 'Facilities Ops' },
  { id: 'elec',     name: 'Electrical',    weight: 1.5, owner: 'Electrical Services' },
  { id: 'roof',     name: 'Roofing',       weight: 1.2, owner: 'Building Envelope' },
  { id: 'plumb',    name: 'Plumbing',      weight: 1.1, owner: 'Facilities Ops' },
  { id: 'fire',     name: 'Fire safety',   weight: 1.6, owner: 'Safety & Compliance' },
  { id: 'struct',   name: 'Structural',    weight: 1.3, owner: 'Structural Eng.' },
  { id: 'access',   name: 'Accessibility', weight: 1.0, owner: 'Accessibility Office' },
  { id: 'security', name: 'Security',      weight: 1.1, owner: 'Security Services' },
];

// All four facilities pre-seeded with realistic ratings
export const INITIAL_RATINGS: Record<string, Record<string, number>> = {
  f1: { hvac: 2, elec: 3, roof: 1, plumb: 4, fire: 2, struct: 4, access: 5, security: 3 },
  f2: { hvac: 3, elec: 2, roof: 3, plumb: 2, fire: 1, struct: 3, access: 3, security: 4 },
  f3: { hvac: 4, elec: 4, roof: 3, plumb: 4, fire: 3, struct: 5, access: 4, security: 3 },
  f4: { hvac: 5, elec: 4, roof: 4, plumb: 5, fire: 4, struct: 5, access: 4, security: 5 },
};

export const PERIODS = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] as const;
export type Period = typeof PERIODS[number];

export const KPI_DATA: Record<string, KpiPeriod> = {
  'Q1 2025': {
    period: 'Q1 2025',
    items: [
      { name: 'Preventive maintenance completion rate',         target: 80,  actual: 62,  unit: '%',    higherBetter: true },
      { name: 'Mean time to repair (days)',                     target: 5,   actual: 8.2, unit: ' days', higherBetter: false },
      { name: 'Facilities with up-to-date condition assessments', target: 100, actual: 50,  unit: '%',    higherBetter: true },
      { name: 'Critical systems rated Good or better',          target: 90,  actual: 58,  unit: '%',    higherBetter: true },
      { name: 'Deferred maintenance reduction',                 target: 15,  actual: 4,   unit: '%',    higherBetter: true },
      { name: 'Work orders closed on schedule',                 target: 85,  actual: 61,  unit: '%',    higherBetter: true },
    ],
    deferred: 4.2,
  },
  'Q2 2025': {
    period: 'Q2 2025',
    items: [
      { name: 'Preventive maintenance completion rate',         target: 80,  actual: 71,  unit: '%',    higherBetter: true },
      { name: 'Mean time to repair (days)',                     target: 5,   actual: 6.4, unit: ' days', higherBetter: false },
      { name: 'Facilities with up-to-date condition assessments', target: 100, actual: 75,  unit: '%',    higherBetter: true },
      { name: 'Critical systems rated Good or better',          target: 90,  actual: 67,  unit: '%',    higherBetter: true },
      { name: 'Deferred maintenance reduction',                 target: 15,  actual: 9,   unit: '%',    higherBetter: true },
      { name: 'Work orders closed on schedule',                 target: 85,  actual: 72,  unit: '%',    higherBetter: true },
    ],
    deferred: 3.8,
  },
  'Q3 2025': {
    period: 'Q3 2025',
    items: [
      { name: 'Preventive maintenance completion rate',         target: 80,  actual: 78,  unit: '%',    higherBetter: true },
      { name: 'Mean time to repair (days)',                     target: 5,   actual: 5.5, unit: ' days', higherBetter: false },
      { name: 'Facilities with up-to-date condition assessments', target: 100, actual: 100, unit: '%',    higherBetter: true },
      { name: 'Critical systems rated Good or better',          target: 90,  actual: 81,  unit: '%',    higherBetter: true },
      { name: 'Deferred maintenance reduction',                 target: 15,  actual: 13,  unit: '%',    higherBetter: true },
      { name: 'Work orders closed on schedule',                 target: 85,  actual: 80,  unit: '%',    higherBetter: true },
    ],
    deferred: 3.1,
  },
  'Q4 2025': {
    period: 'Q4 2025',
    items: [
      { name: 'Preventive maintenance completion rate',         target: 80,  actual: 86,  unit: '%',    higherBetter: true },
      { name: 'Mean time to repair (days)',                     target: 5,   actual: 4.8, unit: ' days', higherBetter: false },
      { name: 'Facilities with up-to-date condition assessments', target: 100, actual: 100, unit: '%',    higherBetter: true },
      { name: 'Critical systems rated Good or better',          target: 90,  actual: 88,  unit: '%',    higherBetter: true },
      { name: 'Deferred maintenance reduction',                 target: 15,  actual: 15,  unit: '%',    higherBetter: true },
      { name: 'Work orders closed on schedule',                 target: 85,  actual: 84,  unit: '%',    higherBetter: true },
    ],
    deferred: 2.6,
  },
};

// Q1 baselines for year-over-year trend column
export const YOY_BASELINES = {
  deferred: 4.2,
  pmCompletion: 62,
  workOrders: 61,
  mttr: 8.2,
};

export const GOV_ITEMS: GovItem[] = [
  {
    id: 'asset-data',
    name: 'Asset condition data captured in system',
    defaults: { 'Q1 2025': false, 'Q2 2025': true, 'Q3 2025': true, 'Q4 2025': true },
  },
  {
    id: 'accountability',
    name: 'Maintenance accountability assigned to role',
    defaults: { 'Q1 2025': false, 'Q2 2025': false, 'Q3 2025': true, 'Q4 2025': true },
  },
  {
    id: 'risk-register',
    name: 'Risk register updated this quarter',
    defaults: { 'Q1 2025': false, 'Q2 2025': true, 'Q3 2025': true, 'Q4 2025': true },
  },
  {
    id: 'kpi-report',
    name: 'KPI report submitted to senior management',
    defaults: { 'Q1 2025': false, 'Q2 2025': false, 'Q3 2025': true, 'Q4 2025': true },
  },
  {
    id: 'iso-55000',
    name: 'Facilities with ISO 55000-aligned plans',
    defaults: { 'Q1 2025': false, 'Q2 2025': false, 'Q3 2025': false, 'Q4 2025': true },
  },
  {
    id: 'edi-audit',
    name: 'EDI accessibility audit completed',
    defaults: { 'Q1 2025': false, 'Q2 2025': false, 'Q3 2025': true, 'Q4 2025': true },
  },
];

export const REC_MAP: Record<number, { label: string; action: string; tl: string; cls: 'h' | 'm' | 'l' }> = {
  1: { label: 'Critical',   action: 'Immediate replacement',  tl: '< 30 days',  cls: 'h' },
  2: { label: 'Poor',       action: 'Urgent repairs required', tl: '30–60 days', cls: 'm' },
  3: { label: 'Fair',       action: 'Plan within quarter',    tl: '60–90 days', cls: 'm' },
  4: { label: 'Good',       action: 'Routine inspection',     tl: '6 months',   cls: 'l' },
  5: { label: 'Excellent',  action: 'Maintain schedule',      tl: '12 months',  cls: 'l' },
};

export const DUE_TEXT: Record<number, string> = {
  1: 'Overdue',
  2: 'Due in 14 days',
  3: 'Due in 45 days',
  4: 'Due in 6 months',
  5: 'Due in 12 months',
};
