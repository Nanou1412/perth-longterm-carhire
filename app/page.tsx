import { BUSINESS, FLEET, HOW_IT_WORKS } from '@/lib/constants';
import Card from '@/components/Card';
import CTAButton from '@/components/CTAButton';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-500 bg-opacity-50 rounded-full px-4 py-1 mb-6 text-sm font-semibold">
                ✨ Premium Long-Term Rentals
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Premium Car Rentals for Perth
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {BUSINESS.description}
              </p>
              <div className="bg-white bg-opacity-95 rounded-xl p-6 mb-8 text-gray-900 font-semibold shadow-xl">
                <div className="text-sm text-gray-600 mb-2">From just</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600">${FLEET[0].weeklyPrice}</span>
                  <span className="text-gray-700">/week</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">Starting with Corolla Economy Sedan</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton href="/fleet" text="Explore Fleet" variant="secondary" />
                <CTAButton href="/contact" text="Get Started Today" />
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="text-9xl drop-shadow-lg">🚗</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PerthDrive?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide exceptional value with transparent pricing, premium vehicles, and outstanding support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Unbeatable Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Competitive rates from ${FLEET[0].weeklyPrice}/week with discounts for longer rentals. No hidden fees ever.
              </p>
            </Card>
            <Card className="hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Complete Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                Know exactly what you're paying. All-inclusive pricing covers maintenance, assistance, and insurance options.
              </p>
            </Card>
            <Card className="hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Peace of Mind</h3>
              <p className="text-gray-600 leading-relaxed">
                Premium vehicles, regular servicing, 24/7 roadside assistance, and comprehensive insurance included.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Premium Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully selected range of modern, well-maintained vehicles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {FLEET.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-xl hover:-translate-y-2 transition duration-300 text-center">
                <div className="text-6xl mb-4">{vehicle.image}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                <p className="text-sm text-gray-500 mb-3 font-semibold">{vehicle.category}</p>
                <p className="text-gray-600 text-sm mb-4">{vehicle.description}</p>
                <div className="border-t pt-4 mt-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    ${vehicle.weeklyPrice}/week
                  </div>
                  <p className="text-xs text-gray-500">or ${vehicle.monthlyPrice}/month</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <CTAButton href="/fleet" text="View Complete Fleet Details" variant="secondary" />
          </div>
        </div>
      </section>

      {/* Long-Term Rental Benefits */}
      <section className="bg-gradient-to-r from-blue-50 to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6 font-semibold text-sm">
              🎯 Minimum {BUSINESS.minimumRental} Weeks
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Long-Term Rentals, Premium Value
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Get the best rates when you rent for 6 weeks or longer. We believe in rewarding loyalty with exceptional value.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="text-4xl font-bold text-blue-600 mb-3">✓</div>
                <h3 className="font-bold text-gray-900 mb-2">Discounted Rates</h3>
                <p className="text-gray-600 text-sm">Save 15-25% compared to short-term rentals</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="text-4xl font-bold text-green-600 mb-3">✓</div>
                <h3 className="font-bold text-gray-900 mb-2">All-Inclusive Support</h3>
                <p className="text-gray-600 text-sm">Maintenance, insurance, and 24/7 assistance included</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="text-4xl font-bold text-purple-600 mb-3">✓</div>
                <h3 className="font-bold text-gray-900 mb-2">Flexible Terms</h3>
                <p className="text-gray-600 text-sm">Extend your rental anytime with no penalties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple 6-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From inquiry to driving off - it's quick, easy, and transparent
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {HOW_IT_WORKS.slice(0, 6).map((step, index) => (
              <div key={step.id} className="relative">
                <Card className="hover:shadow-xl transition duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="text-center">
            <CTAButton href="/how-it-works" text="View Complete Process" variant="secondary" />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Premium Rentals?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Get in touch today for a personalized quote or to schedule a test drive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              📞 Call Us Today
            </a>
            <CTAButton href="/contact" text="Get a Quote" />
          </div>
          <p className="text-blue-200 text-sm">
            {BUSINESS.hours}
          </p>
        </div>
      </section>
    </div>
  );
}
