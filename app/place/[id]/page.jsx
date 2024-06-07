"use client";
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '@/app/components/dashboard/Navbar';

const PlaceDetail = () => {
  const [place, setPlace] = useState(null);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    // Extract the ID from the URL
    const url = window.location.pathname;
    const urlSegments = url.split('/');
    const placeId = urlSegments[urlSegments.length - 1];
    setId(placeId);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchPlace = async () => {
      const pb = new PocketBase('https://trail-break.pockethost.io/');

      try {
        const result = await pb.collection('places').getOne(id);
        setPlace(result);
      } catch (err) {
        setError('Error fetching place: ' + err.message);
      }
    };

    fetchPlace();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!place) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start">
          <div className="w-full md:w-1/2 md:mr-8">
            <img
              src={`https://trail-break.pockethost.io/api/files/nmqnnmto1b7md96/${id}/${place.photo}`}
              alt={place.name}
              className="w-full h-auto object-cover rounded mb-4 md:mb-0"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{place.name}</h1>
            <p className="text-gray-700 mb-4">{place.description}</p>
            <p className="text-blue-500 font-bold text-lg mb-4">${place.price}</p>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="startDate">
                Fecha de Reserva:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border p-2 rounded w-full"
              />
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Reservar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
