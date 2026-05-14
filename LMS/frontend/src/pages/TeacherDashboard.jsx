import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherClass.css';

/* ---------------- CLASS CARD ---------------- */
const ClassCard = ({ classId, className, year, students, onViewMarks }) => {
    return (
        <div className="class-card">

            <div className="card-header">

                <div className="icon-container">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                </div>

                <div className="header-text">
                    <h3>{className}</h3>
                    <p>Year {year}</p>
                </div>

            </div>

            <div className="card-body">
                <div className="info-row">
                    <span className="label">Students:</span>
                    <span className="value bold">{students}</span>
                </div>
            </div>

            <button
                className="view-button"
                onClick={() => {
                    console.log("Clicked Class ID:", classId);
                    onViewMarks(classId);
                }}
            >
                View Student Marks
            </button>

        </div>
    );
};

/* ---------------- MAIN COMPONENT ---------------- */
const MyClasses = () => {

    const [classesData, setClassesData] = useState([]);
    const [marks, setMarks] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);

    /* ---------------- LOAD CLASSES ---------------- */
    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/classes/summary"
            );

            setClassesData(response.data);

        } catch (error) {
            console.error("Error fetching class data:", error);
        }
    };

    /* ---------------- LOAD MARKS ---------------- */
    const handleViewMarks = async (classId) => {

        console.log("Function Called:", classId);

        setSelectedClassId(classId);

        const teacherSubjectId = "ENG001"; // later from login

        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/marks",
                {
                    params: {
                        classId: classId,
                        subjectId: teacherSubjectId
                    }
                }
            );

            console.log("API Response:", response.data);

            setMarks(response.data);

        } catch (error) {
            console.error("Marks load error:", error);
        }
    };

    return (
        <div className="dashboard-container">

            {/* HEADER */}
            <header className="dashboard-header">
                <h1>My Classes</h1>
                <p>View student details and marks for your assigned classes</p>
            </header>

            {/* CLASS CARDS */}
            <div className="cards-grid">

                {classesData.map((cls) => (
                    <ClassCard
                        key={cls.classId}
                        classId={cls.classId}
                        className={cls.className}
                        year={cls.year}
                        students={cls.studentCount}
                        onViewMarks={handleViewMarks}
                    />
                ))}

            </div>

            {/* MARKS TABLE */}
            {selectedClassId && marks.length > 0 && (
                <div className="marks-section">

                    <h2>Student Marks</h2>

                    <table border="1" className="marks-table">

                        <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Subject</th>
                            <th>Term</th>
                            <th>Assignment Mark</th>
                        </tr>
                        </thead>

                        <tbody>
                        {marks.map((m, index) => (
                            <tr key={index}>
                                <td>{m.studentId}</td>
                                <td>{m.subjectId}</td>
                                <td>{m.term}</td>
                                <td>{m.assignmentMark}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
};

export default MyClasses;