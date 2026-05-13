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

import schoolLogo from "../../assets/school-logo.jpeg";
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
      name: "My Subjects",
      icon: <BookCopy size={22} />,
      path: "/student/subjects",
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
          padding: 1.5rem 1rem;
          position: fixed;
          left: 0;
          top: 0;
          border-right: 1px solid #1e40af;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2.5rem;
          padding: 0.5rem;
        }

        /* Photo ekata galapenna meka haduwa */
        .logo-photo-container {
          width: 45px;
          height: 45px;
          border-radius: 10px;
          overflow: hidden; /* Photo eka border eken pita yanne nathi wenna */
          background-color: #0629eeff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .logo-photo-container img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Photo eka lassanata fit wenna */
        }

        .logo-brand {
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.2;
          color: #fafafaff;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }

        .nav-link-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.9rem 1.25rem;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav-link-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transform: translateX(4px);
        }

        .nav-link-item.active {
          background-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.9rem 1.25rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
        }
      `}</style>

        <div className="logo-area">
          {/* Logo Photo eka methanata danna */}
          <div className="logo-photo-container">
            <img
                src={schoolLogo}
                alt="School Logo"
            />
          </div>
          <div className="logo-brand">
            Rajasinghe
            <br />
            <span style={{ fontSize: "0.85rem", opacity: 0.7, fontWeight: 400 }}>
            LMS 
          </span>
          </div>
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
              onClick={() => (window.location.href = "/login")}
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
  );
};

export default StudentSidebar;
