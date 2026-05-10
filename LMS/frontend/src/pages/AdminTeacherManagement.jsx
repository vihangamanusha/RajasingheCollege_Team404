import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiAlertTriangle } from "react-icons/fi";
import "./AdminTeacherManagement.css"; // Assuming you copied the modal CSS into here!

export default function AdminTeacherManagement() {
    const navigate = useNavigate();

    // =========================
    // STATE MANAGEMENT
    // =========================
    const [searchTerm, setSearchTerm] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // =========================
    // FETCH DATA FROM SPRING BOOT
    // =========================
    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/search?role=ROLE_TEACHER&term=${searchTerm}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setTeachers(data);
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchTeachers();
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
            const response = await fetch(
                `http://localhost:8080/admin/users/delete/${userToDelete}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                setShowDeleteModal(false);
                setUserToDelete(null);
                fetchTeachers(); // Refresh the table!
            } else {
                alert("Failed to permanently delete teacher.");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="admin-teacher-management-container">

            {/* Header Area */}
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Teacher Management</h1>
                    <p>Manage all teaching staff records and assignments</p>
                </div>

                <button className="add-btn teacher-btn" onClick={() => navigate("/admin/users/teacher")}>
                    <FiUserPlus /> Add Teacher
                </button>
            </div>

            {/* Main Table Card */}
            <div className="table-card">

                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search active teachers by username, ID, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>Loading database...</p>
                ) : (
                    <table className="data-table student-table">
                        <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={index}>
                                <td><strong>{teacher.userId}</strong></td>
                                <td>{teacher.username}</td>
                                <td>{teacher.email || "N/A"}</td>
                                <td>{teacher.createdDate}</td>
                                <td>
                                    <span className={`badge ${teacher.status.toLowerCase()}`}>
                                        {teacher.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-icons">
                                        <button className="icon-btn edit-icon" title="Edit Teacher"><FiEdit /></button>
                                        <button
                                            className="icon-btn delete-icon"
                                            title="Permanently Delete"
                                            onClick={() => triggerDelete(teacher.username)}
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

                {!loading && teachers.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
                        No active teachers found matching your search.
                    </p>
                )}
            </div>

            {/* PERMANENT DELETE MODAL */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <FiAlertTriangle className="warning-icon" style={{color: "#dc2626"}} />
                            <h2>Permanently Delete Teacher?</h2>
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