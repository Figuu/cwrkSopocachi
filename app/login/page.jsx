"use client";
import { useState } from 'react';
import PocketBase from 'pocketbase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const pb = new PocketBase('https://trail-break.pockethost.io/'); // Cambia la URL según tu configuración

    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      const userRole = authData.record.role;

      // Redirigir según el rol del usuario
      if (userRole === 'admin') {
        window.location.href = '/admin';
      } else if (userRole === 'adviser') {
        window.location.href = '/adviser';
      } else if (userRole === 'client') {
        window.location.href = '/client';
      } else {
        throw new Error('Invalid user role');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          Login
        </button>
      </form>
    </div>
  );
}
