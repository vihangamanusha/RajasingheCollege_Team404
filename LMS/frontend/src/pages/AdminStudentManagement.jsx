import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiAlertCircle } from "react-icons/fi";
import "./AdminStudentManagement.css";

export default function AdminStudentManagement() {
    const navigate = useNavigate();

    // =========================
    // STATE MANAGEMENT
    // =========================
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteNote, setDeleteNote] = useState("");

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
    // SOFT DELETE LOGIC
    // =========================
    const triggerDelete = (username) => {
        setUserToDelete(username);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!deleteNote.trim()) {
            alert("Please provide a reason for deletion.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/delete/${userToDelete}?note=${encodeURIComponent(deleteNote)}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                // Close modal, clear note, and refresh table!
                setShowDeleteModal(false);
                setDeleteNote("");
                setUserToDelete(null);
                fetchStudents();
            } else {
                alert("Failed to delete user.");
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
                                            title="Delete Student"
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
                SAFE-DELETE MODAL (AUDIT TRAIL)
            ========================= */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <FiAlertCircle className="warning-icon" />
                            <h2>Remove Student</h2>
                        </div>
                        <p>You are about to remove <strong>{userToDelete}</strong> from the active system. This will lock their account.</p>

                        <div className="modal-form-group">
                            <label>Reason for Deletion (Required Audit Trail):</label>
                            <textarea
                                placeholder="e.g. Graduated, Transferred to another school..."
                                value={deleteNote}
                                onChange={(e) => setDeleteNote(e.target.value)}
                                rows="3"
                                required
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button
                                className="confirm-delete-btn"
                                onClick={confirmDelete}
                                disabled={!deleteNote.trim()}
                            >
                                Confirm Removal
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}