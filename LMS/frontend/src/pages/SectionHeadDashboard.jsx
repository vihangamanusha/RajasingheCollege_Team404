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
import AdminClassManagement from "./AdminClassManagement";
import AdminAcademicAnalytics from "./AdminAcademicAnalytics";

export default function SectionHeadDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [subRole, setSubRole] = useState("Section Head Grade 6");
    const [username, setUsername] = useState("Section Head");
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: "Mid-Term Exam Scheduling", date: "2026-07-02", target: "All Classes" },
        { id: 2, title: "Parent-Teacher Association Meeting", date: "2026-07-05", target: "Parents" },
    ]);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: "", target: "All Classes" });
    const [toast, setToast] = useState("");

    useEffect(() => {
        const storedSubRole = localStorage.getItem("subRole");
        const storedUsername = localStorage.getItem("username");
        if (storedSubRole) setSubRole(storedSubRole);
        if (storedUsername) setUsername(storedUsername);
    }, []);

    // Extract grade from subRole (e.g. "Section Head Grade 8" -> "Grade 8")
    const gradeLabel = subRole ? subRole.replace("Section Head ", "") : "Grade Section";

    // Mock data based on selected Grade Section
    const getGradeSpecificData = () => {
        switch (gradeLabel.toLowerCase()) {
            case "grade 6":
                return {
                    classes: [
                        { name: "Grade 6A", teacher: "Mr. Ranjith Perera", students: 42, avgMark: 74 },
                        { name: "Grade 6B", teacher: "Mrs. K. Silva", students: 40, avgMark: 71 },
                        { name: "Grade 6C", teacher: "Miss N. Fernando", students: 38, avgMark: 68 },
                    ],
                    totalStudents: 120,
                    avgPerf: "71.2%",
                    teachersCount: 3,
                };
            case "grade 7":
                return {
                    classes: [
                        { name: "Grade 7A", teacher: "Mrs. A. Jayasekara", students: 45, avgMark: 78 },
                        { name: "Grade 7B", teacher: "Mr. T. Alwis", students: 43, avgMark: 75 },
                    ],
                    totalStudents: 88,
                    avgPerf: "76.5%",
                    teachersCount: 2,
                };
            case "grade 8":
                return {
                    classes: [
                        { name: "Grade 8A", teacher: "Miss P. de Silva", students: 39, avgMark: 65 },
                        { name: "Grade 8B", teacher: "Mr. S. Kumara", students: 41, avgMark: 63 },
                        { name: "Grade 8C", teacher: "Mrs. D. Wickramasinghe", students: 40, avgMark: 70 },
                    ],
                    totalStudents: 120,
                    avgPerf: "66.0%",
                    teachersCount: 3,
                };
            case "grade 9":
                return {
                    classes: [
                        { name: "Grade 9A", teacher: "Mrs. V. Perera", students: 44, avgMark: 81 },
                        { name: "Grade 9B", teacher: "Mr. M. Fernando", students: 43, avgMark: 78 },
                    ],
                    totalStudents: 87,
                    avgPerf: "79.5%",
                    teachersCount: 2,
                };
            case "grade 10":
                return {
                    classes: [
                        { name: "Grade 10A", teacher: "Mr. Nimal Silva", students: 42, avgMark: 67 },
                        { name: "Grade 10B", teacher: "Mrs. C. Rajapakse", students: 38, avgMark: 70 },
                        { name: "Grade 10C", teacher: "Mr. H. Herath", students: 40, avgMark: 64 },
                    ],
                    totalStudents: 120,
                    avgPerf: "67.0%",
                    teachersCount: 3,
                };
            case "grade 11":
                return {
                    classes: [
                        { name: "Grade 11A", teacher: "Mr. J. K. Perera", students: 40, avgMark: 83 },
                        { name: "Grade 11B", teacher: "Mrs. L. Siriwardene", students: 39, avgMark: 85 },
                        { name: "Grade 11C", teacher: "Miss T. Jayasinghe", students: 41, avgMark: 79 },
                    ],
                    totalStudents: 120,
                    avgPerf: "82.3%",
                    teachersCount: 3,
                };
            default:
                return {
                    classes: [
                        { name: "Class A", teacher: "Mr. P. Silva", students: 40, avgMark: 70 },
                        { name: "Class B", teacher: "Mrs. M. Perera", students: 40, avgMark: 72 },
                    ],
                    totalStudents: 80,
                    avgPerf: "71.0%",
                    teachersCount: 2,
                };
        }
    };

    const sectionData = getGradeSpecificData();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleCreateAnnouncement = (e) => {
        e.preventDefault();
        if (!newAnnouncement.title) return;
        const newAnn = {
            id: announcements.length + 1,
            title: newAnnouncement.title,
            date: new Date().toISOString().split("T")[0],
            target: newAnnouncement.target
        };
        setAnnouncements([newAnn, ...announcements]);
        setNewAnnouncement({ title: "", target: "All Classes" });
        setToast("Announcement published successfully!");
        setTimeout(() => setToast(""), 3000);
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
                                <p style={{ fontSize: "16px", color: "#64748b" }}>Welcome back! Here's what's happening today in {gradeLabel}.</p>
                            </div>

                            {/* STATS ROW */}
                            <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "30px" }}>
                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Total Students</p>
                                        <h3>{sectionData.totalStudents.toLocaleString()}</h3>
                                    </div>
                                    <div className="stat-icon blue"><Users size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Class Teachers</p>
                                        <h3>{sectionData.teachersCount}</h3>
                                    </div>
                                    <div className="stat-icon yellow"><UserCheck size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Average Performance</p>
                                        <h3>{sectionData.avgPerf}</h3>
                                    </div>
                                    <div className="stat-icon green"><TrendingUp size={20} /></div>
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
                                        }}>{sectionData.classes.length} Classes</span>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="sh-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>Class Name</th>
                                                    <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>Class Teacher</th>
                                                    <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>Total Students</th>
                                                    <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>Average Term Mark</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sectionData.classes.map((cls, index) => (
                                                    <tr key={index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                                        <td style={{ padding: "16px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{cls.name}</td>
                                                        <td style={{ padding: "16px", fontSize: "14px", color: "#475569" }}>{cls.teacher}</td>
                                                        <td style={{ padding: "16px", fontSize: "14px", color: "#475569" }}>{cls.students}</td>
                                                        <td style={{ padding: "16px", fontSize: "14px", fontWeight: "600", color: cls.avgMark >= 70 ? "#10b981" : "#f59e0b" }}>{cls.avgMark}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Right Card: Announcements Panel */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <Bell size={18} style={{ color: "#f59e0b" }} />
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Publish Announcement</h3>
                                    </div>
                                    <form onSubmit={handleCreateAnnouncement} style={{ marginBottom: "20px" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                            <input
                                                type="text"
                                                placeholder="Type your announcement..."
                                                value={newAnnouncement.title}
                                                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                                required
                                                style={{
                                                    padding: "10px 14px",
                                                    border: "1px solid #e2e8f0",
                                                    borderRadius: "8px",
                                                    fontSize: "14px",
                                                    outline: "none"
                                                }}
                                            />
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <select
                                                    value={newAnnouncement.target}
                                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: e.target.value })}
                                                    style={{
                                                        flex: 1,
                                                        padding: "10px 14px",
                                                        border: "1px solid #e2e8f0",
                                                        borderRadius: "8px",
                                                        fontSize: "14px",
                                                        backgroundColor: "white",
                                                        outline: "none"
                                                    }}
                                                >
                                                    <option value="All Classes">All Classes</option>
                                                    <option value="Teachers Only">Teachers Only</option>
                                                    <option value="Students Only">Students Only</option>
                                                </select>
                                                <button type="submit" className="publish-btn" style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "6px",
                                                    padding: "10px 16px",
                                                    backgroundColor: "#0f172a",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    cursor: "pointer"
                                                }}>
                                                    <PlusCircle size={16} />
                                                    <span>Publish</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="announcements-list" style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "280px", overflowY: "auto" }}>
                                        {announcements.map((ann) => (
                                            <div key={ann.id} className="announcement-item" style={{
                                                backgroundColor: "#f8fafc",
                                                borderLeft: "4px solid #f59e0b",
                                                padding: "14px",
                                                borderRadius: "0 8px 8px 0"
                                            }}>
                                                <div className="ann-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                                    <span className="ann-date" style={{ fontSize: "11px", color: "#94a3b8" }}>{ann.date}</span>
                                                    <span className="ann-target" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#f59e0b" }}>{ann.target}</span>
                                                </div>
                                                <p className="ann-title" style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{ann.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "classes" && <AdminClassManagement />}
                    {activeTab === "reports" && <AdminAcademicAnalytics />}
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
