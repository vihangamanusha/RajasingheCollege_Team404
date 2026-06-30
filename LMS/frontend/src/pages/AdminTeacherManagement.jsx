// AdminTeacherManagement.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";//page navigation without relord.
import {
    FiSearch,
    FiEdit,
    FiTrash2,
    FiUserPlus,
    FiAlertTriangle
} from "react-icons/fi";

import "./AdminTeacherManagement.css";

export default function AdminTeacherManagement() {

    const navigate = useNavigate();//use to move between page.

    // =========================================
    // STATE MANAGEMENT
    // =========================================

    const [searchTerm, setSearchTerm] = useState("");//what admin types in search box
    const [teachers, setTeachers] = useState([]);//store list of teacher
    const [loading, setLoading] = useState(false);//controoler show lord msg
    const [occupiedRoles, setOccupiedRoles] = useState([]);
    const [deleteStage, setDeleteStage] = useState(1);
    const [deletionReason, setDeletionReason] = useState("");
    const [reasonError, setReasonError] = useState("");

    const fetchOccupied = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/admin/users/occupied-designations", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setOccupiedRoles(data);
            }
        } catch (err) {
            console.error("Failed to fetch occupied designations", err);
        }
    };

    const isRoleAvailable = (role) => {
        if (role === "Subject Teacher") {
            return true;
        }
        if (editFormData && editFormData.subRole === role) {
            return true;
        }
        return !occupiedRoles.includes(role);
    };

    // DELETE
    const [showDeleteModal, setShowDeleteModal] = useState(false);//Controls delete popup
    const [userToDelete, setUserToDelete] = useState(null);//Stores which user is selected for deletion

    const [deleteMessage, setDeleteMessage] = useState({
        text: "",
        type: ""
    });

    // EDIT
    const [showEditModal, setShowEditModal] = useState(false);//Controls edit popup

    const [editMessage, setEditMessage] = useState({//Stores form data while editing officer
        text: "",
        type: ""
    });

    const [originalEditData, setOriginalEditData] = useState(null);//check if user edited anything

    const [editFormData, setEditFormData] = useState({
        username: "",
        userId: "",
        email: "",
        password: "",
        fullName: "",
        subjectSpecialization: [],
        contactNumber: "",
        subRole: "",
        createdDate: ""
    });

    // =========================================
    // UTILS
    // =========================================

    const calculateYearsSince = (dateString) => {
        if (!dateString) return 0;
        const regDate = new Date(dateString);
        const today = new Date();
        let years = today.getFullYear() - regDate.getFullYear();
        const m = today.getMonth() - regDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < regDate.getDate())) {
            years--;
        }
        return years;
    };

    // =========================================
    // SUBJECTS + DESIGNATIONS
    // =========================================

    const subjectsList = [//List of available subjects
        "Mathematics",
        "Science",
        "English",
        "History",
        "ICT",
        "Commerce",
        "Art",
        "Music"
    ];

    const designationList = [//list of teacher roles
        "Subject Teacher",
        "Class Teacher",
        "Section Head",
        "Grade Coordinator",
        "Deputy Principal"
    ];

    // =========================================
    // FETCH TEACHERS
    // =========================================

    const fetchTeachers = async () => {//this function  get the teacher from the backend.

        setLoading(true);//show loadin databse...

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(//secnd request to backend
                `http://localhost:8080/admin/users/search?role=ROLE_TEACHER&term=${searchTerm}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                const data = await response.json();

                setTeachers(data);
            }

        } catch (error) {

            console.error("Server Error:", error);

        } finally {

            setLoading(false);//stop lording.
        }
    };

    useEffect(() => {

        //waits 300ms before calling API
        const delayDebounce = setTimeout(() => {

            fetchTeachers();
            fetchOccupied();

        }, 300);

        return () => clearTimeout(delayDebounce);

    }, [searchTerm]);

    // =========================================
    // EDIT MODAL OPEN
    // =========================================

    const triggerEdit = async (teacher) => {
        fetchOccupied();
        setEditMessage({
            text: "",
            type: ""
        });

        setShowEditModal(true);

        const initialData = {
            username: teacher.username,
            userId: teacher.userId,
            email: teacher.email || "",
            password: "",
            fullName: "Loading...",
            subjectSpecialization: [],
            contactNumber: "Loading...",
            subRole: teacher.subRole || "",
            createdDate: teacher.createdDate || ""
        };

        setEditFormData(initialData);

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/admin/users/teacher/${teacher.username}`,//call backend controller.
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                const fullProfile = await response.json();

                const completeData = {

                    username: teacher.username,
                    userId: teacher.userId,
                    email: teacher.email || "",
                    password: "",

                    fullName: fullProfile.fullName || "",

                    subjectSpecialization:
                        fullProfile.subjectSpecialization
                            ? fullProfile.subjectSpecialization.split(",")
                            : [],

                    contactNumber: fullProfile.contactNumber || "",

                    subRole: teacher.subRole || "",
                    createdDate: teacher.createdDate || ""
                };

                setEditFormData(completeData);

                setOriginalEditData(completeData);

            } else {

                setEditMessage({
                    text: "Failed to load teacher details.",
                    type: "error"
                });
            }

        } catch (error) {

            setEditMessage({
                text: "Server connection error.",
                type: "error"
            });
        }
    };

    // =========================================
    // NAME VALIDATION
    // =========================================

    const handleNameChange = (e) => {

        const value = e.target.value;

        // ONLY LETTERS + SPACES

        if (/^[A-Za-z\s]*$/.test(value)) {

            setEditFormData({
                ...editFormData,
                fullName: value
            });
        }
    };

    // =========================================
    // SUBJECT CHECKBOXES
    // =========================================

    const handleSubjectChange = (subject) => {

        const updatedSubjects =
            editFormData.subjectSpecialization.includes(subject)

                ? editFormData.subjectSpecialization.filter(
                    (s) => s !== subject
                )

                : [
                    ...editFormData.subjectSpecialization,
                    subject
                ];

        setEditFormData({
            ...editFormData,
            subjectSpecialization: updatedSubjects
        });
    };

    // =========================================
    // SAVE EDIT
    // =========================================

    const submitEdit = async (e) => {//save chnges

        e.preventDefault();//prevent refresh

        setEditMessage({
            text: "",
            type: ""
        });

        if (!originalEditData) {

            setEditMessage({
                text: "Original data failed to load.",
                type: "error"
            });

            return;
        }

        const hasChanges = Object.keys(originalEditData).some((key) => {

            if (key === "password") {

                return editFormData.password.trim() !== "";
            }

            return JSON.stringify(originalEditData[key]) !==
                JSON.stringify(editFormData[key]);
        });

        if (!hasChanges) {

            setEditMessage({
                text: "No changes detected.",
                type: "error"
            });

            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/admin/users/teacher/update/${editFormData.username}`,//call controller
                {
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

                        subjectSpecialization:
                            editFormData.subjectSpecialization.join(","),

                        contactNumber: editFormData.contactNumber,

                        subRole: editFormData.subRole
                    })
                }
            );

            if (response.ok) {

                setEditMessage({
                    text: "Teacher profile updated successfully!",
                    type: "success"
                });

                fetchTeachers();//refresh list
                fetchOccupied();

                setTimeout(() => {

                    setShowEditModal(false);

                }, 1500);

            } else {

                const errorText = await response.text();

                setEditMessage({
                    text: `Failed to update: ${errorText}`,
                    type: "error"
                });
            }

        } catch (error) {

            setEditMessage({
                text: "Server error during update.",
                type: "error"
            });
        }
    };

    // =========================================
    // DELETE
    // =========================================

    const triggerDelete = (username) => {
        setUserToDelete(username);
        setDeleteStage(1);
        setDeletionReason("");
        setReasonError("");
        setDeleteMessage({
            text: "",
            type: ""
        });
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!deletionReason.trim()) {
            setReasonError("Reason for deletion is compulsory.");
            return;
        }
        setReasonError("");

        setDeleteMessage({
            text: "",
            type: ""
        });

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/users/delete/${userToDelete}?reason=${encodeURIComponent(deletionReason)}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                setDeleteMessage({
                    text: "Teacher deleted successfully.",
                    type: "success"
                });

                fetchTeachers();
                fetchOccupied();

                setTimeout(() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                }, 1500);

            } else {
                const errorText = await response.text();
                setDeleteMessage({
                    text: `Failed to delete: ${errorText}`,
                    type: "error"
                });
            }

        } catch (error) {
            setDeleteMessage({
                text: "Server error during deletion.",
                type: "error"
            });
        }
    };

    const allDesignationsList = [
        "Subject Teacher",
        "Section Head Grade 6",
        "Section Head Grade 7",
        "Section Head Grade 8",
        "Section Head Grade 9",
        "Section Head Grade 10",
        "Section Head Grade 11",
        "Deputy Principal (Administrative)",
        "Deputy Principal (Development)"
    ];

    const editDesignations = allDesignationsList.filter(role => 
        role === "Subject Teacher" || 
        (editFormData && editFormData.subRole === role) ||
        !occupiedRoles.includes(role)
    );

    // =========================================
    // RETURN
    // =========================================

    return (

        <div className="admin-teacher-management-container">

            {/* HEADER */}

            <div className="page-header-flex">

                <div className="header-text">

                    <h1>Teacher Management</h1>

                    <p>
                        Manage all teaching staff records
                    </p>

                </div>

                <button
                    className="add-btn teacher-btn"
                    onClick={() =>
                        navigate("/admin/users/teacher")
                    }
                >
                    <FiUserPlus />
                    Add Teacher
                </button>

            </div>

            {/* TABLE CARD */}

            <div className="table-card">

                {/* SEARCH */}

                <div className="search-container">

                    <FiSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search teacher..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

                {/* TABLE */}

                {loading ? (

                    <p className="loading-text">
                        Loading database...
                    </p>

                ) : (

                    <table className="data-table">

                        <thead>

                        <tr>
                            <th>Teacher ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Register Date</th>
                            <th>Actions</th>
                        </tr>

                        </thead>

                        <tbody>

                        {teachers.map((teacher, index) => (

                            <tr key={index}>

                                <td>
                                    <strong>
                                        {teacher.userId}
                                    </strong>
                                </td>

                                <td>
                                    {teacher.username}
                                </td>

                                <td>
                                    {teacher.email || "N/A"}
                                </td>

                                <td>
                                    <span className={`role-badge ${teacher.subRole?.toLowerCase().replace(/\s+/g, '-') || 'subject-teacher'}`}>
                                        {teacher.subRole || "Subject Teacher"}
                                    </span>
                                </td>

                                <td>
                                    {teacher.createdDate || "N/A"}
                                </td>

                                <td>

                                    <div className="action-icons">

                                        <button
                                            className="icon-btn edit-icon"
                                            title="Edit Profile"
                                            onClick={() =>
                                                triggerEdit(teacher)
                                            }
                                        >
                                            <FiEdit />
                                        </button>

                                        {/* Promotion Logic */}
                                        {calculateYearsSince(teacher.createdDate) >= 1 && (//show promotion button
                                            <button
                                                className="icon-btn promote-icon"
                                                title="Manage Promotion"
                                                onClick={() => triggerEdit(teacher)}
                                                style={{ color: '#f39c12' }}
                                            >
                                                <FiUserPlus />
                                            </button>
                                        )}

                                        <button
                                            className="icon-btn delete-icon"
                                            title="Delete User"
                                            onClick={() =>
                                                triggerDelete(teacher.username)
                                            }
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

            </div>

            {/* =========================================
               EDIT MODAL
            ========================================= */}

            {showEditModal && (

                <div className="modal-overlay">

                    <div className="modal-box scrollable-modal">

                        <div className="modal-header">

                            <FiEdit className="warning-icon" />

                            <h2>Edit Teacher Profile</h2>

                        </div>

                        <form onSubmit={submitEdit}>

                            <div className="modal-grid">

                                <div className="modal-form-group">

                                    <label>Teacher ID</label>

                                    <input
                                        type="text"
                                        value={editFormData.userId}
                                        disabled
                                    />

                                </div>

                                <div className="modal-form-group">

                                    <label>Username</label>

                                    <input
                                        type="text"
                                        value={editFormData.username}
                                        disabled
                                    />

                                </div>

                            </div>

                            <div className="modal-form-group">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    value={editFormData.fullName}
                                    onChange={handleNameChange}
                                    required
                                />

                                <small className="field-note">
                                    Only letters allowed
                                </small>

                            </div>

                            <div className="modal-form-group">

                                <label>
                                    Subject Specialization
                                </label>

                                <div className="checkbox-group">

                                    {subjectsList.map((subject) => (

                                        <label
                                            key={subject}
                                            className="checkbox-item"
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    editFormData.subjectSpecialization.includes(subject)
                                                }
                                                onChange={() =>
                                                    handleSubjectChange(subject)
                                                }
                                            />

                                            {subject}

                                        </label>

                                    ))}

                                </div>

                            </div>

                            <div className="modal-form-group">

                                <label>
                                    Designation
                                </label>

                                <select
                                    value={editFormData.subRole}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            subRole: e.target.value
                                        })
                                    }
                                >
                                    {editDesignations.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>

                            </div>

                            <div className="modal-grid">

                                <div className="modal-form-group">

                                    <label>Contact Number</label>

                                    <input
                                        type="text"
                                        value={editFormData.contactNumber}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                contactNumber: e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="modal-form-group">

                                    <label>Email Address</label>

                                    <input
                                        type="email"
                                        value={editFormData.email}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                email: e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                            <div className="password-section">

                                <label className="password-title">
                                    Password Reset
                                </label>

                                <p className="password-description">
                                    Leave blank to keep current password
                                </p>

                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={editFormData.password}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            password: e.target.value
                                        })
                                    }
                                />

                            </div>

                            {editMessage.text && (

                                <div className={`inline-form-message ${editMessage.type}`}>

                                    {editMessage.text}

                                </div>

                            )}

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() =>
                                        setShowEditModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="confirm-delete-btn save-btn"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* =========================================
               DELETE MODAL
            ========================================= */}

            {showDeleteModal && (

                <div className="modal-overlay">

                    <div className="modal-box delete-modal">

                        <div className="modal-header delete-header">

                            <FiAlertTriangle className="delete-warning-icon" />

                            <h2>Delete Teacher</h2>

                        </div>

                        <p className="delete-text">
                            Do you want to delete this teacher account?
                        </p>

                        {deleteStage === 2 && (
                            <div style={{ marginTop: "15px", marginBottom: "15px", textAlign: "left" }}>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "5px" }}>
                                    Please enter the reason for deletion (compulsory):
                                </label>
                                <textarea
                                    placeholder="Enter reason for deletion"
                                    value={deletionReason}
                                    onChange={(e) => {
                                        setDeletionReason(e.target.value);
                                        if (e.target.value.trim()) setReasonError("");
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        border: reasonError ? "1px solid #ef4444" : "1px solid #cbd5e1",
                                        backgroundColor: "#f8fafc",
                                        resize: "none",
                                        fontSize: "14px",
                                        outline: "none",
                                        fontFamily: "inherit"
                                    }}
                                    rows="3"
                                    required
                                />
                                {reasonError && (
                                    <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", fontWeight: "500" }}>
                                        {reasonError}
                                    </div>
                                )}
                            </div>
                        )}

                        {deleteMessage.text && (

                            <div className={`inline-form-message ${deleteMessage.type}`}>

                                {deleteMessage.text}

                            </div>

                        )}

                        <div className="modal-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>

                            {deleteStage === 1 ? (
                                <button
                                    type="button"
                                    className="confirm-delete-btn"
                                    onClick={() => setDeleteStage(2)}
                                >
                                    Yes
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="confirm-delete-btn"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            )}

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}