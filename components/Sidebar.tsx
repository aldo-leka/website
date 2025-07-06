'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function SidebarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog?category=programming', label: 'Programming' },
    { href: '/blog?category=investing', label: 'Investing' },
    { href: '/about', label: 'About' },
  ]
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  
  return (
    <>
      {/* Hamburger button - only visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 w-full bg-black transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <nav className={`
        fixed left-0 top-0 h-full w-48 p-8 bg-white z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="space-y-4">
          <h1 className="text-xl font-bold mb-8">Aldo's Site</h1>
          {links.map((link) => {
            let isActive = false
            
            if (link.href === '/') {
              isActive = pathname === '/'
            } else if (link.href.includes('?')) {
              // For links with query params (blog categories)
              const [linkPath, linkQuery] = link.href.split('?')
              const linkParams = new URLSearchParams(linkQuery)
              const linkCategory = linkParams.get('category')
              const currentCategory = searchParams.get('category')
              
              isActive = pathname === linkPath && linkCategory === currentCategory
            } else {
              // For other links (projects, about)
              isActive = pathname.startsWith(link.href)
            }
            
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
    </>
  )
}

export default function Sidebar() {
  return (
    <Suspense fallback={<SidebarFallback />}>
      <SidebarContent />
    </Suspense>
  )
}

function SidebarFallback() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog?category=programming', label: 'Programming' },
    { href: '/blog?category=investing', label: 'Investing' },
    { href: '/about', label: 'About' },
  ]
  
  return (
    <>
      {/* Hamburger button - only visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 w-full bg-black transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <nav className={`
        fixed left-0 top-0 h-full w-48 p-8 bg-white z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
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
    </>
  )
}