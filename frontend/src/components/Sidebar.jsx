import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full
          w-60 bg-gray-100 border-r p-4
          transform transition-transform duration-200 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="mt-14 md:mt-0 space-y-3">
          <NavLink
            to="/dashboard/profile"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/tasks"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Tasks
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
