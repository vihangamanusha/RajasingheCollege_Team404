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

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        username: "",
        userId: "",
        email: "",
        status: "ACTIVE"
    });

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

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchStudents();
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // =========================
    // EDIT LOGIC
    // =========================
    const triggerEdit = (student) => {
        setEditFormData({
            username: student.username,
            userId: student.userId,
            email: student.email || "",
            status: student.status
        });
        setShowEditModal(true);
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/update/${editFormData.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: editFormData.email,
                    status: editFormData.status
                })
            });

            if (response.ok) {
                setShowEditModal(false);
                fetchStudents(); // Refresh data
            } else {
                alert("Failed to update user.");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

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
                                        <button
                                            className="icon-btn edit-icon"
                                            title="Edit Student"
                                            onClick={() => triggerEdit(student)}
                                        >
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
                EDIT USER MODAL
            ========================= */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <FiEdit className="warning-icon" style={{color: "#2b55cc"}} />
                            <h2>Edit Student Account</h2>
                        </div>

                        <form onSubmit={submitEdit}>
                            <div className="modal-form-group">
                                <label>Student ID (Locked)</label>
                                <input type="text" value={editFormData.userId} disabled />
                            </div>

                            <div className="modal-form-group">
                                <label>System Username (Locked)</label>
                                <input type="text" value={editFormData.username} disabled />
                            </div>

                            <div className="modal-form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                />
                            </div>

                            <div className="modal-form-group">
                                <label>Account Status</label>
                                <select
                                    value={editFormData.status}
                                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="SUSPENDED">SUSPENDED</option>
                                </select>
                            </div>

                            <div className="modal-actions" style={{marginTop: "25px"}}>
                                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="confirm-delete-btn" style={{backgroundColor: "#2b55cc"}}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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