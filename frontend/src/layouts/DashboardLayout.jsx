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

      <Header />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
