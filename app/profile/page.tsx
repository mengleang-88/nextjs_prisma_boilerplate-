"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!stored) {
      router.push('/login');
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  if (!user) return null;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 32 }}>
      <h2>Profile</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Name:</strong> {user.name}<br />
        <strong>Email:</strong> {user.email}
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('user');
          router.push('/login');
        }}
        style={{ width: '100%' }}
      >
        Logout
      </button>
    </div>
  );
}
