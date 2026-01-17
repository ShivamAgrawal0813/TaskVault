import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full
          w-60 bg-gray-100 border-r p-4
          transform transition-transform duration-200 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="space-y-2 mt-14 md:mt-0">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700"
              }`
            }
            onClick={closeSidebar}
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
            onClick={closeSidebar}
          >
            Tasks
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
