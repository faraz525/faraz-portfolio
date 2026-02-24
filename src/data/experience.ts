export interface Experience {
  readonly company: string
  readonly role: string
  readonly date: string
  readonly bullets: readonly string[]
  readonly techStack: readonly string[]
  readonly logo: string
}

export const experiences: readonly Experience[] = [
  {
    company: 'Tesla',
    role: 'Software Engineer',
    date: 'Jan 2024 – Present',
    bullets: [
      'Building robust back-end systems and data pipelines processing millions of events per day for Tesla\'s high-performance platform.',
      'Developed an AI agent that auto-resolves 75% of incoming infrastructure alerts, cutting on-call burden across the team.',
      'Applied principles of distributed computing to optimize data delivery in near real-time at massive scale.',
    ],
    techStack: ['Python', 'Kafka', 'Kubernetes', 'Terraform', 'gRPC'],
    logo: 'tesla_logo_PNG19.png',
  },
  {
    company: 'Tesla',
    role: 'Software Engineering Intern',
    date: 'Sep 2023 – Dec 2023',
    bullets: [
      'Designed and developed robust back-end systems and data pipelines for Tesla\'s high-performance platform.',
      'Applied principles of distributed computing to optimize data delivery in near real-time.',
    ],
    techStack: ['Python', 'Kafka', 'Spark', 'AWS'],
    logo: 'tesla_logo_PNG19.png',
  },
  {
    company: 'Capital One',
    role: 'Software Data Engineer Intern',
    date: 'Jun 2023 – Sep 2023',
    bullets: [
      'Built an automated data validation process using CloudWatch and Lambda, saving over 3,600 developer hours annually.',
      'Developed a high-performance Python library for parsing, optimizing indexing and comparison with a Trie data structure.',
      'Contributed to a customer-facing UI tool using React, empowering users to manage their data preferences.',
    ],
    techStack: ['Python', 'AWS Lambda', 'CloudWatch', 'React', 'TypeScript'],
    logo: 'c1.png',
  },
  {
    company: 'Amazon AWS',
    role: 'Software Development Engineer Intern',
    date: 'Sep 2022 – Dec 2022',
    bullets: [
      'Spearheaded proactive cluster health monitoring solutions, saving 400+ developer hours on debugging.',
      'Utilized Java and Spark to handle large datasets, improving the robustness and reliability of AWS services.',
      'Created a tool for on-demand cluster health visualization, improving developer experience across the org.',
    ],
    techStack: ['Java', 'Spark', 'AWS', 'CloudWatch', 'TypeScript'],
    logo: 'aws.png',
  },
  {
    company: 'Cledge',
    role: 'Co-Founder & CTO',
    date: 'Dec 2020 – Dec 2023',
    bullets: [
      'Launched Cledge to tackle inequity in college consulting and revolutionize college advising.',
      'Won #1 at Dempsey Startup Competition; Microsoft for Startups, IBM Startups, and MassChallenge accelerator.',
      'Led a team of 12 developers building web solutions with TypeScript, React, Next.js, and MongoDB.',
    ],
    techStack: ['TypeScript', 'React', 'Next.js', 'MongoDB', 'Firebase'],
    logo: 'cledge.png',
  },
] as const
