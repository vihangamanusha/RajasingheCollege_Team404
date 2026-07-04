import React, { useState, useEffect } from "react";
import { FiPrinter, FiLayers, FiActivity, FiAlertTriangle, FiSearch, FiFilter } from "react-icons/fi";
import "./AdminAcademicAnalytics.css";

export default function AdminReport() {
    // ── Shared/Global state ──
    const [year, setYear] = useState("2026");
    const [term, setTerm] = useState("Term 1");
    const [reportTab, setReportTab] = useState("section"); // "section" | "subject" | "search" | "filter"

    const ALL_GRADES = ["6", "7", "8", "9", "10", "11"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => String(currentYear - 1 + i));

    // ── Section Report state ──
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedClass, setSelectedClass] = useState("ALL");
    const [classes, setClasses] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const minMark = "0";
    const maxMark = "100";

    // ── Subject-wise state ──
    const [subjectSection, setSubjectSection] = useState("");
    const [subjectClass, setSubjectClass] = useState("");
    const [subjectClasses, setSubjectClasses] = useState([]);
    const [lowPerfLoading, setLowPerfLoading] = useState(false);
    const [lowPerfData, setLowPerfData] = useState([]);
    const [lowPerfFetched, setLowPerfFetched] = useState(false);

    // ── Student Search state ──
    const [searchStudentId, setSearchStudentId] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResult, setSearchResult] = useState(null); // { profile, marks }
    const [searchError, setSearchError] = useState("");

    // ── Custom Filtering state ──
    const [filterLevel, setFilterLevel] = useState("section"); // "section" | "class" | "subject"
    const [filterGrade, setFilterGrade] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [filterMinMark, setFilterMinMark] = useState(0);
    const [filterMaxMark, setFilterMaxMark] = useState(100);
    const [filterClasses, setFilterClasses] = useState([]);
    const [filterSubjects, setFilterSubjects] = useState([]);
    const [filterLoading, setFilterLoading] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterFetched, setFilterFetched] = useState(false);

    // Load classes for Section Report
    useEffect(() => {
        if (!selectedGrade) { setClasses([]); setSelectedClass("ALL"); return; }
        const loadClasses = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:8080/api/classes`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const all = await res.json();
                    setClasses(all.filter(c => c.grade === selectedGrade));
                    setSelectedClass("ALL");
                }
            } catch (err) { console.error("Failed to load classes", err); }
        };
        loadClasses();
    }, [selectedGrade]);

    // Load classes for Subject-wise Report
    useEffect(() => {
        if (!subjectSection) { setSubjectClasses([]); setSubjectClass(""); return; }
        const loadClasses = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:8080/api/classes`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const all = await res.json();
                    setSubjectClasses(all.filter(c => c.grade === subjectSection));
                    setSubjectClass("");
                }
            } catch (err) { console.error("Failed to load classes", err); }
        };
        loadClasses();
    }, [subjectSection]);

    // Load classes for Custom Filtering
    useEffect(() => {
        if (!filterGrade) { setFilterClasses([]); setFilterClass(""); return; }
        const loadClasses = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:8080/api/classes`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const all = await res.json();
                    setFilterClasses(all.filter(c => c.grade === filterGrade));
                    setFilterClass("");
                }
            } catch (err) { console.error("Failed to load classes", err); }
        };
        loadClasses();
    }, [filterGrade]);

    // Load active subjects for Custom Filtering
    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:8080/api/curriculum-subjects`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    setFilterSubjects(await res.json());
                }
            } catch (err) { console.error("Failed to load subjects", err); }
        };
        loadSubjects();
    }, []);

    const getStatusDetails = (avgVal) => {
        const avg = parseFloat(avgVal);
        if (avg < 30) return { label: "Strongly Weak", bgColor: "#fee2e2", color: "#b91c1c" };
        if (avg >= 30 && avg < 50) return { label: "Weak", bgColor: "#ffedd5", color: "#ea580c" };
        if (avg >= 50 && avg < 70) return { label: "Good", bgColor: "#dbeafe", color: "#1d4ed8" };
        return { label: "Best", bgColor: "#dcfce7", color: "#15803d" };
    };

    // Fetch section marks report
    const fetchSectionReportData = async () => {
        if (!selectedGrade) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `http://localhost:8080/admin/reports/section-marks?year=${year}&term=${term}&grade=${selectedGrade}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.ok) setReportData(await res.json());
            else setReportData([]);
        } catch (err) { console.error("Report fetch failed", err); setReportData([]); }
        setLoading(false);
    };

    // Fetch low performers for subject-wise report
    const fetchLowPerformers = async () => {
        if (!subjectClass) return;
        setLowPerfLoading(true);
        setLowPerfFetched(false);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `http://localhost:8080/admin/reports/subject-low-performers?year=${year}&term=${term}&className=${encodeURIComponent(subjectClass)}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.ok) setLowPerfData(await res.json());
            else setLowPerfData([]);
        } catch (err) { console.error("Low perf fetch failed", err); setLowPerfData([]); }
        setLowPerfFetched(true);
        setLowPerfLoading(false);
    };

    // Search Student Report
    const handleStudentSearch = async () => {
        if (!searchStudentId.trim()) return;
        setSearchLoading(true);
        setSearchError("");
        setSearchResult(null);
        try {
            const token = localStorage.getItem("token");
            // Fetch profile
            const profileRes = await fetch(`http://localhost:8080/api/student/${searchStudentId.trim()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!profileRes.ok) {
                setSearchError(`Student with ID ${searchStudentId} not found.`);
                setSearchLoading(false);
                return;
            }
            const profileData = await profileRes.json();

            // Fetch marks
            const marksRes = await fetch(`http://localhost:8080/api/student/${searchStudentId.trim()}/marks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const marksData = marksRes.ok ? await marksRes.json() : [];

            setSearchResult({ profile: profileData, marks: marksData });
        } catch (err) {
            console.error("Student search failed", err);
            setSearchError("Failed to fetch student data. Check backend connection.");
        }
        setSearchLoading(false);
    };

    // Apply Custom Filtering
    const handleApplyFilters = async () => {
        if (!filterGrade) return;
        setFilterLoading(true);
        setFilterFetched(false);
        try {
            const token = localStorage.getItem("token");
            // Fetch all section marks
            const res = await fetch(
                `http://localhost:8080/admin/reports/section-marks?year=${year}&term=${term}&grade=${filterGrade}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) {
                setFilteredResults([]);
                setFilterFetched(true);
                setFilterLoading(false);
                return;
            }
            const allMarks = await res.json();

            // Process data based on filterLevel
            let processed = [];

            if (filterLevel === "subject") {
                // filter subject wise
                let rows = allMarks.filter(r => 
                    r.subjectName.toLowerCase() === filterSubject.toLowerCase() &&
                    (!filterClass || r.className === filterClass)
                );
                
                // Filter by mark range
                processed = rows.filter(r => r.mark >= filterMinMark && r.mark <= filterMaxMark)
                    .map(r => ({
                        id: r.studentId,
                        name: r.studentName,
                        className: r.className,
                        subject: r.subjectName,
                        score: r.mark,
                        type: "subject"
                    }));
            } else {
                // section-wise or class-wise average
                const studentsMap = {};
                allMarks.forEach(row => {
                    const key = row.studentId;
                    if (!studentsMap[key]) {
                        studentsMap[key] = { id: row.studentId, name: row.studentName, className: row.className, total: 0, count: 0 };
                    }
                    studentsMap[key].total += row.mark;
                    studentsMap[key].count += 1;
                });

                let list = Object.values(studentsMap).map(s => ({
                    ...s,
                    avg: s.count > 0 ? (s.total / s.count) : 0
                }));

                // If class-wise, filter by class name
                if (filterLevel === "class" && filterClass) {
                    list = list.filter(s => s.className === filterClass);
                }

                // Filter by average mark range
                processed = list.filter(s => s.avg >= filterMinMark && s.avg <= filterMaxMark)
                    .map(s => ({
                        id: s.id,
                        name: s.name,
                        className: s.className,
                        score: s.avg.toFixed(1),
                        type: "average"
                    }))
                    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
            }

            setFilteredResults(processed);
        } catch (err) {
            console.error("Custom filter failed", err);
            setFilteredResults([]);
        }
        setFilterFetched(true);
        setFilterLoading(false);
    };

    // Render Section Report
    const renderReportBody = () => {
        if (!reportData || reportData.length === 0) return null;

        if (selectedClass === "ALL") {
            const studentsMap = {};
            const subjectsSet = new Set();
            reportData.forEach(row => {
                const key = row.studentId;
                if (!studentsMap[key]) {
                    studentsMap[key] = { id: row.studentId, name: row.studentName, className: row.className, subjects: {}, total: 0, count: 0 };
                }
                studentsMap[key].subjects[row.subjectName] = row.mark;
                studentsMap[key].total += row.mark;
                studentsMap[key].count += 1;
                subjectsSet.add(row.subjectName);
            });
            const dynamicSubjectsAll = Array.from(subjectsSet).sort();
            const finalArrayAll = Object.values(studentsMap).map(s => ({
                ...s,
                avg: s.count > 0 ? (s.total / s.count).toFixed(1) : 0
            })).sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));

            const topFive = [...finalArrayAll].slice(0, 5);

            return (
                <div className="overall-report-wrapper">
                    <div className="table-card" style={{ marginTop: "0" }}>
                        <h3>Section Student Marks & Ranking Sheet (Grade {selectedGrade})</h3>
                        {finalArrayAll.length === 0 ? (
                            <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>No student marks recorded for this section yet.</p>
                        ) : (
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Student ID</th>
                                        <th>Class</th>
                                        {dynamicSubjectsAll.map(sub => <th key={sub}>{sub}</th>)}
                                        <th>Total</th>
                                        <th>Avg</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalArrayAll.map((student, index) => {
                                        const status = getStatusDetails(student.avg);
                                        return (
                                            <tr key={student.id || index}>
                                                <td><strong>{index + 1}</strong></td>
                                                <td>{student.id}</td>
                                                <td><strong>{student.className}</strong></td>
                                                {dynamicSubjectsAll.map(sub => (
                                                    <td key={sub}>{student.subjects[sub] !== undefined ? student.subjects[sub] : "-"}</td>
                                                ))}
                                                <td><strong>{student.total}</strong></td>
                                                <td><strong>{student.avg}%</strong></td>
                                                <td>
                                                    <span className="badge" style={{ backgroundColor: status.bgColor, color: status.color }}>
                                                        {status.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {topFive.length > 0 && (
                        <div className="table-card" style={{ marginTop: "40px", borderTop: "2px solid #2b55cc" }}>
                            <h3 style={{ color: "#2b55cc", display: "flex", alignItems: "center", gap: "8px" }}>
                                <FiActivity /> Top 5 Outstanding Performers (Grade {selectedGrade})
                            </h3>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Student ID</th>
                                        <th>Class</th>
                                        <th>Total Marks</th>
                                        <th>Avg %</th>
                                        <th>Academic Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topFive.map((student, index) => {
                                        const status = getStatusDetails(student.avg);
                                        return (
                                            <tr key={student.id || index}>
                                                <td><span style={{ color: "#2b55cc", fontWeight: "bold" }}>#{index + 1}</span></td>
                                                <td>{student.id}</td>
                                                <td><strong>{student.className}</strong></td>
                                                <td><strong>{student.total}</strong></td>
                                                <td><strong>{student.avg}%</strong></td>
                                                <td>
                                                    <span className="badge" style={{ backgroundColor: status.bgColor, color: status.color }}>
                                                        {status.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            );
        }

        // Class-specific view
        const classData = reportData.filter(r => r.className === selectedClass);
        const subjectsSet = new Set();
        classData.forEach(r => subjectsSet.add(r.subjectName));
        const dynamicSubjects = Array.from(subjectsSet).sort();

        const studentsMap = {};
        classData.forEach(row => {
            const key = row.studentId;
            if (!studentsMap[key]) {
                studentsMap[key] = { id: row.studentId, name: row.studentName, subjects: {}, total: 0, count: 0 };
            }
            studentsMap[key].subjects[row.subjectName] = row.mark;
            studentsMap[key].total += row.mark;
            studentsMap[key].count += 1;
        });

        const finalArray = Object.values(studentsMap).map(s => ({
            ...s,
            avg: s.count > 0 ? (s.total / s.count).toFixed(1) : 0
        })).sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));

        const filtered = finalArray.filter(s =>
            parseFloat(s.avg) >= parseFloat(minMark) && parseFloat(s.avg) <= parseFloat(maxMark)
        );

        const classAvg = filtered.length > 0
            ? (filtered.reduce((sum, s) => sum + parseFloat(s.avg), 0) / filtered.length).toFixed(1)
            : 0;
        const highestAvg = filtered.length > 0
            ? Math.max(...filtered.map(s => parseFloat(s.avg))).toFixed(1)
            : 0;

        return (
            <div className="class-report-wrapper">
                <div className="decision-metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
                    <div className="stat-card"><h5>Total Students</h5><p className="stat-value">{filtered.length}</p></div>
                    <div className="stat-card"><h5>Class Average</h5><p className="stat-value" style={{ color: "#2b55cc" }}>{classAvg}%</p></div>
                    <div className="stat-card"><h5>Highest Average</h5><p className="stat-value" style={{ color: "#2b55cc" }}>{highestAvg}%</p></div>
                </div>

                <div className="table-card">
                    <h3>Student Ranking & Academic Sheet</h3>
                    {filtered.length === 0 ? (
                        <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>No marks found for this class.</p>
                    ) : (
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Student ID</th>
                                    {dynamicSubjects.map(sub => <th key={sub}>{sub}</th>)}
                                    <th>Total</th>
                                    <th>Avg</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((student, index) => {
                                    const status = getStatusDetails(student.avg);
                                    return (
                                        <tr key={student.id || index}>
                                            <td><strong>{index + 1}</strong></td>
                                            <td>{student.id}</td>
                                            {dynamicSubjects.map(sub => (
                                                <td key={sub}>{student.subjects[sub] !== undefined ? student.subjects[sub] : "-"}</td>
                                            ))}
                                            <td><strong>{student.total}</strong></td>
                                            <td><strong>{student.avg}%</strong></td>
                                            <td>
                                                <span className="badge" style={{ backgroundColor: status.bgColor, color: status.color }}>
                                                    {status.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    };

    // Render Subject-wise Low Performers
    const renderSubjectWise = () => {
        if (!lowPerfFetched) return null;
        if (lowPerfData.length === 0) {
            return (
                <div style={{ textAlign: "center", padding: "40px", color: "#15803d" }}>
                    <FiActivity size={40} style={{ marginBottom: "12px" }} />
                    <p style={{ fontSize: "16px", fontWeight: "600" }}>Great news! No student scored below 40 in any subject for this class.</p>
                </div>
            );
        }

        const bySubject = {};
        lowPerfData.forEach(row => {
            if (!bySubject[row.subjectName]) bySubject[row.subjectName] = [];
            bySubject[row.subjectName].push(row);
        });

        return Object.entries(bySubject).map(([subject, students]) => (
            <div key={subject} className="table-card" style={{ marginTop: "20px", borderLeft: "4px solid #ef4444" }}>
                <h3 style={{ color: "#b91c1c", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FiAlertTriangle /> {subject} — Below 40 ({students.length} student{students.length !== 1 ? "s" : ""})
                </h3>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student ID</th>
                            <th>Marks Obtained</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{s.studentId}</td>
                                <td>
                                    <span className="badge" style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>
                                        {s.mark}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ));
    };

    return (
        <div className="analytics-container">
            {/* Tab Switcher */}
            <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
                <button
                    onClick={() => setReportTab("section")}
                    style={{
                        padding: "10px 22px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        backgroundColor: reportTab === "section" ? "#2b55cc" : "#f1f5f9",
                        color: reportTab === "section" ? "#fff" : "#475569",
                        transition: "all 0.2s"
                    }}
                >
                    <FiLayers style={{ marginRight: "6px" }} />
                    Section Report
                </button>
                <button
                    onClick={() => setReportTab("subject")}
                    style={{
                        padding: "10px 22px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        backgroundColor: reportTab === "subject" ? "#2b55cc" : "#f1f5f9",
                        color: reportTab === "subject" ? "#fff" : "#475569",
                        transition: "all 0.2s"
                    }}
                >
                    <FiAlertTriangle style={{ marginRight: "6px" }} />
                    Subject-wise Performance
                </button>
                <button
                    onClick={() => setReportTab("search")}
                    style={{
                        padding: "10px 22px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        backgroundColor: reportTab === "search" ? "#2b55cc" : "#f1f5f9",
                        color: reportTab === "search" ? "#fff" : "#475569",
                        transition: "all 0.2s"
                    }}
                >
                    <FiSearch style={{ marginRight: "6px" }} />
                    Student Search
                </button>
                <button
                    onClick={() => setReportTab("filter")}
                    style={{
                        padding: "10px 22px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        backgroundColor: reportTab === "filter" ? "#2b55cc" : "#f1f5f9",
                        color: reportTab === "filter" ? "#fff" : "#475569",
                        transition: "all 0.2s"
                    }}
                >
                    <FiFilter style={{ marginRight: "6px" }} />
                    Custom Range Filtering
                </button>
            </div>

            {/* ─── SECTION REPORT TAB ─── */}
            {reportTab === "section" && (
                <div className="official-document">
                    <div className="official-report-header" style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "20px", borderBottom: "2px solid #1e293b", marginBottom: "28px" }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Rajasinghe Central College</h1>
                            <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "13px" }}>Official Academic Performance Report (Section)</p>
                        </div>
                        <button
                            className="no-print"
                            onClick={() => window.print()}
                            style={{ padding: "10px 20px", backgroundColor: "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" }}
                        >
                            <FiPrinter /> Export PDF
                        </button>
                    </div>

                    <div className="no-print" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "16px", marginBottom: "28px", alignItems: "end" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Academic Year</label>
                            <select value={year} onChange={e => setYear(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Term</label>
                            <select value={term} onChange={e => setTerm(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                <option>Term 1</option>
                                <option>Term 2</option>
                                <option>Term 3</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Section (Grade)</label>
                            <select value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                <option value="">-- Select Grade --</option>
                                {ALL_GRADES.map(g => <option key={g} value={g}>Grade {g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Class</label>
                            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }} disabled={!selectedGrade}>
                                <option value="ALL">Overall (All Classes)</option>
                                {classes.map(c => <option key={c.classId} value={c.className}>{c.className}</option>)}
                            </select>
                        </div>
                        <button
                            onClick={fetchSectionReportData}
                            disabled={!selectedGrade || loading}
                            style={{ padding: "10px 20px", backgroundColor: !selectedGrade ? "#cbd5e1" : "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: !selectedGrade ? "not-allowed" : "pointer", fontWeight: "600", whiteSpace: "nowrap" }}
                        >
                            {loading ? "Loading..." : "Generate Report"}
                        </button>
                    </div>

                    <div className="report-content-body">
                        {loading && <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}><p>Loading report data...</p></div>}
                        {!loading && reportData.length === 0 && selectedGrade && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                                <FiLayers size={48} style={{ marginBottom: "12px" }} />
                                <p style={{ fontSize: "16px" }}>No data found. Click "Generate Report" to load the data.</p>
                            </div>
                        )}
                        {!loading && reportData.length > 0 && renderReportBody()}
                    </div>

                    <div className="print-footer" style={{ display: "none", justifyContent: "space-between", marginTop: "60px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                        <div className="sig-box">..........................................<br />Principal Signature</div>
                    </div>
                </div>
            )}

            {/* ─── SUBJECT-WISE PERFORMANCE TAB ─── */}
            {reportTab === "subject" && (
                <div className="official-document">
                    <div className="official-report-header" style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "20px", borderBottom: "2px solid #1e293b", marginBottom: "28px" }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Subject-wise Performance Analysis</h1>
                            <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "13px" }}>Students scoring below 40 marks per subject — by class</p>
                        </div>
                        <button
                            className="no-print"
                            onClick={() => window.print()}
                            style={{ padding: "10px 20px", backgroundColor: "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", whiteSpace: "nowrap" }}
                        >
                            <FiPrinter /> Export PDF
                        </button>
                    </div>

                    <div className="no-print" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "16px", marginBottom: "28px", alignItems: "end" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Academic Year</label>
                            <select value={year} onChange={e => setYear(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Term</label>
                            <select value={term} onChange={e => setTerm(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                <option>Term 1</option>
                                <option>Term 2</option>
                                <option>Term 3</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Section (Grade)</label>
                            <select value={subjectSection} onChange={e => setSubjectSection(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                                <option value="">-- Select Grade --</option>
                                {ALL_GRADES.map(g => <option key={g} value={g}>Grade {g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Class</label>
                            <select value={subjectClass} onChange={e => setSubjectClass(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }} disabled={!subjectSection}>
                                <option value="">-- Select Class --</option>
                                {subjectClasses.map(c => <option key={c.classId} value={c.className}>{c.className}</option>)}
                            </select>
                        </div>
                        <button
                            onClick={fetchLowPerformers}
                            disabled={!subjectClass || lowPerfLoading}
                            style={{ padding: "10px 20px", backgroundColor: !subjectClass ? "#cbd5e1" : "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: !subjectClass ? "not-allowed" : "pointer", fontWeight: "600", whiteSpace: "nowrap" }}
                        >
                            {lowPerfLoading ? "Loading..." : "Analyse"}
                        </button>
                    </div>

                    <div className="report-content-body">
                        {lowPerfLoading && <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}><p>Analysing subject performance...</p></div>}
                        {!lowPerfLoading && !lowPerfFetched && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                                <FiAlertTriangle size={48} style={{ marginBottom: "12px" }} />
                                <p style={{ fontSize: "16px" }}>Select a section and class, then click "Analyse" to see subject-wise low performers.</p>
                            </div>
                        )}
                        {!lowPerfLoading && lowPerfFetched && renderSubjectWise()}
                    </div>

                    <div className="print-footer" style={{ display: "none", justifyContent: "space-between", marginTop: "60px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                        <div className="sig-box">..........................................<br />Principal Signature</div>
                    </div>
                </div>
            )}

            {/* ─── STUDENT SEARCH TAB ─── */}
            {reportTab === "search" && (
                <div className="official-document">
                    <div className="official-report-header" style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "20px", borderBottom: "2px solid #1e293b", marginBottom: "28px" }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Individual Student Performance Report</h1>
                            <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "13px" }}>Comprehensive academic details and exam marks</p>
                        </div>
                        {searchResult && (
                            <button
                                className="no-print"
                                onClick={() => window.print()}
                                style={{ padding: "10px 20px", backgroundColor: "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", whiteSpace: "nowrap" }}
                            >
                                <FiPrinter /> Export PDF
                            </button>
                        )}
                    </div>

                    <div className="no-print" style={{ display: "flex", gap: "16px", marginBottom: "28px", alignItems: "center", maxWidth: "600px" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Search by Student ID</label>
                            <input
                                type="text"
                                value={searchStudentId}
                                onChange={e => setSearchStudentId(e.target.value)}
                                placeholder="Enter Student ID (e.g. STU001)"
                                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "14px" }}
                            />
                        </div>
                        <button
                            onClick={handleStudentSearch}
                            disabled={!searchStudentId.trim() || searchLoading}
                            style={{ padding: "10px 24px", backgroundColor: !searchStudentId.trim() ? "#cbd5e1" : "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: !searchStudentId.trim() ? "not-allowed" : "pointer", fontWeight: "600", whiteSpace: "nowrap", alignSelf: "end", height: "42px" }}
                        >
                            {searchLoading ? "Searching..." : "Search"}
                        </button>
                    </div>

                    <div className="report-content-body">
                        {searchError && (
                            <div style={{ textAlign: "center", padding: "40px", color: "#ef4444", fontWeight: "600" }}>
                                <p>{searchError}</p>
                            </div>
                        )}

                        {!searchResult && !searchError && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                                <FiSearch size={48} style={{ marginBottom: "12px" }} />
                                <p style={{ fontSize: "16px" }}>Enter a student ID and click "Search" to view marks and profile details.</p>
                            </div>
                        )}

                        {searchResult && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", background: "#f8fafc", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                                    <div>
                                        <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}><strong>Full Name:</strong> <span style={{ color: "#1e293b", fontWeight: "600" }}>{searchResult.profile.fullName}</span></p>
                                        <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}><strong>Student ID:</strong> <span style={{ color: "#1e293b", fontWeight: "600" }}>{searchResult.profile.studentId}</span></p>
                                        <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}><strong>Class Name:</strong> <span style={{ color: "#1e293b", fontWeight: "600" }}>{searchResult.profile.className || "Not Assigned"}</span></p>
                                    </div>
                                    <div>
                                        <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}><strong>Email Address:</strong> <span style={{ color: "#1e293b", fontWeight: "600" }}>{searchResult.profile.email || "N/A"}</span></p>
                                        <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}><strong>Medium:</strong> <span style={{ color: "#1e293b", fontWeight: "600" }}>{searchResult.profile.medium || "N/A"}</span></p>
                                        <p style={{ margin: "4px 0", fontSize: "14px", color: "#64748b" }}><strong>Academic Year:</strong> <span style={{ color: "#1e293b", fontWeight: "600" }}>{searchResult.profile.classYear || "N/A"}</span></p>
                                    </div>
                                </div>

                                <div className="table-card" style={{ marginTop: "0" }}>
                                    <h3 style={{ marginBottom: "16px" }}>Recorded Subjects & Marks</h3>
                                    {searchResult.marks.length === 0 ? (
                                        <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>No examination marks recorded for this student yet.</p>
                                    ) : (
                                        <table className="report-table">
                                            <thead>
                                                <tr>
                                                    <th>Subject Name</th>
                                                    <th>Term / Exam</th>
                                                    <th>Score / Mark</th>
                                                    <th>Result Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchResult.marks.map((mark, i) => (
                                                    <tr key={mark.markId || i}>
                                                        <td><strong>{mark.subjectName}</strong></td>
                                                        <td>{mark.term}</td>
                                                        <td><strong>{mark.assignmentMark}%</strong></td>
                                                        <td>
                                                            <span className="badge" style={{ backgroundColor: mark.assignmentMark >= 40 ? "#dcfce7" : "#fee2e2", color: mark.assignmentMark >= 40 ? "#15803d" : "#b91c1c" }}>
                                                                {mark.assignmentMark >= 40 ? "Pass" : "Fail"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="print-footer" style={{ display: "none", justifyContent: "space-between", marginTop: "60px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                        <div className="sig-box">..........................................<br />Principal Signature</div>
                    </div>
                </div>
            )}

            {/* ─── CUSTOM RANGE FILTERING TAB ─── */}
            {reportTab === "filter" && (
                <div className="official-document">
                    <div className="official-report-header" style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "20px", borderBottom: "2px solid #1e293b", marginBottom: "28px" }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Custom Score & Academic Range Filter</h1>
                            <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "13px" }}>Filter students based on custom range of marks or average scores</p>
                        </div>
                        {filteredResults.length > 0 && (
                            <button
                                className="no-print"
                                onClick={() => window.print()}
                                style={{ padding: "10px 20px", backgroundColor: "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", whiteSpace: "nowrap" }}
                            >
                                <FiPrinter /> Export PDF
                            </button>
                        )}
                    </div>

                    <div className="no-print" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr auto", gap: "12px", marginBottom: "28px", alignItems: "end" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Filter Level</label>
                            <select value={filterLevel} onChange={e => { setFilterLevel(e.target.value); setFilteredResults([]); setFilterFetched(false); }} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "13px" }}>
                                <option value="section">Section-wise (Avg)</option>
                                <option value="class">Class-wise (Avg)</option>
                                <option value="subject">Subject-wise (Mark)</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Grade / Section</label>
                            <select value={filterGrade} onChange={e => { setFilterGrade(e.target.value); setFilteredResults([]); setFilterFetched(false); }} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "13px" }}>
                                <option value="">-- Select Grade --</option>
                                {ALL_GRADES.map(g => <option key={g} value={g}>Grade {g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Class</label>
                            <select value={filterClass} onChange={e => { setFilterClass(e.target.value); setFilteredResults([]); setFilterFetched(false); }} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "13px" }} disabled={filterLevel === "section" || !filterGrade}>
                                <option value="">Overall / All Classes</option>
                                {filterClasses.map(c => <option key={c.classId} value={c.className}>{c.className}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Subject</label>
                            <select value={filterSubject} onChange={e => { setFilterSubject(e.target.value); setFilteredResults([]); setFilterFetched(false); }} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "13px" }} disabled={filterLevel !== "subject"}>
                                <option value="">-- Select Subject --</option>
                                {filterSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Min Score</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={filterMinMark}
                                onChange={e => { setFilterMinMark(Number(e.target.value)); setFilteredResults([]); setFilterFetched(false); }}
                                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "13px" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>Max Score</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={filterMaxMark}
                                onChange={e => { setFilterMaxMark(Number(e.target.value)); setFilteredResults([]); setFilterFetched(false); }}
                                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "13px" }}
                            />
                        </div>
                        <button
                            onClick={handleApplyFilters}
                            disabled={!filterGrade || (filterLevel === "subject" && !filterSubject) || filterLoading}
                            style={{ padding: "10px 20px", backgroundColor: (!filterGrade || (filterLevel === "subject" && !filterSubject)) ? "#cbd5e1" : "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: (!filterGrade || (filterLevel === "subject" && !filterSubject)) ? "not-allowed" : "pointer", fontWeight: "600", whiteSpace: "nowrap" }}
                        >
                            {filterLoading ? "Filtering..." : "Apply Filter"}
                        </button>
                    </div>

                    <div className="report-content-body">
                        {filterLoading && <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}><p>Filtering performance data...</p></div>}
                        
                        {!filterLoading && !filterFetched && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                                <FiFilter size={48} style={{ marginBottom: "12px" }} />
                                <p style={{ fontSize: "16px" }}>Configure the level, range of scores, and click "Apply Filter" to retrieve student listings.</p>
                            </div>
                        )}

                        {!filterLoading && filterFetched && (
                            <div className="table-card" style={{ marginTop: "0" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                    <h3>Students Matching Criteria ({filteredResults.length} Found)</h3>
                                    <span style={{ fontSize: "14px", color: "#64748b" }}>Range: <strong>{filterMinMark}% - {filterMaxMark}%</strong></span>
                                </div>
                                {filteredResults.length === 0 ? (
                                    <p style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>No students scored within the specified range for this selection.</p>
                                ) : (
                                    <table className="report-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Student ID</th>
                                                <th>Student Name</th>
                                                <th>Class</th>
                                                {filterLevel === "subject" && <th>Subject</th>}
                                                <th>{filterLevel === "subject" ? "Mark" : "Average Mark"}</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredResults.map((s, index) => {
                                                const scoreNum = parseFloat(s.score);
                                                const status = getStatusDetails(scoreNum);
                                                return (
                                                    <tr key={s.id || index}>
                                                        <td>{index + 1}</td>
                                                        <td>{s.id}</td>
                                                        <td><strong>{s.name}</strong></td>
                                                        <td><strong>{s.className}</strong></td>
                                                        {filterLevel === "subject" && <td>{s.subject}</td>}
                                                        <td><strong>{s.score}%</strong></td>
                                                        <td>
                                                            <span className="badge" style={{ backgroundColor: status.bgColor, color: status.color }}>
                                                                {status.label}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="print-footer" style={{ display: "none", justifyContent: "space-between", marginTop: "60px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                        <div className="sig-box">..........................................<br />Principal Signature</div>
                    </div>
                </div>
            )}
        </div>
    );
}
