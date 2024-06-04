"use client";
import DashCatalog from "./components/dashboard/DashCatalog";
import Navbar from "./components/dashboard/Navbar";
import Presentation from "./components/dashboard/Presentation";
import WorkspaceSection from "./components/dashboard/WorkspaceSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Presentation />
      <WorkspaceSection />
      <DashCatalog />
    </div>
  );
}
