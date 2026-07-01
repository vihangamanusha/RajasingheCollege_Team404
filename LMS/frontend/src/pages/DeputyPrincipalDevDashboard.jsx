import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    UserCheck,
    LogOut,
    CheckCircle,
    FileSpreadsheet,
    Bell,
    TrendingUp,
    BookOpen,
    Layers,
    FileText,
    Activity,
    Wrench,
    Plus
} from "lucide-react";
import "./Dashboard.css";
import "../layouts/AdminLayout.css";
import schoolLogo from "../assets/school-logo.jpeg";

export default function DeputyPrincipalDevDashboard() {
    const navigate = useNavigate();
    const [subRole, setSubRole] = useState("Deputy Principal (Development)");
    const [username, setUsername] = useState("DevPrincipal");
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        totalSubjects: 0
    });

    // Mock projects for the infrastructure management view
    const [projects, setProjects] = useState([
        { id: 1, name: "Smart Classroom Setup (Block B)", progress: "80%", status: "In Progress", category: "Technology" },
        { id: 2, name: "Science Laboratory Renovation", progress: "40%", status: "In Progress", category: "Infrastructure" },
        { id: 3, name: "New Library Books Acquisition", progress: "100%", status: "Completed", category: "Academics" },
        { id: 4, name: "Main Playground Drainage Upgrade", progress: "10%", status: "Planning", category: "Sports" }
    ]);

    const [projectName, setProjectName] = useState("");
    const [projectCategory, setProjectCategory] = useState("Infrastructure");

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
            const response = await fetch("http://localhost:8080/admin/dashboard/stats", {
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

    const handleCreateProject = (e) => {
        e.preventDefault();
        if (!projectName.trim()) return;

        const newProj = {
            id: Date.now(),
            name: projectName,
            progress: "0%",
            status: "Planning",
            category: projectCategory
        };
        setProjects([newProj, ...projects]);
        setProjectName("");
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
                    <div className="nav-item active">
                        <Layers className="nav-icon" /> Dashboard
                    </div>

                    {/* Infrastructure Projects */}
                    <div className="nav-item" onClick={() => navigate("/admin/announcements")}>
                        <Bell className="nav-icon" /> Announcements
                    </div>

                    {/* Reports */}
                    <div className="nav-item" onClick={() => navigate("/admin/analytics")}>
                        <FileText className="nav-icon" /> Dev Reports
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
                        <div className="user-avatar" style={{ backgroundColor: "#f59e0b", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                            {username ? username.substring(0, 2).toUpperCase() : "DP"}
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT AREA */}
                <div className="dashboard-content" style={{ padding: "30px" }}>
                    <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                            Deputy Principal (Development) Dashboard
                        </h1>
                        <p style={{ fontSize: "16px", color: "#64748b" }}>
                            Manage school resources, infrastructure projects, and strategic development
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
                                <p>Active Projects</p>
                                <h3>{projects.filter(p => p.status === "In Progress").length}</h3>
                            </div>
                            <div className="stat-icon green"><Wrench size={20} /></div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-info">
                                <p>Development Grants</p>
                                <h3>Rs. 4.8M</h3>
                            </div>
                            <div className="stat-icon purple"><Layers size={20} /></div>
                        </div>
                    </div>

                    {/* BOTTOM GRID */}
                    <div className="content-grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "25px" }}>
                        {/* Left Card: Projects Status */}
                        <div className="content-card">
                            <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                <Activity size={18} style={{ color: "#3b82f6" }} />
                                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Infrastructure & Resource Projects</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                {projects.map((proj) => (
                                    <div key={proj.id} style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                            <h4 style={{ margin: 0, fontSize: "15px", color: "#1e293b", fontWeight: "600" }}>{proj.name}</h4>
                                            <span className={`badge ${proj.status === "Completed" ? "active" : "pending"}`} style={{ fontSize: "11px" }}>{proj.status}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                            <div style={{ flex: 1, height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                                                <div style={{ width: proj.progress, height: "100%", backgroundColor: proj.status === "Completed" ? "#10b981" : "#3b82f6" }}></div>
                                            </div>
                                            <span style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>{proj.progress}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Card: Proposals Form */}
                        <div className="content-card">
                            <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                <TrendingUp size={18} style={{ color: "#f59e0b" }} />
                                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>New Project Proposal</h3>
                            </div>
                            <form onSubmit={handleCreateProject} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                <div className="modal-form-group">
                                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Auditorium Audio Setup"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        required
                                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Category</label>
                                    <select
                                        value={projectCategory}
                                        onChange={(e) => setProjectCategory(e.target.value)}
                                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                    >
                                        <option>Infrastructure</option>
                                        <option>Technology</option>
                                        <option>Academics</option>
                                        <option>Sports</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
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
                                        cursor: "pointer"
                                    }}
                                >
                                    <Plus size={16} />
                                    <span>Submit Proposal</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
