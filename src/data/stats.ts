export interface Stat {
  readonly value: string
  readonly numericValue: number
  readonly suffix: string
  readonly prefix: string
  readonly label: string
  readonly sublabel: string
  readonly gradient: readonly [string, string]
}

export const stats: readonly Stat[] = [
  {
    value: 'Millions',
    numericValue: 1000000,
    suffix: '+',
    prefix: '',
    label: 'events processed daily',
    sublabel: 'Tesla — Real-time data pipelines at massive scale',
    gradient: ['#7c3aed', '#a855f7'],
  },
  {
    value: '75%',
    numericValue: 75,
    suffix: '%',
    prefix: '',
    label: 'alerts auto-resolved',
    sublabel: 'Tesla — AI agent cutting on-call burden across the team',
    gradient: ['#a855f7', '#c084fc'],
  },
  {
    value: '400+',
    numericValue: 400,
    suffix: '+',
    prefix: '',
    label: 'developer hours saved',
    sublabel: 'AWS — Proactive cluster health monitoring',
    gradient: ['#06b6d4', '#22d3ee'],
  },
  {
    value: '3,600',
    numericValue: 3600,
    suffix: '',
    prefix: '',
    label: 'hours saved annually',
    sublabel: 'Capital One — Automated data validation',
    gradient: ['#3b82f6', '#60a5fa'],
  },
  {
    value: '$34M',
    numericValue: 34,
    suffix: 'M',
    prefix: '$',
    label: 'market cap reached',
    sublabel: 'Modern Stoic — Digital wellness brand',
    gradient: ['#7c3aed', '#06b6d4'],
  },
  {
    value: '8,000+',
    numericValue: 8000,
    suffix: '+',
    prefix: '',
    label: 'individuals reached',
    sublabel: 'AWARE — Non-profit fighting stigma nationwide',
    gradient: ['#06b6d4', '#a855f7'],
  },
] as const
