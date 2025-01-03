import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEducationSubmenuOpen, setIsEducationSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isExpanded ? "w-64" : "w-20"
      } bg-primary-600 text-white flex flex-col transition-width duration-300`}
    >
      <div
        className={`p-4 text-2xl font-bold border-b border-white flex ${
          isExpanded ? "justify-between" : "justify-center"
        } items-center`}
      >
        <img
          src="./logo-wtext.svg"
          className={`max-w-36 ${isExpanded ? "block" : "hidden"}`}
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="focus:outline-none"
        >
          {isExpanded ? (
            <ArrowBackIosIcon fontSize="medium" />
          ) : (
            <ArrowForwardIosIcon fontSize="medium" />
          )}
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <Link
              to={"/dashboard"}
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <DashboardIcon fontSize="small" className="me-2" />
              <span className={`${isExpanded ? "block" : "hidden"} me-2`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/akun"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <BadgeIcon fontSize="small" className="me-2" />
              <span className={`${isExpanded ? "block" : "hidden"} me-2`}>
                Manajemen Pengguna
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <div>
              <button
                onClick={() =>
                  setIsEducationSubmenuOpen(!isEducationSubmenuOpen)
                }
                className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                <SchoolIcon fontSize="small" className="me-2" />
                <span className={`${isExpanded ? "block" : "hidden"} me-2`}>
                  Manajemen Edukasi
                </span>
                {isExpanded &&
                  (isEducationSubmenuOpen ? (
                    <KeyboardArrowUpIcon fontSize="medium" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="medium" />
                  ))}
              </button>
              {isEducationSubmenuOpen && (
                <ul className={`pl-8 mt-2 ${isExpanded ? "block" : "hidden"}`}>
                  <li className="mb-2">
                    <Link
                      to="/courses"
                      className="flex items-center p-2 hover:bg-gray-700 rounded"
                    >
                      <i className="fas fa-book me-2"></i>
                      <span>Kursus</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/modules"
                      className="flex items-center p-2 hover:bg-gray-700 rounded"
                    >
                      <i className="fas fa-chalkboard-teacher me-2"></i>
                      <span>Modul</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li className="mb-4">
            <Link
              to={"/booking"}
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <QuestionAnswerIcon fontSize="small" className="me-2" />
              <span className={`${isExpanded ? "block" : "hidden"} me-2`}>
                Manajemen Booking
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to={"/events"}
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <GroupsIcon fontSize="small" className="me-2" />
              <span className={`${isExpanded ? "block" : "hidden"} me-2`}>
                Manajemen Komunitas
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
            >
              <LogoutIcon fontSize="small" className="me-2" />
              <span className={`${isExpanded ? "block" : "hidden"} me-2`}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
