import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { FiGrid, FiUsers, FiBook, FiLogOut } from "react-icons/fi";
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
                    <div className="sidebar-logo">LMS</div>
                    <div className="sidebar-title">
                        <h2>Rajasinghe<br/>Admin</h2>
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

                    {/* Users (STEP 5) */}
                    <div
                        className={`nav-item ${location.pathname.includes("/admin/users") ? "active" : ""}`}
                        onClick={() => navigate("/admin/users")}
                    >
                        <FiUsers className="nav-icon" /> Users
                    </div>

                    {/* Courses (future step) */}
                    <div className="nav-item disabled">
                        <FiBook className="nav-icon" /> Courses
                    </div>
                </div>

                <div className="sidebar-footer">
                    {/* LOGOUT */}
                    <div className="nav-item" onClick={handleLogout}>
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