import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FiUsers, FiBook, FiGrid, FiUserPlus, FiPlus } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
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
                        <p className="user-name">{username || "John Doe"}</p>
                    </div>
                    <div className="user-avatar">
                        {getInitials(username || "John Doe")}
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <div className="dashboard-content">
                <div className="page-header">
                    <h1>Admin Dashboard</h1>
                    <p>Welcome back! Here's what's happening today.</p>
                </div>

                {/* STATS ROW */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Students</p>
                            <h3>1,284</h3>
                        </div>
                        <div className="stat-icon blue">
                            <FiUsers />
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Teachers</p>
                            <h3>87</h3>
                        </div>
                        <div className="stat-icon yellow">
                            <FaGraduationCap />
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Classes</p>
                            <h3>42</h3>
                        </div>
                        <div className="stat-icon green">
                            <FiBook />
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total Subjects</p>
                            <h3>24</h3>
                        </div>
                        <div className="stat-icon purple">
                            <FiGrid />
                        </div>
                    </div>
                </div>

                {/* BOTTOM GRID */}
                <div className="content-grid">

                    {/* RECENT ACTIVITY */}
                    <div className="content-card activity-card">
                        <h3>Recent Activity</h3>

                        <div className="activity-item">
                            <div className="activity-avatar">K</div>
                            <div className="activity-details">
                                <p><strong>Kasun Perera</strong> enrolled in Grade 10-A</p>
                                <span>5 minutes ago</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-avatar">M</div>
                            <div className="activity-details">
                                <p><strong>Mrs. Silva</strong> uploaded marks for Mathematics</p>
                                <span>1 hour ago</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-avatar">N</div>
                            <div className="activity-details">
                                <p><strong>Nimali Fernando</strong> added study material for Science</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-avatar">S</div>
                            <div className="activity-details">
                                <p><strong>Saman Kumara</strong> generated term report</p>
                                <span>3 hours ago</span>
                            </div>
                        </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="content-card quick-actions-card">
                        <h3>Quick Actions</h3>
                        <button className="action-btn blue">
                            <FiUserPlus /> Add Student
                        </button>
                        <button className="action-btn yellow">
                            <FaGraduationCap /> Add Teacher
                        </button>
                        <button className="action-btn green">
                            <FiPlus /> Manage Classes
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}