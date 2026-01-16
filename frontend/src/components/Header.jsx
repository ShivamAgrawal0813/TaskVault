import { clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <header className="h-14 bg-gray-900 text-white flex items-center justify-between px-6">

      <h1 className="text-lg font-bold">
        TaskVault
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
