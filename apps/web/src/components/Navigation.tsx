'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-black border-b border-yellow-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">C</span>
              </div>
              <div className="text-yellow-500 font-bold text-xl tracking-wide">
                CUSTOS
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">
              Dashboard
            </Link>
            <Link href="/vault" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">
              Vault
            </Link>
            <Link href="/switch" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">
              Dead Man's Switch
            </Link>
            <Link href="/heirs" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">
              Heirs
            </Link>
            <Link href="/settings" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">
              Settings
            </Link>
            <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-semibold shadow-md hover:shadow-yellow-500/25">
              Connect
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-400 p-2"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-neutral-900 border-t border-yellow-500">
              <Link href="/dashboard" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Dashboard
              </Link>
              <Link href="/vault" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Vault
              </Link>
              <Link href="/switch" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Dead Man's Switch
              </Link>
              <Link href="/heirs" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Heirs
              </Link>
              <Link href="/settings" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Settings
              </Link>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-semibold w-full text-left shadow-md">
                Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
