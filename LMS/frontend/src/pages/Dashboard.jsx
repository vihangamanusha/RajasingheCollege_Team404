import { useEffect, useState } from "react";//automatic load,store data use
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate for button without relording.
import { FiUsers, FiBook, FiGrid, FiUserPlus, FiPlus } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./Dashboard.css";

export default function Dashboard() {
    // 2. Initialize the navigation hook
    const navigate = useNavigate();//change page without refressing..using in the butoon.

    const [username, setUsername] = useState("");//store the logged in username.

    // 3. Store dashbord data from the backend// react state object
    const [stats, setStats] = useState({
        totalStudents: 0,//initail value is 0
        totalTeachers: 0,
        totalClasses: 0,
        totalSubjects: 0,
        recentActivities: [] // This will be populated by your API.this is a list
    });

    useEffect(() => {//run auto matically
        const token = localStorage.getItem("token");

        if (token) {
            try {
                // Decode the JWT to show the logged-in Admin's name
                const decoded = jwtDecode(token);
                setUsername(decoded.sub);//store username from the token. sub = subject

                // called backend api
                fetchDashboardStats(token);//loard backend data in the front end.
            } catch (error) {
                console.log("Invalid token or connection error");
            }
        }
    }, []);//empty arry run when lord the page

    // 5. Function to fetch live data from your AdminController endpoint
    const fetchDashboardStats = async (token) => {//becuase api call take time so we use async
        try {
            const response = await fetch("http://localhost:8080/admin/dashboard/stats", {//frontend send request.
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();//convert json into javascript object
                // Update our state with real numbers from the database
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to load dashboard statistics:", error);
        }
    };

    // Helper to generate initials for the avatar//this is a function, have one parameter name
    const getInitials = (name) => {
        if (!name) return "AD";//check the name emty or null then return ad
        return name.substring(0, 2).toUpperCase();//convert letter to capital
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

                {/* STATS ROW - Data mapped from stats state */}
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
                    {/* RECENT ACTIVITY - Mapping data from database logs */}
                    <div className="content-card activity-card">
                        <h3>Recent Activity</h3>

                        {stats.recentActivities.length > 0 ? (//check the number ofctivity
                            stats.recentActivities.map((activity, index) => (//map funtion is gonna loop
                                <div className="activity-item" key={index}>
                                    {/* The initial is calculated in the backend DTO */}
                                    <div className="activity-avatar">{activity.initial}</div>
                                    <div className="activity-details">
                                        <p><strong>{activity.name}</strong> {activity.action}</p>
                                        {/*//get the one line text*/}
                                        <span>{activity.timeAgo}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{color: "#94a3b8", fontSize: "14px"}}>No recent activity to display.</p>
                        )}
                    </div>

                    {/* QUICK ACTIONS - Functional buttons for fast navigation */}
                    <div className="content-card quick-actions-card">
                        <h3>Quick Actions</h3>

                        {/* 6. Navigate to the Student Management page */}
                        <button
                            className="action-btn blue"
                            onClick={() => navigate("/admin/users/student")}
                        >
                            <FiUserPlus /> Add Student
                        </button>

                        {/* 7. Navigate to the Teacher Management page */}
                        <button
                            className="action-btn yellow"
                            onClick={() => navigate("/admin/users/teacher")}
                        >
                            <FaGraduationCap /> Add Teacher
                        </button>

                        {/* 8. Navigate to the Classes Management page (built by your friend) */}
                        <button
                            className="action-btn green"
                            onClick={() => navigate("/admin/classes")}
                        >
                            <FiPlus /> Manage Classes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}