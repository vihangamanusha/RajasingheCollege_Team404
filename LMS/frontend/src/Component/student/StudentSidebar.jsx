import React from "react";
import { NavLink } from "react-router-dom";
import { BookCopy } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  BookOpen,
  Bell,
  LogOut,
  Library,
} from "lucide-react";

import schoolLogo from "../../assets/rcc.png";
const StudentSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={22} />,
      path: "/student/dashboard",
    },
    {
      name: "My Marks",
      icon: <ClipboardList size={22} />,
      path: "/student/marks",
    },
    {
      name: "My Report",
      icon: <BarChart3 size={22} />,
      path: "/student/report",
    },
    {
      name: "Study Materials",
      icon: <BookOpen size={22} />,
      path: "/student/materials",
    },
    {
      name: "Assignment",
      icon: <BookCopy size={22} />,
      path: "/student/assignments",
    },
    {
      name: "Announcements",
      icon: <Bell size={22} />,
      path: "/student/announcements",
    },
  ];

  return (
      <aside className="sidebar-main">
        <style>{`
        .sidebar-main {
          width: 260px;
          height: 100vh;
          background-color: #1e3a8a; 
          color: #ffffff;
          display: flex;
          flex-direction: column;
          padding: 28px 22px;
          position: fixed;
          left: 0;
          top: 0;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }

        .logo-image {
          width: 108px;
          height: 102px;
          margin-left: 55px;
          display: block;
        }

        .logo {
          margin: 10px 0 30px;
          font-size: 1.3rem;
          letter-spacing: 0.04em;
          font-weight: 700;
          line-height: 1.2;
          margin-left: 25px;
          color: #ffffff;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .nav-link-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          text-decoration: none;
          color: #dbe6ff;
          font-weight: 500;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav-link-item:hover {
          background-color: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .nav-link-item.active {
          background-color: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1.5rem;
        }

        .logout-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 16px;
          background: #ff4d65;
          border: none;
          color: #ffffff !important;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          border-radius: 14px;
          transition: background 0.3s;
          margin-top: 40px;
        }

        .logout-button:hover {
          background: #ff3653 !important;
        }
      `}</style>

        <div className="sidebar-header" style={{ display: "block", padding: "0", marginBottom: "2rem" }}>
          <img
              src={schoolLogo}
              alt="RCC Logo"
              className="logo-image"
          />
          <h2 className="logo">Rajasinghe LMS</h2>
        </div>

        <nav className="nav-menu">
          {menuItems.map((item) => (
              <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                      `nav-link-item ${isActive ? "active" : ""}`
                  }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
              className="logout-button"
              onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
              }}
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
  );
};

export default StudentSidebar;
