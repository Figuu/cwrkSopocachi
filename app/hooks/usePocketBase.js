import { useEffect, useRef } from 'react';
import PocketBase from 'pocketbase';

export default function usePocketBase() {
  const pb = useRef(null);

  useEffect(() => {
    pb.current = new PocketBase("https://trail-break.pockethost.io");
    pb.current.autoCancellation(false)
  }, [pb.current]);

  return pb.current;
}
