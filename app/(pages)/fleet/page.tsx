import { FLEET, BUSINESS, PRICING_DETAILS } from '@/lib/constants';
import Card from '@/components/Card';
import CTAButton from '@/components/CTAButton';

export default function FleetPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Premium Fleet</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Discover our carefully selected range of modern, well-maintained vehicles perfect for long-term rentals. From economy sedans to spacious vans, we have exactly what you need.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {FLEET.map((vehicle) => (
              <Card key={vehicle.id} className="relative hover:shadow-2xl hover:-translate-y-4 transition duration-300 bg-white overflow-hidden">
                <div className="flex flex-col">
                  {/* Vehicle Image Area */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
                    <div className="flex justify-between items-start">
                      <div className="text-8xl mb-4">{vehicle.image}</div>
                      <div className="ml-4">
                        {vehicle.available ? (
                          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">● Available</span>
                        ) : (
                          <span className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">● Unavailable</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
                      {vehicle.category}
                    </p>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">{vehicle.name}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{vehicle.description}</p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Seats</p>
                        <p className="text-lg font-bold text-gray-900">{vehicle.seats}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Transmission</p>
                        <p className="text-lg font-bold text-gray-900">{vehicle.transmission}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Fuel Type</p>
                        <p className="text-lg font-bold text-gray-900">{vehicle.fuelType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Category</p>
                        <p className="text-lg font-bold text-gray-900">{vehicle.category}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.map((feature, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    {vehicle.highlights && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Highlights</h4>
                        <ul className="space-y-2">
                          {vehicle.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-700">
                              <span className="text-blue-600 font-bold">★</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6 border-2 border-blue-200">
                      <div className="text-sm text-gray-600 mb-2">Starting from</div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <div className="text-4xl font-bold text-blue-600">
                          ${vehicle.weeklyPrice}
                        </div>
                        <span className="text-gray-700 font-semibold">/week</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        or <span className="font-bold text-gray-700">${vehicle.monthlyPrice}/month</span> (Save 8%)
                      </div>
                    </div>

                    {vehicle.available ? (
                      <CTAButton href={`/contact?vehicle=${encodeURIComponent(vehicle.name)}`} text="Request Quote" />
                    ) : (
                      <span className="inline-block px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold">Unavailable — Enquire</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Fleet Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-blue-600">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">Maintenance & Servicing</p>
                    <p className="text-gray-600 text-sm">All regular maintenance included</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-green-600">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">24/7 Roadside Support</p>
                    <p className="text-gray-600 text-sm">Available anytime, anywhere</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-purple-600">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">Free Kilometers</p>
                    <p className="text-gray-600 text-sm">{PRICING_DETAILS.kmIncluded} per week</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-orange-600">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">Comprehensive Insurance</p>
                    <p className="text-gray-600 text-sm">Full coverage optional upgrades available</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-blue-600">📋</span>
                  <div>
                    <p className="font-bold text-gray-900">Valid Driver's License</p>
                    <p className="text-gray-600 text-sm">Minimum 21 years old</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-green-600">🪪</span>
                  <div>
                    <p className="font-bold text-gray-900">Proof of Residency</p>
                    <p className="text-gray-600 text-sm">Utility bill or government ID</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-purple-600">💳</span>
                  <div>
                    <p className="font-bold text-gray-900">Credit Card</p>
                    <p className="text-gray-600 text-sm">For ${PRICING_DETAILS.bond} security bond</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-orange-600">🌍</span>
                  <div>
                    <p className="font-bold text-gray-900">International Drivers</p>
                    <p className="text-gray-600 text-sm">International Driving Permit required</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
