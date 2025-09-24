import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      
      <section className="space-y-4">
        <p>
          I'm a software engineer with a passion for building elegant solutions to complex problems. 
          My work focuses on creating internal tools that help people manage their workflow, automations,
          or even customer facing products used by thousands of people.
        </p>
        
        <p>
          Currently, I'm searching for software solutions that are profitable, so for painkillers.
        </p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Current Focus</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Building web applications with modern frameworks</li>
          <li>Exploring the intersection of technology and finance</li>
          <li>Writing about programming and investments</li>
          <li>Reading books on business, investing, and programming</li>
        </ul>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Interests</h2>
        <p>
          Beyond coding, I'm deeply interested in value investing, financial analysis, and 
          understanding how businesses create value. I enjoy reading annual reports,
          analyzing business models, and learning from successful investors.
        </p>
      </section>
      
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Connect</h2>
        <div className="space-y-1">
          <p>
            <Link href="https://github.com/aldo-leka" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </p>
          <p>
            <Link href="https://linkedin.com/in/aldo-leka" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          </p>
          <p>
            <Link href="https://twitter.com/aldodotal" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Twitter/X
            </Link>
          </p>
          <p>
            <Link href="https://www.boot.dev/u/aldo" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Boot.dev
            </Link>
          </p>
          <p>
            <Link href="https://goodreads.com/aldo_leka" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Goodreads
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}