'use client';

import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/fleet', label: 'Fleet' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                🚗
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {BUSINESS.name}
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  Premium Rentals
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
