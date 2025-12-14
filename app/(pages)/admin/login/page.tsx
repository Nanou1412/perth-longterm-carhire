"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
    const json = await res.json();
    if (!res.ok) setError(json?.error || 'Unauthorized');
    else router.push('/admin/reservations');
  };

  return (
    <div className="py-24">
      <div className="max-w-md mx-auto p-6 border rounded">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full" />
          </div>
          {error && <div className="text-rose-600">{error}</div>}
          <div>
            <button className="px-3 py-2 bg-indigo-600 text-white rounded">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
