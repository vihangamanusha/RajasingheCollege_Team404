import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
                onClick={() => onViewMarks(classId)}
            >
                View Student Marks
            </button>

        </div>
    );
};

/* ---------------- MAIN COMPONENT ---------------- */
const MyClasses = () => {

    const [classesData, setClassesData] = useState([]);
    const navigate = useNavigate();

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

    /* -------- NAVIGATE TO MARKS PAGE -------- */
    const handleViewMarks = (classId) => {
        console.log("BUTTON CLICKED:", classId);

        navigate("/marks", {
            state: { classId: classId }
        });
    };

    return (
        <div className="classes-container">

            <header className="classes-header">
                <h1>My Classes</h1>
                <p>View student details and marks for your assigned classes</p>
            </header>

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

        </div>
    );
};

export default MyClasses;