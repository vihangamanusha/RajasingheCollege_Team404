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
import schoolLogo from "../assets/rcc.png";
import AdminClassManagement from "./AdminClassManagement";
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
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/announcements`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    const sorted = (data || []).sort((a, b) => b.id - a.id);
                    setAnnouncements(sorted);
                }
            } catch (err) {
                console.error("Failed to load announcements:", err);
            }
        };
        fetchAnnouncements();
    }, []);

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
                    <img
                        src={schoolLogo}
                        alt="RCC Logo"
                        className="logo-image"
                    />
                    <h2 className="logo">Rajasinghe LMS</h2>
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
                    {activeTab === "announcements" && <DeputyPrincipalAnnouncementsView announcements={announcements} />}
                    {activeTab === "reports" && <DeputyPrincipalAdminReport />}
                </div>
            </div>
        </div>
    );
}

function DeputyPrincipalAnnouncementsView({ announcements }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredAnnouncements = announcements.filter(ann => {
        const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              ann.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || ann.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.4s ease" }}>
            <div className="page-header" style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: "0 0 8px 0" }}>School Announcements</h1>
                <p style={{ fontSize: "16px", color: "#64748b", margin: 0 }}>Stay informed with the latest updates and notices across all categories.</p>
            </div>

            {/* Filter controls */}
            <div className="content-card" style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center", justifyContent: "space-between" }}>
                <input 
                    type="text" 
                    placeholder="Search announcements..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        width: "300px",
                        outline: "none",
                        transition: "border-color 0.2s"
                    }}
                />
                
                <div style={{ display: "flex", gap: "10px" }}>
                    {["All", "Academic", "Sports", "General"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "20px",
                                border: selectedCategory === cat ? "none" : "1px solid #cbd5e1",
                                backgroundColor: selectedCategory === cat ? "#2b55cc" : "white",
                                color: selectedCategory === cat ? "white" : "#64748b",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Announcements Grid */}
            {filteredAnnouncements.length === 0 ? (
                <div className="content-card" style={{ padding: "40px", textAlign: "center" }}>
                    <p style={{ color: "#94a3b8", fontSize: "15px" }}>No announcements found matching the filter criteria.</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                    {filteredAnnouncements.map((ann) => (
                        <div key={ann.id} className="content-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                    <span style={{
                                        padding: "4px 8px",
                                        fontSize: "11px",
                                        fontWeight: "600",
                                        borderRadius: "4px",
                                        backgroundColor: ann.category === "Academic" ? "#dbeafe" : ann.category === "Sports" ? "#fef3c7" : "#e2e8f0",
                                        color: ann.category === "Academic" ? "#1e40af" : ann.category === "Sports" ? "#d97706" : "#475569",
                                        textTransform: "uppercase"
                                    }}>{ann.category || "General"}</span>
                                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>Audience: {ann.targetAudience || "All"}</span>
                                </div>
                                <h3 style={{ margin: "0 0 10px 0", fontSize: "17px", color: "#1e293b", fontWeight: "700" }}>{ann.title}</h3>
                                <p style={{ margin: 0, fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>{ann.content}</p>
                            </div>
                            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
                                <span>Published</span>
                                <span>📅 {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
