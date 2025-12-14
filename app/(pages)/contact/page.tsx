"use client";

import { useState, useEffect } from 'react';
import { BUSINESS } from '@/lib/constants';
import Card from '@/components/Card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    vehicleInterest: '',
    rentalDuration: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [idFile, setIdFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  useEffect(() => {
    // Prefill vehicleInterest from URL query on client only
    try {
      const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
      const vehicle = params.get('vehicle');
      if (vehicle) setFormData((prev) => ({ ...prev, vehicleInterest: vehicle }));
    } catch (e) {
      // ignore
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Full name is required.';
    if (!formData.email.trim()) next.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = 'Enter a valid email address.';
    if (!formData.phone.trim()) next.phone = 'Phone number is required.';
    if (!formData.subject.trim()) next.subject = 'Subject is required.';
    if (!formData.message.trim()) next.message = 'Please include a brief message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateFiles = () => {
    const next: Record<string, string> = {};
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowed = ['image/png', 'image/jpeg', 'application/pdf'];
    if (idFile) {
      if (!allowed.includes(idFile.type)) next.idFile = 'ID file must be PNG, JPG or PDF.';
      if (idFile.size > maxSize) next.idFile = 'ID file must be smaller than 5MB.';
    }
    if (licenseFile) {
      if (!allowed.includes(licenseFile.type)) next.licenseFile = 'Licence file must be PNG, JPG or PDF.';
      if (licenseFile.size > maxSize) next.licenseFile = 'Licence file must be smaller than 5MB.';
    }
    setErrors((prev) => ({ ...prev, ...next }));
    return Object.keys(next).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (name === 'idFile') {
      setIdFile(file);
      setIdPreview(file.type === 'application/pdf' ? null : URL.createObjectURL(file));
    } else if (name === 'licenseFile') {
      setLicenseFile(file);
      setLicensePreview(file.type === 'application/pdf' ? null : URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!validateFiles()) return;
    setLoading(true);

    // Prepare form data for backend (if available)
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('subject', formData.subject);
      payload.append('message', formData.message);
      payload.append('vehicleInterest', formData.vehicleInterest);
      payload.append('rentalDuration', formData.rentalDuration);
      if (idFile) payload.append('idFile', idFile);
      if (licenseFile) payload.append('licenseFile', licenseFile);

      // NOTE: No backend endpoint configured. Replace the URL below with your upload endpoint.
      // Example: await fetch('/api/enquiries', { method: 'POST', body: payload });

      // Simulate server roundtrip
      await new Promise((res) => setTimeout(res, 900));

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', vehicleInterest: '', rentalDuration: '' });
      setIdFile(null);
      setLicenseFile(null);
      setIdPreview(null);
      setLicensePreview(null);
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: 'An error occurred while sending your enquiry. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Contact PerthDrive</h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">Questions, quotes or fleet enquiries — our team is ready to assist.</p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Details */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition">
                  {BUSINESS.phone}
                </a>
                <p className="text-gray-600 text-sm mt-2">Available Monday–Friday, 8:00 AM – 5:00 PM</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <a href={`mailto:${BUSINESS.email}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 break-all">
                  {BUSINESS.email}
                </a>
                <p className="text-gray-600 text-sm mt-2">We reply within 24 business hours.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                <p className="font-medium text-gray-900">{BUSINESS.name}</p>
                <p className="text-gray-600 text-sm mt-1">{BUSINESS.location}</p>
                <p className="text-gray-600 text-sm">Servicing Perth & surrounding areas</p>
              </Card>

              <Card className="p-6 bg-indigo-50 border border-indigo-100">
                <h3 className="text-sm font-semibold text-indigo-700 mb-2">Quick Tips</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Call for immediate assistance</li>
                  <li>• Use email for attachments and documents</li>
                  <li>• Include rental dates for accurate quotes</li>
                </ul>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-4xl mb-4 text-emerald-700">✓</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent</h3>
                    <p className="text-gray-600 mb-6">Thanks — we have received your enquiry and will contact you shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name *</label>
                        <input id="name" name="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-rose-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 outline-none transition`} placeholder="John Doe" />
                        {errors.name && <p id="name-error" className="text-rose-600 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address *</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-rose-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 outline-none transition`} placeholder="you@example.com" />
                        {errors.email && <p id="email-error" className="text-rose-600 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number *</label>
                        <input id="phone" name="phone" value={formData.phone} onChange={handleChange} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-rose-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 outline-none transition`} placeholder="0400 000 000" />
                        {errors.phone && <p id="phone-error" className="text-rose-600 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="vehicleInterest" className="block text-sm font-medium text-gray-700">Vehicle interest</label>
                        <select id="vehicleInterest" name="vehicleInterest" value={formData.vehicleInterest} onChange={handleChange} className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                          <option value="">-- Select Vehicle --</option>
                          <option value="toyota-vitz">Toyota Vitz</option>
                          <option value="toyota-corolla">Toyota Corolla</option>
                          <option value="toyota-rav4">Toyota RAV4 Hybrid</option>
                          <option value="toyota-hiace">Toyota HiAce</option>
                          <option value="not-sure">Not sure yet</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="rentalDuration" className="block text-sm font-medium text-gray-700">Rental duration</label>
                        <select id="rentalDuration" name="rentalDuration" value={formData.rentalDuration} onChange={handleChange} className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                          <option value="">-- Select Duration --</option>
                          <option value="6-weeks">6 weeks</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="4-6-months">4-6 months</option>
                          <option value="7-12-months">7-12 months</option>
                          <option value="longer">Longer than 12 months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject *</label>
                      <input id="subject" name="subject" value={formData.subject} onChange={handleChange} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} className={`mt-1 block w-full px-4 py-2 rounded-lg border ${errors.subject ? 'border-rose-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 outline-none transition`} placeholder="Rental inquiry, quote request, etc." />
                      {errors.subject && <p id="subject-error" className="text-rose-600 text-sm mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} className={`mt-1 block w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-rose-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none`} placeholder="Tell us about your rental needs..." />
                      {errors.message && <p id="message-error" className="text-rose-600 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* File uploads for ID and Licence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="idFile" className="block text-sm font-medium text-gray-700">Upload ID (photo or PDF)</label>
                        <input id="idFile" name="idFile" type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="mt-1 block w-full" />
                        {errors.idFile && <p className="text-rose-600 text-sm mt-1">{errors.idFile}</p>}
                        {idPreview && <img src={idPreview} alt="ID preview" className="mt-2 w-40 h-auto rounded-md border" />}
                      </div>

                      <div>
                        <label htmlFor="licenseFile" className="block text-sm font-medium text-gray-700">Upload Driver's Licence (photo or PDF)</label>
                        <input id="licenseFile" name="licenseFile" type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="mt-1 block w-full" />
                        {errors.licenseFile && <p className="text-rose-600 text-sm mt-1">{errors.licenseFile}</p>}
                        {licensePreview && <img src={licensePreview} alt="Licence preview" className="mt-2 w-40 h-auto rounded-md border" />}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">We securely accept photo or PDF uploads. Files are only transmitted to a server if you have configured a backend endpoint. See README for integration details.</p>

                    <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? 'Sending…' : 'Send Message'}
                    </button>

                    <p className="text-gray-600 text-sm text-center">* Required fields</p>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Support */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Other Ways to Connect</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition p-6">
              <div className="text-4xl mb-4">☎️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us Directly</h3>
              <p className="text-gray-600 mb-4">For immediate assistance, call our friendly team.</p>
              <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition">{BUSINESS.phone}</a>
            </Card>

            <Card className="text-center hover:shadow-lg transition p-6">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">Send detailed questions or rental requirements.</p>
              <a href={`mailto:${BUSINESS.email}`} className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition">{BUSINESS.email}</a>
            </Card>

            <Card className="text-center hover:shadow-lg transition p-6">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Our Office</h3>
              <p className="text-gray-600 mb-4">Drop by to discuss your rental in person.</p>
              <p className="inline-block text-indigo-600 font-semibold">{BUSINESS.location}</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
