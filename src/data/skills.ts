export interface Skill {
  readonly name: string
  readonly category: SkillCategory
}

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'infrastructure'
  | 'data'
  | 'tools'

export const skills: readonly Skill[] = [
  // Languages
  { name: 'Python', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'Java', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'Go', category: 'languages' },

  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Astro', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'HTML/CSS', category: 'frontend' },
  { name: 'GSAP', category: 'frontend' },

  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'gRPC', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },

  // Infrastructure
  { name: 'AWS', category: 'infrastructure' },
  { name: 'Kubernetes', category: 'infrastructure' },
  { name: 'Terraform', category: 'infrastructure' },
  { name: 'Docker', category: 'infrastructure' },
  { name: 'Vercel', category: 'infrastructure' },
  { name: 'CI/CD', category: 'infrastructure' },

  // Data
  { name: 'Kafka', category: 'data' },
  { name: 'Spark', category: 'data' },
  { name: 'MongoDB', category: 'data' },
  { name: 'PostgreSQL', category: 'data' },
  { name: 'Firebase', category: 'data' },
  { name: 'Redis', category: 'data' },

  // Tools
  { name: 'Git', category: 'tools' },
  { name: 'Jira', category: 'tools' },
  { name: 'Linear', category: 'tools' },
  { name: 'Figma', category: 'tools' },
] as const

export const categoryLabels: Record<SkillCategory, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  infrastructure: 'Infrastructure',
  data: 'Data & Databases',
  tools: 'Tools',
} as const
