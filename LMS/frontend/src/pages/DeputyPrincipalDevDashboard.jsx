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
    Plus,
    Award
} from "lucide-react";
import "./Dashboard.css";
import "../layouts/AdminLayout.css";
import schoolLogo from "../assets/school-logo.jpeg";
import DeputyPrincipalReport from "./DeputyPrincipalReport";
import DeputyPrincipalDevClassManagement from "./DeputyPrincipalDevClassManagement";

export default function DeputyPrincipalDevDashboard() {
    const navigate = useNavigate();
    const [subRole, setSubRole] = useState("Deputy Principal (Development)");
    const [username, setUsername] = useState("DevPrincipal");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [academicYear, setAcademicYear] = useState("2026");
    const [term, setTerm] = useState("Term 1");
    const [examConfigMessage, setExamConfigMessage] = useState({ text: "", type: "" });
    const [subjectsList, setSubjectsList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState("");
    const [deletionReason, setDeletionReason] = useState("");
    const [deletionError, setDeletionError] = useState("");
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        totalSubjects: 0,
        recentActivities: []
    });

    const loadSubjects = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/curriculum-subjects`);
            if (res.ok) setSubjectsList(await res.json());
        } catch (err) {
            console.error("Failed to load curriculum subjects", err);
        }
    };

    useEffect(() => {
        const storedSubRole = localStorage.getItem("subRole");
        const storedUsername = localStorage.getItem("username");
        if (storedSubRole) setSubRole(storedSubRole);
        if (storedUsername) setUsername(storedUsername);

        const token = localStorage.getItem("token");
        if (token) {
            fetchStats(token);
        }
        fetchExamSettings();
        loadSubjects();
    }, []);

    const fetchExamSettings = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/config/active-exam-settings`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.academicYear) setAcademicYear(data.academicYear);
                if (data.term) setTerm(data.term);
            }
        } catch (err) {
            console.error("Failed to fetch exam settings:", err);
        }
    };

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
                        <Layers className="nav-icon" /> Dashboard
                    </div>

                    {/* Examination */}
                    <div className={`nav-item ${activeTab === "examination" ? "active" : ""}`} onClick={() => setActiveTab("examination")}>
                        <Award className="nav-icon" /> Examination
                    </div>

                    {/* Subject */}
                    <div className={`nav-item ${activeTab === "subject" ? "active" : ""}`} onClick={() => setActiveTab("subject")}>
                        <BookOpen className="nav-icon" /> Subject
                    </div>

                    {/* Reports */}
                    <div className={`nav-item ${activeTab === "reports" ? "active" : ""}`} onClick={() => setActiveTab("reports")}>
                        <FileText className="nav-icon" /> Report
                    </div>

                    {/* Class */}
                    <div className={`nav-item ${activeTab === "class" ? "active" : ""}`} onClick={() => setActiveTab("class")}>
                        <Layers className="nav-icon" /> Class
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
                    
                    {/* TAB 1: DASHBOARD */}
                    {activeTab === "dashboard" && (
                        <>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    Deputy Principal (Development) Dashboard
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

                                {/* Right Card: Quick Actions / Development Tasks */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <TrendingUp size={18} style={{ color: "#f59e0b" }} />
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Development Tasks</h3>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        <button
                                            onClick={() => setActiveTab("examination")}
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
                                            <Award size={16} />
                                            <span>Manage System Exams</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("subject")}
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
                                            <BookOpen size={16} />
                                            <span>Manage Master Subjects</span>
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
                                            <TrendingUp size={16} />
                                            <span>View Reports & Analytics</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("class")}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                padding: "14px",
                                                backgroundColor: "#6366f1",
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
                                            <span>Manage School Classes</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* TAB 2: EXAMINATION */}
                    {activeTab === "examination" && (
                        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    System Examination Control
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    Set the active academic year and term test for marks processing across the entire school
                                </p>
                            </div>

                            <div className="content-card" style={{ padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: "white" }}>
                                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", fontSize: "18px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                    Active Academic Term Settings
                                </h3>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    setExamConfigMessage({ text: "", type: "" });

                                    if (!academicYear.match(/^\d{4}$/)) {
                                        setExamConfigMessage({ text: "Academic Year must be a valid 4-digit number!", type: "error" });
                                        return;
                                    }

                                    try {
                                        const token = localStorage.getItem("token");
                                        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/config/active-exam-settings`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`
                                            },
                                            body: JSON.stringify({ academicYear, term })
                                        });
                                        const text = await res.text();
                                        if (res.ok) {
                                            setExamConfigMessage({ text: "System examination settings updated successfully!", type: "success" });
                                        } else {
                                            setExamConfigMessage({ text: text || "Update failed", type: "error" });
                                        }
                                    } catch (err) {
                                        setExamConfigMessage({ text: "Error connecting to server", type: "error" });
                                    }
                                }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <div className="modal-form-group">
                                        <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>Active Academic Year *</label>
                                        <select
                                            value={academicYear}
                                            onChange={(e) => setAcademicYear(e.target.value)}
                                            required
                                            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}
                                        >
                                            {Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="modal-form-group">
                                        <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>Active Term Test *</label>
                                        <select
                                            value={term}
                                            onChange={(e) => setTerm(e.target.value)}
                                            required
                                            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}
                                        >
                                            <option value="Term 1">Term 1</option>
                                            <option value="Term 2">Term 2</option>
                                            <option value="Term 3">Term 3</option>
                                        </select>
                                    </div>

                                    {examConfigMessage.text && (
                                        <div className={`inline-form-message ${examConfigMessage.type}`}>
                                            {examConfigMessage.text}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        style={{
                                            padding: "14px",
                                            backgroundColor: "#f59e0b",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontWeight: "600",
                                            fontSize: "15px",
                                            cursor: "pointer",
                                            marginTop: "10px"
                                        }}
                                    >
                                        Save Configuration Settings
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* TAB: SUBJECT MANAGEMENT */}
                    {activeTab === "subject" && (
                        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    Curriculum Subject Management
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    Create and configure master subjects available in the teacher registration module
                                </p>
                            </div>

                            {/* Toast / Message */}
                            {examConfigMessage.text && (
                                <div className={`inline-form-message ${examConfigMessage.type}`} style={{ marginBottom: "20px" }}>
                                    {examConfigMessage.text}
                                </div>
                            )}

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "30px", alignItems: "start" }}>
                                
                                {/* ADD SUBJECT CARD */}
                                <div className="content-card" style={{ padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.01)" }}>
                                    <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", fontSize: "16px", fontWeight: "700", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        Add New Subject
                                    </h3>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        const subjectInput = e.target.elements.subjectName.value.trim();
                                        if (!subjectInput) return;

                                        setExamConfigMessage({ text: "", type: "" });
                                        const duplicateExists = subjectsList.some(
                                            (sub) => sub.toLowerCase() === subjectInput.toLowerCase()
                                        );
                                        if (duplicateExists) {
                                            setExamConfigMessage({ text: "Subject already exists", type: "error" });
                                            return;
                                        }
                                        try {
                                            const token = localStorage.getItem("token");
                                            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/curriculum-subjects`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: `Bearer ${token}`
                                                },
                                                body: JSON.stringify({ subjectName: subjectInput })
                                            });
                                            const data = await res.json();
                                            if (res.ok) {
                                                setExamConfigMessage({ text: "Subject created successfully!", type: "success" });
                                                e.target.reset();
                                                loadSubjects();
                                            } else {
                                                setExamConfigMessage({ text: data.error || "Failed to create subject", type: "error" });
                                            }
                                        } catch (err) {
                                            setExamConfigMessage({ text: "Failed to connect to server", type: "error" });
                                        }
                                    }}>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>
                                                Subject Name
                                            </label>
                                            <input
                                                name="subjectName"
                                                type="text"
                                                placeholder="e.g. History, Buddhism"
                                                required
                                                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                backgroundColor: "#f59e0b",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontWeight: "600",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Add Subject
                                        </button>
                                    </form>
                                </div>

                                {/* ACTIVE SUBJECTS CARD */}
                                <div className="content-card" style={{ padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.01)" }}>
                                    <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", fontSize: "16px", fontWeight: "700", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        Current Subjects
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "350px", overflowY: "auto" }}>
                                        {subjectsList.length === 0 ? (
                                            <p style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic", textAlign: "center", margin: "20px 0" }}>No subjects defined.</p>
                                        ) : (
                                            subjectsList.map((sub) => (
                                                <div
                                                    key={sub}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        padding: "10px 14px",
                                                        backgroundColor: "#f8fafc",
                                                        border: "1px solid #e2e8f0",
                                                        borderRadius: "8px",
                                                        fontSize: "14px",
                                                        color: "#334155"
                                                    }}
                                                >
                                                    <span style={{ fontWeight: "500" }}>{sub}</span>
                                                    <button
                                                        onClick={() => {
                                                            setSubjectToDelete(sub);
                                                            setDeletionReason("");
                                                            setDeletionError("");
                                                            setShowDeleteModal(true);
                                                        }}
                                                        style={{
                                                            background: "none",
                                                            border: "none",
                                                            color: "#ef4444",
                                                            fontWeight: "600",
                                                            cursor: "pointer",
                                                            fontSize: "13px"
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* TAB 3: REPORT */}
                    {activeTab === "reports" && <DeputyPrincipalReport />}

                    {/* TAB 4: CLASS */}
                    {activeTab === "class" && <DeputyPrincipalDevClassManagement />}
                </div>
            </div>

            {/* Soft Delete Custom Modal */}
            {showDeleteModal && (
                <div style={{ 
                    position: "fixed", 
                    inset: 0, 
                    backgroundColor: "rgba(15, 23, 42, 0.4)", 
                    backdropFilter: "blur(4px)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    zIndex: 9999 
                }}>
                    <div style={{ 
                        backgroundColor: "white", 
                        padding: "32px", 
                        borderRadius: "16px", 
                        width: "480px", 
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        <h2 style={{ 
                            color: "#ef4444", 
                            fontSize: "24px", 
                            fontWeight: "700", 
                            margin: "0 0 16px 0" 
                        }}>
                            Confirm Soft Deletion
                        </h2>
                        
                        <p style={{ 
                            color: "#334155", 
                            fontSize: "14.5px", 
                            lineHeight: "1.6", 
                            margin: "0 0 20px 0" 
                        }}>
                            Are you sure you want to deactivate the curriculum subject <strong>{subjectToDelete}</strong>? This action soft deletes their record from all active service listings.
                        </p>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ 
                                display: "block", 
                                fontSize: "14px", 
                                fontWeight: "600", 
                                color: "#1e293b", 
                                marginBottom: "8px" 
                            }}>
                                Reason for Deactivation *
                            </label>
                            <textarea
                                value={deletionReason}
                                onChange={(e) => {
                                    setDeletionReason(e.target.value);
                                    if (e.target.value.trim().length >= 5) {
                                        setDeletionError("");
                                    }
                                }}
                                placeholder="Enter reason (at least 5 characters)..."
                                style={{ 
                                    width: "100%", 
                                    height: "90px", 
                                    padding: "12px", 
                                    borderRadius: "8px", 
                                    border: "1px solid #cbd5e1", 
                                    resize: "none", 
                                    fontSize: "14px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                            {deletionError && (
                                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0 0", fontWeight: "500" }}>
                                    {deletionError}
                                </p>
                            )}
                        </div>

                        <div style={{ 
                            display: "flex", 
                            justifyContent: "flex-end", 
                            gap: "12px" 
                        }}>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                style={{ 
                                    padding: "10px 20px", 
                                    backgroundColor: "white", 
                                    border: "1px solid #cbd5e1", 
                                    borderRadius: "8px", 
                                    color: "#1e293b", 
                                    fontSize: "14px", 
                                    fontWeight: "600", 
                                    cursor: "pointer" 
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (deletionReason.trim().length < 5) {
                                        setDeletionError("Please enter a reason with at least 5 characters.");
                                        return;
                                    }
                                    
                                    setShowDeleteModal(false);
                                    setExamConfigMessage({ text: "", type: "" });
                                    try {
                                        const token = localStorage.getItem("token");
                                        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/curriculum-subjects/${subjectToDelete}?deletionNote=${encodeURIComponent(deletionReason.trim())}`, {
                                            method: "DELETE",
                                            headers: { Authorization: `Bearer ${token}` }
                                        });
                                        if (res.ok) {
                                            setExamConfigMessage({ text: "Subject deleted successfully", type: "success" });
                                            loadSubjects();
                                        } else {
                                            setExamConfigMessage({ text: "Failed to delete subject", type: "error" });
                                        }
                                    } catch {
                                        setExamConfigMessage({ text: "Server connection failed", type: "error" });
                                    }
                                }}
                                style={{ 
                                    padding: "10px 20px", 
                                    backgroundColor: "#ef4444", 
                                    border: "none", 
                                    borderRadius: "8px", 
                                    color: "white", 
                                    fontSize: "14px", 
                                    fontWeight: "600", 
                                    cursor: "pointer" 
                                }}
                            >
                                Soft Delete Subject
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
