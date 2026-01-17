import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../utils/auth";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");

    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        status: "pending",
    });
    const [editError, setEditError] = useState(null);
    const [updating, setUpdating] = useState(false);


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

    const startEdit = (task) => {
        setEditingTaskId(task._id);
        setEditData({
            title: task.title,
            description: task.description || "",
            status: task.status || "pending",
        });
        setEditError(null);
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setCreateError("Task title is required");
            return;
        }

        setCreating(true);
        setCreateError(null);

        try {
            const token = getToken();
            if (!token) {
                clearToken();
                navigate("/login");
                return;
            }

            const response = await fetch("http://localhost:7000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                }),
            });

            if (response.status === 401) {
                clearToken();
                navigate("/login");
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to create task");
            }

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

    const handleUpdateTask = async (taskId) => {
        setUpdating(true);
        setEditError(null);

        try {
            const token = getToken();
            if (!token) {
                clearToken();
                navigate("/login");
                return;
            }

            const response = await fetch(
                `http://localhost:7000/tasks/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editData),
                }
            );

            if (response.status === 401) {
                clearToken();
                navigate("/login");
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update task");
            }

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


    if (loading) {
        return <p className="text-gray-600">Loading tasks...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    // if (tasks.length === 0) {
    //     return <p>No tasks yet. Create one!</p>;
    // }

    return (
        <div className="space-y-4">

            <form onSubmit={handleCreateTask} className="flex gap-2">
                <input
                    type="text"
                    placeholder="New task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded"
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border px-3 py-2 rounded flex-3 "
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>


                <button
                    type="submit"
                    disabled={creating}
                    className={`px-4 py-2 rounded text-white ${creating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {creating ? "Adding..." : "Add Task"}
                </button>
            </form>

            {createError && (
                <p className="text-sm text-red-600">{createError}</p>
            )}

            <h2 className="text-xl font-bold">Your Tasks</h2>

            {tasks.length === 0 ? (
                <p>No tasks yet. Create one!</p>
            ) : (<div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task._id} className="border p-4 rounded">
                        {editingTaskId === task._id ? (
                            /* 🔹 EDIT MODE */
                            <div className="space-y-2">
                                <input
                                    value={editData.title}
                                    onChange={(e) =>
                                        setEditData((prev) => ({ ...prev, title: e.target.value }))
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
                                    <p className="text-sm text-red-600">{editError}</p>
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
                            /* 🔹 VIEW MODE */
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold">{task.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        Status: {task.status || "pending"}
                                    </p>
                                    {task.description && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            {task.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-x-2">
                                    <button
                                        onClick={() => startEdit(task)}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button className="text-red-600">Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

            </div>
            )}
        </div>
    );
}

export default Tasks;
