// app/protectRoute.js
"use client";
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const pb = new PocketBase('https://trail-break.pockethost.io/'); // Cambia la URL según tu configuración

export function withAuth(WrappedComponent, allowedRoles) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        try {
          const authData = pb.authStore.model;
          if (!authData) {
            router.replace('/login'); // Redirigir al login si no está autenticado
            return;
          }

          const userRole = authData.role;
          if (!allowedRoles.includes(userRole)) {
            router.replace('/unauthorized'); // Redirigir a una página de no autorizado
            return;
          }

          setIsAuthenticated(true);
        } catch (err) {
          router.replace('/login');
        } finally {
          setLoading(false);
        }
      }

      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>; // Puedes reemplazar esto con un spinner u otra señal de carga
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
}
