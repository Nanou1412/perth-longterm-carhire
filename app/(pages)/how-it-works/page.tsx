import { HOW_IT_WORKS, BUSINESS } from '@/lib/constants';
import Card from '@/components/Card';
import CTAButton from '@/components/CTAButton';

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">How It Works</h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">A simple, transparent process to get you on the road with confidence.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.id} className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 to-sky-100 flex items-center justify-center text-indigo-700 font-bold text-xl shadow-sm">
                    {step.id}
                  </div>
                </div>

                <Card className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{step.title}</h3>
                      <p className="mt-2 text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="hidden md:flex items-center text-4xl text-indigo-500">{step.icon}</div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">What You Need to Know</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Required Documents */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Documents</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-sky-50 text-sky-600">📄</div>
                  <div>
                    <div className="font-medium text-gray-900">Valid Driver's License</div>
                    <p className="text-sm text-gray-600">Australian licence or international licence with translation.</p>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-emerald-50 text-emerald-600">💳</div>
                  <div>
                    <div className="font-medium text-gray-900">Credit Card</div>
                    <p className="text-sm text-gray-600">Used for security bond authorization where required.</p>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-50 text-indigo-600">📋</div>
                  <div>
                    <div className="font-medium text-gray-900">Proof of Address</div>
                    <p className="text-sm text-gray-600">Recent utility bill or lease agreement.</p>
                  </div>
                </li>
              </ul>
            </Card>

            {/* Eligibility Requirements */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Eligibility Requirements</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start">
                  <div className="text-emerald-600 font-bold">✓</div>
                  <div>
                    <div className="font-medium text-gray-900">Minimum age: 21</div>
                    <p className="text-sm text-gray-600">Some premium vehicles may require drivers to be 25+.</p>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="text-emerald-600 font-bold">✓</div>
                  <div>
                    <div className="font-medium text-gray-900">Minimum rental: 6 weeks</div>
                    <p className="text-sm text-gray-600">Our service is optimised for longer-term hires.</p>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="text-emerald-600 font-bold">✓</div>
                  <div>
                    <div className="font-medium text-gray-900">Driver history check</div>
                    <p className="text-sm text-gray-600">A quick verification is performed prior to confirmation.</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Rental Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Pickup & Return</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Pick-up Options</h3>
              <p className="text-gray-600">Visit our location or choose delivery across Perth and surrounding suburbs (fees may apply).</p>
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium">Our location</h4>
                <p className="text-sm text-gray-600">{BUSINESS.location}</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Return Process</h3>
              <p className="text-gray-600">Quick vehicle inspection, bond reconciliation and final invoice by email.</p>
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium">Security bond refund</h4>
                <p className="text-sm text-gray-600">Processed within 7–10 business days after vehicle return.</p>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-amber-50 border border-amber-100">
            <h3 className="text-lg font-semibold mb-3">Important reminders</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Return the vehicle with a full tank where required.</li>
              <li>• Keep receipts for fuel and maintenance related to the rental.</li>
              <li>• Report any damage within 48 hours.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-sky-100 mb-6">Contact our team to arrange inspection, delivery or an exact quote.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CTAButton href="/contact" text="Contact Form" />
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-md font-semibold hover:bg-gray-100 transition">📞 {BUSINESS.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
