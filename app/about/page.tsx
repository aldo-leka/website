import Link from 'next/link'

export default function AboutPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-6">About Me</h1>

            <section className="space-y-4">
                <p>
                    I was always interested in many things, be it music production, game development, digital art, UI / UX, product development, software development, etc.
                </p>
                <p>
                    I wish it was possible to be proficient in many things... or be able to make cool things in all of these fields. 🤷🏻‍♂️
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold">Current Focus</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Working on a freelance basis.</li>
                    <li>Becoming an archmage at boot.dev.</li>
                    <li>Researching stocks and investing.</li>
                    <li>Following the neetcode.io curriculum and rereading Cracking the coding interview.</li>
                </ul>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-bold">Links</h2>
                <div className="space-y-1">
                    <p>
                        <Link href="https://github.com/aldo-leka" className="text-blue-600 hover:underline"
                              target="_blank" rel="noopener noreferrer">
                            GitHub
                        </Link>
                    </p>
                    <p>
                        <Link href="https://linkedin.com/in/aldo-leka" className="text-blue-600 hover:underline"
                              target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </Link>
                    </p>
                    <p>
                        <Link href="https://twitter.com/aldodotal" className="text-blue-600 hover:underline"
                              target="_blank" rel="noopener noreferrer">
                            Twitter/X
                        </Link>
                    </p>
                    <p>
                        <Link href="https://www.boot.dev/u/aldo" className="text-blue-600 hover:underline"
                              target="_blank" rel="noopener noreferrer">
                            Boot.dev
                        </Link>
                    </p>
                    <p>
                        <Link href="https://goodreads.com/aldo_leka" className="text-blue-600 hover:underline"
                              target="_blank" rel="noopener noreferrer">
                            Goodreads
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    )
}