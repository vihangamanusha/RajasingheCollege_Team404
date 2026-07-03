import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    Users,
    BookOpen,
    LayoutDashboard,
    Upload,
    FileText,
    LogOut,
    Plus,
    Activity,
    FolderPlus,
    Award,
    CheckCircle,
    Calendar,
    Briefcase
} from "lucide-react";
import "./Dashboard.css";
import "../layouts/AdminLayout.css";
import schoolLogo from "../assets/school-logo.jpeg";
import TeacherAddMarks from "../Component/TeacherAddMarks";

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("Teacher");
    const [subRole, setSubRole] = useState("Subject Teacher");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [assignedSubjects, setAssignedSubjects] = useState([]);

    // Local state for materials upload mock
    const [materials, setMaterials] = useState([
        { id: 1, title: "Algebra Lesson 1 Notes.pdf", subject: "Mathematics", grade: "Grade 10", uploadedDate: "2026-06-28" },
        { id: 2, title: "Quadratic Equations Worksheet.docx", subject: "Mathematics", grade: "Grade 10", uploadedDate: "2026-06-23" },
        { id: 3, title: "Probability Basics Slides.pptx", subject: "Mathematics", grade: "Grade 11", uploadedDate: "2026-06-15" }
    ]);
    const [materialTitle, setMaterialTitle] = useState("");
    const [materialSubject, setMaterialSubject] = useState("Mathematics");
    const [materialGrade, setMaterialGrade] = useState("Grade 10");

    // Local state for assignments mock
    const [assignments, setAssignments] = useState([
        { id: 1, title: "Mathematics Midterm Assignment", dueDate: "2026-07-15", maxMarks: 100, subject: "Mathematics", submissions: "35/42" },
        { id: 2, title: "Trigonometry Homework Quiz", dueDate: "2026-07-02", maxMarks: 20, subject: "Mathematics", submissions: "12/40" }
    ]);
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentDueDate, setAssignmentDueDate] = useState("");
    const [assignmentMaxMarks, setAssignmentMaxMarks] = useState("100");
    const [assignmentSubject, setAssignmentSubject] = useState("Mathematics");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedSubRole = localStorage.getItem("subRole");
        if (storedSubRole) setSubRole(storedSubRole);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userVal = decoded.sub || "Teacher";
                setUsername(userVal);
                fetchTeacherProfile(token, userVal);
            } catch (error) {
                console.error("Failed to decode token", error);
            }
        }
    }, []);

    const fetchTeacherProfile = async (token, userVal) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/users/teacher/${userVal}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.subjectSpecialization) {
                    const subjectsArray = data.subjectSpecialization.split(",").map(s => s.trim()).filter(Boolean);
                    setAssignedSubjects(subjectsArray);
                }
            }
        } catch (error) {
            console.error("Failed to fetch teacher profile details", error);
        }
    };

    const getSubjectDetails = (subjectName) => {
        switch (subjectName.trim()) {
            case "Mathematics":
                return { classesCount: "2 Classes", totalStudents: 9, classes: ["10-A", "11-B"] };
            case "Science":
                return { classesCount: "1 Classes", totalStudents: 3, classes: ["9-C"] };
            case "ICT":
                return { classesCount: "2 Classes", totalStudents: 5, classes: ["10-A", "11-B"] };
            case "English":
                return { classesCount: "2 Classes", totalStudents: 12, classes: ["10-A", "10-B"] };
            case "Sinhala":
                return { classesCount: "1 Classes", totalStudents: 8, classes: ["9-A"] };
            case "Geography":
                return { classesCount: "1 Classes", totalStudents: 6, classes: ["10-B"] };
            case "History":
                return { classesCount: "1 Classes", totalStudents: 15, classes: ["11-A"] };
            default:
                return { classesCount: "1 Classes", totalStudents: 10, classes: ["10-A"] };
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleUploadMaterial = (e) => {
        e.preventDefault();
        if (!materialTitle.trim()) return;

        const newMaterial = {
            id: Date.now(),
            title: materialTitle,
            subject: materialSubject,
            grade: materialGrade,
            uploadedDate: new Date().toISOString().split("T")[0]
        };
        setMaterials([newMaterial, ...materials]);
        setMaterialTitle("");
    };

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        if (!assignmentTitle.trim() || !assignmentDueDate) return;

        const newAssignment = {
            id: Date.now(),
            title: assignmentTitle,
            dueDate: assignmentDueDate,
            maxMarks: parseInt(assignmentMaxMarks),
            subject: assignmentSubject,
            submissions: "0/40"
        };
        setAssignments([newAssignment, ...assignments]);
        setAssignmentTitle("");
        setAssignmentDueDate("");
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
                    <div
                        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <LayoutDashboard className="nav-icon" /> Dashboard
                    </div>

                    {/* My Subject */}
                    <div
                        className={`nav-item ${activeTab === "my-subject" ? "active" : ""}`}
                        onClick={() => setActiveTab("my-subject")}
                    >
                        <BookOpen className="nav-icon" /> My Subject
                    </div>

                    {/* My Class */}
                    <div
                        className={`nav-item ${activeTab === "my-class" ? "active" : ""}`}
                        onClick={() => setActiveTab("my-class")}
                    >
                        <Users className="nav-icon" /> My Class
                    </div>

                    {/* Upload Mark */}
                    <div
                        className={`nav-item ${activeTab === "upload-mark" ? "active" : ""}`}
                        onClick={() => setActiveTab("upload-mark")}
                    >
                        <Upload className="nav-icon" /> Upload Mark
                    </div>

                    {/* Materials */}
                    <div
                        className={`nav-item ${activeTab === "materials" ? "active" : ""}`}
                        onClick={() => setActiveTab("materials")}
                    >
                        <FileText className="nav-icon" /> Materials
                    </div>

                    {/* Assignments */}
                    <div
                        className={`nav-item ${activeTab === "assignments" ? "active" : ""}`}
                        onClick={() => setActiveTab("assignments")}
                    >
                        <Briefcase className="nav-icon" /> Assignments
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
                        <div className="user-avatar" style={{ backgroundColor: "#2b55cc", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                            {username ? username.substring(0, 2).toUpperCase() : "TE"}
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT AREA */}
                <div className="dashboard-content" style={{ padding: "30px" }}>
                    
                    {/* TAB 1: DASHBOARD OVERVIEW */}
                    {activeTab === "dashboard" && (
                        <>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    Teacher Dashboard
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    Welcome back! Here's what's happening today.
                                </p>
                            </div>

                            {/* STATS ROW */}
                            <div className="stats-row" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "30px" }}>
                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Total Students</p>
                                        <h3>{assignedSubjects.reduce((acc, sub) => acc + getSubjectDetails(sub).totalStudents, 0)}</h3>
                                    </div>
                                    <div className="stat-icon blue"><Users size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Classes Assigned</p>
                                        <h3>{assignedSubjects.reduce((acc, sub) => acc + getSubjectDetails(sub).classes.length, 0)}</h3>
                                    </div>
                                    <div className="stat-icon yellow"><BookOpen size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Uploaded Materials</p>
                                        <h3>{materials.length}</h3>
                                    </div>
                                    <div className="stat-icon green"><FileText size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Pending Assignments</p>
                                        <h3>{assignments.length}</h3>
                                    </div>
                                    <div className="stat-icon purple"><Briefcase size={20} /></div>
                                </div>
                            </div>

                            {/* BOTTOM GRID */}
                            <div className="content-grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "25px" }}>
                                {/* Left Card: Subject & Class Allocations */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <Activity size={18} style={{ color: "#3b82f6" }} />
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Your Allocations</h3>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                        {assignedSubjects && assignedSubjects.length > 0 ? (
                                            assignedSubjects.map((sub, index) => {
                                                const details = getSubjectDetails(sub);
                                                return (
                                                    <div key={index} style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", borderLeft: index % 2 === 0 ? "4px solid #3b82f6" : "4px solid #f59e0b" }}>
                                                        <h4 style={{ margin: "0 0 5px 0", fontSize: "15px", color: "#1e293b", fontWeight: "600" }}>{sub}</h4>
                                                        <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                                                            {details.classes.map(c => c.split("-")[0]).filter((v, i, a) => a.indexOf(v) === i).map(g => `Grade ${g}`).join(" & ")} • Class {details.classes.map(c => c.split("-")[1] || c).join(", ")}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p style={{ color: "#94a3b8", fontSize: "14px" }}>No assigned subjects / allocations found.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Right Card: Quick Actions */}
                                <div className="content-card">
                                    <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                        <FolderPlus size={18} style={{ color: "#f59e0b" }} />
                                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Quick Tasks</h3>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        <button
                                            onClick={() => setActiveTab("upload-mark")}
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
                                                cursor: "pointer"
                                            }}
                                        >
                                            <Upload size={16} />
                                            <span>Upload Marks</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("materials")}
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
                                            <FileText size={16} />
                                            <span>Upload Materials</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("assignments")}
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
                                                cursor: "pointer"
                                            }}
                                        >
                                            <Briefcase size={16} />
                                            <span>Manage Assignments</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* TAB 2: MY SUBJECTS */}
                    {activeTab === "my-subject" && (
                        <>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    My Subjects
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    View and manage student marks across all subjects
                                </p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" }}>
                                {assignedSubjects && assignedSubjects.length > 0 ? (
                                    assignedSubjects.map((subject, index) => {
                                        const details = getSubjectDetails(subject);
                                        return (
                                            <div className="content-card" key={index} style={{ padding: "25px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "300px" }}>
                                                <div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                                                        <div style={{ width: "48px", height: "48px", backgroundColor: "#eff6ff", color: "#2b55cc", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <BookOpen size={24} />
                                                        </div>
                                                        <div>
                                                            <h3 style={{ margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" }}>{subject}</h3>
                                                            <span style={{ fontSize: "13px", color: "#94a3b8" }}>{details.classesCount}</span>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                                                        <span style={{ color: "#64748b", fontSize: "14px" }}>Total Students:</span>
                                                        <strong style={{ fontSize: "16px", color: "#1e293b" }}>{details.totalStudents}</strong>
                                                    </div>

                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                                        <span style={{ color: "#64748b", fontSize: "14px" }}>Classes:</span>
                                                        <div style={{ display: "flex", gap: "6px" }}>
                                                            {details.classes.map((cls, i) => (
                                                                <span key={i} style={{ padding: "4px 10px", backgroundColor: "#eff6ff", color: "#2b55cc", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>{cls}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setActiveTab("my-class")}
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px",
                                                        backgroundColor: "#2b55cc",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "8px",
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        cursor: "pointer",
                                                        transition: "background-color 0.2s"
                                                    }}
                                                >
                                                    View Classes
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="content-card" style={{ gridColumn: "span 3", textAlign: "center", padding: "40px" }}>
                                        <p style={{ color: "#94a3b8", fontSize: "16px" }}>No assigned subjects found in your profile.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* TAB 3: MY CLASSES */}
                    {activeTab === "my-class" && (
                        <>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    My Classes
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    View assigned school classes and student enrollment stats
                                </p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                                <div className="content-card">
                                    <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#1e293b" }}>Grade 10 - A</h3>
                                    <p style={{ margin: "0 0 15px 0", fontSize: "13px", color: "#64748b" }}>Medium: English</p>
                                    <div style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: "14px", color: "#64748b" }}>Students enrolled:</span>
                                        <strong style={{ fontSize: "18px", color: "#2b55cc" }}>42</strong>
                                    </div>
                                </div>
                                <div className="content-card">
                                    <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#1e293b" }}>Grade 10 - B</h3>
                                    <p style={{ margin: "0 0 15px 0", fontSize: "13px", color: "#64748b" }}>Medium: Sinhala</p>
                                    <div style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: "14px", color: "#64748b" }}>Students enrolled:</span>
                                        <strong style={{ fontSize: "18px", color: "#2b55cc" }}>38</strong>
                                    </div>
                                </div>
                                <div className="content-card">
                                    <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#1e293b" }}>Grade 11 - A</h3>
                                    <p style={{ margin: "0 0 15px 0", fontSize: "13px", color: "#64748b" }}>Medium: English</p>
                                    <div style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: "14px", color: "#64748b" }}>Students enrolled:</span>
                                        <strong style={{ fontSize: "18px", color: "#2b55cc" }}>40</strong>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* TAB 4: UPLOAD MARKS */}
                    {activeTab === "upload-mark" && (
                        <>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "30px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    Upload Student Marks
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    Input academic grades directly into the student evaluation database
                                </p>
                            </div>
                            <div className="content-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
                                <TeacherAddMarks />
                            </div>
                        </>
                    )}

                    {/* TAB 5: STUDY MATERIALS */}
                    {activeTab === "materials" && (
                        <>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    Study Materials
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    Upload course documents, notes, and textbook slides for student download
                                </p>
                            </div>
                            <div className="content-grid" style={{ gridTemplateColumns: "1fr 2fr", gap: "25px" }}>
                                {/* Left Side: Add Material Form */}
                                <div className="content-card">
                                    <h3 style={{ marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>Upload Material</h3>
                                    <form onSubmit={handleUploadMaterial}>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Material Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Vectors Revision Notes"
                                                value={materialTitle}
                                                onChange={(e) => setMaterialTitle(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Subject</label>
                                            <select
                                                value={materialSubject}
                                                onChange={(e) => setMaterialSubject(e.target.value)}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            >
                                                <option>Mathematics</option>
                                                <option>Science</option>
                                                <option>English</option>
                                            </select>
                                        </div>
                                        <div className="modal-form-group" style={{ marginBottom: "20px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Target Grade</label>
                                            <select
                                                value={materialGrade}
                                                onChange={(e) => setMaterialGrade(e.target.value)}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            >
                                                <option>Grade 10</option>
                                                <option>Grade 11</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="add-btn tech-btn" style={{ width: "100%", justifyContent: "center" }}>
                                            <Plus size={16} style={{ marginRight: "6px" }} /> Upload Document
                                        </button>
                                    </form>
                                </div>

                                {/* Right Side: Material List */}
                                <div className="content-card">
                                    <h3 style={{ marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>Active Study Materials</h3>
                                    <div className="announcements-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                        {materials.map((m) => (
                                            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                                                <div>
                                                    <h4 style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#1e293b" }}>{m.title}</h4>
                                                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{m.subject} • {m.grade}</span>
                                                </div>
                                                <span style={{ fontSize: "12px", color: "#94a3b8" }}>Uploaded: {m.uploadedDate}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* TAB 6: ASSIGNMENTS */}
                    {activeTab === "assignments" && (
                        <>
                            <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                    Student Assignments
                                </h1>
                                <p style={{ fontSize: "16px", color: "#64748b" }}>
                                    Publish assignments, set due deadlines, and view submitted coursework
                                </p>
                            </div>
                            <div className="content-grid" style={{ gridTemplateColumns: "1fr 2fr", gap: "25px" }}>
                                {/* Left Side: Create Assignment Form */}
                                <div className="content-card">
                                    <h3 style={{ marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>Create Assignment</h3>
                                    <form onSubmit={handleCreateAssignment}>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Assignment Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Midterm Algebra Homework"
                                                value={assignmentTitle}
                                                onChange={(e) => setAssignmentTitle(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Due Date</label>
                                            <input
                                                type="date"
                                                value={assignmentDueDate}
                                                onChange={(e) => setAssignmentDueDate(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Max Marks</label>
                                            <input
                                                type="number"
                                                value={assignmentMaxMarks}
                                                onChange={(e) => setAssignmentMaxMarks(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>
                                        <div className="modal-form-group" style={{ marginBottom: "20px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Subject</label>
                                            <select
                                                value={assignmentSubject}
                                                onChange={(e) => setAssignmentSubject(e.target.value)}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            >
                                                <option>Mathematics</option>
                                                <option>Science</option>
                                                <option>English</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="add-btn tech-btn" style={{ width: "100%", justifyContent: "center" }}>
                                            <Plus size={16} style={{ marginRight: "6px" }} /> Create Task
                                        </button>
                                    </form>
                                </div>

                                {/* Right Side: Assignments List */}
                                <div className="content-card">
                                    <h3 style={{ marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>Active Assignments</h3>
                                    <div className="announcements-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                        {assignments.map((as) => (
                                            <div key={as.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                                                <div>
                                                    <h4 style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#1e293b" }}>{as.title}</h4>
                                                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{as.subject} • Max Marks: {as.maxMarks}</span>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <span style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#2b55cc", marginBottom: "3px" }}>Submissions: {as.submissions}</span>
                                                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>Due Date: {as.dueDate}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}