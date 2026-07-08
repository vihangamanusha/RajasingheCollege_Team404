import { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import "./AdminTechOfficerManagement.css"; // Reuse styling for absolute layout consistency

export default function AdminNonAcademicManagement({ readOnly = false }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletionReason, setDeletionReason] = useState("");
    const [reasonError, setReasonError] = useState("");

    // Messages
    const [message, setMessage] = useState({ text: "", type: "" });
    const [editMessage, setEditMessage] = useState({ text: "", type: "" });
    const [addMessage, setAddMessage] = useState({ text: "", type: "" });

    // Forms
    const [addForm, setAddForm] = useState({
        nonAcademicId: "",
        fullName: "",
        email: "",
        contactNumber: "",
        nic: "",
        designation: "Clerk",
        enrollDate: new Date().toISOString().split("T")[0],
        emergencyContact: "",
        nicFrontUrl: "",
        nicBackUrl: ""
    });

    const [editForm, setEditForm] = useState({
        nonAcademicId: "",
        fullName: "",
        email: "",
        contactNumber: "",
        nic: "",
        designation: "",
        enrollDate: "",
        emergencyContact: "",
        nicFrontUrl: "",
        nicBackUrl: ""
    });

    const [itemToDelete, setItemToDelete] = useState(null);

    const designations = ["Clerk", "Librarian", "Office Assistant", "Lab Attendant", "Security Officer", "Store Keeper", "Gardener"];

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const url = searchTerm
                ? `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/non-academic/search?term=${searchTerm}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/non-academic/all`;
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStaffList(data);
            }
        } catch (error) {
            console.error("Error loading non-academic staff:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => fetchStaff(), 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleFileUpload = async (file, field, setFormObj, formObj, setMessageObj) => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/files/upload`, {
                method: "POST",
                body: formData
            });
            if (res.ok) {
                const fileUrl = await res.text();
                setFormObj(prev => ({ ...prev, [field]: fileUrl }));
                setMessageObj({ text: `${field === "nicFrontUrl" ? "NIC Front" : "NIC Back"} uploaded successfully!`, type: "success" });
            } else {
                const errMsg = await res.text();
                setMessageObj({ text: errMsg || "File upload failed", type: "error" });
            }
        } catch (err) {
            console.error("Error uploading file:", err);
            setMessageObj({ text: "Error uploading file", type: "error" });
        }
    };

    const openAddModal = async () => {
        setAddMessage({ text: "", type: "" });
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/non-academic/generate-id`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const nextId = await res.text();
                setAddForm({
                    nonAcademicId: nextId,
                    fullName: "",
                    email: "",
                    contactNumber: "",
                    nic: "",
                    designation: "Clerk",
                    enrollDate: new Date().toISOString().split("T")[0],
                    emergencyContact: "",
                    nicFrontUrl: "",
                    nicBackUrl: ""
                });
                setShowAddModal(true);
            }
        } catch (err) {
            console.error("Failed to generate ID:", err);
        }
    };

    const validateForm = (form) => {
        if (!form.fullName.trim()) return "Full name is required!";
        if (!form.fullName.match(/^[a-zA-Z\s]+$/)) return "Full name can only contain letters and spaces!";
        if (!form.contactNumber.match(/^\d{10}$/)) return "Contact number must be exactly 10 digits!";
        if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email address pattern!";
        if (!form.nic.match(/^([0-9]{9}[xXvV]|[0-9]{12})$/)) return "Invalid Sri Lankan NIC format!";
        if (!form.emergencyContact || !form.emergencyContact.match(/^\d{10}$/)) return "Emergency contact number must be exactly 10 digits!";
        if (!form.nicFrontUrl) return "NIC Front image is required!";
        if (!form.nicBackUrl) return "NIC Back image is required!";
        return null;
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm(addForm);
        if (error) {
            setAddMessage({ text: error, type: "error" });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/non-academic/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(addForm)
            });
            const text = await res.text();
            if (res.ok) {
                setAddMessage({ text: "Staff member registered successfully!", type: "success" });
                setTimeout(() => {
                    setShowAddModal(false);
                    fetchStaff();
                }, 1000);
            } else {
                setAddMessage({ text: text || "Registration failed", type: "error" });
            }
        } catch (err) {
            setAddMessage({ text: "Error connecting to server", type: "error" });
        }
    };

    const triggerEdit = (staff) => {
        setEditMessage({ text: "", type: "" });
        setEditForm({
            nonAcademicId: staff.nonAcademicId,
            fullName: staff.fullName,
            email: staff.email || "",
            contactNumber: staff.contactNumber || "",
            nic: staff.nic || "",
            designation: staff.designation || "Clerk",
            enrollDate: staff.enrollDate || "",
            emergencyContact: staff.emergencyContact || "",
            nicFrontUrl: staff.nicFrontUrl || "",
            nicBackUrl: staff.nicBackUrl || ""
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm(editForm);
        if (error) {
            setEditMessage({ text: error, type: "error" });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/non-academic/update/${editForm.nonAcademicId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });
            const text = await res.text();
            if (res.ok) {
                setEditMessage({ text: "Profile updated successfully!", type: "success" });
                setTimeout(() => {
                    setShowEditModal(false);
                    fetchStaff();
                }, 1000);
            } else {
                setEditMessage({ text: text || "Update failed", type: "error" });
            }
        } catch (err) {
            setEditMessage({ text: "Error connecting to server", type: "error" });
        }
    };

    const triggerDelete = (staff) => {
        setMessage({ text: "", type: "" });
        setItemToDelete(staff);
        setDeletionReason("");
        setReasonError("");
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (deletionReason.trim().length < 5) {
            setReasonError("Reason must be at least 5 characters long.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/non-academic/delete/${itemToDelete.nonAcademicId}?reason=${encodeURIComponent(deletionReason)}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setShowDeleteModal(false);
                fetchStaff();
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div className="admin-tech-management-container">
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Non-Academic Staff Management</h1>
                    <p>Register, update, and manage school non-academic service personnel profiles</p>
                </div>
                {!readOnly && (
                    <button className="add-btn tech-btn" onClick={openAddModal}>
                        <FiUserPlus /> Add Staff Member
                    </button>
                )}
            </div>

            <div className="table-card">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by ID, Name, Email, or Designation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>Loading staff profiles...</div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Full Name</th>
                                <th>NIC</th>
                                <th>Contact Number</th>
                                <th>Designation</th>
                                <th>Enroll Date</th>
                                <th>Status</th>
                                {!readOnly && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.length > 0 ? (
                                staffList.map((staff) => (
                                    <tr key={staff.nonAcademicId}>
                                        <td style={{ fontWeight: "600", color: "#0f766e" }}>{staff.nonAcademicId}</td>
                                        <td>{staff.fullName}</td>
                                        <td>{staff.nic}</td>
                                        <td>{staff.contactNumber}</td>
                                        <td>{staff.designation}</td>
                                        <td>{staff.enrollDate}</td>
                                        <td>
                                            <span className="badge active">Active</span>
                                        </td>
                                        {!readOnly && (
                                            <td>
                                                <div className="action-icons">
                                                    <button className="icon-btn edit-icon" onClick={() => triggerEdit(staff)}>
                                                        <FiEdit />
                                                    </button>
                                                    <button className="icon-btn delete-icon" onClick={() => triggerDelete(staff)}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={readOnly ? "7" : "8"} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                        No active non-academic staff profiles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* ADD MODAL */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-box scrollable-modal" style={{ width: "550px" }}>
                        <div className="modal-header">
                            <h2>Register Non-Academic Staff</h2>
                        </div>
                        <p>Fill in the staff personal information and enrollment details.</p>
                        <form onSubmit={handleAddSubmit}>
                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Staff ID (Auto Generated)</label>
                                    <input type="text" value={addForm.nonAcademicId} disabled />
                                </div>
                                <div className="modal-form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={addForm.fullName}
                                        onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>NIC Number *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 199923456789 or 991234567v"
                                        value={addForm.nic}
                                        onChange={(e) => setAddForm({ ...addForm, nic: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Contact Number *</label>
                                    <input
                                        type="text"
                                        placeholder="10 Digits"
                                        value={addForm.contactNumber}
                                        onChange={(e) => setAddForm({ ...addForm, contactNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={addForm.email}
                                        onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Designation *</label>
                                    <select
                                        value={addForm.designation}
                                        onChange={(e) => setAddForm({ ...addForm, designation: e.target.value })}
                                        required
                                    >
                                        {designations.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-form-group" style={{ gridColumn: "span 2" }}>
                                    <label>Enroll Date *</label>
                                    <input
                                        type="date"
                                        value={addForm.enrollDate}
                                        onChange={(e) => setAddForm({ ...addForm, enrollDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Emergency Contact *</label>
                                    <input
                                        type="text"
                                        placeholder="Emergency Contact"
                                        value={addForm.emergencyContact}
                                        onChange={(e) => setAddForm({ ...addForm, emergencyContact: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>NIC Front Image *</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e.target.files[0], "nicFrontUrl", setAddForm, addForm, setAddMessage)}
                                        required
                                    />
                                    {addForm.nicFrontUrl && (
                                        <div style={{ marginTop: "4px" }}>
                                            <a href={addForm.nicFrontUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#0f766e", fontWeight: "600" }}>
                                                View Front Image
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-form-group" style={{ gridColumn: "span 2" }}>
                                    <label>NIC Back Image *</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e.target.files[0], "nicBackUrl", setAddForm, addForm, setAddMessage)}
                                        required
                                    />
                                    {addForm.nicBackUrl && (
                                        <div style={{ marginTop: "4px" }}>
                                            <a href={addForm.nicBackUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#0f766e", fontWeight: "600" }}>
                                                View Back Image
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {addMessage.text && (
                                <div className={`inline-form-message ${addMessage.type}`}>{addMessage.text}</div>
                            )}

                            <div className="modal-actions" style={{ marginTop: "20px" }}>
                                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="confirm-delete-btn" style={{ backgroundColor: "#0f766e" }}>
                                    Register Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-box scrollable-modal" style={{ width: "550px" }}>
                        <div className="modal-header">
                            <h2>Edit Staff Profile</h2>
                        </div>
                        <p>Modify the non-academic staff profile details below.</p>
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-grid">
                                <div className="modal-form-group">
                                    <label>Staff ID (Locked)</label>
                                    <input type="text" value={editForm.nonAcademicId} disabled />
                                </div>
                                <div className="modal-form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={editForm.fullName}
                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>NIC Number *</label>
                                    <input
                                        type="text"
                                        placeholder="NIC"
                                        value={editForm.nic}
                                        onChange={(e) => setEditForm({ ...editForm, nic: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Contact Number *</label>
                                    <input
                                        type="text"
                                        placeholder="10 Digits"
                                        value={editForm.contactNumber}
                                        onChange={(e) => setEditForm({ ...editForm, contactNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Designation *</label>
                                    <select
                                        value={editForm.designation}
                                        onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                                        required
                                    >
                                        {designations.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-form-group" style={{ gridColumn: "span 2" }}>
                                    <label>Enroll Date *</label>
                                    <input
                                        type="date"
                                        value={editForm.enrollDate}
                                        onChange={(e) => setEditForm({ ...editForm, enrollDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Emergency Contact *</label>
                                    <input
                                        type="text"
                                        placeholder="Emergency Contact"
                                        value={editForm.emergencyContact}
                                        onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>NIC Front Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e.target.files[0], "nicFrontUrl", setEditForm, editForm, setEditMessage)}
                                    />
                                    {editForm.nicFrontUrl && (
                                        <div style={{ marginTop: "4px" }}>
                                            <a href={editForm.nicFrontUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#0f766e", fontWeight: "600" }}>
                                                View Current Front
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-form-group" style={{ gridColumn: "span 2" }}>
                                    <label>NIC Back Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e.target.files[0], "nicBackUrl", setEditForm, editForm, setEditMessage)}
                                    />
                                    {editForm.nicBackUrl && (
                                        <div style={{ marginTop: "4px" }}>
                                            <a href={editForm.nicBackUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#0f766e", fontWeight: "600" }}>
                                                View Current Back
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {editMessage.text && (
                                <div className={`inline-form-message ${editMessage.type}`}>{editMessage.text}</div>
                            )}

                            <div className="modal-actions" style={{ marginTop: "20px" }}>
                                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="confirm-delete-btn" style={{ backgroundColor: "#0f766e" }}>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <h2 style={{ color: "#ef4444" }}>Confirm Soft Deletion</h2>
                        </div>
                        <p>
                            Are you sure you want to deactivate the staff profile for{" "}
                            <strong>{itemToDelete?.fullName}</strong> ({itemToDelete?.nonAcademicId})? This action soft deletes their record from all active service listings.
                        </p>

                        <div className="modal-form-group">
                            <label>Reason for Deactivation *</label>
                            <textarea
                                placeholder="Enter reason (at least 5 characters)..."
                                value={deletionReason}
                                onChange={(e) => {
                                    setDeletionReason(e.target.value);
                                    if (e.target.value.trim().length >= 5) setReasonError("");
                                }}
                                style={{ minHeight: "80px", resize: "vertical" }}
                            />
                            {reasonError && <span className="error">{reasonError}</span>}
                        </div>

                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className="confirm-delete-btn" onClick={handleDeleteConfirm}>
                                Soft Delete Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
