import { PRICING_DETAILS, FLEET } from '@/lib/constants';
import Card from '@/components/Card';
import CTAButton from '@/components/CTAButton';

export default function PricingPage() {
  return (
    <div className="text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Transparent, Premium Pricing</h1>
          <p className="text-lg md:text-xl text-sky-100 max-w-3xl mx-auto">
            Clear weekly and monthly rates, inclusive options and flexible insurance — built for long-term rentals in Perth.
          </p>
        </div>
      </section>

      {/* Pricing Comparison Table */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Compare Our Fleet Pricing</h2>

          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-sky-50 to-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Weekly</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Monthly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FLEET.map((v) => (
                  <tr key={v.id} className="hover:bg-sky-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{v.image}</div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{v.name}</div>
                          <div className="text-xs text-gray-500">{v.highlights?.[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{v.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-extrabold text-indigo-600">${v.weeklyPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-extrabold text-indigo-600">${v.monthlyPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Summary & Details */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white border border-gray-100 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900">Security Bond</h3>
              <p className="mt-2 text-sm text-gray-600">Refundable security bond held on the client card.</p>
              <div className="mt-4 text-2xl font-extrabold text-indigo-600">${PRICING_DETAILS.bond}</div>
              <div className="text-sm text-gray-400">refundable subject to vehicle condition</div>
            </Card>

            <Card className="p-6 bg-white border border-gray-100 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900">Kilometres Included</h3>
              <p className="mt-2 text-sm text-gray-600">Generous kilometres included per rental period.</p>
              <div className="mt-4 text-2xl font-extrabold text-indigo-600">{PRICING_DETAILS.kmIncluded}</div>
              <div className="text-sm text-gray-400">Excess charged at ${PRICING_DETAILS.excessKmRate.toFixed(2)}/km</div>
            </Card>

            <Card className="p-6 bg-white border border-gray-100 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900">Insurance Options</h3>
              <p className="mt-2 text-sm text-gray-600">Choose the level of cover that suits you.</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {PRICING_DETAILS.insuranceOptions.map((opt) => (
                  <li key={opt.type} className="flex items-center justify-between">
                    <span>{opt.type}</span>
                    <span className="font-semibold text-indigo-600">${opt.price}/week</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* What's included in every rental */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-4">What's included in every rental</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="p-4 bg-white border border-gray-100 shadow rounded-lg">
                <h4 className="font-semibold mb-2">Maintenance & Support</h4>
                <p>Full maintenance, servicing and 24/7 roadside assistance included.</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 shadow rounded-lg">
                <h4 className="font-semibold mb-2">Clear Pricing</h4>
                <p>No hidden fees — quoted weekly/monthly rate, excess kms and bond only.</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 shadow rounded-lg">
                <h4 className="font-semibold mb-2">Flexible Insurance</h4>
                <p>Comprehensive insurance is included; upgrade options available for extra cover.</p>
              </div>
            </div>
          </div>

          {/* Conditions list (compact) */}
          <Card className="p-6 bg-sky-50 border border-sky-100">
            <h4 className="text-xl font-bold mb-4">Rental Conditions & Notes</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {PRICING_DETAILS.conditions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to get a tailored quote?</h2>
          <p className="text-lg text-sky-100 mb-6">Tell us the vehicle and rental period you need and we’ll prepare a personalised quote within one business day.</p>
          <div className="flex justify-center">
            <CTAButton href="/contact" text="Request a Quote" />
          </div>
          <p className="mt-6 text-sm text-sky-100">Prefer to chat? Call us at <span className="font-semibold">+61 400 000 000</span></p>
        </div>
      </section>
    </div>
  );
}
