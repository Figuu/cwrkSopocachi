"use client";
import Link from 'next/link';

function PlaceCard({ place, onDelete }) {
  const { id, name, description, price, photo } = place;

  console.log(photo);

  return (
    <div className="mb-2 p-4 border rounded flex flex-col items-center">
      {photo && (
        <img src={"https://trail-break.pockethost.io/api/files/nmqnnmto1b7md96/"+id+"/"+photo} alt={name} className="mb-2 w-full h-48 object-cover rounded" />
      )}
      <h2 className="text-lg font-bold mb-1">{name}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="flex justify-between items-center w-full">
        <span className="text-blue-500 font-bold">${price}</span>
        <div>
          <Link href={`/admin/places/edit/${id}`}>
            <button className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">Editar</button>
          </Link>
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 text-white py-1 px-2 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
