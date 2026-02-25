export interface Skill {
  readonly name: string
  readonly category: SkillCategory
}

export type SkillCategory =
  | 'agentic'
  | 'commandhub'
  | 'infrastructure'
  | 'data'

export const skills: readonly Skill[] = [
  // Agentic Stack
  { name: 'Claude Code', category: 'agentic' },
  { name: 'OpenClaw', category: 'agentic' },
  { name: 'MCP', category: 'agentic' },
  { name: 'Claude API', category: 'agentic' },
  { name: 'Tool-Use Patterns', category: 'agentic' },
  { name: 'Prompt Engineering', category: 'agentic' },

  // Command Hub
  { name: 'Raspberry Pi', category: 'commandhub' },
  { name: 'OpenClaw Gateway', category: 'commandhub' },
  { name: 'Local Infrastructure', category: 'commandhub' },

  // Infrastructure
  { name: 'AWS', category: 'infrastructure' },
  { name: 'Kubernetes', category: 'infrastructure' },
  { name: 'Docker', category: 'infrastructure' },
  { name: 'Terraform', category: 'infrastructure' },
  { name: 'Vercel', category: 'infrastructure' },
  { name: 'CI/CD', category: 'infrastructure' },

  // Data & Streaming
  { name: 'Kafka', category: 'data' },
  { name: 'Flink', category: 'data' },
  { name: 'Spark', category: 'data' },
  { name: 'PostgreSQL', category: 'data' },
  { name: 'MongoDB', category: 'data' },
  { name: 'Neo4j', category: 'data' },
  { name: 'Redis', category: 'data' },
  { name: 'Firebase', category: 'data' },
] as const

export const categoryLabels: Record<SkillCategory, string> = {
  agentic: 'Agentic Stack',
  commandhub: 'Command Hub',
  infrastructure: 'Infrastructure',
  data: 'Data & Streaming',
} as const
