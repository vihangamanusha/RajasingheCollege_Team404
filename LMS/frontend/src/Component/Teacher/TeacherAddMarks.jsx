import React, { useState, useEffect } from "react";
import Select from "react-select";
import { saveMarks } from "../../Service/TeacherMarksService";
import { getStudents } from "../../Service/TeacherStudentService";
import { getSubjects } from "../../Service/TeacherSubjectService";
import { getClasses } from "../../Service/TeacherClassService";
import TeacherSidebar from "./TeacherSidebar";
import "./TeacherAddMarks.css";

function TeacherAddMarks() {

    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);

    const [classId, setClassId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [term, setTerm] = useState("");
    const [assignmentMark, setAssignmentMark] = useState("");

    useEffect(() => {
        loadClasses();
        loadStudents();
        loadSubjects();
    }, []);

    const loadClasses = async () => {
        try {
            const response = await getClasses();
            setClasses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadStudents = async () => {
        try {
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadSubjects = async () => {
        try {
            const response = await getSubjects();
            setSubjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // convert to react-select format
    const classOptions = classes.map(c => ({
        value: c.classId,
        label: `${c.className} - ${c.classId}`
    }));

    const filteredStudents = classId
        ? students.filter(s => (s.classEntity?.classId || s.classId || s.class_id) === classId)
        : students;

    const studentOptions = filteredStudents.map(s => ({
        value: s.studentId,
        label: `${s.studentId} - ${s.fullName}`
    }));

    const subjectOptions = subjects.map(sub => ({
        value: sub.subjectId,
        label: sub.subjectName
    }));

    const handleSubmit = async () => {

        if (!studentId || !subjectId || !term || !classId) {
            alert("Please select all fields including Class");
            return;
        }

        const markNum = Number(assignmentMark);
        if (markNum < 0 || markNum > 100) {
            alert("Mark must be between 0 and 100 (<= 100)");
            return;
        }

        const payload = [
            {
                studentId,
                subjectId,
                term,
                classId,
                assignmentMark: markNum || 0
            }
        ];

        try {
            await saveMarks(payload);
            alert("Marks saved successfully");

            setClassId("");
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
        <div style={{ display: "flex" }}>

            {/* SIDEBAR
            <TeacherSidebar /> */}

            <div className="container" style={{ flex: 1 }}>

                <h2>Upload Student Marks</h2>

                <div className="card">

                    <div className="form-row">

                        {/* CLASS SEARCH DROPDOWN */}
                        <div className="form-group">
                            <label>Select Class</label>
                            <Select
                                options={classOptions}
                                value={classOptions.find(c => c.value === classId) || null}
                                onChange={(selected) => {
                                    setClassId(selected?.value || "");
                                    setStudentId("");
                                }}
                                placeholder="Search class..."
                                isSearchable
                                isClearable
                            />
                        </div>

                        {/* STUDENT SEARCH DROPDOWN */}
                        <div className="form-group">
                            <label>Select Student</label>
                            <Select
                                options={studentOptions}
                                value={studentOptions.find(s => s.value === studentId)}
                                onChange={(selected) => setStudentId(selected.value)}
                                placeholder="Search student..."
                                isSearchable
                            />
                        </div>

                        {/* SUBJECT SEARCH DROPDOWN */}
                        <div className="form-group">
                            <label>Select Subject</label>
                            <Select
                                options={subjectOptions}
                                value={subjectOptions.find(s => s.value === subjectId)}
                                onChange={(selected) => setSubjectId(selected.value)}
                                placeholder="Search subject..."
                                isSearchable
                            />
                        </div>

                        {/* TERM */}
                        <div className="form-group">
                            <label>Select Term</label>
                            <select
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            >
                                <option value="">Choose Term</option>
                                <option value="Term1">Term 1</option>
                                <option value="Term2">Term 2</option>
                                <option value="Term3">Term 3</option>
                            </select>
                        </div>

                    </div>
                </div>

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

                    <button onClick={handleSubmit}>
                        Save Marks
                    </button>

                </div>

            </div>
        </div>
    );
}

export default TeacherAddMarks;