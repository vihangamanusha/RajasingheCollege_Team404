import { useState, useEffect } from "react";//store and run data auto matically.
import { useNavigate } from "react-router-dom";//page navigation without relord.
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiAlertTriangle } from "react-icons/fi";
import "./AdminTechOfficerManagement.css";

export default function AdminTechOfficerManagement() {
    const navigate = useNavigate();//use this to navigate

    // =========================
    // STATE MANAGEMENT
    // =========================
    const [searchTerm, setSearchTerm] = useState("");//what admin types in search box
    const [officers, setOfficers] = useState([]);//store all the serch data
    const [loading, setLoading] = useState(false);//shows loading message when API runs

    // =========================
    // DELETE MODAL STATE
    // =========================
    const [showDeleteModal, setShowDeleteModal] = useState(false);//Controls delete popup
    const [userToDelete, setUserToDelete] = useState(null);//Stores which user is selected for deletion
    const [deleteMessage, setDeleteMessage] = useState({ text: "", type: "" });

    // =========================
    // EDIT MODAL STATE
    // =========================
    const [showEditModal, setShowEditModal] = useState(false);
    const [editMessage, setEditMessage] = useState({ text: "", type: "" });
    const [originalEditData, setOriginalEditData] = useState(null); // Tracks changes
    const [editFormData, setEditFormData] = useState({//Stores form data while editing officer
        username: "", userId: "", email: "", password: "",
        fullName: "", position: "", assignedArea: "", contactNumber: ""
    });

    // =========================
    // FETCH DATA, FETCH OFFICERS FROM BACKEND
    // =========================
    const fetchOfficers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/search?role=ROLE_TECHNICAL_OFFICER&term=${searchTerm}`,
                { headers: { Authorization: `Bearer ${token}` } }
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
        const delayDebounce = setTimeout(() => fetchOfficers(), 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // =========================
    // FULL PROFILE EDIT LOGIC
    // =========================
    const triggerEdit = async (officer) => {
        setEditMessage({ text: "", type: "" });
        setShowEditModal(true);

        // 1. Instantly load table data and lock the ID/Username
        const initialData = {
            username: officer.username, // Locked
            userId: officer.userId,     // Locked
            email: officer.email || "",
            password: "",
            fullName: "Loading...",
            position: "Loading...",
            assignedArea: "Loading...",
            contactNumber: "Loading..."
        };
        setEditFormData(initialData);

        // 2. Fetch the rest of their profile from the database
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/tech/${officer.username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const fullProfile = await response.json();
                const completeData = {
                    username: officer.username, // Keep Locked
                    userId: officer.userId,     // Keep Locked
                    email: officer.email || "",
                    password: "",
                    fullName: fullProfile.fullName || "",
                    position: fullProfile.position || "",
                    assignedArea: fullProfile.assignedArea || "",
                    contactNumber: fullProfile.contactNumber || ""
                };
                setEditFormData(completeData);
                setOriginalEditData(completeData); // Save snapshot for Change Tracker
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

        // Change Tracker: Prevent saving if nothing was altered
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
            const response = await fetch(`http://localhost:8080/admin/users/tech/update/${editFormData.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: editFormData.email,
                    password: editFormData.password,
                    fullName: editFormData.fullName,
                    position: editFormData.position,
                    assignedArea: editFormData.assignedArea,
                    contactNumber: editFormData.contactNumber
                })
            });

            if (response.ok) {
                setEditMessage({ text: "Officer profile successfully updated!", type: "success" });
                fetchOfficers();
                setTimeout(() => setShowEditModal(false), 1500); // Wait so admin can read success message
            } else {
                setEditMessage({ text: "Failed to update officer profile.", type: "error" });
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
                setDeleteMessage({ text: "Officer permanently deleted.", type: "success" });
                fetchOfficers();
                setTimeout(() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                }, 1500);
            } else {
                setDeleteMessage({ text: "Failed to delete officer.", type: "error" });
            }
        } catch (error) {
            setDeleteMessage({ text: "Server error during deletion.", type: "error" });
        }
    };

    return (
        <div className="admin-tech-management-container">
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Technical Officer Management</h1>
                    <p>Manage system administrators and technical staff</p>
                </div>
                <button className="add-btn tech-btn" onClick={() => navigate("/admin/users/tech")}>
                    <FiUserPlus style={{marginRight: '8px'}} /> Add Officer
                </button>
            </div>

            <div className="table-card">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search active officers by username, ID, or email..."
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
                                        <button className="icon-btn edit-icon" title="Edit Officer" onClick={() => triggerEdit(officer)}>
                                            <FiEdit />
                                        </button>
                                        <button className="icon-btn delete-icon" title="Permanently Delete" onClick={() => triggerDelete(officer.username)}>
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

            {/* EXPANDED EDIT MODAL */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-box scrollable-modal">
                        <div className="modal-header">
                            <FiEdit className="warning-icon" style={{color: "#0f766e"}} />
                            <h2>Edit Officer Profile</h2>
                        </div>

                        <form onSubmit={submitEdit}>
                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Officer ID (Locked)</label>
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
                                    <label>Position / Title</label>
                                    <select
                                        value={editFormData.position}
                                        onChange={(e) => setEditFormData({...editFormData, position: e.target.value})}
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    >
                                        <option value="" disabled>Select Position</option>
                                        <option value="Lab Assistant 1">Lab Assistant 1</option>
                                        <option value="Lab Assistant 2">Lab Assistant 2</option>
                                    </select>
                                </div>
                                <div className="modal-form-group">
                                    <label>Assigned Area</label>
                                    <select
                                        value={editFormData.assignedArea}
                                        onChange={(e) => setEditFormData({...editFormData, assignedArea: e.target.value})}
                                        required
                                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    >
                                        <option value="" disabled>Select Computer Lab</option>
                                        <option value="Computer Lab 1">Computer Lab 1</option>
                                        <option value="Computer Lab 2">Computer Lab 2</option>
                                        <option value="Computer Lab 3">Computer Lab 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Contact Number</label>
                                    <input
                                        type="tel"
                                        pattern="^\+?[0-9\s\-\(\)]{7,15}$"
                                        title="Please enter a valid phone number (e.g. 0771234567 or +94771234567)"
                                        value={editFormData.contactNumber}
                                        onChange={(e) => setEditFormData({...editFormData, contactNumber: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                                        title="Please enter a valid email address"
                                        value={editFormData.email}
                                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                        required
                                    />
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

                            {/* INLINE FORM MESSAGE */}
                            {editMessage.text && (
                                <div className={`inline-form-message ${editMessage.type}`}>
                                    {editMessage.text}
                                </div>
                            )}

                            <div className="modal-actions" style={{marginTop: "20px"}}>
                                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="confirm-delete-btn" style={{backgroundColor: "#0f766e"}}>Save Changes</button>
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
                            <h2>Permanently Delete Officer?</h2>
                        </div>
                        <p>Are you sure you want to permanently delete <strong>{userToDelete}</strong>? This action cannot be undone.</p>

                        {/* INLINE FORM MESSAGE */}
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