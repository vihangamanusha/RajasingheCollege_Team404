import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiAlertTriangle } from "react-icons/fi";
import "./AdminTeacherManagement.css";

export default function AdminTeacherManagement() {
    const navigate = useNavigate();

    // =========================
    // STATE MANAGEMENT
    // =========================
    const [searchTerm, setSearchTerm] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    // =========================
    // DELETE MODAL STATE
    // =========================
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState({ text: "", type: "" }); // Inline message state

    // =========================
    // EDIT MODAL STATE
    // =========================
    const [showEditModal, setShowEditModal] = useState(false);
    const [editMessage, setEditMessage] = useState({ text: "", type: "" }); // Inline message state
    const [originalEditData, setOriginalEditData] = useState(null); // Change Tracker
    const [editFormData, setEditFormData] = useState({
        username: "", userId: "", email: "", password: "",
        fullName: "", subjectSpecialization: "", contactNumber: ""
    });

    // =========================
    // FETCH DATA FROM SPRING BOOT
    // =========================
    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/search?role=ROLE_TEACHER&term=${searchTerm}`,
                { headers: { Authorization: `Bearer ${token}` } }
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
        const delayDebounce = setTimeout(() => fetchTeachers(), 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // =========================
    // FULL PROFILE EDIT LOGIC
    // =========================
    const triggerEdit = async (teacher) => {
        setEditMessage({ text: "", type: "" }); // Clear old messages
        setShowEditModal(true);

        // Lock in basic table data immediately
        const initialData = {
            username: teacher.username, userId: teacher.userId, email: teacher.email || "",
            password: "", fullName: "Loading...", subjectSpecialization: "", contactNumber: ""
        };
        setEditFormData(initialData);

        // Fetch remaining teacher details from DB
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/teacher/${teacher.username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const fullProfile = await response.json();
                const completeData = {
                    username: teacher.username,
                    userId: teacher.userId,
                    email: teacher.email || "",
                    password: "",
                    fullName: fullProfile.fullName || "",
                    subjectSpecialization: fullProfile.subjectSpecialization || "",
                    contactNumber: fullProfile.contactNumber || ""
                };
                setEditFormData(completeData);
                setOriginalEditData(completeData); // Save snapshot for change tracking
            }
        } catch (error) {
            setEditMessage({ text: "Failed to fetch full profile data.", type: "error" });
        }
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        setEditMessage({ text: "", type: "" });

        // 1. CHECK FOR CHANGES
        const hasChanges = Object.keys(originalEditData).some(key => {
            if (key === 'password') return editFormData.password.trim() !== "";
            return originalEditData[key] !== editFormData[key];
        });

        if (!hasChanges) {
            setEditMessage({ text: "No changes detected. Please edit a field to save.", type: "error" });
            return;
        }

        // 2. SUBMIT CHANGES
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/teacher/update/${editFormData.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: editFormData.email,
                    password: editFormData.password,
                    fullName: editFormData.fullName,
                    subjectSpecialization: editFormData.subjectSpecialization,
                    contactNumber: editFormData.contactNumber
                })
            });

            if (response.ok) {
                setEditMessage({ text: "Teacher profile successfully updated!", type: "success" });
                fetchTeachers();
                setTimeout(() => setShowEditModal(false), 1500); // Wait so admin can read success message
            } else {
                setEditMessage({ text: "Failed to update teacher profile.", type: "error" });
            }
        } catch (error) {
            setEditMessage({ text: "Server error during update.", type: "error" });
        }
    };

    // =========================
    // PERMANENT DELETE LOGIC
    // =========================
    const triggerDelete = (username) => {
        setUserToDelete(username);
        setDeleteMessage({ text: "", type: "" });
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setDeleteMessage({ text: "", type: "" });
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/delete/${userToDelete}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setDeleteMessage({ text: "Teacher permanently deleted.", type: "success" });
                fetchTeachers();
                setTimeout(() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                }, 1500);
            } else {
                setDeleteMessage({ text: "Failed to delete teacher.", type: "error" });
            }
        } catch (error) {
            setDeleteMessage({ text: "Server error during deletion.", type: "error" });
        }
    };

    return (
        <div className="admin-teacher-management-container">

            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Teacher Management</h1>
                    <p>Manage all teaching staff records and assignments</p>
                </div>

                <button className="add-btn teacher-btn" onClick={() => navigate("/admin/users/teacher")}>
                    <FiUserPlus /> Add Teacher
                </button>
            </div>

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
                    <table className="data-table">
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
                                    <span className={`role-badge ${teacher.status.toLowerCase() === 'active' ? 'subject-teacher' : 'section-head'}`}>
                                        {teacher.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-icons">
                                        <button className="icon-btn edit-icon" title="Edit Teacher" onClick={() => triggerEdit(teacher)}>
                                            <FiEdit />
                                        </button>
                                        <button className="icon-btn delete-icon" title="Permanently Delete" onClick={() => triggerDelete(teacher.username)}>
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

            {/* EXPANDED EDIT MODAL */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-box scrollable-modal">
                        <div className="modal-header">
                            <FiEdit className="warning-icon" style={{color: "#f59e0b"}} />
                            <h2>Edit Teacher Profile</h2>
                        </div>

                        <form onSubmit={submitEdit}>
                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Teacher ID (Locked)</label>
                                    <input type="text" value={editFormData.userId} disabled />
                                </div>
                                <div className="modal-form-group">
                                    <label>System Username (Locked)</label>
                                    <input type="text" value={editFormData.username} disabled />
                                </div>
                            </div>

                            <div className="modal-form-group">
                                <label>Full Name</label>
                                <input type="text" value={editFormData.fullName} onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})} required />
                            </div>

                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Subject Specialization</label>
                                    <input type="text" value={editFormData.subjectSpecialization} onChange={(e) => setEditFormData({...editFormData, subjectSpecialization: e.target.value})} required />
                                </div>
                                <div className="modal-form-group">
                                    <label>Contact Number</label>
                                    <input type="text" value={editFormData.contactNumber} onChange={(e) => setEditFormData({...editFormData, contactNumber: e.target.value})} required />
                                </div>
                            </div>

                            <div className="modal-form-group">
                                <label>Email Address</label>
                                <input type="email" value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})} />
                            </div>

                            <div className="modal-form-group" style={{borderTop: "1px solid #e2e8f0", paddingTop: "15px", marginTop: "10px"}}>
                                <label style={{color: "#dc2626"}}>Administrative Password Reset (Optional)</label>
                                <p style={{fontSize: "0.8rem", color: "#64748b", margin: "2px 0 8px 0"}}>For security, current passwords are encrypted. Type a new password here to overwrite the current one.</p>
                                <input
                                    type="password"
                                    placeholder="Leave blank to keep current password"
                                    value={editFormData.password}
                                    onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                                />
                            </div>

                            {/* INLINE FORM MESSAGE FOR EDIT */}
                            {editMessage.text && (
                                <div className={`inline-form-message ${editMessage.type}`}>
                                    {editMessage.text}
                                </div>
                            )}

                            <div className="modal-actions" style={{marginTop: "20px"}}>
                                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="confirm-delete-btn" style={{backgroundColor: "#f59e0b", color: "white"}}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* PERMANENT DELETE MODAL */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <FiAlertTriangle className="warning-icon" style={{color: "#dc2626"}} />
                            <h2>Permanently Delete Teacher?</h2>
                        </div>
                        <p>Are you sure you want to permanently delete <strong>{userToDelete}</strong>? This action cannot be undone.</p>

                        {/* INLINE FORM MESSAGE FOR DELETE */}
                        {deleteMessage.text && (
                            <div className={`inline-form-message ${deleteMessage.type}`}>
                                {deleteMessage.text}
                            </div>
                        )}

                        <div className="modal-actions" style={{marginTop: "25px"}}>
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="confirm-delete-btn" onClick={confirmDelete}>Yes, Permanently Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}