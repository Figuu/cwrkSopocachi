// app/client-dashboard.jsx
"use client";
import { withAuth } from '../protectRoute';

function ClientDashboard() {
  return (
    <div>
      <h1>Client Dashboard</h1>
      <p>Bienvenido, client.</p>
    </div>
  );
}

export default withAuth(ClientDashboard, ['admin', 'adviser', 'client']);
