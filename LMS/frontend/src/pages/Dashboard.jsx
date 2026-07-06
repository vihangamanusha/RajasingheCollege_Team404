import { useEffect, useState } from "react";//automatic load,store data use
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate for button without relording.
import { FiUsers, FiBook, FiGrid, FiUserPlus, FiPlus, FiLock } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./Dashboard.css";

export default function Dashboard() {
    // 2. Initialize the navigation hook
    const navigate = useNavigate();//change page without refressing..using in the butoon.

    const [username, setUsername] = useState("");//store the logged in username.
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });

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
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/dashboard/stats`, {//frontend send request.
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

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMessage({ text: "", type: "" });

        if (newPassword.length < 8) {
            setPasswordMessage({ text: "Password must be at least 8 characters long.", type: "error" });
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ text: "Passwords do not match.", type: "error" });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/user/change-password?username=${encodeURIComponent(username)}&newPassword=${encodeURIComponent(newPassword)}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                setPasswordMessage({ text: "Password changed successfully! Redirecting to login...", type: "success" });
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    localStorage.clear();
                    navigate("/login");
                }, 1500);
            } else {
                const errText = await response.text();
                setPasswordMessage({ text: `Failed: ${errText}`, type: "error" });
            }
        } catch (error) {
            setPasswordMessage({ text: "Server error during password update.", type: "error" });
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
                        <p className="user-name" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            {username || "Admin"}
                            <FiLock 
                                style={{ cursor: "pointer", color: "#64748b", fontSize: "14px" }} 
                                title="Change Password"
                                onClick={() => {
                                    setPasswordMessage({ text: "", type: "" });
                                    setNewPassword("");
                                    setConfirmPassword("");
                                    setShowPasswordModal(true);
                                }} 
                            />
                        </p>
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

            {/* CHANGE PASSWORD MODAL */}
            {showPasswordModal && (
                <div className="modal-overlay" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2000
                }}>
                    <div className="modal-box" style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        width: "400px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                    }}>
                        <div className="modal-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                            <FiLock className="warning-icon" style={{color: "#2b55cc", fontSize: "24px"}} />
                            <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "700", color: "#1e293b" }}>Change Password</h2>
                        </div>
                        <form onSubmit={handlePasswordChange}>
                            <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        border: "1px solid #cbd5e1",
                                        fontSize: "14px",
                                        backgroundColor: "white",
                                        marginTop: "0"
                                    }}
                                />
                            </div>
                            <div className="modal-form-group" style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        border: "1px solid #cbd5e1",
                                        fontSize: "14px",
                                        backgroundColor: "white",
                                        marginTop: "0"
                                    }}
                                />
                            </div>

                            {/* INLINE MESSAGE */}
                            {passwordMessage.text && (
                                <div className={`inline-form-message ${passwordMessage.type}`} style={{
                                    padding: "10px",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    marginBottom: "15px",
                                    backgroundColor: passwordMessage.type === "success" ? "#f0fdf4" : "#fef2f2",
                                    color: passwordMessage.type === "success" ? "#15803d" : "#b91c1c",
                                    border: passwordMessage.type === "success" ? "1px solid #bbf7d0" : "1px solid #fecaca"
                                }}>
                                    {passwordMessage.text}
                                </div>
                            )}

                            <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                <button type="button" className="cancel-btn" onClick={() => setShowPasswordModal(false)} style={{
                                    padding: "8px 16px",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "6px",
                                    backgroundColor: "white",
                                    cursor: "pointer"
                                }}>Cancel</button>
                                <button type="submit" className="confirm-delete-btn" style={{
                                    padding: "8px 16px",
                                    border: "none",
                                    borderRadius: "6px",
                                    backgroundColor: "#2b55cc",
                                    color: "white",
                                    cursor: "pointer"
                                }}>Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}