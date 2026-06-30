import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import "./TeacherSidebar.css";

import {
    LayoutDashboard,
    BookOpen,
    Users,
    Upload,
    FileText,
    BarChart3,
    LogOutIcon,
    ClipboardList,
    UserPlus
} from "lucide-react";

function TeacherSidebar({ isOpen, setIsOpen }) {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/dashboard" },
        { name: "My Subjects", icon: <BookOpen size={22} />, path: "/Subjects" },
        { name: "My Classes", icon: <Users size={22} />, path: "/Classes" },
        { name: "Add Student", icon: <UserPlus size={22} />, path: "/add-student" },
        { name: "Upload Marks", icon: <Upload size={22} />, path: "/TeacherAddMarks" },
        { name: "Materials", icon: <FileText size={22} />, path: "/materials" },
        { name: "Assignments", icon: <ClipboardList size={22} />, path: "/Assignment" },
        { name: "Reports", icon: <BarChart3 size={22} />, path: "/reports" },
        { name: "Log Out", icon: <LogOutIcon size={22} />, path: "/logout" },
    ];

    return (
        <nav className={`sidebar-container ${isOpen ? 'open' : ''}`}>

            <div className="sidebar-logo-section">
                <img src={logo} alt="logo" className="sidebar-logo" />
                <h2 className="sidebar-school-name">
                    Rajasinghe LMS
                </h2>
            </div>

            <ul className="sidebar-nav-list">

                {menuItems.map((item) => {

                    const isActive = location.pathname === item.path || location.pathname.toLowerCase() === item.path.toLowerCase();

                    return (
                        <li
                            key={item.name}
                            onClick={() => {
                                navigate(item.path);
                                if (window.innerWidth <= 768 && setIsOpen) {
                                    setIsOpen(false);
                                }
                            }}
                            className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                        >
                            <div className="sidebar-nav-content">
                                <span>
                                    {item.icon}
                                </span>
                                <span style={{ marginLeft: "15px" }}>
                                    {item.name}
                                </span>
                            </div>
                        </li>
                    );
                })}

            </ul>

        </nav>
    );
}

export default TeacherSidebar;