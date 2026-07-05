import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    UserCheck,
    LogOut,
    PlusCircle,
    CheckCircle,
    FileSpreadsheet,
    Bell,
    TrendingUp,
    FileText
} from "lucide-react";
import "./Dashboard.css";
import "../layouts/AdminLayout.css";
import "./SectionHeadDashboard.css";
import schoolLogo from "../assets/school-logo.jpeg";
import SectionHeadClassManagement from "./SectionHeadClassManagement";
import SectionHeadReport from "./SectionHeadReport";

export default function SectionHeadDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [subRole, setSubRole] = useState("Section Head Grade 6");
    const [username, setUsername] = useState("Section Head");
    const [toast, setToast] = useState("");
    const [loading, setLoading] = useState(false);
    const [sectionClasses, setSectionClasses] = useState([]);
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0
    });

    useEffect(() => {
        const storedSubRole = localStorage.getItem("subRole");
        const storedUsername = localStorage.getItem("username");
        if (storedSubRole) setSubRole(storedSubRole);
        if (storedUsername) setUsername(storedUsername);
    }, []);

    // Extract grade from subRole (e.g. "Section Head Grade 8" -> "8")
    const gradeNumber = subRole ? subRole.replace("Section Head Grade ", "").trim() : "";

    useEffect(() => {
        if (!gradeNumber) return;
        const loadSectionData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/classes`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const all = await res.json();
                    const filtered = all.filter(c => String(c.grade) === String(gradeNumber));
                    setSectionClasses(filtered);
                    
                    const studentCountSum = filtered.reduce((sum, c) => sum + (c.studentCount || 0), 0);
                    const uniqueTeachers = new Set(filtered.map(c => c.teacherId).filter(Boolean)).size;
                    
                    setStats({
                        totalStudents: studentCountSum,
                        totalTeachers: uniqueTeachers,
                        totalClasses: filtered.length
                    });
                }
            } catch (err) {
                console.error("Failed to load section classes", err);
            } finally {
                setLoading(false);
            }
        };
        loadSectionData();
    }, [gradeNumber]);

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

                    {/* Section Report */}
                    <div className={`nav-item ${activeTab === "reports" ? "active" : ""}`} onClick={() => setActiveTab("reports")}>
                        <FileText className="nav-icon" /> Section Report
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
                        <div className="user-avatar" style={{ backgroundColor: "#f59e0b" }}>
                            {username ? username.substring(0, 2).toUpperCase() : "SH"}
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT AREA */}
                <div className="dashboard-content">
                    {activeTab === "dashboard" && (
                        <>
                            {/* Center aligned title */}
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>Section Head Dashboard</h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>Welcome back! Here's what's happening today in Grade {gradeNumber}.</p>
                            </div>

                            {/* STATS ROW */}
                            <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "30px" }}>
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
                                        <h3>{stats.totalTeachers}</h3>
                                    </div>
                                    <div className="stat-icon yellow"><UserCheck size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Total Classes</p>
                                        <h3>{stats.totalClasses}</h3>
                                    </div>
                                    <div className="stat-icon green"><FileSpreadsheet size={20} /></div>
                                </div>
                            </div>

                            {/* BOTTOM GRID */}
                            <div className="content-grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "25px" }}>
                                {/* Left Card: Classes Table */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <FileSpreadsheet size={18} style={{ color: "#3b82f6" }} />
                                            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Classes Under Your Section</h3>
                                        </div>
                                        <span className="classes-count-pill" style={{
                                            padding: "4px 10px",
                                            backgroundColor: "#f8fafc",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "#64748b"
                                        }}>{sectionClasses.length} Classes</span>
                                    </div>
                                    <div className="table-responsive">
                                        {loading ? (
                                            <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>Loading classes...</p>
                                        ) : sectionClasses.length === 0 ? (
                                            <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>No classes assigned to this section yet.</p>
                                        ) : (
                                            <table className="sh-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>Class Name</th>
                                                        <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>Class Teacher</th>
                                                        <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>Total Students</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sectionClasses.map((cls, index) => (
                                                        <tr key={index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                                            <td style={{ padding: "16px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{cls.className}</td>
                                                            <td style={{ padding: "16px", fontSize: "14px", color: "#475569" }}>{cls.teacherName || "Not Assigned"}</td>
                                                            <td style={{ padding: "16px", fontSize: "14px", color: "#475569" }}>{cls.studentCount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>

                                {/* Right Card: Quick Actions */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <TrendingUp size={18} style={{ color: "#f59e0b" }} />
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Quick Actions</h3>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        <button
                                            onClick={() => setActiveTab("classes")}
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
                                            <FileSpreadsheet size={16} />
                                            <span>Manage Section Classes</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("reports")}
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
                                            <FileText size={16} />
                                            <span>View Section Reports</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "classes" && <SectionHeadClassManagement />}
                    {activeTab === "reports" && <SectionHeadReport />}
                </div>
            </div>

            {/* Notification Toast */}
            {toast && (
                <div className="toast-notification">
                    <CheckCircle size={18} />
                    <span>{toast}</span>
                </div>
            )}
        </div>
    );
}
