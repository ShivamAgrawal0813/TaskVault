import { clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white flex items-center justify-between px-4 md:px-6 h-14">
      
      {/* App Name */}
      <h1 className="text-base md:text-lg font-bold">
        TaskVault
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 px-3 py-1.5 text-sm md:text-base rounded hover:bg-red-700 transition"
      >
        Logout
      </button>

    </header>
  );
}

export default Header;
