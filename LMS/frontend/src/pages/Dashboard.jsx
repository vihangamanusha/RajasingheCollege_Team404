import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./Dashboard.css";

export default function Dashboard() {

    const [username, setUsername] = useState("");

    useEffect(() => {

        // get token from localStorage
        const token = localStorage.getItem("token");

        if (token) {
            try {
                // decode JWT token
                const decoded = jwtDecode(token);

                // only extract username (sub = subject in JWT)
                setUsername(decoded.sub);

            } catch (error) {
                console.log("Invalid token");
            }
        }

    }, []);

    // Helper function to grab the first letter for the circle avatar
    const getInitials = (name) => {
        if (!name) return "G"; // G for Guest
        return name.substring(0, 1).toUpperCase();
    };

    return (
        <div className="simple-dashboard-container">

            {/* TOP HEADER */}
            <header className="top-header">
                <div className="header-title">
                    <h3>Rajasinghe Central College</h3>
                </div>
                <div className="user-profile">
                    <div className="user-info">
                        <p className="user-role">Admin</p>
                        <p className="user-name">{username || "Guest"}</p>
                    </div>
                    <div className="user-avatar">
                        {getInitials(username)}
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <div className="dashboard-content">
                <div className="page-header">
                    <h1>Admin Dashboard</h1>
                    <p>Welcome back, {username || "Guest"}! Here's what's happening today.</p>
                </div>

                {/* Your future dashboard components will go here later */}

            </div>

        </div>
    );
}