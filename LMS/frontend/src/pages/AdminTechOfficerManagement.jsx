import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiAlertTriangle } from "react-icons/fi";
import "./AdminTechOfficerManagement.css";

export default function AdminTechOfficerManagement() {
    const navigate = useNavigate();

    // =========================
    // STATE MANAGEMENT
    // =========================
    const [searchTerm, setSearchTerm] = useState("");
    const [officers, setOfficers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // =========================
    // FETCH DATA FROM SPRING BOOT
    // =========================
    const fetchOfficers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/search?role=ROLE_TECHNICAL_OFFICER&term=${searchTerm}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setOfficers(data);
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchOfficers();
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
                fetchOfficers(); // Refresh the table!
            } else {
                alert("Failed to permanently delete officer.");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="admin-tech-management-container">

            {/* Header Area */}
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Technical Officer Management</h1>
                    <p>Manage system administrators and technical staff</p>
                </div>
                <button className="add-btn tech-btn" onClick={() => navigate("/admin/users/tech")}>
                    <FiUserPlus /> Add Technical Officer
                </button>
            </div>

            {/* Main Table Card */}
            <div className="table-card">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by username, ID, or email..."
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
                            <th>Officer ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {officers.map((officer, index) => (
                            <tr key={index}>
                                <td><strong>{officer.userId}</strong></td>
                                <td>{officer.username}</td>
                                <td>{officer.email || "N/A"}</td>
                                <td>{officer.createdDate}</td>
                                <td>
                                    <span className={`badge ${officer.status.toLowerCase()}`}>
                                        {officer.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-icons">
                                        <button className="icon-btn edit-icon" title="Edit Officer"><FiEdit /></button>
                                        <button
                                            className="icon-btn delete-icon"
                                            title="Permanently Delete"
                                            onClick={() => triggerDelete(officer.username)}
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

                {!loading && officers.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
                        No active technical officers found matching your search.
                    </p>
                )}
            </div>

            {/* PERMANENT DELETE MODAL */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <FiAlertTriangle className="warning-icon" style={{color: "#dc2626"}} />
                            <h2>Permanently Delete Officer?</h2>
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