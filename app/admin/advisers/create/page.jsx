"use client";
import { useState } from 'react';
import PocketBase from 'pocketbase';
import { withAuth } from '../../../protectRoute';

import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/admin/Navbar';

function CreateAdviser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleCreateAdviser = async (e) => {
    e.preventDefault();
    const pb = new PocketBase('https://trail-break.pockethost.io/'); // Cambia la URL según tu configuración

    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        role: 'adviser'
      });
      setSuccess('Adviser creado con éxito.');
      setError('');
      router.push('/admin/advisers');
    } catch (err) {
      setError('Error creando adviser: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1>Crear Adviser</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleCreateAdviser}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Crear Adviser
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(CreateAdviser, ['admin']);
