import { useEffect, useRef } from 'react';
import PocketBase from 'pocketbase';

export default function usePocketBase() {
  const pbRef = useRef(null);

  useEffect(() => {
    if (!pbRef.current) {
      const pb = new PocketBase('https://trail-break.pockethost.io/'); // Cambia la URL según tu configuración
      pb.autoCancellation(false);
      pbRef.current = pb;
    }

    return () => {
      pbRef.current = null;
    };
  }, []);

  return pbRef.current;
}
