import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../assets/rcc.png";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Megaphone,
  FileText,
  Globe,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
        <img src={logoImage} alt="Logo" className="logo-image" />
      <h2 className="logo">Rajasinghe LMS</h2>

      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        <NavLink to="/student-register"className={({ isActive }) =>isActive ? "nav-link active" : "nav-link" }>
          <Users size={18} />
         Student
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          <GraduationCap size={18} />
          Teacher
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          <BookOpen size={18} />
          Classes
        </NavLink>
        <NavLink to="/admin/announcements" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          <Megaphone size={18} />
          Announcement
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          <FileText size={18} />
          Reports
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          <Globe size={18} />
          Website Content
        </NavLink>
        
        
      </nav>

      <button className="logout" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}