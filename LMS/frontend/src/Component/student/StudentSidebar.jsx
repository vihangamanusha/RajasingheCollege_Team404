import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, ClipboardList, BarChart3, BookOpen, LogOut } from 'lucide-react';
import '../../pages/student/styles/StudentSidebar.css';

const StudentSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, path: '/student/dashboard' },
    { name: 'Assignments', icon: <FileText size={20}/>, path: '/student/assignments' },
    { name: 'My Marks', icon: <ClipboardList size={20}/>, path: '/student/marks' },
    { name: 'My Report', icon: <BarChart3 size={20}/>, path: '/student/report' },
    { name: 'Study Materials', icon: <BookOpen size={20}/>, path: '/student/materials' },
  ];

  return (
    <aside className="student-sidebar">
      <div className="sidebar-header">
        <div className="logo-circle">RL</div>
        <h1 className="logo-text">Rajasinghe LMS</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink key={item.name} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            {item.icon} <span className="nav-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => window.location.href='/login'}>
          <LogOut size={20}/> <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;