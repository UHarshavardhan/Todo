import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const userId = localStorage.getItem("userId");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/tasks?userId=${userId}`);
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const taskStatusStats = filteredTasks.reduce(
    (acc, task) => {
      if (task.status === "Completed") acc.completed += 1;
      if (task.status === "Not Completed") acc.notCompleted += 1;
      return acc;
    },
    { completed: 0, notCompleted: 0 }
  );

  const pieChartData = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        data: [taskStatusStats.completed, taskStatusStats.notCompleted],
        backgroundColor: ["#4CAF50", "#FF5722", "#FFEB3B"],
      },
    ],
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    if (status === "All") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row min-h-screen">
      
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} className="ml-6"/>

    
      <div 
        className={`flex flex-col w-full p-6 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >


        <div className="lg:flex gap-6 lg:gap-12">
          
          <div className="lg:w-2/3 w-full mb-6 lg:mb-0 ">
          <div className="task-filters flex flex-col lg:flex-row mb-6">
  <div className="flex gap-4 flex-wrap lg:ml-5 justify-start">
    <button
      onClick={() => handleStatusFilterChange("Completed")}
      className={`${
        statusFilter === "Completed" ? "bg-white text-green-600" : "bg-green-600 text-white"
      } px-4 py-2 text-sm rounded-lg shadow-md hover:shadow-lg transition duration-300`}
    >
      Completed
    </button>
    <button
      onClick={() => handleStatusFilterChange("Not Completed")}
      className={`${
        statusFilter === "Not Completed" ? "bg-white text-red-600" : "bg-red-600 text-white"
      } px-4 py-2 text-sm rounded-lg shadow-md hover:shadow-lg transition duration-300`}
    >
      Not Completed
    </button>
    <button
      onClick={() => handleStatusFilterChange("All")}
      className={`${
        statusFilter === "All" ? "bg-white text-blue-600" : "bg-blue-600 text-white"
      } px-4 py-2 text-sm rounded-lg shadow-md hover:shadow-lg transition duration-300`}
    >
      All Tasks
    </button>
  </div>
</div>


            <div className="task-list flex flex-col gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="task-card bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{task.task}</h4>
                    <p className="text-sm text-gray-500">
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`status text-sm mt-2 px-4 py-1 rounded-full ${
                      task.status === "Completed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {task.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 w-full hidden sm:block">
  <div className="task-stats p-6 rounded-xl shadow-md bg-white">
    <h3 className="text-lg font-semibold mb-4 text-center">Task Status</h3>
    <Pie data={pieChartData} />
  </div>
</div>


        </div>
      </div>
    </div>
  );
}

export default Home;
