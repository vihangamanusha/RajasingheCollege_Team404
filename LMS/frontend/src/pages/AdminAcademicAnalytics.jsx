import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
    FiPrinter, FiFilter, FiLayers, FiBookOpen, FiUser, FiActivity, FiUsers
} from "react-icons/fi";
import "./AdminAcademicAnalytics.css";

export default function AdminAcademicAnalytics() {
    // ==========================================
    // 1. STATE MANAGEMENT (Hierarchical Filters)
    // ==========================================
    const [reportType, setReportType] = useState("ACADEMIC_RESULTS");
    const [year, setYear] = useState(2026);
    const [grade, setGrade] = useState("10");
    const [selectedClass, setSelectedClass] = useState("ALL");
    const [term, setTerm] = useState("Term 1");
    const [loading, setLoading] = useState(false);

    // ==========================================
    // 2. DYNAMIC CONTENT RENDERING
    // ==========================================
    const renderReportBody = () => {
        switch (reportType) {
            case "ACADEMIC_RESULTS":
                return (
                    <>
                        {selectedClass === "ALL" ? (
                            <div className="chart-card">
                                <h3>Grade {grade} - Section Comparison (Avg Marks)</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={[{name: 'A', avg: 74}, {name: 'B', avg: 68}, {name: 'C', avg: 82}]}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Bar dataKey="avg" fill="#2b55cc" radius={[4, 4, 0, 0]} barSize={60} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="table-card">
                                <h3>Student Ranking Sheet - Class {selectedClass}</h3>
                                <table className="report-table">
                                    <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Student Name</th>
                                        <th>Mathematics</th>
                                        <th>Science</th>
                                        <th>English</th>
                                        <th>Avg</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>B.K.N.S. Lakmal</td>
                                        <td>95</td><td>92</td><td>88</td>
                                        <td>91.6%</td>
                                        <td><span className="badge pass">Pass</span></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Sample Student</td>
                                        <td>82</td><td>78</td><td>75</td>
                                        <td>78.3%</td>
                                        <td><span className="badge pass">Pass</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                );

            case "STUDENT_ENROLLMENT":
                return (
                    <div className="enrollment-view">
                        <div className="stats-grid">
                            <div className="stat-card"><h5>Total Students</h5><p>1,420</p></div>
                            <div className="stat-card"><h5>New Admissions ({year})</h5><p>156</p></div>
                        </div>
                        <div className="chart-card">
                            <h3>Student Distribution Across Grades</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={[{g: '6', c: 210}, {g: '7', c: 195}, {g: '8', c: 220}, {g: '9', c: 205}, {g: '10', c: 190}, {g: '11', c: 200}]}>
                                    <XAxis dataKey="g" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="c" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );

            case "TEACHER_LOAD":
                return (
                    <div className="table-card">
                        <h3>Staff Subject Allocation & Workload</h3>
                        <table className="report-table">
                            <thead>
                            <tr>
                                <th>Teacher Name</th>
                                <th>Subject</th>
                                <th>Classes Assigned</th>
                                <th>Weekly Periods</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr><td>Mr. Aruna Bandara</td><td>Mathematics</td><td>10-A, 10-B, 11-A</td><td>28</td></tr>
                            <tr><td>Mrs. Priyanthi</td><td>Science</td><td>9-A, 9-B, 10-C</td><td>24</td></tr>
                            </tbody>
                        </table>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="analytics-container">

            {/* 3. REPORT TYPE SELECTOR (Hidden on Print) */}
            <div className="report-tabs no-print">
                <button className={reportType === "ACADEMIC_RESULTS" ? "active" : ""} onClick={() => setReportType("ACADEMIC_RESULTS")}>
                    <FiActivity /> Academic Results
                </button>
                <button className={reportType === "STUDENT_ENROLLMENT" ? "active" : ""} onClick={() => setReportType("STUDENT_ENROLLMENT")}>
                    <FiUsers /> Enrollment
                </button>
                <button className={reportType === "TEACHER_LOAD" ? "active" : ""} onClick={() => setReportType("TEACHER_LOAD")}>
                    <FiBookOpen /> Staff Workload
                </button>
            </div>

            {/* 4. CONTROL PANEL / FILTERS (Hidden on Print) */}
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
                            <option value="2026">2026</option><option value="2025">2025</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Grade</label>
                        <select value={grade} onChange={(e) => {setGrade(e.target.value); setSelectedClass("ALL");}}>
                            {[6, 7, 8, 9, 10, 11].map(g => <option key={g} value={g}>Grade {g}</option>)}
                        </select>
                    </div>

                    {reportType === "ACADEMIC_RESULTS" && (
                        <>
                            <div className="filter-group">
                                <label>Section</label>
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
                        </>
                    )}
                </div>
            </div>

            {/* 5. OFFICIAL REPORT LAYOUT (Visible for View & Print) */}
            <div className="official-document">
                <div className="official-report-header">
                    <h1>RAJASINGHE CENTRAL COLLEGE</h1>
                    <h3>{reportType.replace("_", " ")} REPORT</h3>
                    <div className="report-meta">
                        <span><strong>Year:</strong> {year}</span>
                        <span><strong>Grade:</strong> {grade}</span>
                        {reportType === "ACADEMIC_RESULTS" && (
                            <>
                                <span><strong>Section:</strong> {selectedClass}</span>
                                <span><strong>Term:</strong> {term}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="report-content-body">
                    {renderReportBody()}
                </div>

                {/* 6. SIGNATURE FOOTER (Visible on Print) */}
                <div className="print-footer">
                    <div className="sig-box">..........................................<br/>Principal Signature</div>
                    <div className="sig-box">..........................................<br/>System Generated: {new Date().toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    );
}