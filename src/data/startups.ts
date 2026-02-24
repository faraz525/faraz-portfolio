export interface Startup {
  readonly name: string
  readonly role: string
  readonly date: string
  readonly description: string
  readonly highlights: readonly string[]
  readonly techStack: readonly string[]
  readonly logo: string
  readonly animation: 'radial-burst' | 'split-wipe' | 'curtain-reveal'
  readonly accentColor: string
}

export const startups: readonly Startup[] = [
  {
    name: 'Modern Stoic',
    role: 'Founder',
    date: '2024 – Present',
    description: 'Building a digital wellness brand rooted in Stoic philosophy, reaching a community of thousands.',
    highlights: [
      '$34M+ market cap reached',
      'Growing community across platforms',
      'Content and product ecosystem',
    ],
    techStack: ['Next.js', 'Solana', 'TypeScript', 'Vercel'],
    logo: '',
    animation: 'radial-burst',
    accentColor: '#7c3aed',
  },
  {
    name: 'Cledge',
    role: 'Co-Founder & CTO',
    date: 'Dec 2020 – Dec 2023',
    description: 'Democratizing college advising through AI-powered guidance, reaching 2,000+ students and parents.',
    highlights: [
      '#1 at Dempsey Startup Competition',
      'Microsoft for Startups & IBM Startups',
      'MassChallenge accelerator',
      'Team of 12 developers',
    ],
    techStack: ['TypeScript', 'React', 'Next.js', 'MongoDB', 'Firebase'],
    logo: 'cledge.png',
    animation: 'split-wipe',
    accentColor: '#a855f7',
  },
  {
    name: 'AWARE',
    role: 'Co-Founder',
    date: 'Sep 2018 – Sep 2020',
    description: 'Non-profit fighting the stigma against students with special needs through high school chapters nationwide.',
    highlights: [
      '8,000+ individuals reached',
      '$35,000 in funding raised',
      'Recognized by T-Mobile & Ashoka',
      'Chapters from Oregon to Florida',
    ],
    techStack: ['React', 'Node.js', 'Firebase'],
    logo: 'aware.jpeg',
    animation: 'curtain-reveal',
    accentColor: '#06b6d4',
  },
] as const
