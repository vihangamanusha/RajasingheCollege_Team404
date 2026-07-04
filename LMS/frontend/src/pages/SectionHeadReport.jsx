import React, { useState, useEffect } from "react";
import { FiPrinter, FiLayers, FiActivity } from "react-icons/fi";
import "./AdminAcademicAnalytics.css";

export default function SectionHeadReport() {
    const [year, setYear] = useState("2026");
    const [term, setTerm] = useState("Term 1");
    const [selectedClass, setSelectedClass] = useState("ALL");
    const [classes, setClasses] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Range filtering constants
    const minMark = "0";
    const maxMark = "100";

    const subRole = localStorage.getItem("subRole") || "Section Head Grade 6";

    // Extract grade number (e.g. "Section Head Grade 6" -> "6")
    const getSectionGrade = () => {
        const match = subRole.match(/Grade\s+(\d+)/i);
        return match ? match[1] : "";
    };

    const sectionGrade = getSectionGrade();

    const getStatusDetails = (avgVal) => {
        const avg = parseFloat(avgVal);
        if (avg < 30) {
            return { label: "Strongly Weak", bgColor: "#fee2e2", color: "#b91c1c" };
        } else if (avg >= 30 && avg < 50) {
            return { label: "Weak", bgColor: "#ffedd5", color: "#ea580c" };
        } else if (avg >= 50 && avg < 70) {
            return { label: "Good", bgColor: "#dbeafe", color: "#1d4ed8" };
        } else {
            return { label: "Best", bgColor: "#dcfce7", color: "#15803d" };
        }
    };
    const gradeLabel = sectionGrade ? `Grade ${sectionGrade}` : "Grade Section";

    // Load classes matching the section head's grade
    useEffect(() => {
        const loadClasses = async () => {
            if (!sectionGrade) return;
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:8080/api/classes`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const all = await res.json();
                    const filtered = all.filter(c => c.grade === sectionGrade);
                    setClasses(filtered);
                }
            } catch (err) {
                console.error("Failed to load classes", err);
            }
        };
        loadClasses();
    }, [sectionGrade]);

    // Fetch marks report data for the entire grade section
    const fetchSectionReportData = async () => {
        if (!sectionGrade) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8080/admin/reports/section-marks?year=${year}&term=${term}&grade=${sectionGrade}`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            );

            if (response.ok) {
                const rawData = await response.json();
                setReportData(rawData || []);
            }
        } catch (error) {
            console.error("Failed to fetch section report data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSectionReportData();
    }, [year, term, sectionGrade]);

    // Process and render report body
    const renderReportBody = () => {
        if (loading) {
            return <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Generating Report...</p>;
        }

        if (selectedClass === "ALL") {
            // Group by student across all classes in the section
            const groupedAll = reportData.reduce((acc, curr) => {
                if (!acc[curr.studentId]) {
                    acc[curr.studentId] = { 
                        id: curr.studentId, 
                        name: curr.studentName, 
                        className: curr.className, 
                        subjects: {}, 
                        total: 0, 
                        count: 0 
                    };
                }
                acc[curr.studentId].subjects[curr.subjectName] = curr.mark;
                acc[curr.studentId].total += curr.mark;
                acc[curr.studentId].count += 1;
                return acc;
            }, {});

            const subjectsSetAll = new Set();
            reportData.forEach(item => subjectsSetAll.add(item.subjectName));
            const dynamicSubjectsAll = Array.from(subjectsSetAll);

            const finalArrayAll = Object.values(groupedAll).map(student => ({
                ...student,
                avg: student.count > 0 ? (student.total / student.count).toFixed(1) : 0
            })).sort((a, b) => b.avg - a.avg);

            const filteredAll = finalArrayAll;

            return (
                <div className="overall-report-wrapper">
                    <div className="table-card" style={{ marginTop: "0" }}>
                        <h3>Section Student Marks & Ranking Sheet ({gradeLabel})</h3>
                        {filteredAll.length === 0 ? (
                            <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No student marks recorded for this section yet.</p>
                        ) : (
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Student ID</th>
                                        <th>Class</th>
                                        {dynamicSubjectsAll.map(sub => (
                                            <th key={sub}>{sub}</th>
                                        ))}
                                        <th>Total</th>
                                        <th>Avg</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAll.map((student, index) => {
                                        const status = getStatusDetails(student.avg);
                                        return (
                                            <tr key={student.id || index}>
                                                <td><strong>{index + 1}</strong></td>
                                                <td>{student.id}</td>
                                                <td><strong>{student.className}</strong></td>
                                                {dynamicSubjectsAll.map(sub => (
                                                    <td key={sub}>{student.subjects[sub] !== undefined ? student.subjects[sub] : '-'}</td>
                                                ))}
                                                <td><strong>{student.total}</strong></td>
                                                <td><strong>{student.avg}%</strong></td>
                                                <td>
                                                    <span className="badge"
                                                        style={{
                                                            backgroundColor: status.bgColor,
                                                            color: status.color
                                                        }}>
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
        }

        // Specific class selected
        const classMarks = reportData.filter(item => item.className === selectedClass);
        
        // Group by student
        const grouped = classMarks.reduce((acc, curr) => {
            if (!acc[curr.studentId]) {
                acc[curr.studentId] = { 
                    id: curr.studentId, 
                    name: curr.studentName, 
                    subjects: {}, 
                    total: 0, 
                    count: 0 
                };
            }
            acc[curr.studentId].subjects[curr.subjectName] = curr.mark;
            acc[curr.studentId].total += curr.mark;
            acc[curr.studentId].count += 1;
            return acc;
        }, {});

        const subjectsSet = new Set();
        classMarks.forEach(item => subjectsSet.add(item.subjectName));
        const dynamicSubjects = Array.from(subjectsSet);

        const finalArray = Object.values(grouped).map(student => ({
            ...student,
            avg: student.count > 0 ? (student.total / student.count).toFixed(1) : 0
        })).sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));

        // Filter students according to minMark and maxMark range
        const filtered = finalArray.filter(s => {
            const avgVal = parseFloat(s.avg);
            const minVal = minMark.trim() === "" ? 0 : parseFloat(minMark);
            const maxVal = maxMark.trim() === "" ? 100 : parseFloat(maxMark);
            return avgVal >= minVal && avgVal <= maxVal;
        });

        const totalStudents = filtered.length;
        const passedStudents = filtered.filter(s => parseFloat(s.avg) >= 50).length;
        const passRate = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : 0;
        const classTotalAvg = totalStudents > 0 ? (filtered.reduce((sum, s) => sum + parseFloat(s.avg), 0) / totalStudents).toFixed(1) : 0;
        const highestAvg = totalStudents > 0 ? Math.max(...filtered.map(s => parseFloat(s.avg))).toFixed(1) : 0;

        return (
            <div className="section-report-wrapper">
                {filtered.length > 0 && (
                    <div className="decision-metrics-grid">
                        <div className="stat-card">
                            <h5>Filtered Students</h5>
                            <p className="stat-value">{totalStudents}</p>
                        </div>
                        <div className="stat-card">
                            <h5>Class Average</h5>
                            <p className="stat-value" style={{ color: classTotalAvg >= 50 ? '#15803d' : '#b91c1c' }}>{classTotalAvg}%</p>
                        </div>
                        <div className="stat-card">
                            <h5>Pass Rate</h5>
                            <p className="stat-value" style={{ color: passRate >= 75 ? '#15803d' : '#b91c1c' }}>{passRate}%</p>
                        </div>
                        <div className="stat-card">
                            <h5>Highest Average</h5>
                            <p className="stat-value" style={{ color: '#2b55cc' }}>{highestAvg}%</p>
                        </div>
                    </div>
                )}

                <div className="table-card">
                    <h3>Student Ranking & Academic Sheet</h3>
                    {filtered.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No students fall within the selected average marks range.</p>
                    ) : (
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Student ID</th>
                                    {dynamicSubjects.map(sub => (
                                        <th key={sub}>{sub}</th>
                                    ))}
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
                                                <td key={sub}>{student.subjects[sub] !== undefined ? student.subjects[sub] : '-'}</td>
                                            ))}
                                            <td><strong>{student.total}</strong></td>
                                            <td><strong>{student.avg}%</strong></td>
                                            <td>
                                                <span className="badge"
                                                    style={{
                                                        backgroundColor: status.bgColor,
                                                        color: status.color
                                                    }}>
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

    // Compute top 5 students of the overall section grade
    const getTopFivePerformers = () => {
        if (!reportData || reportData.length === 0) return [];
        
        // Group by student across all classes in the section
        const groupedAll = reportData.reduce((acc, curr) => {
            if (!acc[curr.studentId]) {
                acc[curr.studentId] = { 
                    id: curr.studentId, 
                    name: curr.studentName, 
                    className: curr.className, 
                    total: 0, 
                    count: 0 
                };
            }
            acc[curr.studentId].total += curr.mark;
            acc[curr.studentId].count += 1;
            return acc;
        }, {});

        const finalArrayAll = Object.values(groupedAll).map(student => ({
            ...student,
            avg: student.count > 0 ? (student.total / student.count).toFixed(1) : 0
        })).sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));

        return finalArrayAll.slice(0, 5);
    };

    const topFivePerformers = getTopFivePerformers();

    return (
        <div className="analytics-container">
            <div className="report-controls no-print">
                <div className="control-header">
                    <h2><FiLayers /> Filter Section Insights</h2>
                    <button className="print-btn" onClick={() => window.print()}>
                        <FiPrinter /> Export Official PDF
                    </button>
                </div>

                <div className="filter-grid">
                    <div className="filter-group">
                        <label>Year</label>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Exam Term</label>
                        <select value={term} onChange={(e) => setTerm(e.target.value)}>
                            <option value="Term 1">1st Term Test</option>
                            <option value="Term 2">2nd Term Test</option>
                            <option value="Term 3">3rd Term Test</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Section (Grade)</label>
                        <select value={sectionGrade} disabled style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed" }}>
                            <option value={sectionGrade}>{gradeLabel}</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Class</label>
                        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                            <option value="ALL">Overall {gradeLabel}</option>
                            {classes.map(c => (
                                <option key={c.classId} value={c.className}>
                                    {c.className}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="official-document">
                <div className="official-report-header">
                    <h1>RAJASINGHE CENTRAL COLLEGE</h1>
                    <h3><FiActivity style={{ marginRight: '8px' }} /> SECTION ACADEMIC REPORT</h3>
                    <div className="report-meta">
                        <span><strong>Year:</strong> {year}</span>
                        <span><strong>Section:</strong> {gradeLabel}</span>
                        <span><strong>Class:</strong> {selectedClass === "ALL" ? "Overall Comparison" : selectedClass}</span>
                        <span><strong>Term:</strong> {term}</span>
                    </div>
                </div>

                <div className="report-content-body">
                    {renderReportBody()}

                    {/* Top 5 Performers of the Section - only show when Overall is selected */}
                    {selectedClass === "ALL" && topFivePerformers.length > 0 && (
                        <div className="table-card" style={{ marginTop: "40px", borderTop: "2px solid #2b55cc" }}>
                            <h3 style={{ color: "#2b55cc", display: "flex", alignItems: "center", gap: "8px" }}>
                                <FiActivity /> Top 5 Outstanding Performers ({gradeLabel})
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
                                    {topFivePerformers.map((student, index) => {
                                        const status = getStatusDetails(student.avg);
                                        return (
                                            <tr key={student.id || index}>
                                                <td><span style={{ color: "#2b55cc", fontWeight: "bold" }}>#{index + 1}</span></td>
                                                <td>{student.id}</td>
                                                <td><strong>{student.className}</strong></td>
                                                <td><strong>{student.total}</strong></td>
                                                <td><strong>{student.avg}%</strong></td>
                                                <td>
                                                    <span className="badge"
                                                        style={{
                                                            backgroundColor: status.bgColor,
                                                            color: status.color
                                                        }}>
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

                <div className="print-footer">
                    <div className="sig-box">..........................................<br />Section Head Signature</div>
                </div>
            </div>
        </div>
    );
}
