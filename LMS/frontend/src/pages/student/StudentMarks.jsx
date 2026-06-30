import React, { useState, useEffect } from "react";
import axios from "axios";
import { Award, Loader2 } from "lucide-react";

const BASE_URL = "http://localhost:8080/api/student";

export default function StudentMarks({ studentId }) {
  const [marks, setMarks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchMarks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Returns List<StudentMarksDTO> — each item has: markId, subjectName, term, assignmentMark
        const res = await axios.get(`${BASE_URL}/${studentId}/marks`);
        setMarks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Marks fetch error:", err);
        setError("Failed to load marks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [studentId]);

  // Compute real average and grade from DB data
  const average =
      marks.length > 0
          ? (marks.reduce((sum, m) => sum + (m.assignmentMark || 0), 0) / marks.length).toFixed(1)
          : null;

  const getGrade = (avg) => {
    if (avg === null) return "—";
    if (avg >= 75) return "A";
    if (avg >= 65) return "B";
    if (avg >= 55) return "C";
    if (avg >= 35) return "S";
    return "F";
  };

  if (loading) return (
      <div style={{ display: "flex", height: "60vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <Loader2 size={36} style={{ animation: "spin 1s linear infinite", color: "#2563eb" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
  );

  if (error) return (
      <div style={{ display: "flex", height: "60vh", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#ef4444", background: "#fef2f2", padding: "2rem", borderRadius: "1rem", border: "1px solid #fecaca" }}>
          <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>{error}</p>
        </div>
      </div>
  );

  return (
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <style>{`
        .marks-table { width: 100%; border-collapse: collapse; }
        .marks-table th { text-align: left; padding: 1rem; color: #64748b; border-bottom: 2px solid #f1f5f9; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .marks-table td { padding: 1.1rem 1rem; border-bottom: 1px solid #f1f5f9; color: #1e293b; }
        .marks-table tbody tr:hover { background: #f8fafc; }
        .marks-table tbody tr:last-child td { border-bottom: none; }
      `}</style>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.75rem" }}>
          <Award size={32} color="#2563eb" />
          <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#1e293b", fontWeight: 700 }}>My Academic Marks</h1>
        </div>

        {/* Table — uses StudentMarksDTO fields: markId, subjectName, term, assignmentMark */}
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid #e2e8f0", padding: "1.5rem", overflowX: "auto", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <table className="marks-table">
            <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Term</th>
              <th style={{ textAlign: "right" }}>Score</th>
            </tr>
            </thead>
            <tbody>
            {marks.length > 0 ? (
                marks.map((m, i) => (
                    <tr key={m.markId}>
                      <td style={{ color: "#94a3b8", fontWeight: 500 }}>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{m.subjectName || "—"}</td>
                      <td style={{ color: "#64748b" }}>{m.term || "—"}</td>
                      <td style={{ textAlign: "right", fontWeight: 700, color: "#2563eb" }}>
                        {m.assignmentMark != null ? `${m.assignmentMark}%` : "—"}
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
                    No marks recorded yet.
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* Summary box — calculated from real DB marks */}
        {marks.length > 0 && (
            <div style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
              color: "white", padding: "2rem", borderRadius: "1rem",
              display: "flex", gap: "4rem", marginTop: "1.5rem",
              boxShadow: "0 8px 20px rgba(30,58,138,0.2)"
            }}>
              <div>
                <p style={{ margin: 0, opacity: 0.8, fontSize: "0.875rem" }}>Overall Average</p>
                <h2 style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 800 }}>{average}%</h2>
              </div>
              <div>
                <p style={{ margin: 0, opacity: 0.8, fontSize: "0.875rem" }}>Overall Grade</p>
                <h2 style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 800 }}>{getGrade(parseFloat(average))}</h2>
              </div>
              <div>
                <p style={{ margin: 0, opacity: 0.8, fontSize: "0.875rem" }}>Total Subjects</p>
                <h2 style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 800 }}>{marks.length}</h2>
              </div>
            </div>
        )}
      </div>
  );
}