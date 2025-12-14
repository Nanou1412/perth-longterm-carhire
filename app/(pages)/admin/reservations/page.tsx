"use client";

import { useEffect, useState } from 'react';

export default function AdminReservationsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/admin/reservations', { headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET || '' } });
      const json = await res.json();
      if (!res.ok) setError(json?.error || 'Unauthorized');
      else setBookings(json.bookings || []);
    };
    load();
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin — Reservations</h1>
        {error && <div className="text-rose-600">{error}</div>}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Client</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">Dates</th>
              <th className="p-2">Status</th>
              <th className="p-2">Payments</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.id}</td>
                <td className="p-2">{b.clientName}<br/>{b.clientEmail}</td>
                <td className="p-2">{b.vehicle?.name}</td>
                <td className="p-2">{new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">{b.payments?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
