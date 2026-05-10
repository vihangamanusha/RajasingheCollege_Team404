import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import "./AdminTeacherManagement.css";

export default function AdminTeacherManagement() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data for Teachers
    const mockTeachers = [
        { id: "T-2045", name: "Mr. Amal Perera", subject: "Mathematics", role: "SECTION_HEAD", roleLabel: "Section Head", email: "amal@example.com" },
        { id: "T-2046", name: "Mrs. Sunethra Silva", subject: "Science", role: "SUBJECT_TEACHER", roleLabel: "Subject Teacher", email: "sunethra@example.com" },
        { id: "T-2047", name: "Miss. Kamalini", subject: "English", role: "CLASS_TEACHER", roleLabel: "Class Teacher", email: "kamalini@example.com" },
        { id: "T-2048", name: "Mr. Rohan Fernando", subject: "History", role: "SUBJECT_TEACHER", roleLabel: "Subject Teacher", email: "rohan@example.com" },
        { id: "T-2049", name: "Mrs. Deepika", subject: "IT", role: "SECTION_HEAD", roleLabel: "Section Head", email: "deepika@example.com" },
    ];

    // Helper function to map the role to the correct CSS class
    const getBadgeClass = (role) => {
        if (role === "SECTION_HEAD") return "section-head";
        if (role === "CLASS_TEACHER") return "class-teacher";
        return "subject-teacher";
    };

    // Simple search filter logic
    const filteredTeachers = mockTeachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-teacher-management-container">

            {/* Header Area */}
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Teacher Management</h1>
                    <p>Manage all teaching staff records and assignments</p>
                </div>

                {/* Navigates to the Add Teacher Form */}
                <button
                    className="add-btn teacher-btn"
                    onClick={() => navigate("/admin/users/teacher")}
                >
                    <FiUserPlus /> Add Teacher
                </button>
            </div>

            {/* Main Table Card */}
            <div className="table-card">

                {/* Search Bar */}
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search teachers by name, ID, or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Data Table */}
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Teacher ID</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTeachers.map((teacher, index) => (
                        <tr key={index}>
                            <td><strong>{teacher.id}</strong></td>
                            <td>{teacher.name}</td>
                            <td>{teacher.subject}</td>
                            <td>
                                    <span className={`role-badge ${getBadgeClass(teacher.role)}`}>
                                        {teacher.roleLabel}
                                    </span>
                            </td>
                            <td>{teacher.email}</td>
                            <td>
                                <div className="action-icons">
                                    <button className="icon-btn edit-icon"><FiEdit /></button>
                                    <button className="icon-btn delete-icon"><FiTrash2 /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Show this if search yields no results */}
                {filteredTeachers.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
                        No teachers found matching your search.
                    </p>
                )}

            </div>
        </div>
    );
}