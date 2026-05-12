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

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState({ text: "", type: "" });

    const [showEditModal, setShowEditModal] = useState(false);
    const [editMessage, setEditMessage] = useState({ text: "", type: "" });
    const [originalEditData, setOriginalEditData] = useState(null);
    const [editFormData, setEditFormData] = useState({
        username: "", userId: "", email: "", password: "",
        fullName: "", subjectSpecialization: "", contactNumber: "",
        subRole: "" // Initial state
    });

    // =========================
    // FETCH DATA
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
        setEditMessage({ text: "", type: "" });
        setShowEditModal(true);

        const initialData = {
            username: teacher.username,
            userId: teacher.userId,
            email: teacher.email || "",
            password: "",
            fullName: "Loading...",
            subjectSpecialization: "Loading...",
            contactNumber: "Loading...",
            subRole: teacher.subRole || ""
        };
        setEditFormData(initialData);

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
                    contactNumber: fullProfile.contactNumber || "",
                    subRole: teacher.subRole || "" // Allow empty if not present
                };
                setEditFormData(completeData);
                setOriginalEditData(completeData);
            } else {
                setEditMessage({ text: "Failed to load full details from server.", type: "error" });
            }
        } catch (error) {
            setEditMessage({ text: "Server connection error.", type: "error" });
        }
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        setEditMessage({ text: "", type: "" });

        if (!originalEditData) {
            setEditMessage({ text: "Cannot save. Original data failed to load.", type: "error" });
            return;
        }

        const hasChanges = Object.keys(originalEditData).some(key => {
            if (key === 'password') return editFormData.password.trim() !== "";
            return originalEditData[key] !== editFormData[key];
        });

        if (!hasChanges) {
            setEditMessage({ text: "No changes detected. Please edit a field to save.", type: "error" });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/teacher/update/${editFormData.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: editFormData.userId,
                    username: editFormData.username,
                    email: editFormData.email,
                    password: editFormData.password,
                    fullName: editFormData.fullName,
                    subjectSpecialization: editFormData.subjectSpecialization,
                    contactNumber: editFormData.contactNumber,
                    subRole: editFormData.subRole // Can be an empty string
                })
            });

            if (response.ok) {
                // SUCCESS MESSAGE
                setEditMessage({ text: "Teacher profile successfully updated!", type: "success" });
                fetchTeachers();

                setTimeout(() => {
                    setShowEditModal(false);
                }, 1500);
            } else {
                const errorText = await response.text();
                setEditMessage({ text: `Failed to update: ${errorText}`, type: "error" });
            }
        } catch (error) {
            setEditMessage({ text: "Server error during update.", type: "error" });
        }
    };

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
                    <FiUserPlus style={{marginRight: '8px'}} /> Add Teacher
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
                                    <label>Designation (Sub-Role) - Optional</label>
                                    <select
                                        value={editFormData.subRole}
                                        onChange={(e) => setEditFormData({...editFormData, subRole: e.target.value})}
                                    >
                                        <option value="">None / Empty</option>
                                        <option value="Subject Teacher">Subject Teacher</option>
                                        <option value="Section Head">Section Head</option>
                                        <option value="Grade Coordinator">Grade Coordinator</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Contact Number</label>
                                    <input type="text" value={editFormData.contactNumber} onChange={(e) => setEditFormData({...editFormData, contactNumber: e.target.value})} required />
                                </div>
                                <div className="modal-form-group">
                                    <label>Email Address</label>
                                    <input type="email" value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})} />
                                </div>
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

                            {/* INLINE FORM MESSAGE (SUCCESS/ERROR) */}
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

            {/* DELETE MODAL remains the same */}
        </div>
    );
}