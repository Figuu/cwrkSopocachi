"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/admin">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/advisers">Crear Adviser</Link>
        </li>
        <li>
          <Link href="/admin/create-place">Crear Place</Link>
        </li>
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
