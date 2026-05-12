import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FiUsers, FiBook, FiGrid, FiUserPlus, FiPlus } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./Dashboard.css";

export default function Dashboard() {
    const [username, setUsername] = useState("");

    // NEW: State to hold dynamic dashboard statistics
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        totalSubjects: 0,
        recentActivities: [] // Array of recent system actions
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.sub);

                // Fetch dynamic stats once user is authenticated
                fetchDashboardStats(token);
            } catch (error) {
                console.log("Invalid token or connection error");
            }
        }
    }, []);

    // NEW: Function to fetch live data from Spring Boot
    const fetchDashboardStats = async (token) => {
        try {
            const response = await fetch("http://localhost:8080/admin/dashboard/stats", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to load dashboard statistics:", error);
        }
    };

    const getInitials = (name) => {
        if (!name) return "AD";
        return name.substring(0, 2).toUpperCase();
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
                        <p className="user-name">{username || "Admin"}</p>
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
                    <p>Welcome back! Here's what's happening today.</p>
                </div>

                {/* STATS ROW - NOW DYNAMIC */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Students</p>
                            <h3>{stats.totalStudents.toLocaleString()}</h3>
                        </div>
                        <div className="stat-icon blue"><FiUsers /></div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Teachers</p>
                            <h3>{stats.totalTeachers.toLocaleString()}</h3>
                        </div>
                        <div className="stat-icon yellow"><FaGraduationCap /></div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Classes</p>
                            <h3>{stats.totalClasses}</h3>
                        </div>
                        <div className="stat-icon green"><FiBook /></div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Subjects</p>
                            <h3>{stats.totalSubjects}</h3>
                        </div>
                        <div className="stat-icon purple"><FiGrid /></div>
                    </div>
                </div>

                {/* BOTTOM GRID */}
                <div className="content-grid">
                    {/* RECENT ACTIVITY - NOW DYNAMIC */}
                    <div className="content-card activity-card">
                        <h3>Recent Activity</h3>

                        {stats.recentActivities.length > 0 ? (
                            stats.recentActivities.map((activity, index) => (
                                <div className="activity-item" key={index}>
                                    <div className="activity-avatar">{activity.initial}</div>
                                    <div className="activity-details">
                                        <p><strong>{activity.name}</strong> {activity.action}</p>
                                        <span>{activity.timeAgo}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{color: "#94a3b8", fontSize: "14px"}}>No recent activity to display.</p>
                        )}
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="content-card quick-actions-card">
                        <h3>Quick Actions</h3>
                        <button className="action-btn blue"><FiUserPlus /> Add Student</button>
                        <button className="action-btn yellow"><FaGraduationCap /> Add Teacher</button>
                        <button className="action-btn green"><FiPlus /> Manage Classes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}