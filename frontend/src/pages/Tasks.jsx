import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create task state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Edit task state
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [editError, setEditError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Delete task state
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // Search & filter
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await apiRequest("http://localhost:7000/tasks");
        setTasks(data.tasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Start editing
  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditData({
      title: task.title,
      description: task.description || "",
      status: task.status || "pending",
    });
    setEditError(null);
  };

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setCreateError("Task title is required");
      return;
    }

    setCreating(true);
    setCreateError(null);

    try {
      const data = await apiRequest("http://localhost:7000/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description, status }),
      });

      setTasks((prev) => [data.task, ...prev]);
      setTitle("");
      setDescription("");
      setStatus("pending");
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  };

  // Update task
  const handleUpdateTask = async (taskId) => {
    setUpdating(true);
    setEditError(null);

    try {
      const data = await apiRequest(
        `http://localhost:7000/tasks/${taskId}`,
        {
          method: "PUT",
          body: JSON.stringify(editData),
        }
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? data.task : task
        )
      );

      setEditingTaskId(null);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    setDeletingTaskId(taskId);
    setDeleteError(null);

    try {
      await apiRequest(`http://localhost:7000/tasks/${taskId}`, {
        method: "DELETE",
      });

      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingTaskId(null);
    }
  };

  // Derived filtered tasks
  const filteredTasks = tasks
    .filter((task) =>
      statusFilter === "all" ? true : task.status === statusFilter
    )
    .filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );

  // UI states
  if (loading) return <p className="text-gray-600">Loading tasks...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-4">

      {/* Create Task */}
      <form
        onSubmit={handleCreateTask}
        className="flex flex-col md:flex-row gap-2"
      >
        <input
          type="text"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full md:flex-1 border px-3 py-2 rounded"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full md:flex-1 border px-3 py-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full md:w-40 border px-3 py-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          disabled={creating}
          className={`w-full md:w-auto px-4 py-2 rounded text-white ${
            creating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {creating ? "Adding..." : "Add Task"}
        </button>
      </form>

      {createError && <p className="text-red-600">{createError}</p>}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">
          {tasks.length === 0
            ? "No tasks yet. Create one!"
            : "No tasks found."}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div key={task._id} className="border p-4 rounded">
              {editingTaskId === task._id ? (
                <div className="space-y-2">
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded w-full"
                  />

                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded w-full"
                  />

                  <select
                    value={editData.status}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  {editError && (
                    <p className="text-red-600">{editError}</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateTask(task._id)}
                      disabled={updating}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      {updating ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">
                      Status: {task.status}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(task)}
                      className="text-blue-600 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      disabled={deletingTaskId === task._id}
                      className="text-red-600 px-2 py-1"
                    >
                      {deletingTaskId === task._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {deleteError && <p className="text-red-600">{deleteError}</p>}
    </div>
  );
}

export default Tasks;
