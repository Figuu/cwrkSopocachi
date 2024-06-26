"use client";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from 'next/navigation';
import Navbar from "@/app/components/admin/Navbar";
import { withAuth } from "@/app/protectRoute";

function CreatePlace() {
  const router = useRouter(); // Inicializa useRouter
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleCreatePlace = async (e) => {
    e.preventDefault();
    const pb = new PocketBase("https://trail-break.pockethost.io/");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      for (let file of photos) {
        formData.append("photo", file);
      }

      // Subir formData con las fotos
      const newPlace = await pb.collection("places").create(formData);
      setSuccess("Place creado con éxito.");
      setError("");

      // Redirigir a la página de lugares después de crear el lugar
      router.push("/admin/places");
    } catch (err) {
      setError("Error creando place: " + err.message);
      setSuccess("");
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
          <div className="mb-4">
            <label className="block text-gray-700">Fotos</label>
            <input
              type="file"
              onChange={handlePhotoChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              accept="image/*" // Aceptar solo archivos de imagen
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Crear Place
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(CreatePlace, ["admin"]);
