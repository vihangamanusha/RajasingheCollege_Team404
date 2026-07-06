import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from "recharts";
import {
    FiPrinter, FiLayers, FiActivity
} from "react-icons/fi";
import "./AdminAcademicAnalytics.css";

export default function AdminAcademicAnalytics() {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    const [year, setYear] = useState(2026);
    const [grade, setGrade] = useState("10");
    const [selectedClass, setSelectedClass] = useState("ALL");
    const [term, setTerm] = useState("Term 1");
    const [loading, setLoading] = useState(false);

    const [processedData, setProcessedData] = useState([]);
    const [dynamicSubjects, setDynamicSubjects] = useState([]);

    // ==========================================
    // FETCH AND PROCESS DATA
    // ==========================================
    useEffect(() => {
        fetchReportData();
    }, [year, term, selectedClass, grade]);

    const fetchReportData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/reports/marks?year=${year}&term=${term}&section=${selectedClass}`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            );

            if (response.ok) {
                const rawData = await response.json();

                const grouped = rawData.reduce((acc, curr) => {
                    if (!acc[curr.studentName]) {
                        acc[curr.studentName] = { name: curr.studentName, subjects: {}, total: 0, count: 0 };
                    }
                    acc[curr.studentName].subjects[curr.subjectName] = curr.mark;
                    acc[curr.studentName].total += curr.mark;
                    acc[curr.studentName].count += 1;
                    return acc;
                }, {});

                const subjectsSet = new Set();
                rawData.forEach(item => subjectsSet.add(item.subjectName));
                setDynamicSubjects(Array.from(subjectsSet));

                const finalArray = Object.values(grouped).map(student => ({
                    ...student,
                    avg: student.count > 0 ? (student.total / student.count).toFixed(1) : 0
                })).sort((a, b) => b.avg - a.avg);

                setProcessedData(finalArray);
            }
        } catch (error) {
            console.error("Failed to fetch report data", error);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // DYNAMIC CONTENT RENDERING
    // ==========================================
    const renderReportBody = () => {
        if (selectedClass === "ALL") {
            const comparisonData = [
                { name: 'Class A', avg: 74.2 },
                { name: 'Class B', avg: 68.5 },
                { name: 'Class C', avg: 82.1 }
            ];

            return (
                <div className="overall-report-wrapper">
                    <div className="chart-card">
                        {/* Renamed to Class Comparison */}
                        <h3>Grade {grade} - Class Comparison (Avg Marks)</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={comparisonData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Bar
                                    dataKey="avg"
                                    fill="#2b55cc"
                                    radius={[4, 4, 0, 0]}
                                    barSize={60}
                                    isAnimationActive={false}
                                    label={{ position: 'top', fill: '#1e293b', fontWeight: 'bold', formatter: (val) => `${val}%` }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="table-card">
                        <h3>Class Summary Table</h3>
                        <table className="report-table">
                            <thead>
                            <tr>
                                {/* Renamed Header to Class */}
                                <th>Class</th>
                                <th>Average Mark</th>
                                <th>Performance Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {comparisonData.map(sec => (
                                <tr key={sec.name}>
                                    <td><strong>{sec.name}</strong></td>
                                    <td>{sec.avg}%</td>
                                    <td>
                                            <span className={`badge ${sec.avg >= 75 ? 'pass' : 'neutral'}`}
                                                  style={{ backgroundColor: sec.avg >= 75 ? '#dcfce7' : '#f1f5f9', color: sec.avg >= 75 ? '#15803d' : '#475569' }}>
                                                {sec.avg >= 75 ? 'Above Target' : 'On Track'}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        const totalStudents = processedData.length;
        const passedStudents = processedData.filter(s => parseFloat(s.avg) >= 40).length;
        const passRate = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : 0;
        const classTotalAvg = totalStudents > 0 ? (processedData.reduce((sum, s) => sum + parseFloat(s.avg), 0) / totalStudents).toFixed(1) : 0;
        const highestAvg = totalStudents > 0 ? Math.max(...processedData.map(s => parseFloat(s.avg))).toFixed(1) : 0;

        return (
            <div className="section-report-wrapper">
                {!loading && processedData.length > 0 && (
                    <div className="decision-metrics-grid">
                        <div className="stat-card">
                            <h5>Total Students</h5>
                            <p className="stat-value">{totalStudents}</p>
                        </div>
                        <div className="stat-card">
                            <h5>Class Average</h5>
                            <p className="stat-value" style={{color: classTotalAvg >= 50 ? '#15803d' : '#b91c1c'}}>{classTotalAvg}%</p>
                        </div>
                        <div className="stat-card">
                            <h5>Pass Rate</h5>
                            <p className="stat-value" style={{color: passRate >= 75 ? '#15803d' : '#b91c1c'}}>{passRate}%</p>
                        </div>
                        <div className="stat-card">
                            <h5>Highest Average</h5>
                            <p className="stat-value" style={{color: '#2b55cc'}}>{highestAvg}%</p>
                        </div>
                    </div>
                )}

                <div className="table-card">
                    <h3>Student Ranking & Academic Sheet</h3>
                    {loading ? (
                        <p style={{textAlign: 'center', padding: '20px', color: '#64748b'}}>Generating Report...</p>
                    ) : processedData.length === 0 ? (
                        <p style={{textAlign: 'center', padding: '20px', color: '#64748b'}}>No marks recorded for this selection yet.</p>
                    ) : (
                        <table className="report-table">
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Student Name</th>
                                {dynamicSubjects.map(sub => (
                                    <th key={sub}>{sub}</th>
                                ))}
                                <th>Avg</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {processedData.map((student, index) => (
                                <tr key={student.name}>
                                    <td><strong>{index + 1}</strong></td>
                                    <td>{student.name}</td>
                                    {dynamicSubjects.map(sub => (
                                        <td key={sub}>{student.subjects[sub] !== undefined ? student.subjects[sub] : '-'}</td>
                                    ))}
                                    <td><strong>{student.avg}%</strong></td>
                                    <td>
                                        <span className={`badge ${student.avg >= 40 ? 'pass' : 'fail'}`}
                                              style={{
                                                  backgroundColor: student.avg >= 40 ? '#dcfce7' : '#fee2e2',
                                                  color: student.avg >= 40 ? '#15803d' : '#b91c1c'
                                              }}>
                                            {student.avg >= 40 ? 'Pass' : 'Needs Help'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="analytics-container">
            <div className="report-controls no-print">
                <div className="control-header">
                    <h2><FiLayers /> Filter Insights</h2>
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
                        <label>Grade</label>
                        <select value={grade} onChange={(e) => {setGrade(e.target.value); setSelectedClass("ALL");}}>
                            {[6, 7, 8, 9, 10, 11].map(g => <option key={g} value={g}>Grade {g}</option>)}
                        </select>
                    </div>

                    <div className="filter-group">
                        {/* Renamed Filter Label to Class */}
                        <label>Class</label>
                        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                            <option value="ALL">Overall Grade {grade}</option>
                            <option value={`${grade}-A`}>{grade}-A</option>
                            <option value={`${grade}-B`}>{grade}-B</option>
                            <option value={`${grade}-C`}>{grade}-C</option>
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
                </div>
            </div>

            <div className="official-document">
                <div className="official-report-header">
                    <h1>RAJASINGHE CENTRAL COLLEGE</h1>
                    <h3><FiActivity style={{marginRight: '8px'}}/> ACADEMIC RESULTS REPORT</h3>
                    <div className="report-meta">
                        <span><strong>Year:</strong> {year}</span>
                        <span><strong>Grade:</strong> {grade}</span>
                        {/* Renamed Metadata Label to Class */}
                        <span><strong>Class:</strong> {selectedClass}</span>
                        <span><strong>Term:</strong> {term}</span>
                    </div>
                </div>

                <div className="report-content-body">
                    {renderReportBody()}
                </div>

                <div className="print-footer">
                    <div className="sig-box">..........................................<br/>Principal Signature</div>
                </div>
            </div>
        </div>
    );
}