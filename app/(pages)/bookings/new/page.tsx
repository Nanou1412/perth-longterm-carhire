"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FLEET, BUSINESS } from '@/lib/constants';

const STRIPE_PUBLISHABLE = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = STRIPE_PUBLISHABLE ? loadStripe(STRIPE_PUBLISHABLE) : null;

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState((FLEET[0]?.name || '').toLowerCase().replace(/\s+/g, '-'));
  const [startDate, setStartDate] = useState('');
  const [weeks, setWeeks] = useState('6');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If Stripe isn't configured, allow reservation without payment
    if (STRIPE_PUBLISHABLE && (!stripe || !elements)) return;
    setLoading(true);
    setMessage(null);
    let paymentMethodId: string | undefined = undefined;
    if (STRIPE_PUBLISHABLE) {
      const card = elements.getElement(CardElement);
      if (!card) {
        setMessage('Card input not available');
        setLoading(false);
        return;
      }
      const pm = await stripe.createPaymentMethod({ type: 'card', card, billing_details: { name, email, phone } });
      if (pm.error) {
        setMessage(pm.error.message || 'Card error');
        setLoading(false);
        return;
      }
      paymentMethodId = (pm.paymentMethod as any).id;
    }

    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('phone', phone);
    form.append('vehicle', vehicle);
    form.append('startDate', startDate);
    form.append('weeks', weeks);
    if (paymentMethodId) form.append('paymentMethodId', paymentMethodId);

    const res = await fetch('/api/bookings', { method: 'POST', body: form });
    const json = await res.json();
    if (!res.ok) {
      setMessage(json?.error || 'Booking failed');
    } else {
      setMessage('Booking created. Booking ID: ' + json.bookingId);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Vehicle</label>
        <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="mt-1 w-full">
          {FLEET.map((v) => (
            <option key={v.name} value={(v.name || '').toLowerCase().replace(/\s+/g, '-')}>{v.name} — ${v.weeklyPrice}/week</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Start date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Weeks (min {BUSINESS.minimumRental})</label>
        <input type="number" min={BUSINESS.minimumRental} value={weeks} onChange={(e) => setWeeks(e.target.value)} className="mt-1 w-full" />
      </div>

      {STRIPE_PUBLISHABLE ? (
        <div>
          <label className="block text-sm font-medium">Card details</label>
          <div className="mt-1 p-3 border rounded"><CardElement /></div>
        </div>
      ) : (
        <div className="p-4 bg-yellow-50 border rounded text-sm">Stripe not configured — reservation will be created without online payment. You can add payment later in admin.</div>
      )}

      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Processing…' : (STRIPE_PUBLISHABLE ? 'Reserve & Pay Weekly' : 'Reserve (no online payment)')}</button>
      </div>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}

export default function NewBookingPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">New Long-Term Reservation</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
