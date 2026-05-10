import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import "./AdminStudentManagement.css";

export default function AdminStudentManagement() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data based on your prototype image
    const mockStudents = [
        { id: "2024/001", name: "Kasun Perera", grade: "Grade 10-A", medium: "Sinhala", email: "kasun@example.com", guardian: "Mr. Perera" },
        { id: "2024/002", name: "Nimali Fernando", grade: "Grade 11-B", medium: "English", email: "nimali@example.com", guardian: "Mrs. Fernando" },
        { id: "2024/003", name: "Saman Kumara", grade: "Grade 9-A", medium: "Sinhala", email: "saman@example.com", guardian: "Mr. Kumara" },
        { id: "2024/004", name: "Priya Rajapakse", grade: "Grade 10-A", medium: "English", email: "priya@example.com", guardian: "Mrs. Rajapakse" },
        { id: "2024/005", name: "Dinesh Wickrama", grade: "Grade 12-C", medium: "Sinhala", email: "dinesh@example.com", guardian: "Mr. Wickrama" },
    ];

    // Simple search filter logic
    const filteredStudents = mockStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-student-management-container">

            {/* Header Area */}
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Student Management</h1>
                    <p>Manage all student records and information</p>
                </div>

                {/* Navigates to the Add Student Form we built earlier */}
                <button
                    className="add-btn"
                    onClick={() => navigate("/admin/users/student")}
                >
                    <FiUserPlus /> Add Student
                </button>
            </div>

            {/* Main Table Card */}
            <div className="table-card">

                {/* Search Bar */}
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search students by name, admission number, or grade..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Data Table */}
                <table className="student-table">
                    <thead>
                    <tr>
                        <th>Admission No</th>
                        <th>Name</th>
                        <th>Grade/Class</th>
                        <th>Medium</th>
                        <th>Email</th>
                        <th>Guardian</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudents.map((student, index) => (
                        <tr key={index}>
                            <td><strong>{student.id}</strong></td>
                            <td>{student.name}</td>
                            <td>{student.grade}</td>
                            <td>
                                    <span className={`badge ${student.medium.toLowerCase()}`}>
                                        {student.medium}
                                    </span>
                            </td>
                            <td>{student.email}</td>
                            <td>{student.guardian}</td>
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
                {filteredStudents.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
                        No students found matching your search.
                    </p>
                )}

            </div>
        </div>
    );
}