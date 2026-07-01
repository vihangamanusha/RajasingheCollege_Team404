import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Calendar, Trash2 } from "lucide-react";
import { getSubjects } from "../../Service/TeacherSubjectService";
import { getClasses } from "../../Service/TeacherClassService";
import { deleteAssignment } from "../../Service/TeacherAssignmentService";
import "./TeacherAssignmentList.css";

function TeacherAssignmentList() {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchAssignments();
        fetchSubjectsAndClasses();
    }, []);

    const fetchSubjectsAndClasses = async () => {
        try {
            const [subjRes, classRes] = await Promise.all([
                getSubjects(),
                getClasses()
            ]);
            setSubjects(subjRes.data || []);
            setClasses(classRes.data || []);
        } catch (err) {
            console.error("Error fetching subjects/classes:", err);
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/assignment/all");
            if (!response.ok) {
                throw new Error("Failed to fetch assignments");
            }
            const data = await response.json();

            setAssignments(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching assignments:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    // Format date string to display nicely
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const getSubjectName = (id) => {
        const subject = subjects.find(s => s.subjectId === id);
        return subject ? (subject.subjectName || id) : id;
    };

    const getClassName = (id) => {
        const cls = classes.find(c => c.classId === id);
        return cls ? (cls.className || id) : id;
    };

    const handleDelete = async (assignmentId) => {
        if (!window.confirm("Are you sure you want to delete this assignment?")) {
            return;
        }

        try {
            await deleteAssignment(assignmentId);
            setAssignments(assignments.filter(a => a.assignmentId !== assignmentId));
        } catch (err) {
            console.error("Error deleting assignment:", err);
            alert("Failed to delete assignment.");
        }
    };

    return (
        <div className="assignment-list-container">
            <div className="assignment-list-header">
                <div>
                    <h2 className="assignment-list-title">Assignments</h2>
                    <p className="assignment-list-subtitle">Manage and grade student assignments</p>
                </div>
                <button
                    className="create-assignment-button"
                    onClick={() => navigate("/create-assignment")}
                >
                    <Plus size={18} /> Create Assignment
                </button>
            </div>

            <div className="assignment-list-content">
                {loading ? (
                    <p className="loading-state">Loading assignments...</p>
                ) : error ? (
                    <p className="error-state">{error}</p>
                ) : assignments.length === 0 ? (
                    <div className="empty-state">
                        <p>No assignments found. Click "Create Assignment" to add one.</p>
                    </div>
                ) : (
                    <div className="assignments-flex">
                        {assignments.map((assignment) => (
                            <div key={assignment.assignmentId || assignment.id} className="assignment-card">
                                <div className="assignment-card-header">
                                    <div className="assignment-title-group">
                                        <FileText size={20} className="assignment-icon" />
                                        <h3 className="assignment-title">{assignment.title}</h3>
                                    </div>
                                    <div className="header-actions">
                                        <div className="submissions-badge">
                                            {assignment.submissions || 0} submissions
                                        </div>
                                        <button
                                            className="delete-assignment-button"
                                            onClick={() => handleDelete(assignment.assignmentId || assignment.id)}
                                            title="Delete Assignment"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <p className="assignment-description">{assignment.description}</p>

                                <div className="assignment-card-footer">
                                    <div className="assignment-meta">
                                        <span className="meta-item">
                                            <span className="meta-label">Subject:</span> {getSubjectName(assignment.subjectId)}
                                        </span>
                                        <span className="meta-item">
                                            <span className="meta-label">Grade:</span> {getClassName(assignment.classId)}
                                        </span>
                                        <span className="meta-item flex-center">
                                            <Calendar size={14} className="meta-icon" />
                                            <span className="meta-label">Due:</span> {formatDate(assignment.dueDate)}
                                        </span>
                                        <span className="meta-item">
                                            <span className="meta-label">Marks:</span> {assignment.marks || 100}
                                        </span>
                                    </div>
                                    <button
                                        className="view-submissions-link"
                                        onClick={() => {
                                            // Handle view submissions action
                                            console.log("View submissions for", assignment.assignmentId);
                                        }}
                                    >
                                        View Submissions
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherAssignmentList;
