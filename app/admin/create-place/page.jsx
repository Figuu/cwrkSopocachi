"use client";
import { useState } from 'react';
import PocketBase from 'pocketbase';
import { withAuth } from '../../protectRoute';
import Navbar from '@/app/components/admin/Navbar';


function CreatePlace() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreatePlace = async (e) => {
    e.preventDefault();
    const pb = new PocketBase('https://trail-break.pockethost.io/'); // Cambia la URL según tu configuración

    try {
      const newPlace = await pb.collection('places').create({
        name,
        description,
        price
      });
      setSuccess('Place creado con éxito.');
      setError('');
    } catch (err) {
      setError('Error creando place: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1>Crear Place</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleCreatePlace}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio por hora</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Crear Place
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(CreatePlace, ['admin']);
