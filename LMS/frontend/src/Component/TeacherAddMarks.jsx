import React, { useState, useEffect } from "react";
import { saveMarks } from "../Service/TeacherMarksService";
import "./TeacherAddMarks.css";

const students = [
    { id: "ST001", name: "Kamal Perera" },
    { id: "ST002", name: "Saman Kumara" },
    { id: "ST003", name: "Ravi Fernando" }
];

const subjects = [
    { id: "S001", name: "Science" },
    { id: "S002", name: "Maths" },
    { id: "S003", name: "English" },
    { id: "S004", name: "Sinhala" }
];

function TeacherAddMarks() {
    const [studentId, setStudentId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [term, setTerm] = useState("Term 1");
    const [academicYear, setAcademicYear] = useState("2026");
    const [assignmentMark, setAssignmentMark] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/config/active-exam-settings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.academicYear) setAcademicYear(data.academicYear);
                    if (data.term) setTerm(data.term);
                }
            } catch (err) {
                console.error("Failed to load active exam configurations:", err);
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async () => {
        if (!studentId || !subjectId || !term || !academicYear) {
            alert("Please select all fields");
            return;
        }

        const payload = [
            {
                studentId,
                subjectId,
                term,
                academicYear: Number(academicYear) || new Date().getFullYear(),
                assignmentMark: Number(assignmentMark) || 0
            }
        ];

        try {
            await saveMarks(payload);
            alert("Marks saved successfully");

            setStudentId("");
            setSubjectId("");
            setAssignmentMark("");
        } catch (error) {
            console.error(error);
            alert("Error saving marks");
        }
    };

    return (
        <div className="teacher-add-marks-container">
            <div className="container">

                <h2>Upload Student Marks</h2>

                {/* Top Card (Dropdowns) */}
                <div className="card">
                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                        <div className="form-group">
                            <label>Academic Year (Active Config)</label>
                            <input type="text" value={academicYear} disabled style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", width: "100%" }} />
                        </div>

                        <div className="form-group">
                            <label>Active Term Test</label>
                            <input type="text" value={term} disabled style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", width: "100%" }} />
                        </div>
                    </div>

                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="form-group">
                            <label>Select Student *</label>
                            <select value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                <option value="">Choose Student</option>
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.id} - {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Subject *</label>
                            <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                <option value="">Choose Subject</option>
                                {subjects.map(sub => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Second Card (Marks inputs) */}
                <div className="card">
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Assignment Mark (Midterm Evaluation) *</label>
                        <input
                            type="number"
                            value={assignmentMark}
                            onChange={(e) => setAssignmentMark(e.target.value)}
                            placeholder="0 - 100"
                            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        />
                    </div>
                    <button onClick={handleSubmit} style={{ width: "100%", padding: "12px", backgroundColor: "#0f766e", color: "white", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                        Save Student Marks
                    </button>
                </div>

            </div>
        </div>
    );
}

export default TeacherAddMarks;