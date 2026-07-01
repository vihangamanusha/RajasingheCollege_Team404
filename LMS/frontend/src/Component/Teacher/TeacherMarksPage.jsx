import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { getSubjects } from "../../Service/TeacherSubjectService";
import "./TeacherMarksPage.css";

const TeacherMarksPage = () => {

    const { classId } = useParams();

    const [marks, setMarks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTerm, setSelectedTerm] = useState("");

    useEffect(() => {
        loadSubjects();
    }, []);

    useEffect(() => {
        if (classId && selectedSubject && selectedTerm) {
            loadMarks();
        } else {
            setMarks([]);
        }
    }, [classId, selectedSubject, selectedTerm]);

    const loadSubjects = async () => {
        try {
            const res = await getSubjects();
            setSubjects(res.data);
        } catch (err) {
            console.error("Subjects load error:", err);
        }
    };

    const loadMarks = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/v1/marks",
                {
                    params: {
                        classId: classId,
                        subjectId: selectedSubject,
                        term: selectedTerm
                    }
                }
            );

            setMarks(res.data);

        } catch (err) {
            console.error("Marks load error:", err);
        }
    };

    const subjectOptions = subjects.map(s => ({
        value: s.subjectId,
        label: s.subjectName
    }));

    return (
        <div className="dashboard-container">

            <h2>Student Marks for Class {classId}</h2>

            <div className="filters-container" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div style={{ minWidth: "200px" }}>
                    <label>Select Subject</label>
                    <Select
                        options={subjectOptions}
                        value={subjectOptions.find(s => s.value === selectedSubject) || null}
                        onChange={(selected) => setSelectedSubject(selected ? selected.value : "")}
                        placeholder="Search subject..."
                        isSearchable
                        isClearable
                    />
                </div>
                <div style={{ minWidth: "200px" }}>
                    <label>Select Term</label>
                    <select
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                    >
                        <option value="">Choose Term</option>
                        <option value="Term1">Term 1</option>
                        <option value="Term2">Term 2</option>
                        <option value="Term3">Term 3</option>
                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table className="marks-table">
                    <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Subject</th>
                        <th>Term</th>
                        <th>Assignment Mark</th>
                    </tr>
                    </thead>

                    <tbody>
                    {marks.length > 0 ? (
                        marks.map((m, i) => (
                            <tr key={i}>
                                <td>{m.studentId}</td>
                                <td>{m.subjectId}</td>
                                <td>{m.term}</td>
                                <td>{m.assignmentMark}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                {(!selectedSubject || !selectedTerm) ? "Please select a Subject and Term." : "No marks found."}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherMarksPage;