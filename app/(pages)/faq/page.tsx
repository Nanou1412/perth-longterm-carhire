"use client";

import { useState } from 'react';
import { FAQ } from '@/lib/constants';
import Card from '@/components/Card';
import CTAButton from '@/components/CTAButton';

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">Clear answers about our long-term rental service, pricing and policies.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.id} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleOpen(item.id)}
                  aria-expanded={openId === item.id}
                  className="w-full flex items-center justify-between gap-4 p-5 bg-white hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-sky-100 text-indigo-700 font-semibold">{item.id}</div>
                    <h3 className="text-left text-lg font-semibold text-gray-900">{item.question}</h3>
                  </div>
                  <div className={`transform transition ${openId === item.id ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>

                <div className={`${openId === item.id ? 'max-h-screen p-5' : 'max-h-0'} bg-white border-t border-gray-100 overflow-hidden transition-all duration-300`}>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Still Have Questions?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Our team is available to answer any rental questions.</p>
              <a href="tel:0400000000" className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition">0400 000 000</a>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send detailed questions and we will reply within 24 hours.</p>
              <a href="mailto:testrent@gmail.com" className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition">testrent@gmail.com</a>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Contact Form</h3>
              <p className="text-gray-600 mb-4">Use our form for precise quotes and availability checks.</p>
              <CTAButton href="/contact" text="Go to Contact" variant="secondary" />
            </Card>
          </div>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Common Topics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Pricing & Payments</h3>
              <p className="text-gray-600 text-sm">Rates, payment methods & billing details.</p>
            </Card>

            <Card className="text-center hover:shadow-lg transition p-6">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="font-bold text-gray-900 mb-2">Requirements</h3>
              <p className="text-gray-600 text-sm">Eligibility, documents & verification.</p>
            </Card>

            <Card className="text-center hover:shadow-lg transition p-6">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="font-bold text-gray-900 mb-2">Our Fleet</h3>
              <p className="text-gray-600 text-sm">Vehicle types, features & specs.</p>
            </Card>

            <Card className="text-center hover:shadow-lg transition p-6">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Roadside assistance & customer service.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Rent?</h2>
          <p className="text-xl text-sky-100 mb-8">Start your booking or request a tailored quote today.</p>
          <CTAButton href="/contact" text="Get in Touch" />
        </div>
      </section>
    </div>
  );
}
