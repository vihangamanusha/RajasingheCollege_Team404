import React from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";

const TopBar = ({ studentName }) => {
  return (
    <header className="topbar-container">
      {/* INTERNAL CSS - Prototype 100% Match */}
      <style>{`
        .topbar-container {
          height: 70px;
          background-color: #ffffff;
          border-bottom: 1px solid var(--border); /* #e2e8f0 */
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: fixed;
          top: 0;
          right: 0;
          left: 260px; /* Sidebar width eka */
          z-index: 900;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        /* Search Section */
        .search-wrapper {
          position: relative;
          width: 350px;
        }
        .search-wrapper input {
          width: 100%;
          padding: 10px 15px 10px 40px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.9rem;
          outline: none;
          transition: 0.3s;
        }
        .search-wrapper input:focus {
          border-color: var(--primary);
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        /* Right Side Actions */
        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 5px;
          transition: 0.2s;
        }
        .notification-btn:hover { color: var(--primary); }
        .notification-dot {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border: 2px solid white;
          border-radius: 50%;
        }

        /* User Profile Section */
        .profile-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 12px 5px 5px;
          background-color: #f1f5f9;
          border-radius: 999px;
          cursor: pointer;
          transition: 0.3s;
        }
        .profile-pill:hover { background-color: #e2e8f0; }

        .avatar-box {
          width: 35px;
          height: 35px;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .user-info-text {
          display: flex;
          flex-direction: column;
        }
        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
        }
        .user-role {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: -2px;
        }

        @media (max-width: 1024px) {
          .search-wrapper { width: 200px; }
        }
      `}</style>

      {/* Search Bar */}
      <div className="search-wrapper">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Search for assignments, materials..." />
      </div>

      {/* Action Icons & Profile */}
      <div className="topbar-actions">
        <button className="notification-btn">
          <Bell size={22} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile-pill">
          <div className="avatar-box">
            <User size={20} />
          </div>
          <div className="user-info-text">
            <span className="user-name">{studentName || "Student"}</span>
            <span className="user-role">Student Account</span>
          </div>
          <ChevronDown size={16} color="#64748b" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
