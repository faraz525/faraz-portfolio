export interface Experience {
  readonly company: string
  readonly role: string
  readonly date: string
  readonly location: string
  readonly bullets: readonly string[]
  readonly techStack: readonly string[]
  readonly logo: string
}

export const experiences: readonly Experience[] = [
  {
    company: 'Tesla — Firebolt',
    role: 'Software Engineer',
    date: 'Jun 2025 – Present',
    location: 'Seattle, WA',
    bullets: [
      'I architect Go pipelines that process millions of events per day, powering the internal platform that keeps Tesla\'s customer operations running in real time.',
      'I built an agentic customer-experience workflow that auto-resolves roughly 75% of incoming cases, cutting response times from hours to seconds.',
      'I designed an AI evaluation tool in React and Go that lets the team measure model accuracy against live production data.',
      'I own a templating service with RBAC that standardizes communications across business units while keeping sensitive data locked down.',
    ],
    techStack: ['Go', 'Kafka', 'Flink', 'Postgres', 'MongoDB', 'Redis', 'Kubernetes'],
    logo: 'tesla_logo_PNG19.png',
  },
  {
    company: 'Tesla — Customer 360 Platform',
    role: 'Software Engineering Intern',
    date: 'Sep – Dec 2024',
    location: 'Fremont, CA',
    bullets: [
      'I built ETL pipelines that unified fragmented customer data into a single 360-degree view used by service teams across the company.',
      'I created a data-validation framework that caught schema drift before it hit production, saving the team dozens of incident hours.',
      'I ran stakeholder interviews to map data needs, then translated those findings into a pipeline architecture the team still uses.',
    ],
    techStack: ['Neo4j', 'MongoDB', 'Kafka', 'GraphQL', 'Docker'],
    logo: 'tesla_logo_PNG19.png',
  },
  {
    company: 'Amazon AWS',
    role: 'Software Development Engineer Intern',
    date: 'Sep – Dec 2023',
    location: 'Seattle, WA',
    bullets: [
      'I built a proactive cluster-health monitoring system in Java and Spark that surfaced failures before engineers noticed them.',
      'I created a visualization tool that replaced hours of manual log-diving, saving the org 400+ developer hours per quarter.',
    ],
    techStack: ['Java', 'Spark', 'AWS', 'CloudWatch', 'TypeScript'],
    logo: 'aws.png',
  },
  {
    company: 'Capital One',
    role: 'Software Engineer Intern',
    date: 'Jun – Sep 2023',
    location: 'New York, NY',
    bullets: [
      'I automated an encrypted ETL workflow that eliminated a manual data-handoff process and freed the team to focus on analysis.',
      'I shipped features in AngularJS and Spring Boot for an internal ops tool used by hundreds of associates daily.',
    ],
    techStack: ['AngularJS', 'Spring Boot', 'AWS', 'Java', 'SQL'],
    logo: 'c1.png',
  },
  {
    company: 'Capital One',
    role: 'Software Data Engineer Intern',
    date: 'Jun – Sep 2022',
    location: 'Plano, TX',
    bullets: [
      'I built a Lambda + CloudWatch validation layer that caught data anomalies in near real-time, saving over 3,600 developer hours annually.',
      'I wrote a Python parsing library with a Trie-based index that ran 2x faster than the existing solution and became the team standard.',
    ],
    techStack: ['Python', 'AWS Lambda', 'CloudWatch', 'React', 'TypeScript'],
    logo: 'c12.jpeg',
  },
] as const
