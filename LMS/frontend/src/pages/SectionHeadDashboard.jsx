import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    BookOpen,
    TrendingUp,
    AlertCircle,
    LogOut,
    PlusCircle,
    Bell,
    CheckCircle,
    FileSpreadsheet
} from "lucide-react";
import "./SectionHeadDashboard.css";

export default function SectionHeadDashboard() {
    const navigate = useNavigate();
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
        <div className="section-head-container">
            {/* Sidebar */}
            <aside className="sh-sidebar">
                <div className="sh-logo-section">
                    <div className="sh-logo-circle">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h2 className="sh-title">Rajasinghe LMS</h2>
                        <span className="sh-subtitle">Section Head Workspace</span>
                    </div>
                </div>

                <nav className="sh-nav">
                    <ul>
                        <li className="active">
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </li>
                    </ul>
                </nav>

                <div className="sh-sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Workspace */}
            <main className="sh-main">
                {/* Header */}
                <header className="sh-header">
                    <div className="sh-header-title-box">
                        <span className="badge-grade">{gradeLabel} Overview</span>
                        <h1>Welcome, {username}</h1>
                    </div>
                    <div className="sh-header-profile">
                        <div className="profile-indicator">
                            <span className="profile-dot"></span>
                            <span className="profile-role">{subRole}</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Widgets Grid */}
                <div className="sh-dashboard-grid">
                    {/* Stat Cards */}
                    <section className="sh-stats-row">
                        <div className="stat-card blue">
                            <div className="icon-wrapper">
                                <Users size={24} />
                            </div>
                            <div className="stat-content">
                                <h3>Total Students</h3>
                                <p className="stat-number">{sectionData.totalStudents}</p>
                                <span className="stat-desc">Enrolled in {gradeLabel}</span>
                            </div>
                        </div>

                        <div className="stat-card amber">
                            <div className="icon-wrapper">
                                <UserCheck size={24} />
                            </div>
                            <div className="stat-content">
                                <h3>Class Teachers</h3>
                                <p className="stat-number">{sectionData.teachersCount}</p>
                                <span className="stat-desc">Active staff members</span>
                            </div>
                        </div>

                        <div className="stat-card emerald">
                            <div className="icon-wrapper">
                                <TrendingUp size={24} />
                            </div>
                            <div className="stat-content">
                                <h3>Average Performance</h3>
                                <p className="stat-number">{sectionData.avgPerf}</p>
                                <span className="stat-desc">Current term analytics</span>
                            </div>
                        </div>
                    </section>

                    {/* Classes & Performance */}
                    <div className="sh-details-split">
                        {/* Classes Management */}
                        <section className="detail-card list-card">
                            <div className="card-header">
                                <div className="header-title">
                                    <FileSpreadsheet size={18} className="header-icon blue-text" />
                                    <h2>Classes Under Your Section</h2>
                                </div>
                                <span className="classes-count-pill">{sectionData.classes.length} Classes</span>
                            </div>
                            <div className="table-responsive">
                                <table className="sh-table">
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Class Teacher</th>
                                            <th>Total Students</th>
                                            <th>Avg. Performance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sectionData.classes.map((cls, index) => (
                                            <tr key={index}>
                                                <td className="font-semibold">{cls.name}</td>
                                                <td>{cls.teacher}</td>
                                                <td>{cls.students}</td>
                                                <td>
                                                    <span className={`perf-badge ${cls.avgMark >= 75 ? "high" : cls.avgMark >= 68 ? "medium" : "low"}`}>
                                                        {cls.avgMark}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Announcements Management */}
                        <section className="detail-card announcements-card">
                            <div className="card-header">
                                <div className="header-title">
                                    <Bell size={18} className="header-icon amber-text" />
                                    <h2>Publish Grade Notices</h2>
                                </div>
                            </div>

                            <form className="announcement-form" onSubmit={handleCreateAnnouncement}>
                                <div className="form-group-inline">
                                    <input
                                        type="text"
                                        placeholder="Type grade announcement..."
                                        value={newAnnouncement.title}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                        required
                                    />
                                    <select
                                        value={newAnnouncement.target}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: e.target.value })}
                                    >
                                        <option value="All Classes">All Classes</option>
                                        <option value="Teachers Only">Teachers Only</option>
                                        <option value="Students Only">Students Only</option>
                                    </select>
                                    <button type="submit" className="publish-btn">
                                        <PlusCircle size={16} />
                                        <span>Publish</span>
                                    </button>
                                </div>
                            </form>

                            <div className="announcements-list">
                                {announcements.map((ann) => (
                                    <div key={ann.id} className="announcement-item">
                                        <div className="ann-header">
                                            <span className="ann-date">{ann.date}</span>
                                            <span className="ann-target">{ann.target}</span>
                                        </div>
                                        <p className="ann-title">{ann.title}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

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
