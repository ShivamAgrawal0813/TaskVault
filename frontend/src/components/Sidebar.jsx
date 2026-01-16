import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-60 bg-gray-100 border-r p-4">
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-blue-600 text-white" : "text-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/tasks"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-blue-600 text-white" : "text-gray-700"
            }`
          }
        >
          Tasks
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
