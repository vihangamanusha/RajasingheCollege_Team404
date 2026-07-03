import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
    FiGrid, FiUsers, FiBook, FiLogOut, FiMessageSquare, FiBarChart2, FiBriefcase
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
     * FIXED: safer active logic
     * - avoids partial matching bugs like /admin vs /admin/users
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
                        <img
                            src={schoolLogo}
                            alt="RCC Logo"
                            style={{ width: '100%', borderRadius: '50%' }}
                        />
                    </div>
                    <div className="sidebar-title">
                        <h2>Rajasinghe<br />LMS</h2>
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

                    {/* Students */}
                    <div
                        className={`nav-item ${isActive("/admin/students")}`}
                        onClick={() => navigate("/admin/students")}
                    >
                        <FiUsers className="nav-icon" /> Students
                    </div>

                    {/* Teachers */}
                    <div
                        className={`nav-item ${isActive("/admin/teachers")}`}
                        onClick={() => navigate("/admin/teachers")}
                    >
                        <FaChalkboardTeacher className="nav-icon" /> Teachers
                    </div>

                    {/* Tech Officers */}
                    <div
                        className={`nav-item ${isActive("/admin/tech-officers")}`}
                        onClick={() => navigate("/admin/tech-officers")}
                    >
                        <FaUserShield className="nav-icon" /> TO Officers
                    </div>

                    {/* Classes */}
                    <div
                        className={`nav-item ${isActive("/admin/classes")}`}
                        onClick={() => navigate("/admin/classes")}
                    >
                        <FiBook className="nav-icon" /> Classes
                    </div>

                    {/* Announcements */}
                    <div
                        className={`nav-item ${isActive("/admin/announcements")}`}
                        onClick={() => navigate("/admin/announcements")}
                    >
                        <FiMessageSquare className="nav-icon" /> Announcements
                    </div>

                    {/* Reports */}
                    <div
                        className={`nav-item ${isActive("/admin/analytics")}`}
                        onClick={() => navigate("/admin/analytics")}
                    >
                        <FiBarChart2 className="nav-icon" /> Reports
                    </div>

                    {/* Non Academic */}
                    <div
                        className={`nav-item ${isActive("/admin/non-academic")}`}
                        onClick={() => navigate("/admin/non-academic")}
                    >
                        <FiBriefcase className="nav-icon" /> Non Academic
                    </div>

                </div>

                <div className="sidebar-footer">
                    <div className="nav-item logout-item" onClick={handleLogout}>
                        <FiLogOut className="nav-icon" /> Logout
                    </div>
                </div>

            </div>

            {/* MAIN CONTENT */}
            <div className="layout-main">
                <Outlet />
            </div>

        </div>
    );
}