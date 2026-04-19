'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-black border-b border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-gold-500 font-bold text-xl">
                CUSTOS
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-white hover:text-gold-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/vault" className="text-white hover:text-gold-400 transition-colors">
              Vault
            </Link>
            <Link href="/switch" className="text-white hover:text-gold-400 transition-colors">
              Dead Man's Switch
            </Link>
            <Link href="/heirs" className="text-white hover:text-gold-400 transition-colors">
              Heirs
            </Link>
            <Link href="/settings" className="text-white hover:text-gold-400 transition-colors">
              Settings
            </Link>
            <button className="bg-gold-500 text-black px-4 py-2 rounded hover:bg-gold-400 transition-colors font-semibold">
              Connect
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gold-400 p-2"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black-900">
              <Link href="/dashboard" className="text-white hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <Link href="/vault" className="text-white hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">
                Vault
              </Link>
              <Link href="/switch" className="text-white hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">
                Dead Man's Switch
              </Link>
              <Link href="/heirs" className="text-white hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">
                Heirs
              </Link>
              <Link href="/settings" className="text-white hover:text-gold-400 block px-3 py-2 rounded-md text-base font-medium">
                Settings
              </Link>
              <button className="bg-gold-500 text-black px-4 py-2 rounded hover:bg-gold-400 transition-colors font-semibold w-full text-left">
                Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
