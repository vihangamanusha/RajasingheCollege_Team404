import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiAlertTriangle } from "react-icons/fi";
import "./AdminStudentManagement.css";

export default function AdminStudentManagement() {
    const navigate = useNavigate();

    // =========================
    // STATE MANAGEMENT
    // =========================
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Delete Modal State (Simplified for Hard Delete)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // =========================
    // FETCH DATA FROM SPRING BOOT
    // =========================
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/search?role=ROLE_STUDENT&term=${searchTerm}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            } else {
                console.error("Failed to fetch students");
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch on load and whenever search term changes (with debounce)
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchStudents();
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // =========================
    // PERMANENT DELETE LOGIC
    // =========================
    const triggerDelete = (username) => {
        setUserToDelete(username);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            // Hitting the updated API without the ?note parameter
            const response = await fetch(
                `http://localhost:8080/admin/users/delete/${userToDelete}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                // Close modal and refresh table!
                setShowDeleteModal(false);
                setUserToDelete(null);
                fetchStudents();
            } else {
                alert("Failed to permanently delete user.");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="admin-student-management-container">

            {/* Header Area */}
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Student Management</h1>
                    <p>Manage all student records and information</p>
                </div>

                <button className="add-btn" onClick={() => navigate("/admin/users/student")}>
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
                        placeholder="Search active students by username, ID, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Data Table */}
                {loading ? (
                    <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>Loading database...</p>
                ) : (
                    <table className="student-table">
                        <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td><strong>{student.userId}</strong></td>
                                <td>{student.username}</td>
                                <td>{student.email || "N/A"}</td>
                                <td>{student.createdDate}</td>
                                <td>
                                    <span className={`badge ${student.status.toLowerCase()}`}>
                                        {student.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-icons">
                                        <button className="icon-btn edit-icon" title="Edit Student">
                                            <FiEdit />
                                        </button>
                                        <button
                                            className="icon-btn delete-icon"
                                            title="Permanently Delete"
                                            onClick={() => triggerDelete(student.username)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {/* No Results Message */}
                {!loading && students.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
                        No students found matching your search.
                    </p>
                )}
            </div>

            {/* =========================
                PERMANENT DELETE MODAL
            ========================= */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <FiAlertTriangle className="warning-icon" style={{color: "#dc2626"}} />
                            <h2>Permanently Delete Student?</h2>
                        </div>
                        <p>
                            Are you sure you want to permanently delete <strong>{userToDelete}</strong>?
                            This action will erase all of their data from the database and <strong>cannot be undone</strong>.
                        </p>

                        <div className="modal-actions" style={{marginTop: "25px"}}>
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="confirm-delete-btn" onClick={confirmDelete}>
                                Yes, Permanently Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}