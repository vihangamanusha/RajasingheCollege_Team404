import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./TeacherAddMarks.css";

function TeacherAddMarks() {
    const [academicYear, setAcademicYear] = useState("2026");
    const [term, setTerm] = useState("Term 1");

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");

    const [studentsList, setStudentsList] = useState([]);
    const [marksData, setMarksData] = useState({}); // studentId -> mark
    
    const [loading, setLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [teacherId, setTeacherId] = useState("");

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

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const decoded = jwtDecode(token);
                const userVal = decoded.sub || "Teacher";
                
                // Get Teacher Profile
                const profileRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/users/teacher/${userVal}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    const tId = profileData.teacherId;
                    if (tId) {
                        // Get Teacher Classes
                        const classesRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/classes/teacher/${tId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        if (classesRes.ok) {
                            const classesData = await classesRes.json();
                            setClasses(classesData);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load teacher classes:", err);
            }
        };
        fetchTeacherData();
    }, []);

    useEffect(() => {
        const fetchClassSubjects = async () => {
            if (!selectedClass) {
                setSubjects([]);
                setSelectedSubject("");
                setIsLoaded(false);
                setStudentsList([]);
                return;
            }
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/classes/${selectedClass}/subjects`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    const uName = (localStorage.getItem("username") || "").trim().toLowerCase();
                    const tId = (teacherId || "").trim().toLowerCase();
                    
                    const filtered = data.filter(sub => {
                        const sId = (sub.teacherId || "").trim().toLowerCase();
                        return sId && (sId === tId || sId === uName);
                    });
                    setSubjects(filtered);
                    if (filtered.length > 0) {
                        setSelectedSubject(filtered[0].subjectId);
                    } else {
                        setSelectedSubject("");
                    }
                }
            } catch (err) {
                console.error("Failed to load class subjects:", err);
            }
        };
        fetchClassSubjects();
    }, [selectedClass, teacherId]);

    const handleLoadStudents = async () => {
        if (!selectedClass || !selectedSubject) {
            alert("Please select Class and Subject first");
            return;
        }
        setLoading(true);
        setIsLoaded(false);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/classes/${selectedClass}/students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStudentsList(data);
                
                const initialMarks = {};
                data.forEach(s => {
                    initialMarks[s.studentId] = "";
                });
                setMarksData(initialMarks);
                setIsLoaded(true);
            }
        } catch (err) {
            console.error("Failed to load class roster:", err);
            alert("Error loading class roster");
        } finally {
            setLoading(false);
        }
    };

    const handleViewMarks = async () => {
        if (!selectedClass || !selectedSubject) {
            alert("Please select Class and Subject first");
            return;
        }
        setLoading(true);
        setIsLoaded(false);
        try {
            const token = localStorage.getItem("token");
            const studentsRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/classes/${selectedClass}/students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (studentsRes.ok) {
                const studentsData = await studentsRes.json();
                setStudentsList(studentsData);
                
                const marksRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/marks/class/${selectedClass}/subject/${selectedSubject}/term/${term}/year/${academicYear}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const existingMarksList = marksRes.ok ? await marksRes.json() : [];
                
                const initialMarks = {};
                studentsData.forEach(s => {
                    initialMarks[s.studentId] = "";
                });
                existingMarksList.forEach(m => {
                    if (m.studentId) {
                        initialMarks[m.studentId] = m.assignmentMark !== undefined ? String(m.assignmentMark) : "";
                    }
                });
                setMarksData(initialMarks);
                setIsLoaded(true);
            }
        } catch (err) {
            console.error("Failed to load marks data:", err);
            alert("Error loading marks data");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkChange = (studentId, value) => {
        if (value === "") {
            setMarksData(prev => ({
                ...prev,
                [studentId]: ""
            }));
            return;
        }

        if (!/^\d*$/.test(value)) {
            return;
        }

        const numericVal = parseInt(value, 10);
        if (numericVal < 0 || numericVal > 100) {
            return;
        }

        setMarksData(prev => ({
            ...prev,
            [studentId]: value
        }));
    };

    const handleSubmit = async () => {
        if (!selectedClass || !selectedSubject || !term || !academicYear) {
            alert("Please select Class and Subject first");
            return;
        }

        const payload = Object.keys(marksData).map(sId => ({
            studentId: sId,
            subjectId: selectedSubject,
            term,
            academicYear: Number(academicYear) || new Date().getFullYear(),
            assignmentMark: Number(marksData[sId]) || 0
        }));

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/marks/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert("Marks saved successfully");
            } else {
                const text = await res.text();
                console.error("Server error:", text);
                alert("Error saving marks");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving marks");
        }
    };

    return (
        <div className="teacher-add-marks-container">
            <div className="container">
                <h2>Upload Student Marks</h2>

                {/* Configuration and Selectors Card */}
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

                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                        <div className="form-group">
                            <label>Select Class *</label>
                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                <option value="">Choose Class</option>
                                {classes.map(c => (
                                    <option key={c.classId} value={c.classId}>
                                        Grade {c.className}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Choose Subject *</label>
                            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                {subjects.map(sub => (
                                    <option key={sub.subjectId} value={sub.subjectId}>
                                        {sub.subjectName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        <button onClick={handleLoadStudents} style={{ padding: "12px", backgroundColor: "#2b55cc", color: "white", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                            {loading ? "Loading..." : "Enter"}
                        </button>
                        <button onClick={handleViewMarks} style={{ padding: "12px", backgroundColor: "#0f766e", color: "white", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                            {loading ? "Loading..." : "View Marks"}
                        </button>
                    </div>
                </div>

                {/* Marks Entry Table Card */}
                {isLoaded && (
                    <div className="card">
                        <h3 style={{ marginBottom: "20px", color: "#1e293b", fontSize: "18px" }}>Enter Marks</h3>
                        {studentsList.length === 0 ? (
                            <p style={{ color: "#64748b", textAlign: "center" }}>No students enrolled in this class.</p>
                        ) : (
                            <div>
                                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                                            <th style={{ padding: "12px", color: "#475569", fontWeight: "600" }}>Student ID</th>
                                            <th style={{ padding: "12px", color: "#475569", fontWeight: "600" }}>Student Name</th>
                                            <th style={{ padding: "12px", color: "#475569", fontWeight: "600" }}>Marks (0-100)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentsList.map(s => (
                                            <tr key={s.studentId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                                <td style={{ padding: "12px", color: "#334155" }}><code>{s.studentId}</code></td>
                                                <td style={{ padding: "12px", color: "#334155" }}>{s.fullName}</td>
                                                <td style={{ padding: "12px" }}>
                                                    <input
                                                        type="text"
                                                        value={marksData[s.studentId] ?? ""}
                                                        onChange={(e) => handleMarkChange(s.studentId, e.target.value)}
                                                        placeholder="Enter mark"
                                                        style={{ width: "150px", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <button onClick={handleSubmit} style={{ width: "100%", padding: "12px", backgroundColor: "#0f766e", color: "white", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                                    Save Marks
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherAddMarks;