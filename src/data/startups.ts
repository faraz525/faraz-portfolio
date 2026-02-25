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
    name: 'AWARE',
    role: 'Founder',
    date: '2017 – 2020',
    description: 'Students with special needs were invisible in most high schools. I started AWARE to change that — building chapters from Oregon to Florida that paired neurotypical students with peers who needed them.',
    highlights: [
      '8,000+ individuals reached across chapters nationwide',
      '$35,000 raised through grants and community partnerships',
      'Recognized by T-Mobile Changemaker and Ashoka Youth Venture',
      'Built the playbook that let any student start a chapter in their school',
    ],
    techStack: ['React', 'Node.js', 'Firebase'],
    logo: 'aware.jpeg',
    animation: 'curtain-reveal',
    accentColor: '#8a9e5a',
  },
  {
    name: 'Cledge',
    role: 'Co-Founder & CTO',
    date: 'Dec 2020 – Dec 2023',
    description: 'College consulting costs $10k and still fails most students. I built Cledge to replace that with AI-powered guidance anyone could afford — then scaled it to 2,000+ users with a team of 12.',
    highlights: [
      'Won #1 at the Dempsey Startup Competition',
      'Accepted into Microsoft for Startups, IBM Startups, and MassChallenge',
      'Led 12 developers shipping features every week for three years',
      'Reached 2,000+ students and parents with personalized college guidance',
    ],
    techStack: ['TypeScript', 'React', 'Next.js', 'MongoDB', 'Firebase'],
    logo: 'cledge.png',
    animation: 'split-wipe',
    accentColor: '#4a7fa5',
  },
  {
    name: 'Modern Stoic',
    role: 'Co-Founder & CTO',
    date: 'Jan – Jun 2025',
    description: 'I saw a gap between internet philosophy content and real products people would use. Modern Stoic became a tokenized wellness brand that hit a $34M market cap and 10,000 users in under six months.',
    highlights: [
      '$34M market cap within the first quarter',
      '10,000+ active users across the platform',
      'Shipped the full product stack solo: token, dashboard, and community',
      'Built on Solana for instant, near-zero-cost transactions',
    ],
    techStack: ['Next.js', 'Solana', 'TypeScript', 'Vercel'],
    logo: '',
    animation: 'radial-burst',
    accentColor: '#ff6b2b',
  },
] as const
