import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header always visible */}
      <Header />

      {/* Content area */}
      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* Sidebar: hidden on mobile, visible on desktop */}
        <div className="hidden md:block md:w-64 border-r">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-white">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
