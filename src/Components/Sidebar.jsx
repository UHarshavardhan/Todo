import React from "react";
import { FcHome, FcCalendar, FcAdvertising, FcSearch } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div>
      <button
        className="absolute top-4 left-4 text-white text-3xl sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <div
        className={`h-screen bg-gradient-to-b from-purple-500 to-blue-500 overflow-hidden transition-all duration-300 top-0 left-0 z-50 ${
          isSidebarOpen ? "w-64" : "w-0"
        } sm:w-64`}
      >
        <div className="p-6 flex flex-col items-center text-white">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl">Welcome</h1>
            <h3 className="mt-3 text-lg font-bold">{userName || "Guest"}</h3>
            <p className="text-sm">{userEmail || ""}</p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div
              className="flex items-center gap-4 px-4 py-2 hover:bg-blue-400 rounded-md cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <FcHome className="text-2xl" />
              <span className="text-white">Dashboard</span>
            </div>
            <div
              className="flex items-center gap-4 px-4 py-2 hover:bg-blue-400 rounded-md cursor-pointer"
              onClick={() => navigate("/task")}
            >
              <FcCalendar className="text-2xl" />
              <span className="text-white">Calendar</span>
            </div>
            <div className="flex items-center gap-4 px-4 py-2 hover:bg-blue-400 rounded-md cursor-pointer">
              <FcAdvertising className="text-2xl" />
              <span className="text-white">Notification</span>
            </div>
            <div className="flex items-center gap-4 px-4 py-2 hover:bg-blue-400 rounded-md cursor-pointer">
              <FcSearch className="text-2xl" />
              <span className="text-white">Search</span>
            </div>
          </div>

          <div
            className="mt-auto flex items-center gap-4 px-4 py-2 hover:bg-blue-400 rounded-md cursor-pointer"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <IoIosLogOut className="text-2xl text-white" />
            <span className="text-white">Logout</span>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
         
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
