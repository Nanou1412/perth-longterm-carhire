import { BUSINESS } from '@/lib/constants';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚗</span>
              <div>
                <h3 className="font-bold text-lg text-white">{BUSINESS.name}</h3>
                <p className="text-xs text-blue-400">Premium Rentals</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {BUSINESS.description}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                📍 {BUSINESS.location}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-5 text-white uppercase tracking-wide">
              Pages
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition font-medium">Home</Link></li>
              <li><Link href="/fleet" className="hover:text-blue-400 transition font-medium">Fleet</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition font-medium">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition font-medium">FAQ</Link></li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-bold text-base mb-5 text-white uppercase tracking-wide">
              Information
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/how-it-works" className="hover:text-blue-400 transition font-medium">How It Works</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition font-medium">Contact Us</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition font-medium">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-400 transition font-medium">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-base mb-5 text-white uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-4 text-gray-400 text-sm">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  Phone
                </p>
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="hover:text-blue-400 transition font-semibold text-white">
                  {BUSINESS.phone}
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  Email
                </p>
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-blue-400 transition font-semibold text-white">
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-base mb-5 text-white uppercase tracking-wide">
              Hours
            </h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p className="font-medium text-white text-xs">Mon - Fri</p>
              <p>8:00 AM - 6:00 PM</p>
              <p className="font-medium text-white text-xs mt-3">Saturday</p>
              <p>9:00 AM - 2:00 PM</p>
              <p className="text-blue-400 text-xs mt-3 font-semibold">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {BUSINESS.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-blue-400 transition">Terms</a>
              <a href="#" className="hover:text-blue-400 transition">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
