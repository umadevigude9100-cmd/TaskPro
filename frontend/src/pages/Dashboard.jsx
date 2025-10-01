import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks/list"); // ✅ Updated route
      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await API.post("/tasks/create", { title, description }); // ✅ Updated route
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📝 Task Dashboard
        </h2>

        {/* Add Task Section */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Task Title"
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            ➕ Add Task
          </button>
        </div>

        {/* Task List Section */}
        <ul className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-start border rounded p-4 hover:shadow"
              >
                <div className="flex gap-3 items-start">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, task.completed)}
                    className="mt-1"
                  />
                  <div>
                    <h3
                      className={`font-semibold text-lg ${
                        task.completed ? "line-through opacity-60" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  title="Delete"
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
