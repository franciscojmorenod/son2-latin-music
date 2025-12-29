'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Audios', href: '/audios' },
    { name: 'Photos', href: '/photos' },
    { name: 'Videos', href: '/videos' },
    { name: 'Get Quote', href: '/quote' },
    { name: 'Contact', href: '/contact' },
    { name: 'Reviews', href: 'https://business.google.com/v/son2-latin-music/012385120011381777261/255a/_/rev/', external: true },
  ]

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-salsa-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-salsa-500 to-merengue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-salsa-600 to-merengue-600 rounded-full p-2">
                <span className="text-2xl font-bold text-white">S2</span>
              </div>
            </div>
            <div>
              <p className="font-display text-2xl font-bold bg-gradient-to-r from-salsa-400 to-cumbia-400 bg-clip-text text-transparent">
                Son2 Latin Music
              </p>
              <p className="text-xs text-gray-400 italic">Our Latin Thing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-salsa-600/20 transition-all duration-200 font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-salsa-600/20 transition-all duration-200 font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-salsa-600/20 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-salsa-600/20 transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-salsa-600/20 transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
