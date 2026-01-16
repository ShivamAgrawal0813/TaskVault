import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, clearToken } from "../utils/auth";

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        clearToken();
        navigate("/login");
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
