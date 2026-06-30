import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { uploadAssignment } from "../services/AssignmentService";
import { getSubjects } from "../services/SubjectService";
import { getClasses } from "../services/ClassService";
import "./TeacherCreateAssignment.css";

function TeacherCreateAssignment() {
    const navigate = useNavigate();

    // Form States
    const [title, setTitle] = useState("");
    const [classId, setClassId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [marks, setMarks] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [teacherId] = useState("T001"); // Hardcoded for now, like TeacherUploadMaterial

    // Data from DB
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        loadSubjects();
        loadClasses();
    }, []);

    const loadSubjects = async () => {
        try {
            const res = await getSubjects();
            setSubjects(res.data);
        } catch (error) {
            console.error("Subject load error:", error);
            // Fallback mock data if API fails
            if (subjects.length === 0) {
                setSubjects([
                    { subjectId: "Mathematics", subjectName: "Mathematics" },
                    { subjectId: "Science", subjectName: "Science" },
                    { subjectId: "English", subjectName: "English" }
                ]);
            }
        }
    };

    const loadClasses = async () => {
        try {
            const res = await getClasses();
            setClasses(res.data);
        } catch (error) {
            console.error("Class load error:", error);
            // Fallback mock data if API fails
            if (classes.length === 0) {
                setClasses([
                    { classId: "Grade 10", className: "Grade 10" },
                    { classId: "Grade 11", className: "Grade 11" }
                ]);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !subjectId || !classId) {
            alert("Please fill all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("teacherId", teacherId);
        formData.append("subjectId", subjectId);
        formData.append("classId", classId);
        formData.append("description", description);
        if (dueDate) formData.append("dueDate", dueDate);
        if (file) formData.append("file", file);
        // marks is in UI but not in DB schema, omitting or sending as extra
        if (marks) formData.append("marks", marks);

        try {
            await uploadAssignment(formData);
            alert("Assignment Created Successfully ✔");
            navigate("/Assignment");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to create assignment ❌");
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="create-assignment-container">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate("/Assignment")}>
                    ⬅ Back to Assignments
                </button>
            </div>

            <h2 className="create-assignment-title">Create New Assignment</h2>

            <form onSubmit={handleSubmit} className="create-assignment-form">

                <div className="form-group">
                    <label>Assignment Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter assignment title"
                        required
                    />
                </div>

                <div className="form-row-3">
                    <div className="form-group">
                        <label>Grade</label>
                        <select
                            value={classId}
                            onChange={(e) => setClassId(e.target.value)}
                            required
                        >
                            <option value="">Select Grade</option>
                            {classes.map(c => (
                                <option key={c.classId} value={c.classId}>
                                    {c.className ? c.className : c.classId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Subject</label>
                        <select
                            value={subjectId}
                            onChange={(e) => setSubjectId(e.target.value)}
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(s => (
                                <option key={s.subjectId} value={s.subjectId}>
                                    {s.subjectName ? s.subjectName : s.subjectId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Total Marks</label>
                        <input
                            type="number"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            placeholder="e.g. 100"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        placeholder="Enter assignment instructions..."
                    />
                </div>

                <div className="form-group">
                    <label>Attach Files (Optional)</label>
                    <div className="file-upload-box" onClick={() => document.getElementById('file-upload').click()}>
                        <Upload size={24} className="upload-icon" />
                        <p>Click to upload files</p>
                        {file && <p className="file-name">Selected: {file.name}</p>}
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => navigate("/Assignment")}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                        Create Assignment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TeacherCreateAssignment;
