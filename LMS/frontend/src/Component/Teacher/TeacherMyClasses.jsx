import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherClass.css"; // Reuse the styles from TeacherClass

function TeacherMyClasses() {

    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);

    const teacherId = "T001";

    useEffect(() => {

        axios.get(
            `http://localhost:8080/api/v1/marks/teacher/classes/${teacherId}`
        )
            .then((res) => {

                setClasses(res.data);

            });

    }, []);

    return (
        <div className="classes-container">
            <header className="classes-header">
                <h1>My Classes</h1>
                <p>View student details and marks</p>
            </header>

            <div className="cards-grid">

                {classes.map((cls, index) => (
                    <div key={index} className="class-card">
                        <div className="card-header">
                            <div className="icon-container">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <div className="header-text">
                                <h3>{cls.classId}</h3>
                                <p>Subject: {cls.subjectName}</p>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="info-row">
                                <span className="label">Status:</span>
                                <span className="value bold">Active</span>
                            </div>
                        </div>

                        <button
                            className="view-button"
                            onClick={() => navigate(`/marks/${cls.classId}`)}
                        >
                            View Student Marks
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default TeacherMyClasses;