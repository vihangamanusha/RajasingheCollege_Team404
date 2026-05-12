import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line
} from "recharts";
import {
    FiPrinter, FiFilter, FiLayers, FiBookOpen, FiUser, FiBarChart2
} from "react-icons/fi";
import "./AdminAcademicAnalytics.css";

export default function AdminAcademicAnalytics() {
    // =========================
    // HIERARCHICAL FILTERS
    // =========================
    const [year, setYear] = useState(2026);
    const [grade, setGrade] = useState("10");
    const [selectedClass, setSelectedClass] = useState("ALL"); // "ALL" or specific class like "10-A"
    const [term, setTerm] = useState("Term 1");

    // Data States
    const [reportData, setReportData] = useState([]);
    const [summaryStats, setPassRate] = useState({ pass: 0, fail: 0, topSubject: "" });
    const [loading, setLoading] = useState(false);

    // =========================
    // DYNAMIC DATA FETCHING
    // =========================
    const fetchFilteredReport = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Logic: If "ALL" is selected, we fetch grade-wide comparison.
        // If a class is selected, we fetch class-specific student data.
        let endpoint = `http://localhost:8080/admin/reports/grade-summary?grade=${grade}&term=${term}&year=${year}`;
        if (selectedClass !== "ALL") {
            endpoint = `http://localhost:8080/admin/reports/class-detail?classId=${selectedClass}&term=${term}&year=${year}`;
        }

        try {
            const res = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                setReportData(data);
            }
        } catch (err) {
            console.error("Report Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchFilteredReport(); }, [year, grade, selectedClass, term]);

    return (
        <div className="analytics-container">

            {/* 1. PROFESSIONAL CONTROL PANEL (Hidden on Print) */}
            <div className="report-controls no-print">
                <div className="control-header">
                    <h2><FiLayers /> Academic Reporting Engine</h2>
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
                        <label>Grade Level</label>
                        <select value={grade} onChange={(e) => {setGrade(e.target.value); setSelectedClass("ALL");}}>
                            {[6, 7, 8, 9, 10, 11].map(g => (
                                <option key={g} value={g}>Grade {g}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Section/Class</label>
                        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                            <option value="ALL">Overall Grade {grade} Report</option>
                            <option value={`${grade}-A`}>{grade}-A</option>
                            <option value={`${grade}-B`}>{grade}-B</option>
                            <option value={`${grade}-C`}>{grade}-C</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Examination</label>
                        <select value={term} onChange={(e) => setTerm(e.target.value)}>
                            <option value="Term 1">First Term Test</option>
                            <option value="Term 2">Second Term Test</option>
                            <option value="Term 3">Third Term Test</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 2. OFFICIAL REPORT HEADER (Only visible on Print or Top of Dashboard) */}
            <div className="official-report-header">
                <div className="school-branding">
                    <h1>RAJASINGHE CENTRAL COLLEGE</h1>
                    <h3>Official Academic Performance Report</h3>
                    <div className="report-meta">
                        <span><strong>Year:</strong> {year}</span>
                        <span><strong>Grade:</strong> {grade}</span>
                        <span><strong>Selection:</strong> {selectedClass === "ALL" ? "All Sections" : `Class ${selectedClass}`}</span>
                        <span><strong>Term:</strong> {term}</span>
                    </div>
                </div>
            </div>

            {/* 3. REPORT CONTENT */}
            <div className="report-content">

                {/* CASE A: GRADE-WIDE COMPARISON */}
                {selectedClass === "ALL" ? (
                    <div className="grade-wide-view">
                        <div className="chart-card">
                            <h3>Section-wise Average Comparison</h3>
                            <div className="viz-container">
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={reportData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="classId" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Bar dataKey="average" fill="#2b55cc" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* CASE B: CLASS-SPECIFIC DETAIL */
                    <div className="class-detail-view">
                        <div className="stats-row">
                            <div className="stat-card">
                                <label>Highest Score</label>
                                <h4>98.5%</h4>
                            </div>
                            <div className="stat-card">
                                <label>Class Average</label>
                                <h4>72.4%</h4>
                            </div>
                        </div>

                        <div className="table-card">
                            <h3>Student Performance Ranking - {selectedClass}</h3>
                            <table className="report-table">
                                <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Student Name</th>
                                    <th>Maths</th>
                                    <th>Science</th>
                                    <th>English</th>
                                    <th>Total</th>
                                    <th>Avg</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* These would map from your backend data */}
                                <tr>
                                    <td>1</td>
                                    <td>B.K.N.S. Lakmal</td>
                                    <td>95</td><td>92</td><td>88</td>
                                    <td>275</td><td>91.6%</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Sample Student</td>
                                    <td>80</td><td>85</td><td>78</td>
                                    <td>243</td><td>81.0%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* OFFICIAL FOOTER FOR PRINT */}
            <div className="print-footer">
                <div className="sig-box">..........................................<br/>Principal Signature</div>
                <div className="sig-box">..........................................<br/>Date Generated</div>
            </div>
        </div>
    );
}