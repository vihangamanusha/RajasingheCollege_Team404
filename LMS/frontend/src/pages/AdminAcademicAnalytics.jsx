import React, { useState, useEffect } from "react";
// Recharts is the industry standard for React-based data visualization
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
// Icons provide a modern, professional look for the dashboard
import { FiTrendingUp, FiAlertCircle, FiPrinter, FiAward, FiFilter } from "react-icons/fi";
import "./AdminAcademicAnalytics.css";

export default function AdminAcademicAnalytics() {
    // =========================
    // STATE MANAGEMENT
    // =========================
    const [year, setYear] = useState(2026);
    const [term, setTerm] = useState("Term 1");
    const [leaderboard, setLeaderboard] = useState([]);
    const [classPerformance, setClassPerformance] = useState([]);
    const [loading, setLoading] = useState(false);

    // =========================
    // DATA FETCHING LOGIC
    // =========================
    const fetchAnalytics = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            // 1. Fetch Leaderboard: Gets top students based on total marks
            const lbRes = await fetch(`http://localhost:8080/admin/reports/leaderboard?term=${term}&year=${year}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (lbRes.ok) setLeaderboard(await lbRes.json());

            // 2. Fetch Class Performance: Comparing averages across sections
            // We use Promise.all to fetch multiple data points in parallel (Industry Best Practice)
            const classesToCompare = ["10-A", "10-B", "10-C"];
            const performanceResults = await Promise.all(
                classesToCompare.map(async (id) => {
                    const res = await fetch(
                        `http://localhost:8080/admin/reports/class-performance/${id}?currentTerm=${term}&previousTerm=Term 1&year=${year}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    return res.ok ? await res.json() : null;
                })
            );
            // Only keep classes that actually have data
            setClassPerformance(performanceResults.filter(r => r !== null));
        } catch (error) {
            console.error("Reporting Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Re-run the data fetch every time the Admin changes the Year or Term filters
    useEffect(() => {
        fetchAnalytics();
    }, [year, term]);

    // =========================
    // PERFORMANCE ALERT LOGIC
    // =========================
    // This color logic maps directly to your ReportService status
    const getStatusColor = (status) => {
        switch(status) {
            case "GROWTH": return "#22c55e"; // Success Green 🟢
            case "ALERT": return "#ef4444";  // Warning Red 🔴
            default: return "#3b82f6";       // Baseline Blue 🔵
        }
    };

    const handlePrint = () => {
        window.print(); // Triggers browser print dialog
    };

    return (
        <div className="analytics-view-container">

            {/* TOP HEADER - Hidden during printing */}
            <div className="analytics-header-section no-print">
                <div className="title-block">
                    <h1>Academic Intelligence Hub</h1>
                    <p>Decision Support System for Rajasinghe Central College</p>
                </div>
                <div className="action-block">
                    <button className="export-pdf-btn" onClick={handlePrint}>
                        <FiPrinter /> Generate School Report
                    </button>
                </div>
            </div>

            {/* INTERACTIVE FILTERS - Hidden during printing */}
            <div className="analytics-filter-bar no-print">
                <div className="filter-input">
                    <FiFilter className="filter-icon" />
                    <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                        <option value={2026}>Academic Year 2026</option>
                        <option value={2025}>Academic Year 2025</option>
                    </select>
                </div>
                <div className="filter-input">
                    <select value={term} onChange={(e) => setTerm(e.target.value)}>
                        <option value="Term 1">First Term Examination</option>
                        <option value="Term 2">Mid-Term Examination</option>
                        <option value="Term 3">Final Examination</option>
                    </select>
                </div>
            </div>

            {/* DASHBOARD GRID */}
            <div className="analytics-dashboard-grid">

                {/* 1. KPI SUMMARY CARDS */}
                <div className="kpi-panel">
                    <div className="kpi-box growth">
                        <FiTrendingUp className="kpi-icon" />
                        <label>School Trend</label>
                        <div className="kpi-number">Positive</div>
                        <span>Growth based on latest results</span>
                    </div>

                    <div className="kpi-box alert">
                        <FiAlertCircle className="kpi-icon" />
                        <label>Critical Alerts</label>
                        <div className="kpi-number">02</div>
                        <span>Classes showing {">"}10% drop</span>
                    </div>
                </div>

                {/* 2. PERFORMANCE CHART CARD */}
                <div className="viz-card">
                    <div className="viz-header">
                        <h3>Comparative Section Analysis</h3>
                        <p>Averages analyzed by class section for {term}</p>
                    </div>

                    <div className="chart-area">
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={classPerformance}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="classId" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip cursor={{fill: 'rgba(0,0,0,0.03)'}} />
                                <Bar dataKey="currentAverage" radius={[5, 5, 0, 0]} barSize={45}>
                                    {classPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Logic-driven Legend */}
                    <div className="chart-legend-box">
                        <div className="legend-tag"><span className="indicator growth"></span> Performance Growth</div>
                        <div className="legend-tag"><span className="indicator stable"></span> Stable Performance</div>
                        <div className="legend-tag"><span className="indicator alert"></span> Significant Drop</div>
                    </div>
                </div>

                {/* 3. RANKING LEADERBOARD */}
                <div className="rank-card">
                    <div className="card-top">
                        <FiAward className="award-icon" />
                        <h3>Student Rankings (Top 5)</h3>
                    </div>

                    <table className="ranking-table">
                        <thead>
                        <tr>
                            <th>Student</th>
                            <th>Score</th>
                            <th>Award</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderboard.map((student, index) => (
                            <tr key={index} className={`rank-row-${index + 1}`}>
                                <td className="student-profile">
                                    <div className="rank-badge">{index + 1}</div>
                                    {student[0]}
                                </td>
                                <td><strong>{student[1]}</strong></td>
                                <td className="medal-slot">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}