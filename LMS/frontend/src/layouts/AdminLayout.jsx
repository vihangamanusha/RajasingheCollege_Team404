import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
    FiGrid, FiUsers, FiBook, FiLogOut, FiMessageSquare, FiBarChart2
} from "react-icons/fi";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import "./AdminLayout.css";
import schoolLogo from "../assets/school-logo.jpeg";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // =========================
    // LOGOUT LOGIC
    // =========================
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    /**
     * Corrected Helper Logic:
     * 1. Dashboard ("/admin") now requires an EXACT match.
     * 2. Other routes use .startsWith() to ensure they stay active even on sub-pages.
     */
    const isActive = (path) => {
        if (path === "/admin") {
            return location.pathname === "/admin" ? "active" : "";
        }
        return location.pathname.startsWith(path) ? "active" : "";
    };

    return (
        <div className="admin-layout">
            {/* SIDEBAR NAVIGATION */}
            <div className="layout-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        {/* 2. Fix: Use the variable name in curly braces */}
                        <img
                            src={schoolLogo}
                            alt="RCC Logo"
                            style={{ width: '100%', borderRadius: '50%' }}
                        />
                    </div>
                    <div className="sidebar-title">
                        <h2>Rajasinghe<br/>LMS</h2>
                    </div>
                </div>

                <div className="sidebar-nav">
                    {/* 1. Dashboard - Only active if exactly /admin */}
                    <div
                        className={`nav-item ${isActive("/admin")}`}
                        onClick={() => navigate("/admin")}
                    >
                        <FiGrid className="nav-icon" /> Dashboard
                    </div>

                    {/* 2. Students Management */}
                    <div
                        className={`nav-item ${isActive("/admin/students")}`}
                        onClick={() => navigate("/admin/students")}
                    >
                        <FiUsers className="nav-icon" /> Students
                    </div>

                    {/* 3. Teachers Management */}
                    <div
                        className={`nav-item ${isActive("/admin/teachers")}`}
                        onClick={() => navigate("/admin/teachers")}
                    >
                        <FaChalkboardTeacher className="nav-icon" /> Teachers
                    </div>

                    {/* 4. Technical Officers Management */}
                    <div
                        className={`nav-item ${isActive("/admin/tech-officers")}`}
                        onClick={() => navigate("/admin/tech-officers")}
                    >
                        <FaUserShield className="nav-icon" /> TO Officers
                    </div>

                    <div className="nav-item">
                        <FiBook className="nav-icon" /> Classes
                    </div>

                    <div className="nav-item">
                        <FiMessageSquare className="nav-icon" /> Announcements
                    </div>

                    <div
                        className={`nav-item ${isActive("/admin/analytics")}`}
                        onClick={() => navigate("/admin/analytics")}
                    >
                        <FiBarChart2 className="nav-icon" /> Reports
                    </div>
                </div>

                <div className="sidebar-footer">
                    <div className="nav-item logout-item" onClick={handleLogout}>
                        <FiLogOut className="nav-icon" /> Logout
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="layout-main">
                <Outlet />
            </div>
        </div>
    );
}