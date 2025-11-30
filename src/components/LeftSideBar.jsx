import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTasks,
  FaUserCircle,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const LeftSidebar = () => {
  const links = [
    { name: "Dashboard", icon: <FaTasks />, path: "/dashboard" },
    { name: "Profile", icon: <FaUserCircle />, path: "/profile" },
    { name: "Reports", icon: <FaChartBar />, path: "/reports" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="w-50 min-h-screen bg-gray-100 text-black flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8 mt-2">Task Manager</h1>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.name}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                isActive ? "bg-blue-500 font-semibold" : ""
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidebar;
