"use client";

import { useEffect, useState } from 'react';

export default function AdminReservationsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/admin/reservations');
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
                <td className="p-2">
                  <div className="flex gap-2">
                    <button onClick={async () => {
                      const res = await fetch(`/api/admin/bookings/${b.id}/cancel`, { method: 'POST', headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET || '' } });
                      if (res.ok) window.location.reload();
                    }} className="px-2 py-1 bg-rose-500 text-white rounded">Cancel Sub</button>
                    <button onClick={async () => {
                      const res = await fetch(`/api/admin/bookings/${b.id}/mark-paid`, { method: 'POST', headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET || '' } });
                      if (res.ok) window.location.reload();
                    }} className="px-2 py-1 bg-emerald-600 text-white rounded">Mark Paid</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
