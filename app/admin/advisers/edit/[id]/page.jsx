"use client";
import { useState, useEffect } from "react";

import { withAuth } from "../../../../protectRoute";

import { useRouter, useParams } from "next/navigation";
import usePocketBase from "@/app/hooks/usePocketBase";
import Navbar from "@/app/components/admin/Navbar";

function EditAdviser() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const pb = usePocketBase();

  useEffect(() => {
    const fetchAdviser = async () => {
      try {
        const adviser = await pb.collection("users").getOne(id);
        setEmail(adviser.email);
      } catch (err) {
        setError("Error fetching adviser: " + err.message);
      }
    };

    if (pb) {
      fetchAdviser();
    }
  }, [id, pb]);

  const handleEditAdviser = async (e) => {
    e.preventDefault();

    try {
      await pb.collection("users").update(id, { email });
      setSuccess("Adviser actualizado con éxito.");
      setError("");
      router.push("/admin-dashboard/advisers");
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
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Actualizar Adviser
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(EditAdviser, ["admin"]);
