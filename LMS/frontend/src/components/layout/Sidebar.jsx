import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";

function Sidebar() {
  return (
    <div style={{
      width: "240px",
      height: "100vh",
      background: theme.colors.primary,
      color: "white",
      padding: "20px"
    }}>
      <h2 style={{ marginBottom: "30px" }}>RCC LMS</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={link}>Dashboard</Link>
        <Link to="/marks" style={link}>Marks</Link>
        <Link to="/report" style={link}>Report</Link>
        <Link to="/materials" style={link}>Materials</Link>
      </nav>
    </div>
  );
}

const link = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px"
};

export default Sidebar;