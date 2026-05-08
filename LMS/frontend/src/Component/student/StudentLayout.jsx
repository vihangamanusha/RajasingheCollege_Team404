import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

const StudentLayout = () => {
  return (
    <div className="layout-wrapper">
      <style>{`
        .layout-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: var(--background); /* #f8f9fc */
        }

        .main-container {
          flex: 1;
          margin-left: 260px; /* Sidebar width */
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* 100% Prototype Top Bar */
        .top-navbar {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: transparent; /* Prototype eke white nemei background eka ekka thiyenne */
        }

        .college-tag {
          color: var(--muted-foreground); /* #64748b */
          font-style: italic;
          font-size: 0.95rem;
          font-weight: 400;
        }

        .student-pill {
          background-color: #f1f5f9;
          padding: 6px 18px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--foreground); /* #1e293b */
          border: 1px solid var(--border); /* #e2e8f0 */
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .content-body {
          padding: 0 2rem 2rem 2rem;
          flex: 1;
        }

        @media (max-width: 1024px) {
          .main-container { margin-left: 0; }
          .top-navbar { padding: 1rem; }
          .content-body { padding: 1rem; }
        }
      `}</style>

      {/* 1. Student Sidebar */}
      <StudentSidebar />

      {/* 2. Right Side Content */}
      <main className="main-container">
        {/* Top Bar - Prototype Exact Match */}
        <header className="top-navbar">
          <span className="college-tag">Rajasinghe Central College</span>
          <div className="student-pill">(Student) Account</div>
        </header>

        {/* Dynamic Page Content (Dashboard, Marks, etc.) */}
        <div className="content-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
