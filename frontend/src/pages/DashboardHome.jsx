function DashboardHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back 👋
      </h1>

      <p className="text-gray-600">
        Here’s what’s happening with your tasks today.
      </p>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-blue-700">
          Tip: Use search and filters to quickly find your tasks.
        </p>
      </div>
    </div>
  );
}

export default DashboardHome;
