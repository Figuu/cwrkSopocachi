"use client";

import Navbar from '../components/admin/Navbar';
import { withAuth } from '../protectRoute';


function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1>Admin Dashboard</h1>
        <p>Bienvenido, administrador.</p>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard, ['admin']);
