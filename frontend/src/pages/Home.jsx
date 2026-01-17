import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-black">
      {/* ================= Navbar ================= */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Brand */}
          <h1 className="text-2xl font-bold text-black">
            Task<span>Vault</span>
          </h1>

          {/* Right: Auth Links */}
          <div className="flex items-center gap-6">
            <a href="/login" className="text-black font-bold transition">
              Login
            </a>

            <a href="/register" className="text-black font-bold transition">
              Register
            </a>
          </div>
        </div>
      </nav>

      {/* ================= Main Content ================= */}
      <main className="pt-28">
        {/* ================= Hero Section ================= */}
        <section
          className="max-w-7xl mx-auto px-6 text-center py-20 rounded-2xl"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.075)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
            backgroundRepeat: "repeat",
          }}
        >
          <h2 className="text-4xl font-bold mb-4 text-black">
            Manage Your Tasks Securely with TaskVault
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-black">
            TaskVault helps you organize, track, and manage your tasks efficiently
            with secure authentication and a clean dashboard experience.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/register"
              className="bg-white text-black px-6 py-3 rounded-lg transition"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="bg-white px-6 py-3 rounded-lg transition text-black"
            >
              Login
            </a>
          </div>
        </section>

        {/* ================= Features Section ================= */}
        <section className="max-w-7xl mx-auto px-6 mt-20 grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-black">
            <h3 className="text-xl font-semibold mb-2">
              Secure Authentication
            </h3>
            <p>
              JWT-based authentication ensures your tasks remain private and secure.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-black">
            <h3 className="text-xl font-semibold mb-2">
              Task Management
            </h3>
            <p>
              Create, update, and manage tasks effortlessly from your dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-black">
            <h3 className="text-xl font-semibold mb-2">
              Clean Dashboard
            </h3>
            <p>
              Minimal UI focused on productivity and clarity.
            </p>
          </div>
        </section>
      </main>

      {/* ================= Footer ================= */}
      <footer className="mt-24 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-black">
          © {new Date().getFullYear()} TaskVault. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
