'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog?category=programming', label: 'Programming' },
    { href: '/blog?category=investing', label: 'Investing' },
    { href: '/about', label: 'About' },
  ]
  
  return (
    <nav className="fixed left-0 top-0 h-full w-48 p-8">
      <div className="space-y-4">
        <h1 className="text-xl font-bold mb-8">Aldo's Site</h1>
        {links.map((link) => {
          const isActive = link.href === '/' 
            ? pathname === '/' 
            : pathname.startsWith(link.href.split('?')[0])
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block no-underline ${
                isActive ? 'font-bold' : ''
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}