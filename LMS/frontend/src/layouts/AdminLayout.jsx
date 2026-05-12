import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
    FiGrid, FiUsers, FiBook, FiLogOut, FiMessageSquare, FiBarChart2
} from "react-icons/fi";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import "./AdminLayout.css";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // =========================
    // LOGOUT LOGIC
    // =========================
    const handleLogout = () => {
        // Clear security tokens
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // Return to login
        navigate("/login");
    };

    /**
     * Industry Standard Helper:
     * Checks if a specific path or sub-path is active to highlight sidebar items.
     */
    const isActive = (path) => {
        // For the main dashboard (index)
        if (path === "/admin" && location.pathname === "/admin") return "active";
        // For other routes, check if the current URL includes the path
        return location.pathname.includes(path) ? "active" : "";
    };

    return (
        <div className="admin-layout">

            {/* =========================
                SIDEBAR NAVIGATION
            ========================= */}
            <div className="layout-sidebar">

                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        {/* Ensure your logo path is correct in the public folder */}
                        <img src="/logo.png" alt="RCC Logo" style={{ width: '100%', borderRadius: '50%' }} />
                    </div>
                    <div className="sidebar-title">
                        <h2>Rajasinghe<br/>LMS</h2>
                    </div>
                </div>

                <div className="sidebar-nav">
                    {/* 1. Dashboard */}
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

                    {/* 5. Classes Management (Link logic to be built) */}
                    <div className="nav-item">
                        <FiBook className="nav-icon" /> Classes
                    </div>

                    {/* 6. Announcements (Link logic to be built) */}
                    <div className="nav-item">
                        <FiMessageSquare className="nav-icon" /> Announcements
                    </div>

                    {/* ============================================================
                        7. REPORTS & ANALYTICS (UPDATED)
                        Now navigates to the Academic Intelligence Hub
                    ============================================================ */}
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

            {/* =========================
                MAIN CONTENT AREA
                This is where Dashboard, Analytics, etc., load.
            ========================= */}
            <div className="layout-main">
                <Outlet />
            </div>

        </div>
    );
}