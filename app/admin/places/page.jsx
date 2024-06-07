"use client";
import { useEffect, useState } from 'react';
import { withAuth } from '../../protectRoute';
import PocketBase from 'pocketbase';
import Navbar from '@/app/components/admin/Navbar';
import Link from 'next/link';
import PlaceCard from '@/app/components/admin/PlaceCard';

function PlaceList() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      const pb = new PocketBase('https://trail-break.pockethost.io/');

      try {
        const result = await pb.collection('places').getFullList();
        setPlaces(result);
      } catch (err) {
        setError('Error fetching places: ' + err.message);
      }
    };

    fetchPlaces();
  }, []);

  const handleDelete = async (id) => {
    const pb = new PocketBase('https://trail-break.pockethost.io/');

    try {
      await pb.collection('places').delete(id);
      setPlaces(places.filter(place => place.id !== id));
      setSuccess('Lugar eliminado con éxito.');
      setError('');
    } catch (err) {
      setError('Error eliminando lugar: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1>Lugares</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <Link href="/admin/places/create">
          <button className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">Agregar Lugar</button>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAuth(PlaceList, ['admin']);
