import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getStudents, assignStudentToClass } from "../services/StudentService";
import { getClasses } from "../services/ClassService";
import "./TeacherAddStudentToClass.css";

function TeacherAddStudentToClass() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedClassId, setSelectedClassId] = useState("");
    const [medium, setMedium] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const studentRes = await getStudents();
            setStudents(studentRes.data);

            const classRes = await getClasses();
            setClasses(classRes.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const studentOptions = students.map(s => ({
        value: s.studentId,
        label: `${s.studentId} - ${s.fullName}`
    }));

    const classOptions = classes.map(c => ({
        value: c.classId,
        label: `${c.classId} - ${c.className}`
    }));

    const mediumOptions = [
        { value: "Sinhala", label: "Sinhala" },
        { value: "English", label: "English" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStudentId || !selectedClassId || !medium) {
            alert("Please select Student, Class, and Medium.");
            return;
        }

        try {
            await assignStudentToClass(selectedStudentId, selectedClassId, medium);
            alert("Student successfully added to class! ✔");

            // Reset form
            setSelectedStudentId("");
            setSelectedClassId("");
            setMedium("");
        } catch (error) {
            console.error("Error adding student to class:", error);
            alert("Failed to add student to class ❌");
        }
    };

    return (
        <div className="add-student-container">
            <div className="add-student-card">
                <h2 className="form-title">Add Student to Class</h2>

                <form onSubmit={handleSubmit} className="add-student-form">

                    <div className="form-group">
                        <label>Select Student</label>
                        <Select
                            options={studentOptions}
                            value={studentOptions.find(s => s.value === selectedStudentId)}
                            onChange={(selected) => setSelectedStudentId(selected.value)}
                            placeholder="Search student..."
                            isSearchable
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Class</label>
                        <Select
                            options={classOptions}
                            value={classOptions.find(c => c.value === selectedClassId)}
                            onChange={(selected) => setSelectedClassId(selected.value)}
                            placeholder="Search class..."
                            isSearchable
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Medium</label>
                        <Select
                            options={mediumOptions}
                            value={mediumOptions.find(m => m.value === medium)}
                            onChange={(selected) => setMedium(selected.value)}
                            placeholder="Select Medium..."
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        ➕ Add Student
                    </button>

                </form>
            </div>
        </div>
    );
}

export default TeacherAddStudentToClass;
