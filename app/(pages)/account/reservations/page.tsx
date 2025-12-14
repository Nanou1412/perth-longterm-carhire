"use client";

import { useState } from 'react';

export default function MyReservationsPage() {
  const [token, setToken] = useState('');
  const [booking, setBooking] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    const res = await fetch(`/api/bookings/${token}`);
    const json = await res.json();
    if (!res.ok) {
      setError(json?.error || 'Not found');
    } else {
      setBooking(json.booking);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
        <p className="text-sm mb-4">Enter your booking token to view reservation and payments.</p>
        <div className="flex gap-2 mb-4">
          <input value={token} onChange={(e) => setToken(e.target.value)} className="flex-1" placeholder="booking token" />
          <button onClick={load} className="px-3 py-1 bg-indigo-600 text-white rounded">Load</button>
        </div>
        {error && <div className="text-rose-600 mb-4">{error}</div>}
        {booking && (
          <div className="space-y-3">
            <div className="p-4 border rounded">
              <h2 className="font-semibold">Reservation</h2>
              <p>Vehicle: {booking.vehicle.name}</p>
              <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p>Weekly: ${booking.weeklyPrice}</p>
              <p>Total: ${booking.totalPrice}</p>
              <p>Status: {booking.status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Payments</h3>
              <ul className="space-y-2 mt-2">
                {booking.payments.map((p: any) => (
                  <li key={p.id} className="p-3 border rounded">
                    <p>Amount: ${p.amount / 100}</p>
                    <p>Status: {p.status}</p>
                    <p>Date: {p.paidAt ? new Date(p.paidAt).toLocaleString() : '—'}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
