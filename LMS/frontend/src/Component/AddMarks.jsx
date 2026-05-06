import React, { useState } from "react";
import { saveMarks } from "../services/marksService";
import "./AddMarks.css"; // ✅ import CSS

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

function AddMarks() {
    const [studentId, setStudentId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [term, setTerm] = useState("");
    const [assignmentMark, setAssignmentMark] = useState("");

    const handleSubmit = async () => {
        if (!studentId || !subjectId || !term) {
            alert("Please select all fields");
            return;
        }

        const payload = [
            {
                studentId,
                subjectId,
                term,
                assignmentMark: Number(assignmentMark) || 0
            }
        ];

        try {
            await saveMarks(payload);
            alert("Marks saved successfully");

            setStudentId("");
            setSubjectId("");
            setTerm("");
            setAssignmentMark("");
        } catch (error) {
            console.error(error);
            alert("Error saving marks");
        }
    };

    return (
        <div className="container">

            <h2>Upload Student Marks</h2>

            {/* Top Card (Dropdowns) */}
            <div className="card">
                <div className="form-row">

                    <div className="form-group">
                        <label>Select Student</label>
                        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
                            <option value="">Choose Student</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.id} - {s.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select Subject</label>
                        <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                            <option value="">Choose Subject</option>
                            {subjects.map(sub => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select Term</label>
                        <select value={term} onChange={(e) => setTerm(e.target.value)}>
                            <option value="">Choose Term</option>
                            <option value="Term1">Term 1</option>
                            <option value="Term2">Term 2</option>
                            <option value="Term3">Term 3</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Bottom Card */}
            <div className="card">
                <h3>Student Marks Entry</h3>

                <div className="form-group">
                    <label>Assignment Mark</label>
                    <input
                        type="number"
                        value={assignmentMark}
                        onChange={(e) => setAssignmentMark(e.target.value)}
                        placeholder="0 - 100"
                    />
                </div>

                <br />

                <button onClick={handleSubmit}>Save Marks</button>
            </div>

        </div>
    );
}

export default AddMarks;