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
    const [teachers, setTeachers] = useState([]);//store all the serch data
    const [loading, setLoading] = useState(false);//controoler lord msg

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

    const [originalEditData, setOriginalEditData] = useState(null);

    const [editFormData, setEditFormData] = useState({
        username: "",
        userId: "",
        email: "",
        password: "",
        fullName: "",
        subjectSpecialization: [],
        contactNumber: "",
        subRole: ""
    });

    // =========================================
    // SUBJECTS + DESIGNATIONS
    // =========================================

    const subjectsList = [
        "Mathematics",
        "Science",
        "English",
        "History",
        "ICT",
        "Commerce",
        "Art",
        "Music"
    ];

    const designationList = [
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

            setLoading(false);
        }
    };

    useEffect(() => {

        const delayDebounce = setTimeout(() => {

            fetchTeachers();

        }, 300);

        return () => clearTimeout(delayDebounce);

    }, [searchTerm]);

    // =========================================
    // EDIT MODAL OPEN
    // =========================================

    const triggerEdit = async (teacher) => {

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
            subRole: teacher.subRole || ""
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

                    subRole: teacher.subRole || ""
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

    const submitEdit = async (e) => {

        e.preventDefault();

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

                fetchTeachers();

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

        setDeleteMessage({
            text: "",
            type: ""
        });

        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {

        setDeleteMessage({
            text: "",
            type: ""
        });

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/admin/users/delete/${userToDelete}`,
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
                            <th>Status</th>
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

                                    <span className="role-badge subject-teacher">

                                        {teacher.status}

                                    </span>

                                </td>

                                <td>

                                    <div className="action-icons">

                                        <button
                                            className="icon-btn edit-icon"
                                            onClick={() =>
                                                triggerEdit(teacher)
                                            }
                                        >
                                            <FiEdit />
                                        </button>

                                        <button
                                            className="icon-btn delete-icon"
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
                                    Designation / Hierarchy
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

                                    <option value="">
                                        Select Designation
                                    </option>

                                    {designationList.map((designation) => (

                                        <option
                                            key={designation}
                                            value={designation}
                                        >
                                            {designation}
                                        </option>

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
                            Are you sure you want to permanently delete this teacher account?
                        </p>

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

                            <button
                                type="button"
                                className="confirm-delete-btn"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}