import React, { useState, useEffect } from "react";
import { FiPrinter, FiLayers, FiActivity, FiAlertTriangle } from "react-icons/fi";
import "./AdminAcademicAnalytics.css";

export default function DeputyPrincipalReport() {
    // ── Section Report state ──
    const [year, setYear] = useState("2026");
    const [term, setTerm] = useState("Term 1");
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

    // ── Active report tab ──
    const [reportTab, setReportTab] = useState("section"); // "section" | "subject"

    const ALL_GRADES = ["6", "7", "8", "9", "10", "11"];

    const getStatusDetails = (avgVal) => {
        const avg = parseFloat(avgVal);
        if (avg < 30) return { label: "Strongly Weak", bgColor: "#fee2e2", color: "#b91c1c" };
        if (avg >= 30 && avg < 50) return { label: "Weak", bgColor: "#ffedd5", color: "#ea580c" };
        if (avg >= 50 && avg < 70) return { label: "Good", bgColor: "#dbeafe", color: "#1d4ed8" };
        return { label: "Best", bgColor: "#dcfce7", color: "#15803d" };
    };

    // Load classes for the selected grade (section report)
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

    // Load classes for subject-wise section
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

    // ── Section Report rendering (same logic as SectionHeadReport) ──
    const renderReportBody = () => {
        if (!reportData || reportData.length === 0) return null;

        if (selectedClass === "ALL") {
            // Group all students across all classes in this grade
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

                    {/* Top 5 – only in overall view */}
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

        const passCount = filtered.filter(s => parseFloat(s.avg) >= 50).length;
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

    // ── Subject-wise low performers rendering ──
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

        // Group by subject
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

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => String(currentYear - 1 + i));

    return (
        <div className="analytics-container">
            {/* Report Tab Switcher */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
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
                        backgroundColor: reportTab === "subject" ? "#ef4444" : "#f1f5f9",
                        color: reportTab === "subject" ? "#fff" : "#475569",
                        transition: "all 0.2s"
                    }}
                >
                    <FiAlertTriangle style={{ marginRight: "6px" }} />
                    Subject-wise Performance
                </button>
            </div>

            {/* ─── SECTION REPORT TAB ─── */}
            {reportTab === "section" && (
                <div className="official-document">
                    {/* School Header */}
                    <div className="official-report-header" style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "20px", borderBottom: "2px solid #1e293b", marginBottom: "28px" }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Rajasinghe Central College</h1>
                            <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "13px" }}>Official Academic Performance Report</p>
                        </div>
                        <button
                            className="no-print"
                            onClick={() => window.print()}
                            style={{ padding: "10px 20px", backgroundColor: "#2b55cc", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" }}
                        >
                            <FiPrinter /> Export PDF
                        </button>
                    </div>

                    {/* Filter Form */}
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

                    {/* Report output */}
                    <div className="report-content-body">
                        {loading && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
                                <p>Loading report data...</p>
                            </div>
                        )}
                        {!loading && reportData.length === 0 && selectedGrade && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                                <FiLayers size={48} style={{ marginBottom: "12px" }} />
                                <p style={{ fontSize: "16px" }}>No data found. Click "Generate Report" to load the data.</p>
                            </div>
                        )}
                        {!loading && reportData.length > 0 && renderReportBody()}
                    </div>

                    <div className="print-footer" style={{ display: "none", justifyContent: "space-between", marginTop: "60px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                        <div className="sig-box">..........................................<br />Deputy Principal (Development) Signature</div>
                    </div>
                </div>
            )}

            {/* ─── SUBJECT-WISE PERFORMANCE TAB ─── */}
            {reportTab === "subject" && (
                <div className="official-document">
                    <div className="official-report-header" style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "20px", borderBottom: "2px solid #1e293b", marginBottom: "28px" }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Subject-wise Performance Analysis</h1>
                            <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "13px" }}>
                                Students scoring below <strong>40 marks</strong> per subject — by class
                            </p>
                        </div>
                        <button
                            className="no-print"
                            onClick={() => window.print()}
                            style={{ padding: "10px 20px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", whiteSpace: "nowrap" }}
                        >
                            <FiPrinter /> Export PDF
                        </button>
                    </div>

                    {/* Filter Form */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "16px", marginBottom: "28px", alignItems: "end" }}>
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
                            style={{ padding: "10px 20px", backgroundColor: !subjectClass ? "#cbd5e1" : "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: !subjectClass ? "not-allowed" : "pointer", fontWeight: "600", whiteSpace: "nowrap" }}
                        >
                            {lowPerfLoading ? "Loading..." : "Analyse"}
                        </button>
                    </div>

                    {/* Subject-wise output */}
                    <div className="report-content-body">
                        {lowPerfLoading && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
                                <p>Analysing subject performance...</p>
                            </div>
                        )}
                        {!lowPerfLoading && !lowPerfFetched && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                                <FiAlertTriangle size={48} style={{ marginBottom: "12px" }} />
                                <p style={{ fontSize: "16px" }}>Select a section and class, then click "Analyse" to see subject-wise low performers.</p>
                            </div>
                        )}
                        {!lowPerfLoading && lowPerfFetched && renderSubjectWise()}
                    </div>

                    <div className="print-footer" style={{ display: "none", justifyContent: "space-between", marginTop: "60px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                        <div className="sig-box">..........................................<br />Deputy Principal (Development) Signature</div>
                    </div>
                </div>
            )}
        </div>
    );
}
