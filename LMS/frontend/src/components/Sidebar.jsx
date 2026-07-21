import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const isActive = (path) => {
    const toPath = path.startsWith("/admin") ? path.replace("/admin", "/to/admin") : path;
    return location.pathname.startsWith(path) || location.pathname.startsWith(toPath) ? "active" : "";
  };

  useEffect(() => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const rewriteUrl = (url) => {
      if (url === "/admin/users/student") return "/to/admin/users/student";
      if (url === "/admin/users/teacher") return "/to/admin/users/teacher";
      if (url === "/admin/classes") return "/to/admin/classes";
      if (url === "/admin/analytics") return "/to/admin/analytics";
      if (url === "/admin/announcements") return "/to/admin/announcements";
      return url;
    };

    window.history.pushState = function (state, title, url) {
      return originalPushState.apply(this, [state, title, rewriteUrl(url)]);
    };

    window.history.replaceState = function (state, title, url) {
      return originalReplaceState.apply(this, [state, title, rewriteUrl(url)]);
    };

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

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
        <NavLink to="/to" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        <NavLink to="/to/admin/students"className={({ isActive }) =>isActive ? "nav-link active" : "nav-link" }>
          <Users size={18} />
         Student
        </NavLink>
        <NavLink to="/to/admin/teachers" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          <GraduationCap size={18} />
          Teacher
        </NavLink>
        <NavLink to="/to/admin/classes" className={`nav-link ${isActive("/admin/classes")}`}
                        onClick={() => navigate("/admin/classes")}> 
          <BookOpen size={18} />
          Classes
        </NavLink>
        <NavLink to="/to/admin/announcements"  className={`nav-link ${isActive("/admin/announcements")}`}
                        onClick={() => navigate("/admin/announcements")}> 
          <Megaphone size={18} />
          Announcement
        </NavLink>
        <NavLink to="/to/admin/analytics" className={`nav-link ${isActive("/admin/analytics")}`}
                        onClick={() => navigate("/admin/analytics")}> 
          <FileText size={18} />
          Reports
        </NavLink>
        <NavLink to="/to/news" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
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