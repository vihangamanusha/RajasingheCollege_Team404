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
    Briefcase,
    Eye,
    Trash2
} from "lucide-react";
import "./Dashboard.css";
import "../layouts/AdminLayout.css";
import schoolLogo from "../assets/school-logo.jpeg";
import TeacherAddMarks from "../Component/TeacherAddMarks";
import { getTeacherMaterials, saveMaterial, deleteMaterial, uploadFile } from "../Service/TeacherMaterialService";
import { getTeacherAssignments, saveAssignment, deleteAssignment } from "../Service/TeacherAssignmentService";

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("Teacher");
    const [subRole, setSubRole] = useState("Subject Teacher");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [assignedSubjects, setAssignedSubjects] = useState([]);
    const [teacherId, setTeacherId] = useState("");
    const [teacherClasses, setTeacherClasses] = useState([]);
    const [teacherSubjects, setTeacherSubjects] = useState([]);
    const [selectedSubjectFilter, setSelectedSubjectFilter] = useState(null);

    // State for Materials
    const [materialsView, setMaterialsView] = useState("form"); // "form" or "list"
    const [materialClassId, setMaterialClassId] = useState("");
    const [materialSubjectId, setMaterialSubjectId] = useState("");
    const [materialTitle, setMaterialTitle] = useState("");
    const [materialNote, setMaterialNote] = useState("");
    const [materialYoutube, setMaterialYoutube] = useState("");
    const [materialPdfFile, setMaterialPdfFile] = useState(null);
    const [dbMaterials, setDbMaterials] = useState([]);
    const [materialUploading, setMaterialUploading] = useState(false);

    // State for Assignments
    const [assignmentsView, setAssignmentsView] = useState("form"); // "form" or "list"
    const [assignmentClassId, setAssignmentClassId] = useState("");
    const [assignmentSubjectId, setAssignmentSubjectId] = useState("");
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentDueDate, setAssignmentDueDate] = useState("");
    const [assignmentPdfFile, setAssignmentPdfFile] = useState(null);
    const [assignmentNote, setAssignmentNote] = useState("");
    const [dbAssignments, setDbAssignments] = useState([]);
    const [assignmentUploading, setAssignmentUploading] = useState(false);

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

    useEffect(() => {
        if (teacherClasses.length > 0 && !materialClassId) {
            const firstClassId = teacherClasses[0].classId;
            setMaterialClassId(firstClassId);
            const classSubs = teacherSubjects.filter(s => s.classId === firstClassId);
            if (classSubs.length > 0) {
                setMaterialSubjectId(classSubs[0].subjectId);
            }
        }
    }, [teacherClasses, teacherSubjects, materialClassId]);

    const loadMaterials = async () => {
        if (!teacherId) return;
        try {
            const res = await getTeacherMaterials(teacherId);
            setDbMaterials(res.data || []);
        } catch (err) {
            console.error("Failed to load materials:", err);
        }
    };

    useEffect(() => {
        if (activeTab === "materials" && teacherId) {
            loadMaterials();
        }
    }, [activeTab, teacherId]);

    const handleClassChange = (e) => {
        const classId = e.target.value;
        setMaterialClassId(classId);
        const classSubs = teacherSubjects.filter(s => s.classId === classId);
        if (classSubs.length > 0) {
            setMaterialSubjectId(classSubs[0].subjectId);
        } else {
            setMaterialSubjectId("");
        }
    };

    const handleDeleteMaterial = async (id) => {
        if (window.confirm("Are you sure you want to delete this study material?")) {
            try {
                await deleteMaterial(id);
                alert("Material deleted successfully!");
                await loadMaterials();
            } catch (err) {
                console.error("Failed to delete material:", err);
                alert("Error deleting material");
            }
        }
    };

    useEffect(() => {
        if (teacherClasses.length > 0 && !assignmentClassId) {
            const firstClassId = teacherClasses[0].classId;
            setAssignmentClassId(firstClassId);
            const classSubs = teacherSubjects.filter(s => s.classId === firstClassId);
            if (classSubs.length > 0) {
                setAssignmentSubjectId(classSubs[0].subjectId);
            }
        }
    }, [teacherClasses, teacherSubjects, assignmentClassId]);

    const loadAssignments = async () => {
        if (!teacherId) return;
        try {
            const res = await getTeacherAssignments(teacherId);
            setDbAssignments(res.data || []);
        } catch (err) {
            console.error("Failed to load assignments:", err);
        }
    };

    useEffect(() => {
        if (activeTab === "assignments" && teacherId) {
            loadAssignments();
        }
    }, [activeTab, teacherId]);

    const handleAssignmentClassChange = (e) => {
        const classId = e.target.value;
        setAssignmentClassId(classId);
        const classSubs = teacherSubjects.filter(s => s.classId === classId);
        if (classSubs.length > 0) {
            setAssignmentSubjectId(classSubs[0].subjectId);
        } else {
            setAssignmentSubjectId("");
        }
    };

    const handleDeleteAssignment = async (id) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            try {
                await deleteAssignment(id);
                alert("Assignment deleted successfully!");
                await loadAssignments();
            } catch (err) {
                console.error("Failed to delete assignment:", err);
                alert("Error deleting assignment");
            }
        }
    };

    const fetchTeacherClasses = async (token, tId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/classes/teacher/${tId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTeacherClasses(data);
            }
        } catch (error) {
            console.error("Failed to fetch teacher classes", error);
        }
    };

    const fetchTeacherSubjects = async (token, tId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/classes/teacher/${tId}/subjects`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTeacherSubjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch teacher subjects", error);
        }
    };

    const fetchTeacherProfile = async (token, userVal) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/users/teacher/${userVal}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.teacherId) {
                    setTeacherId(data.teacherId);
                    fetchTeacherClasses(token, data.teacherId);
                    fetchTeacherSubjects(token, data.teacherId);
                }
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

    const handleUploadMaterial = async (e) => {
        e.preventDefault();
        if (!materialClassId || !materialSubjectId || !materialTitle.trim()) {
            alert("Please fill in Class, Subject, and Title fields");
            return;
        }

        setMaterialUploading(true);
        try {
            let uploadedUrl = "";
            if (materialPdfFile) {
                const uploadRes = await uploadFile(materialPdfFile);
                uploadedUrl = uploadRes.data;
            }

            const payload = {
                title: materialTitle.trim(),
                filePath: uploadedUrl,
                teacherId: teacherId,
                subjectId: materialSubjectId,
                classId: materialClassId,
                note: materialNote.trim(),
                youtubeLink: materialYoutube.trim()
            };

            await saveMaterial(payload);
            alert("Material saved successfully!");
            
            setMaterialTitle("");
            setMaterialNote("");
            setMaterialYoutube("");
            setMaterialPdfFile(null);
            
            const fileInput = document.getElementById("material-pdf-file");
            if (fileInput) fileInput.value = "";

            await loadMaterials();
            setMaterialsView("list");
        } catch (err) {
            console.error("Failed to save material:", err);
            alert("Error saving material");
        } finally {
            setMaterialUploading(false);
        }
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        if (!assignmentClassId || !assignmentSubjectId || !assignmentTitle.trim() || !assignmentDueDate) {
            alert("Please fill in Class, Subject, Title, and Due Date fields");
            return;
        }

        setAssignmentUploading(true);
        try {
            let uploadedUrl = "";
            if (assignmentPdfFile) {
                const uploadRes = await uploadFile(assignmentPdfFile);
                uploadedUrl = uploadRes.data;
            }

            const payload = {
                title: assignmentTitle.trim(),
                dueDate: assignmentDueDate,
                filePath: uploadedUrl,
                note: assignmentNote.trim(),
                teacherId: teacherId,
                subjectId: assignmentSubjectId,
                classId: assignmentClassId
            };

            await saveAssignment(payload);
            alert("Assignment saved successfully!");
            
            setAssignmentTitle("");
            setAssignmentDueDate("");
            setAssignmentNote("");
            setAssignmentPdfFile(null);

            const fileInput = document.getElementById("assignment-pdf-file");
            if (fileInput) fileInput.value = "";

            await loadAssignments();
            setAssignmentsView("list");
        } catch (err) {
            console.error("Failed to save assignment:", err);
            alert("Error saving assignment");
        } finally {
            setAssignmentUploading(false);
        }
    };

    const filteredClasses = selectedSubjectFilter
        ? teacherClasses.filter(c => 
            teacherSubjects.some(ts => ts.subjectName.toLowerCase() === selectedSubjectFilter.toLowerCase() && ts.classId === c.classId)
          )
        : teacherClasses;

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
                        onClick={() => {
                            setSelectedSubjectFilter(null);
                            setActiveTab("my-class");
                        }}
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
                                        <h3>{teacherClasses.reduce((acc, cls) => acc + (cls.studentCount || 0), 0)}</h3>
                                    </div>
                                    <div className="stat-icon blue"><Users size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Classes Assigned</p>
                                        <h3>{teacherClasses.length}</h3>
                                    </div>
                                    <div className="stat-icon yellow"><BookOpen size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Uploaded Materials</p>
                                        <h3>{dbMaterials.length}</h3>
                                    </div>
                                    <div className="stat-icon green"><FileText size={20} /></div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <p>Pending Assignments</p>
                                        <h3>{dbAssignments.length}</h3>
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
                                            <div className="content-card" key={index} style={{ padding: "25px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "180px" }}>
                                                <div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                                                        <div style={{ width: "48px", height: "48px", backgroundColor: "#eff6ff", color: "#2b55cc", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <BookOpen size={24} />
                                                        </div>
                                                        <div>
                                                            <h3 style={{ margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" }}>{subject}</h3>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setSelectedSubjectFilter(subject);
                                                        setActiveTab("my-class");
                                                    }}
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
                                {filteredClasses && filteredClasses.length > 0 ? (
                                    filteredClasses.map((cls, index) => (
                                        <div className="content-card" key={cls.classId || index}>
                                            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#1e293b" }}>Grade {cls.className}</h3>
                                            <p style={{ margin: "0 0 15px 0", fontSize: "13px", color: "#64748b" }}>Medium: {cls.medium || "English"}</p>
                                            <div style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ fontSize: "14px", color: "#64748b" }}>Students enrolled:</span>
                                                <strong style={{ fontSize: "18px", color: "#2b55cc" }}>{cls.studentCount ?? 0}</strong>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="content-card" style={{ gridColumn: "span 3", textAlign: "center", padding: "40px" }}>
                                        <p style={{ color: "#94a3b8", fontSize: "16px" }}>No assigned classes found.</p>
                                    </div>
                                )}
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
                            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                                <div>
                                    <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                        Study Materials
                                    </h1>
                                    <p style={{ fontSize: "16px", color: "#64748b" }}>
                                        Manage class lesson files, reference links, and custom notes
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setMaterialsView(materialsView === "form" ? "list" : "form")}
                                    style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#0f766e", color: "white", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                                >
                                    {materialsView === "form" ? (
                                        <>
                                            <Eye size={16} /> View Materials
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={16} /> Add Material
                                        </>
                                    )}
                                </button>
                            </div>

                            {materialsView === "form" ? (
                                <div className="content-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
                                    <h3 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#1e293b" }}>Upload Material</h3>
                                    <form onSubmit={handleUploadMaterial}>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Select Class *</label>
                                            <select
                                                value={materialClassId}
                                                onChange={handleClassChange}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            >
                                                <option value="">-- Choose Class --</option>
                                                {teacherClasses.map(c => (
                                                    <option key={c.classId} value={c.classId}>
                                                        Grade {c.className}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Choose Subject *</label>
                                            <select
                                                value={materialSubjectId}
                                                onChange={(e) => setMaterialSubjectId(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            >
                                                <option value="">-- Choose Subject --</option>
                                                {teacherSubjects
                                                    .filter(sub => sub.classId === materialClassId)
                                                    .map(sub => (
                                                        <option key={sub.subjectId} value={sub.subjectId}>
                                                            {sub.subjectName}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Material Title *</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Geometry Lesson 1 Notes"
                                                value={materialTitle}
                                                onChange={(e) => setMaterialTitle(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>PDF File</label>
                                            <input
                                                id="material-pdf-file"
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) => setMaterialPdfFile(e.target.files[0])}
                                                style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}
                                            />
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>YouTube Link</label>
                                            <input
                                                type="url"
                                                placeholder="e.g. https://www.youtube.com/watch?v=..."
                                                value={materialYoutube}
                                                onChange={(e) => setMaterialYoutube(e.target.value)}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "20px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Note / Description</label>
                                            <textarea
                                                placeholder="Add reference notes or description here..."
                                                value={materialNote}
                                                onChange={(e) => setMaterialNote(e.target.value)}
                                                rows={4}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", resize: "vertical" }}
                                            />
                                        </div>

                                        <button type="submit" disabled={materialUploading} className="add-btn tech-btn" style={{ width: "100%", justifyContent: "center", padding: "12px", backgroundColor: "#2b55cc", color: "white", fontSize: "15px", fontWeight: "600" }}>
                                            {materialUploading ? "Uploading & Saving..." : "Save Material"}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="content-card">
                                    <h3 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#1e293b" }}>Uploaded Study Materials</h3>
                                    {dbMaterials.length === 0 ? (
                                        <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                                            No materials uploaded yet.
                                        </div>
                                    ) : (
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                                            {dbMaterials.map((m) => {
                                                const cl = teacherClasses.find(c => c.classId === m.classId);
                                                const sub = teacherSubjects.find(s => s.subjectId === m.subjectId);
                                                return (
                                                    <div key={m.documentId} className="content-card" style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                        <div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                                                                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b", wordBreak: "break-word", overflowWrap: "anywhere", flex: 1, paddingRight: "8px" }}>{m.title}</h4>
                                                                <button 
                                                                    onClick={() => handleDeleteMaterial(m.documentId)}
                                                                    style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                                                                    title="Delete Material"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                            <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px 0", fontWeight: "600" }}>
                                                                Grade {cl ? cl.className : m.classId} • {sub ? sub.subjectName : m.subjectId}
                                                            </p>
                                                            {m.note && (
                                                                <div style={{ fontSize: "13px", color: "#475569", backgroundColor: "#f8fafc", padding: "10px", borderRadius: "6px", marginBottom: "12px", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "anywhere", maxHeight: "120px", overflowY: "auto" }}>
                                                                    {m.note}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div style={{ marginTop: "12px" }}>
                                                            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                                                                {m.filePath && (
                                                                    <a href={m.filePath} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: "center", padding: "8px", backgroundColor: "#e0f2fe", color: "#0369a1", borderRadius: "6px", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>
                                                                        Download PDF
                                                                    </a>
                                                                )}
                                                                {m.youtubeLink && (
                                                                    <a href={m.youtubeLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: "center", padding: "8px", backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: "6px", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>
                                                                        Watch YouTube
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <div style={{ fontSize: "11px", color: "#94a3b8", textAlign: "right" }}>
                                                                Uploaded: {m.uploadDate}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* TAB 6: ASSIGNMENTS */}
                    {activeTab === "assignments" && (
                        <>
                            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                                <div>
                                    <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
                                        Student Assignments
                                    </h1>
                                    <p style={{ fontSize: "16px", color: "#64748b" }}>
                                        Publish assignments, set due deadlines, and view submitted coursework
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setAssignmentsView(assignmentsView === "form" ? "list" : "form")}
                                    style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#0f766e", color: "white", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                                >
                                    {assignmentsView === "form" ? (
                                        <>
                                            <Eye size={16} /> View Assignments
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={16} /> Add Assignment
                                        </>
                                    )}
                                </button>
                            </div>

                            {assignmentsView === "form" ? (
                                <div className="content-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
                                    <h3 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#1e293b" }}>Create Assignment</h3>
                                    <form onSubmit={handleCreateAssignment}>
                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Select Class *</label>
                                            <select
                                                value={assignmentClassId}
                                                onChange={handleAssignmentClassChange}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            >
                                                <option value="">-- Choose Class --</option>
                                                {teacherClasses.map(c => (
                                                    <option key={c.classId} value={c.classId}>
                                                        Grade {c.className}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Choose Subject *</label>
                                            <select
                                                value={assignmentSubjectId}
                                                onChange={(e) => setAssignmentSubjectId(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            >
                                                <option value="">-- Choose Subject --</option>
                                                {teacherSubjects
                                                    .filter(sub => sub.classId === assignmentClassId)
                                                    .map(sub => (
                                                        <option key={sub.subjectId} value={sub.subjectId}>
                                                            {sub.subjectName}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Assignment Title *</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Vectors Midterm Assignment"
                                                value={assignmentTitle}
                                                onChange={(e) => setAssignmentTitle(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Due Date *</label>
                                            <input
                                                type="date"
                                                value={assignmentDueDate}
                                                onChange={(e) => setAssignmentDueDate(e.target.value)}
                                                required
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                            />
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>PDF File</label>
                                            <input
                                                id="assignment-pdf-file"
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) => setAssignmentPdfFile(e.target.files[0])}
                                                style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}
                                            />
                                        </div>

                                        <div className="modal-form-group" style={{ marginBottom: "20px" }}>
                                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Note / Instruction</label>
                                            <textarea
                                                placeholder="Add homework notes or instructions here..."
                                                value={assignmentNote}
                                                onChange={(e) => setAssignmentNote(e.target.value)}
                                                rows={4}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", resize: "vertical" }}
                                            />
                                        </div>

                                        <button type="submit" disabled={assignmentUploading} className="add-btn tech-btn" style={{ width: "100%", justifyContent: "center", padding: "12px", backgroundColor: "#2b55cc", color: "white", fontSize: "15px", fontWeight: "600" }}>
                                            {assignmentUploading ? "Uploading & Saving..." : "Save Assignment"}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="content-card">
                                    <h3 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600", color: "#1e293b" }}>Active Assignments</h3>
                                    {dbAssignments.length === 0 ? (
                                        <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                                            No assignments created yet.
                                        </div>
                                    ) : (
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                                            {dbAssignments.map((a) => {
                                                const cl = teacherClasses.find(c => c.classId === a.classId);
                                                const sub = teacherSubjects.find(s => s.subjectId === a.subjectId);
                                                return (
                                                    <div key={a.assignmentId} className="content-card" style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                        <div>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                                                                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b", wordBreak: "break-word", overflowWrap: "anywhere", flex: 1, paddingRight: "8px" }}>{a.title}</h4>
                                                                <button 
                                                                    onClick={() => handleDeleteAssignment(a.assignmentId)}
                                                                    style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                                                                    title="Delete Assignment"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                            <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px 0", fontWeight: "600" }}>
                                                                Grade {cl ? cl.className : a.classId} • {sub ? sub.subjectName : a.subjectId}
                                                            </p>
                                                            <div style={{ fontSize: "13px", fontWeight: "600", color: "#b91c1c", marginBottom: "12px" }}>
                                                                Due Date: {a.dueDate}
                                                            </div>
                                                            {a.note && (
                                                                <div style={{ fontSize: "13px", color: "#475569", backgroundColor: "#f8fafc", padding: "10px", borderRadius: "6px", marginBottom: "12px", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "anywhere", maxHeight: "120px", overflowY: "auto" }}>
                                                                    {a.note}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div style={{ marginTop: "12px" }}>
                                                            {a.filePath && (
                                                                <a href={a.filePath} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "8px", backgroundColor: "#e0f2fe", color: "#0369a1", borderRadius: "6px", fontSize: "13px", fontWeight: "600", textDecoration: "none", marginBottom: "12px" }}>
                                                                    Download Assignment PDF
                                                                </a>
                                                            )}
                                                            <div style={{ fontSize: "11px", color: "#94a3b8", textAlign: "right" }}>
                                                                Created: {a.uploadDate}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}