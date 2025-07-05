import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      
      <section className="space-y-4">
        <p>
          I'm a software engineer with a passion for building elegant solutions to complex problems. 
          My work focuses on creating tools that help people make better decisions, whether it's 
          analyzing financial data or managing investment portfolios.
        </p>
        
        <p>
          Currently, I'm working on several projects that combine my interests in technology and 
          finance. I believe in the power of simple, well-designed software that does one thing 
          exceptionally well.
        </p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Current Focus</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Building web applications with modern frameworks</li>
          <li>Exploring the intersection of technology and finance</li>
          <li>Writing about programming and investment strategies</li>
          <li>Contributing to open source projects</li>
        </ul>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Interests</h2>
        <p>
          Beyond coding, I'm deeply interested in value investing, financial analysis, and 
          understanding how businesses create lasting value. I enjoy reading annual reports, 
          analyzing business models, and learning from successful investors.
        </p>
      </section>
      
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Connect</h2>
        <div className="space-y-1">
          <p>
            <Link href="https://github.com/yourusername" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </p>
          <p>
            <Link href="https://linkedin.com/in/yourusername" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          </p>
          <p>
            <Link href="https://twitter.com/yourusername" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Twitter/X
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}