import Link from 'next/link'

const projects = [
  {
    name: 'SuperInvestor',
    url: 'https://www.getsuperinvestor.com',
    github: 'https://github.com/yourusername/superinvestor',
    description: 'A note-taking application for SEC filings that helps investors analyze and annotate financial documents.',
    tech: ['Blazor Server', '.NET', 'C#', 'SQL Server'],
    features: [
      'Real-time SEC filing retrieval and parsing',
      'Interactive note-taking interface with rich text editing',
      'Shareable links for collaborative analysis',
      'Full-text search across filings and notes',
      'Export functionality for research reports',
    ],
  },
  {
    name: 'StockPortfolio',
    url: 'https://www.stockportfolio.me',
    github: 'https://github.com/yourusername/stockportfolio',
    description: 'A portfolio sharing platform that visualizes investment allocations using interactive donut charts.',
    tech: ['Next.js', 'React', 'TypeScript', 'Chart.js', 'Vercel'],
    features: [
      'Interactive donut chart visualizations',
      'Real-time stock price updates',
      'Portfolio performance tracking',
      'Shareable portfolio links',
      'Mobile-responsive design',
    ],
  },
]

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Projects</h1>
      
      <div className="space-y-12">
        {projects.map((project) => (
          <article key={project.name} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">
                <Link href={project.url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                  {project.name}
                </Link>
              </h2>
              <p className="text-gray-700 mb-3">{project.description}</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Technical Implementation</h3>
              <p className="text-sm text-gray-600 mb-2">
                Built with: {project.tech.join(', ')}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="text-sm">
              <Link href={project.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}