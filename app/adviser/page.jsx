"use client";
import { withAuth } from '../protectRoute';

function page() {
  return (
    <div>
      <h1>Adviser Dashboard</h1>
      <p>Bienvenido, adviser.</p>
    </div>
  );
}

export default withAuth(page, ['admin','adviser']);
