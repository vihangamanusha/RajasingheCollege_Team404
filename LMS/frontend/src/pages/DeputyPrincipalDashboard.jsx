import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    UserCheck,
    LogOut,
    FileSpreadsheet,
    Bell,
    TrendingUp,
    BookOpen,
    Layers,
    FileText,
    Activity,
    GraduationCap,
    Wrench,
    Briefcase
} from "lucide-react";
import "./Dashboard.css";
import "../layouts/AdminLayout.css";
import schoolLogo from "../assets/school-logo.jpeg";
import AdminClassManagement from "./AdminClassManagement";
import Announcement from "./AdminAnnouncements";
import DeputyPrincipalAdminReport from "./DeputyPrincipalAdminReport";
import AdminTeacherManagement from "./AdminTeacherManagement";
import AdminTechOfficerManagement from "./AdminTechOfficerManagement";
import AdminNonAcademicManagement from "./AdminNonAcademicManagement";


export default function DeputyPrincipalDashboard() {
    const navigate = useNavigate();
    const [subRole, setSubRole] = useState("Deputy Principal");
    const [username, setUsername] = useState("Deputy Principal");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        totalSubjects: 0,
        recentActivities: []
    });

    useEffect(() => {
        const storedSubRole = localStorage.getItem("subRole");
        const storedUsername = localStorage.getItem("username");
        if (storedSubRole) setSubRole(storedSubRole);
        if (storedUsername) setUsername(storedUsername);

        const token = localStorage.getItem("token");
        if (token) {
            fetchStats(token);
        }
    }, []);

    const fetchStats = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/dashboard/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="admin-layout">
            {/* SIDEBAR NAVIGATION */}
            <div className="layout-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img
                            src={schoolLogo}
                            alt="RCC Logo"
                            style={{ width: '100%', borderRadius: '50%' }}
                        />
                    </div>
                    <div className="sidebar-title">
                        <h2>Rajasinghe<br />LMS</h2>
                    </div>
                </div>

                <div className="sidebar-nav">
                    {/* Dashboard */}
                    <div className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                        <Users className="nav-icon" /> Dashboard
                    </div>

                    {/* Classes */}
                    <div className={`nav-item ${activeTab === "classes" ? "active" : ""}`} onClick={() => setActiveTab("classes")}>
                        <FileSpreadsheet className="nav-icon" /> Classes
                    </div>


                    {/* Teacher */}
                    <div className={`nav-item ${activeTab === "teachers" ? "active" : ""}`} onClick={() => setActiveTab("teachers")}>
                        <UserCheck className="nav-icon" /> Teacher
                    </div>

                    {/* Technical Officer */}
                    <div className={`nav-item ${activeTab === "tech-officers" ? "active" : ""}`} onClick={() => setActiveTab("tech-officers")}>
                        <Wrench className="nav-icon" /> Technical Officer
                    </div>

                    {/* Non Academic */}
                    <div className={`nav-item ${activeTab === "non-academic" ? "active" : ""}`} onClick={() => setActiveTab("non-academic")}>
                        <Briefcase className="nav-icon" /> Non Academic
                    </div>

                    {/* Announcements */}
                    <div className={`nav-item ${activeTab === "announcements" ? "active" : ""}`} onClick={() => setActiveTab("announcements")}>
                        <Bell className="nav-icon" /> Announcements
                    </div>

                    {/* Reports */}
                    <div className={`nav-item ${activeTab === "reports" ? "active" : ""}`} onClick={() => setActiveTab("reports")}>
                        <FileText className="nav-icon" /> Reports
                    </div>
                </div>

                <div className="sidebar-footer">
                    <div className="nav-item logout-item" onClick={handleLogout}>
                        <LogOut className="nav-icon" /> Logout
                    </div>
                </div>
            </div>

            {/* MAIN WORKSPACE */}
            <div className="layout-main">
                {/* TOP HEADER */}
                <header className="top-header">
                    <div className="header-title">
                        <h3>Rajasinghe Central College</h3>
                    </div>
                    <div className="user-profile">
                        <div className="user-info">
                            <p className="user-role">{subRole}</p>
                            <p className="user-name">{username}</p>
                        </div>
                        <div className="user-avatar" style={{ backgroundColor: "#2b55cc" }}>
                            {username ? username.substring(0, 2).toUpperCase() : "DP"}
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT AREA */}
                <div className="dashboard-content">
                    {activeTab === "dashboard" && (
                        <>
                            {/* Center aligned title */}
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    Deputy Principal Dashboard
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    Academic Administration & School Development Workspace
                                </p>
                            </div>

                            {/* STATS ROW */}
                            <div className="stats-row" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "30px" }}>
                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Total Students</p>
                                        <h3>{stats.totalStudents.toLocaleString()}</h3>
                                    </div>
                                    <div className="stat-icon blue"><Users size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Total Teachers</p>
                                        <h3>{stats.totalTeachers.toLocaleString()}</h3>
                                    </div>
                                    <div className="stat-icon yellow"><UserCheck size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Total Classes</p>
                                        <h3>{stats.totalClasses}</h3>
                                    </div>
                                    <div className="stat-icon green"><BookOpen size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Total Subjects</p>
                                        <h3>{stats.totalSubjects}</h3>
                                    </div>
                                    <div className="stat-icon purple"><Layers size={20} /></div>
                                </div>
                            </div>

                            {/* BOTTOM GRID */}
                            <div className="content-grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "25px" }}>
                                {/* Left Card: Recent Activity */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <Activity size={18} style={{ color: "#3b82f6" }} />
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Recent School Activity</h3>
                                    </div>
                                    <div className="announcements-list" style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "380px", overflowY: "auto" }}>
                                        {stats.recentActivities && stats.recentActivities.length > 0 ? (
                                            stats.recentActivities.map((activity, index) => (
                                                <div className="activity-item" key={index} style={{
                                                    display: "flex",
                                                    gap: "15px",
                                                    paddingBottom: "15px",
                                                    borderBottom: "1px solid #f8fafc"
                                                }}>
                                                    <div className="activity-avatar" style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        backgroundColor: "#f1f5f9",
                                                        color: "#64748b",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontWeight: "600",
                                                        fontSize: "12px"
                                                    }}>{activity.initial}</div>
                                                    <div className="activity-details">
                                                        <p style={{ margin: "0 0 4px 0", color: "#334155", fontSize: "13px" }}>
                                                            <strong>{activity.name}</strong> {activity.action}
                                                        </p>
                                                        <span style={{ color: "#94a3b8", fontSize: "11px" }}>{activity.timeAgo}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ color: "#94a3b8", fontSize: "14px" }}>No recent activity to display.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Right Card: Quick Actions */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <TrendingUp size={18} style={{ color: "#f59e0b" }} />
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Administrative Tasks</h3>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        <button
                                            onClick={() => setActiveTab("announcements")}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                padding: "14px",
                                                backgroundColor: "#2b55cc",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                cursor: "pointer",
                                                transition: "opacity 0.2s"
                                            }}
                                        >
                                            <Bell size={16} />
                                            <span>Create Announcement</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("reports")}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                padding: "14px",
                                                backgroundColor: "#f59e0b",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                cursor: "pointer",
                                                transition: "opacity 0.2s"
                                            }}
                                        >
                                            <TrendingUp size={16} />
                                            <span>View Reports & Analytics</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("classes")}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                padding: "14px",
                                                backgroundColor: "#10b981",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                cursor: "pointer",
                                                transition: "opacity 0.2s"
                                            }}
                                        >
                                            <FileSpreadsheet size={16} />
                                            <span>Manage Academic Classes</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "classes" && <AdminClassManagement />}
                    {activeTab === "teachers" && <AdminTeacherManagement />}
                    {activeTab === "tech-officers" && <AdminTechOfficerManagement />}
                    {activeTab === "non-academic" && <AdminNonAcademicManagement />}
                    {activeTab === "announcements" && <Announcement />}
                    {activeTab === "reports" && <DeputyPrincipalAdminReport />}
                </div>
            </div>
        </div>
    );
}
