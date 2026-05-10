import { useNavigate, Outlet, useLocation } from "react-router-dom";
// Importing icons to match the prototype
import {
    FiGrid, FiUsers, FiBook, FiLogOut, FiMessageSquare, FiBarChart2
} from "react-icons/fi";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import "./AdminLayout.css";

export default function AdminLayout() {

    const navigate = useNavigate();
    const location = useLocation(); // We use this to check the current URL path

    // =========================
    // LOGOUT FUNCTION
    // =========================
    const handleLogout = () => {
        // remove JWT token from browser storage
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // redirect to login page
        navigate("/login");
    };

    // Helper function to check if a path is active
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <div className="admin-layout">

            {/* =========================
                SIDEBAR MENU
            ========================= */}
            <div className="layout-sidebar">

                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img src="/path-to-logo.png" alt="Logo" style={{ width: '100%', borderRadius: '50%' }} />
                    </div>
                    <div className="sidebar-title">
                        <h2>Rajasinghe<br/>LMS</h2>
                    </div>
                </div>

                <div className="sidebar-nav">
                    {/* Dashboard */}
                    <div
                        className={`nav-item ${isActive("/admin")}`}
                        onClick={() => navigate("/admin")}
                    >
                        <FiGrid className="nav-icon" /> Dashboard
                    </div>

                    {/* Students (Maps to your users route) */}
                    <div
                        className={`nav-item ${location.pathname.includes("/admin/users") ? "active" : ""}`}
                        onClick={() => navigate("/admin/users")}
                    >
                        <FiUsers className="nav-icon" /> Students
                    </div>

                    {/* Teachers */}
                    <div className="nav-item">
                        <FaChalkboardTeacher className="nav-icon" /> Teachers
                    </div>

                    {/* TO Officers */}
                    <div className="nav-item">
                        <FaUserShield className="nav-icon" /> TO Officers
                    </div>

                    {/* Classes */}
                    <div className="nav-item">
                        <FiBook className="nav-icon" /> Classes
                    </div>

                    {/* Announcements */}
                    <div className="nav-item">
                        <FiMessageSquare className="nav-icon" /> Announcements
                    </div>

                    {/* Reports */}
                    <div className="nav-item">
                        <FiBarChart2 className="nav-icon" /> Reports
                    </div>
                </div>

                <div className="sidebar-footer">
                    {/* LOGOUT */}
                    <div className="nav-item logout-item" onClick={handleLogout}>
                        <FiLogOut className="nav-icon" /> Logout
                    </div>
                </div>

            </div>

            {/* =========================
                MAIN CONTENT AREA
                (renders child routes)
            ========================= */}
            <div className="layout-main">
                {/* This is where Dashboard / Users page will load */}
                <Outlet />
            </div>

        </div>
    );
}