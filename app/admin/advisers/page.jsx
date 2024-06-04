"use client";
import { useEffect, useState } from 'react';
import { withAuth } from '../../protectRoute';
import Link from 'next/link';
import Navbar from '@/app/components/admin/Navbar';
import usePocketBase from '@/app/hooks/usePocketBase';
import PocketBase from 'pocketbase';

function Advisers() {
  const [advisers, setAdvisers] = useState([]);
  const [error, setError] = useState('');
  const pb = new PocketBase('https://trail-break.pockethost.io');

  useEffect(() => {
    const fetchAdvisers = async () => {
      try {
        console.log("Fetching advisers...");
        const result = await pb.collection('users').getFullList({ filter: 'role="adviser"' });
        console.log("Fetched advisers: ", result);
        setAdvisers(result);
      } catch (err) {
        console.error("Error fetching advisers: ", err);
        setError('Error fetching advisers: ' + err.message);
      }
    };

    if (pb) {
      fetchAdvisers();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await pb.collection('users').delete(id);
      setAdvisers(advisers.filter(adviser => adviser.id !== id));
    } catch (err) {
      console.error("Error deleting adviser: ", err);
      setError('Error deleting adviser: ' + err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1>Advisers</h1>
        {error && <p className="text-red-500">{error}</p>}
        <Link href="/admin/advisers/create">
          <button className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">Agregar Adviser</button>
        </Link>
        <ul>
          {advisers.map((adviser) => (
            <li key={adviser.id} className="mb-2 p-2 border rounded flex justify-between items-center">
              <span>{adviser.email}</span>
              <div>
                <Link href={`/admin/advisers/edit/${adviser.id}`}>
                  <button className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">Editar</button>
                </Link>
                <button
                  onClick={() => handleDelete(adviser.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default withAuth(Advisers, ['admin']);
