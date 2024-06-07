"use client";
import { useState, useEffect } from "react";
import { withAuth } from "../../../../protectRoute";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/admin/Navbar";
import PocketBase from 'pocketbase';

function EditAdviser() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pb = new PocketBase('https://trail-break.pockethost.io/');
  pb.autoCancellation(false);

  useEffect(() => {
    const fetchAdviser = async () => {
      try {
        const adviser = await pb.collection("users").getOne(id);
        setUsername(adviser.username);
        setIsLoaded(true); // Set as loaded after fetching data
      } catch (err) {
        setError("Error fetching adviser: " + err.message);
      }
    };

    fetchAdviser();
  }, [id]);

  const handleEditAdviser = async (e) => {
    e.preventDefault();

    try {
      await pb.collection("users").update(id, { username });
      setSuccess("Adviser actualizado con éxito.");
      setError("");
      router.push("/admin/advisers");
    } catch (err) {
      setError("Error actualizando adviser: " + err.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1>Editar Adviser</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleEditAdviser}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={isLoaded ? username : 'Cargando...'} // Display loading state
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
              disabled={!isLoaded} // Disable input until data is loaded
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
            disabled={!isLoaded} // Disable button until data is loaded
          >
            Actualizar Adviser
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(EditAdviser, ["admin"]);
