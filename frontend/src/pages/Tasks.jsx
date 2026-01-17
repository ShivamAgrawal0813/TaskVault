import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../utils/auth";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = getToken();

        if (!token) {
          clearToken();
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:7000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          clearToken();
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tasks");
        }

        setTasks(data.tasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);


  if (loading) {
    return <p className="text-gray-600">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks yet. Create one!</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          className="border p-4 rounded flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">
              Status: {task.status}
            </p>
          </div>

          <div className="space-x-2">
            <button className="text-blue-600">Edit</button>
            <button className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
