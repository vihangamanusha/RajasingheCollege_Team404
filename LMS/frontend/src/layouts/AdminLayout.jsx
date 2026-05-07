import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <div style={{
                width: "220px",
                background: "#1e293b",
                color: "white",
                padding: "20px"
            }}>
                <h2>LMS Admin</h2>

                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><Link to="/" style={{ color: "white" }}>Dashboard</Link></li>
                    <li><Link to="/users" style={{ color: "white" }}>Users</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: "20px" }}>
                {children}
            </div>

        </div>
    );
}