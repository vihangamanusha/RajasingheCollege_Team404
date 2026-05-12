import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiAlertTriangle } from "react-icons/fi";
import "./AdminStudentManagement.css";

export default function AdminStudentManagement() {
    const navigate = useNavigate();

    // STATE MANAGEMENT
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([]);
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
        fullName: "", dateOfBirth: "", address: "", medium: "SINHALA", contactNumber: ""
    });

    // =========================
    // FETCH DATA
    // =========================
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/search?role=ROLE_STUDENT&term=${searchTerm}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => fetchStudents(), 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // =========================
    // FULL PROFILE EDIT LOGIC
    // =========================
    const triggerEdit = async (student) => {
        setEditMessage({ text: "", type: "" }); // Clear old messages
        setShowEditModal(true);

        const initialData = {
            username: student.username, userId: student.userId, email: student.email || "",
            password: "", fullName: "Loading...", dateOfBirth: "", address: "",
            medium: "SINHALA", contactNumber: ""
        };
        setEditFormData(initialData);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/student/${student.username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const fullProfile = await response.json();
                const completeData = {
                    username: student.username,
                    userId: student.userId,
                    email: student.email || "",
                    password: "",
                    fullName: fullProfile.fullName || "",
                    dateOfBirth: fullProfile.dateOfBirth || "",
                    address: fullProfile.address || "",
                    medium: fullProfile.medium || "SINHALA",
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
        setEditMessage({ text: "", type: "" }); // Clear previous messages

        // 1. CHECK FOR CHANGES (Compare current form with original data)
        const hasChanges = Object.keys(originalEditData).some(key => {
            if (key === 'password') return editFormData.password.trim() !== ""; // Password is a special case
            return originalEditData[key] !== editFormData[key];
        });

        if (!hasChanges) {
            setEditMessage({ text: "No changes detected. Please edit a field to save.", type: "error" });
            return;
        }

        // 2. SUBMIT IF CHANGED
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/student/update/${editFormData.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: editFormData.email, password: editFormData.password,
                    fullName: editFormData.fullName, dateOfBirth: editFormData.dateOfBirth,
                    address: editFormData.address, medium: editFormData.medium, contactNumber: editFormData.contactNumber
                })
            });

            if (response.ok) {
                setEditMessage({ text: "Student profile successfully updated!", type: "success" });
                fetchStudents();

                // Wait 1.5 seconds, then close modal
                setTimeout(() => {
                    setShowEditModal(false);
                }, 1500);
            } else {
                setEditMessage({ text: "Failed to update student profile.", type: "error" });
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
        setDeleteMessage({ text: "", type: "" }); // Clear old messages
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
                setDeleteMessage({ text: "Student permanently deleted.", type: "success" });
                fetchStudents();

                // Wait 1.5 seconds, then close modal
                setTimeout(() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                }, 1500);
            } else {
                setDeleteMessage({ text: "Failed to delete student.", type: "error" });
            }
        } catch (error) {
            setDeleteMessage({ text: "Server error during deletion.", type: "error" });
        }
    };

    return (
        <div className="admin-student-management-container">

            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Student Management</h1>
                    <p>Manage all student records and information</p>
                </div>
                <button className="add-btn" onClick={() => navigate("/admin/users/student")}>
                    <FiUserPlus style={{marginRight: '8px'}} /> Add Student
                </button>
            </div>

            <div className="table-card">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search active students by username, ID, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

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
                                    <div className="action-icons">
                                        <button className="icon-btn edit-icon" title="Edit Student" onClick={() => triggerEdit(student)}>
                                            <FiEdit />
                                        </button>
                                        <button className="icon-btn delete-icon" title="Permanently Delete" onClick={() => triggerDelete(student.username)}>
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {!loading && students.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
                        No students found matching your search.
                    </p>
                )}
            </div>

            {/* EXPANDED EDIT MODAL */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-box scrollable-modal">
                        <div className="modal-header">
                            <FiEdit className="warning-icon" style={{color: "#2b55cc"}} />
                            <h2>Edit Student Profile</h2>
                        </div>

                        <form onSubmit={submitEdit}>
                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Student ID (Locked)</label>
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
                                    <label>Date of Birth</label>
                                    <input type="date" value={editFormData.dateOfBirth} onChange={(e) => setEditFormData({...editFormData, dateOfBirth: e.target.value})} required />
                                </div>
                                <div className="modal-form-group">
                                    <label>Contact Number</label>
                                    <input type="text" value={editFormData.contactNumber} onChange={(e) => setEditFormData({...editFormData, contactNumber: e.target.value})} required />
                                </div>
                            </div>

                            <div className="modal-form-group">
                                <label>Home Address</label>
                                <textarea value={editFormData.address} onChange={(e) => setEditFormData({...editFormData, address: e.target.value})} rows="2" required />
                            </div>

                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Study Medium</label>
                                    <select value={editFormData.medium} onChange={(e) => setEditFormData({...editFormData, medium: e.target.value})}>
                                        <option value="SINHALA">Sinhala</option>
                                        <option value="ENGLISH">English</option>
                                    </select>
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

                            {/* INLINE FORM MESSAGE (EDIT) */}
                            {editMessage.text && (
                                <div className={`inline-form-message ${editMessage.type}`}>
                                    {editMessage.text}
                                </div>
                            )}

                            <div className="modal-actions" style={{marginTop: "20px"}}>
                                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="confirm-delete-btn" style={{backgroundColor: "#2b55cc"}}>Save Changes</button>
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
                            <h2>Permanently Delete Student?</h2>
                        </div>
                        <p>
                            Are you sure you want to permanently delete <strong>{userToDelete}</strong>?
                            This action will erase all of their data from the database and <strong>cannot be undone</strong>.
                        </p>

                        {/* INLINE FORM MESSAGE (DELETE) */}
                        {deleteMessage.text && (
                            <div className={`inline-form-message ${deleteMessage.type}`}>
                                {deleteMessage.text}
                            </div>
                        )}

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