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
    sublabel: 'Go pipelines keeping Tesla\'s customer platform alive in real time',
    gradient: ['#ff6b2b', '#cc5522'],
  },
  {
    value: '75%',
    numericValue: 75,
    suffix: '%',
    prefix: '',
    label: 'cases auto-resolved',
    sublabel: 'An agentic workflow I built that turned hours of wait into seconds',
    gradient: ['#ff6b2b', '#ff8c57'],
  },
  {
    value: '400+',
    numericValue: 400,
    suffix: '+',
    prefix: '',
    label: 'developer hours saved',
    sublabel: 'A cluster-health system at AWS that caught failures before humans did',
    gradient: ['#4a7fa5', '#6a9fc5'],
  },
  {
    value: '3,600',
    numericValue: 3600,
    suffix: '',
    prefix: '',
    label: 'hours saved annually',
    sublabel: 'A Lambda validation layer at Capital One that eliminated manual data checks',
    gradient: ['#4a7fa5', '#3a6585'],
  },
  {
    value: '$34M',
    numericValue: 34,
    suffix: 'M',
    prefix: '$',
    label: 'market cap reached',
    sublabel: 'Modern Stoic — from idea to tokenized brand in under six months',
    gradient: ['#ff6b2b', '#4a7fa5'],
  },
  {
    value: '8,000+',
    numericValue: 8000,
    suffix: '+',
    prefix: '',
    label: 'individuals reached',
    sublabel: 'AWARE chapters from Oregon to Florida, changing how schools include everyone',
    gradient: ['#8a9e5a', '#4a7fa5'],
  },
] as const
