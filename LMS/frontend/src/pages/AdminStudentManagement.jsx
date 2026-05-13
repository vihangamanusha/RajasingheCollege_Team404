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

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState({ text: "", type: "" });

    const [showEditModal, setShowEditModal] = useState(false);

    // NEW: fieldErrors stores specific messages for each input (e.g., { fullName: "Error..." })
    const [fieldErrors, setFieldErrors] = useState({});
    // generalMessage handles success or server-wide errors
    const [generalMessage, setGeneralMessage] = useState({ text: "", type: "" });

    const [originalEditData, setOriginalEditData] = useState(null);
    const [editFormData, setEditFormData] = useState({
        username: "", userId: "", email: "", password: "",
        fullName: "", dateOfBirth: "", address: "", medium: "Sinhala", contactNumber: ""
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
    // EDIT LOGIC & FIELD VALIDATION
    // =========================
    const triggerEdit = async (student) => {
        setFieldErrors({}); // Clear old errors
        setGeneralMessage({ text: "", type: "" });
        setShowEditModal(true);

        // Placeholder while fetching full profile
        setEditFormData({ ...student, password: "", fullName: "Loading..." });

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/student/${student.username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const fullProfile = await response.json();
                const completeData = {
                    ...student,
                    password: "",
                    fullName: fullProfile.fullName || "",
                    dateOfBirth: fullProfile.dateOfBirth || "",
                    address: fullProfile.address || "",
                    medium: fullProfile.medium || "SINHALA",
                    contactNumber: fullProfile.contactNumber || ""
                };
                setEditFormData(completeData);
                setOriginalEditData(completeData);
            }
        } catch (error) {
            setGeneralMessage({ text: "Failed to fetch full profile data.", type: "error" });
        }
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        setFieldErrors({}); // Reset field errors
        setGeneralMessage({ text: "", type: "" }); // Reset general message

        const errors = {};

        // 1. Name Check: Letters and spaces only
        if (!/^[a-zA-Z\s]+$/.test(editFormData.fullName)) {
            errors.fullName = "Student Name can only contain letters and spaces.";
        }

        // 2. Address Check: Letters, numbers, and commas only
        if (!/^[a-zA-Z0-9\s,]+$/.test(editFormData.address)) {
            errors.address = "Address can only contain letters, numbers, and commas.";
        }

        // 3. Contact Check: Exactly 10 digits
        if (!/^\d{10}$/.test(editFormData.contactNumber)) {
            errors.contactNumber = "Contact number must be exactly 10 digits.";
        }

        // 4. Email Check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (editFormData.email && !emailPattern.test(editFormData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        // 5. Password Check (only if they are changing it)
        if (editFormData.password.trim() !== "" && editFormData.password.length < 8) {
            errors.password = "New password must be at least 8 characters.";
        }

        // If any errors were found, update state and STOP the submission
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // 6. Change Detection
        const hasChanges = Object.keys(originalEditData).some(key => {
            if (key === 'password') return editFormData.password.trim() !== "";
            return originalEditData[key] !== editFormData[key];
        });

        if (!hasChanges) {
            setGeneralMessage({ text: "No changes detected to save.", type: "error" });
            return;
        }

        // ---------------------------------------------------------
        // API SUBMISSION
        // ---------------------------------------------------------
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/admin/users/student/update/${editFormData.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...editFormData,
                    dateOfBirth: editFormData.dateOfBirth === "" ? null : editFormData.dateOfBirth
                })
            });

            if (response.ok) {
                setGeneralMessage({ text: "Student profile updated successfully! ✅", type: "success" });
                fetchStudents();
                setTimeout(() => setShowEditModal(false), 1500);
            } else {
                const errorText = await response.text();
                setGeneralMessage({ text: `Update failed: ${errorText}`, type: "error" });
            }
        } catch (error) {
            setGeneralMessage({ text: "Server error during update.", type: "error" });
        }
    };

    // =========================
    // DELETE LOGIC
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
                setDeleteMessage({ text: "Student permanently deleted.", type: "success" });
                fetchStudents();
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
            {/* Header section */}
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Student Management</h1>
                    <p>Manage all student records and information</p>
                </div>
                <button className="add-btn" onClick={() => navigate("/admin/users/student")}>
                    <FiUserPlus style={{marginRight: '8px'}} /> Add Student
                </button>
            </div>

            {/* Table section */}
            <div className="table-card">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search active students..."
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
                                        <button className="icon-btn edit-icon" onClick={() => triggerEdit(student)}><FiEdit /></button>
                                        <button className="icon-btn delete-icon" onClick={() => triggerDelete(student.username)}><FiTrash2 /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* EDIT MODAL WITH FIELD-SPECIFIC ERRORS */}
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
                                    <label>Username (Locked)</label>
                                    <input type="text" value={editFormData.username} disabled />
                                </div>
                            </div>

                            {/* FULL NAME FIELD */}
                            <div className="modal-form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className={fieldErrors.fullName ? "error-input" : ""}
                                    value={editFormData.fullName}
                                    onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                                />
                                {fieldErrors.fullName && <span className="error-text">{fieldErrors.fullName}</span>}
                            </div>

                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" value={editFormData.dateOfBirth} onChange={(e) => setEditFormData({...editFormData, dateOfBirth: e.target.value})} required />
                                </div>
                                {/* CONTACT NUMBER FIELD */}
                                <div className="modal-form-group">
                                    <label>Contact Number</label>
                                    <input
                                        type="text"
                                        className={fieldErrors.contactNumber ? "error-input" : ""}
                                        value={editFormData.contactNumber}
                                        onChange={(e) => setEditFormData({...editFormData, contactNumber: e.target.value})}
                                    />
                                    {fieldErrors.contactNumber && <span className="error-text">{fieldErrors.contactNumber}</span>}
                                </div>
                            </div>

                            {/* ADDRESS FIELD */}
                            <div className="modal-form-group">
                                <label>Home Address</label>
                                <textarea
                                    className={fieldErrors.address ? "error-input" : ""}
                                    value={editFormData.address}
                                    onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
                                    rows="2"
                                />
                                {fieldErrors.address && <span className="error-text">{fieldErrors.address}</span>}
                            </div>

                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Study Medium</label>
                                    <select value={editFormData.medium} onChange={(e) => setEditFormData({...editFormData, medium: e.target.value})}>
                                        <option value="Sinhala">Sinhala</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                {/* EMAIL FIELD */}
                                <div className="modal-form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        className={fieldErrors.email ? "error-input" : ""}
                                        value={editFormData.email}
                                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                    />
                                    {fieldErrors.email && <span className="error-text">{fieldErrors.email}</span>}
                                </div>
                            </div>

                            {/* PASSWORD RESET FIELD */}
                            <div className="modal-form-group" style={{borderTop: "1px solid #e2e8f0", paddingTop: "10px"}}>
                                <label style={{color: "#dc2626"}}>Password Overwrite (Optional)</label>
                                <input
                                    type="password"
                                    className={fieldErrors.password ? "error-input" : ""}
                                    placeholder="Min 8 characters"
                                    value={editFormData.password}
                                    onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                                />
                                {fieldErrors.password && <span className="error-text">{fieldErrors.password}</span>}
                            </div>

                            {/* SUCCESS/ERROR NOTIFICATION AT BOTTOM */}
                            {generalMessage.text && (
                                <div className={`inline-form-message ${generalMessage.type}`}>
                                    {generalMessage.text}
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

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <FiAlertTriangle className="warning-icon" style={{color: "#dc2626"}} />
                            <h2>Permanently Delete Student?</h2>
                        </div>
                        <p>Are you sure you want to delete <strong>{userToDelete}</strong>?</p>
                        {deleteMessage.text && <div className={`inline-form-message ${deleteMessage.type}`}>{deleteMessage.text}</div>}
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="confirm-delete-btn" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}