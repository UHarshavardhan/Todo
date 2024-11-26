import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Components/Sidebar"; // Ensure Sidebar is correctly imported

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For sidebar toggle

  const userId = localStorage.getItem("userId");

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/tasks", {
        params: {
          userId,
          filter: filter !== "All" ? filter : undefined,
          date: date.toISOString().split("T")[0],
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (task && date) {
      try {
        await axios.post("http://localhost:3000/api/v1/tasks", {
          userId,
          task,
          status,
          date: date.toISOString().split("T")[0],
        });
        fetchTasks();
        setTask("");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`, {
        data: { userId },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/tasks/${id}`, {
        userId,
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, date]);

  return (
    <div className="task-manager-container flex min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
 
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-col w-full sm:w-3/4 lg:w-4/5 p-4 sm:px-6 bg-white rounded-xl shadow-lg">
=
        <div className="flex justify-between items-center mb-6 mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow-md hover:bg-blue-600"
          >
            Add Task
          </button>

          <div className="flex gap-4">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="date-input p-2 rounded-lg border w-full sm:w-auto"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="status-filter p-2 rounded-lg border w-full sm:w-auto"
            >
              <option value="All">All Tasks</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
              <option value="Postponed">Postponed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

=
        <div className="task-list grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="task-card bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <h4 className="text-lg font-semibold">{task.task}</h4>
              <p className="text-gray-500 text-sm">{task.date}</p>
              <p
                className={`text-sm ${task.status === "Completed" ? "text-green-500" : "text-red-500"}`}
              >
                {task.status}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => updateTaskStatus(task._id, "Completed")}
                >
                  Complete
                </button>
                <button
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

=
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="modal-content bg-white p-4 rounded-lg shadow-lg w-11/12 sm:w-1/2 mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        >
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
          <option value="Postponed">Postponed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </Modal>
    </div>
  );
}

export default TaskManager;
