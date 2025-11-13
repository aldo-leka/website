'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const projects = [
    {
        name: 'Christmas Blackjack',
        url: 'https://blackjack.aldo.al',
        github: 'https://github.com/aldo-leka/blackjack.js',
        description: 'A game I built for fun in 2 weeks which features authoritative server multiplayer logic and in-game purchases.',
        tech: ['Next.js', 'Node.js', 'Express.js', 'SocketIO'],
        features: [
            'Complex Blackjack rules and matchmaking made with authoritative server',
            'Secure data transmission to not allow players to cheat',
            'Christmas-themed Blackjack and UI / UX made with Figma',
            'In-game chip package purchases via polar.sh',
        ],
        demoGif: '/demos/blackjack.gif',
    },
    {
        name: 'QuizPlus',
        url: 'https://www.quizplus.io',
        description: 'A quiz game that currently features a Who Wants to Be a Millionaire quiz and a multi-player quiz with AI-generated content.',
        tech: ['Next.js', 'Node.js', 'API', 'AI system prompts'],
        features: [
            'Global multi-player game finite state machine',
            'Unique username stored in localStorage to identify user in a multi-player session',
            'Consistent UX/UI made with Figma',
            'Users by country stats',
            'API that generates and cleans quizzes in db called by a cronjob in Coolify / personal VPS'
        ],
        demoGif: '/demos/quizplus.gif',
    },
    {
        name: 'Super-Investor',
        url: 'https://superinvestor.aldo.al',
        github: 'https://github.com/aldo-leka/SuperInvestor-public',
        description: 'A note-taking application for SEC filings. Name was inspired from The Superinvestors of Graham and Doddsville article by Warren Buffett.',
        tech: ['Blazor Server', '.NET', 'C#', 'PostgreSQL'],
        features: [
            'Real-time SEC filing retrieval and parsing',
            'Interactive note-taking interface',
            'Shareable links',
            'Export functionality',
        ],
        demoGif: '/demos/superinvestor.gif',
    },
    {
        name: 'StockPortfolio.me',
        url: 'https://www.stockportfolio.me',
        description: 'A stock portfolio sharing app that visualizes investment allocations using donut charts.',
        tech: ['Next.js', 'React', 'TypeScript', 'Chart.js', 'Claude Code'],
        features: [
            'Donut chart visualizations',
            'Shareable portfolio links like at X.com: url/username/portfolio',
            'Transfer of user data from not logged-in state via localStorage to database when logged-in',
            'Store images in an R2 bucket with Cloudflare',
        ],
        demoGif: '/demos/stockportfolio.gif',
    },
]

export default function ProjectsPage() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null)
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold inline">My Projects</h1>
                <span className="text-sm text-gray-500 ml-3">(hover over titles to see demos)</span>
            </div>

            <div className="space-y-12">
                {projects.map((project) => (
                    <article key={project.name} className="space-y-4 relative">
                        <div>
                            <h2 className="text-xl font-bold mb-2">
                                {project.url ?
                                    <Link
                                        href={project.url}
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => setHoveredProject(project.name)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        {project.name}
                                    </Link> :
                                    project.name
                                }
                            </h2>
                            <p className="text-gray-700 mb-3">{project.description}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">
                                Built with: {project.tech.join(', ')}
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                {project.features.map((feature, index) => (
                                    <li key={index} className="text-gray-700">{feature}</li>
                                ))}
                            </ul>
                        </div>

                        {project.github &&
                            <div className="text-sm">
                                <Link href={project.github} className="text-blue-600 hover:underline" target="_blank"
                                    rel="noopener noreferrer">
                                    View on GitHub →
                                </Link>
                            </div>}

                        {/* Hover popup GIF */}
                        {hoveredProject === project.name && project.demoGif && (
                            <div className="hidden md:block fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                                <div className="bg-white border-2 border-black p-1 shadow-lg">
                                    <Image
                                        src={project.demoGif}
                                        alt={`${project.name} demo`}
                                        width={600}
                                        height={400}
                                        unoptimized
                                        className="max-w-[600px] h-auto"
                                    />
                                </div>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    )
}