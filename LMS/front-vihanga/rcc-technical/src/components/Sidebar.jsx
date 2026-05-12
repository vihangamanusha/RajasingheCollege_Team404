import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../assets/rcc.png";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
        <img src={logoImage} alt="Logo" className="logo-image" />
      <h2 className="logo">Rajasinghe LMS</h2>

      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Dashboard
        </NavLink>

        <NavLink
  to="/student-register"
  className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
  }
>
  Student
</NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          Teacher
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          Classes
        </NavLink>
        <NavLink to="/admin/announcements" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          Announcement
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          Reports
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}> 
          Website Content
        </NavLink>
        
        
      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}