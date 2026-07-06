import React, { useState, useEffect } from "react";
import axios from "axios";
import { Award, Loader2 } from "lucide-react";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/student`;

export default function StudentMarks({ studentId }) {
  const [marks, setMarks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [rank, setRank]       = useState("—");

  useEffect(() => {
    const fetchMarks = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const loggedInUsername = localStorage.getItem("username");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Resolve studentId dynamically
        const profileRes = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/users/student/${loggedInUsername}`, config);
        const realStudentId = profileRes.data.studentId;

        // 2. Fetch marks (required)
        const marksRes = await axios.get(`${BASE_URL}/${realStudentId}/marks`, config);
        const fetchedMarks = Array.isArray(marksRes.data) ? marksRes.data : [];
        setMarks(fetchedMarks);

        // 3. Fetch dynamic class rank (optional, don't crash if it fails or is not calculated yet)
        try {
          const currentTerm = fetchedMarks.length > 0 ? fetchedMarks[0].term : "Term 1";
          const rankRes = await axios.get(`${BASE_URL}/${realStudentId}/rank?term=${currentTerm}`, config);
          setRank(rankRes.data.rank || "—");
        } catch (rankErr) {
          console.error("Optional dynamic rank fetch failed:", rankErr);
          setRank("—");
        }
      } catch (err) {
        console.error("Marks fetch error:", err);
        setError("Failed to load marks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  // Compute real average and grade from DB data
  const average =
      marks.length > 0
          ? (marks.reduce((sum, m) => sum + (m.assignmentMark || 0), 0) / marks.length).toFixed(1)
          : null;

  const totalMarks =
      marks.length > 0
          ? marks.reduce((sum, m) => sum + (m.assignmentMark || 0), 0)
          : 0;

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
              padding: "2rem", borderRadius: "1rem",
              display: "flex", justifyContent: "space-between", gap: "2rem", marginTop: "1.5rem",
              boxShadow: "0 8px 20px rgba(30,58,138,0.2)",
              flexWrap: "wrap"
            }}>
              <div style={{ flex: "1 1 120px" }}>
                <p style={{ margin: 0, opacity: 0.85, fontSize: "0.875rem", color: "#ffffff" }}>Overall Average</p>
                <h2 style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 800, color: "#ffffff" }}>{average}%</h2>
              </div>
              <div style={{ flex: "1 1 120px" }}>
                <p style={{ margin: 0, opacity: 0.85, fontSize: "0.875rem", color: "#ffffff" }}>Total Marks</p>
                <h2 style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 800, color: "#ffffff" }}>{totalMarks}</h2>
              </div>
              <div style={{ flex: "1 1 120px" }}>
                <p style={{ margin: 0, opacity: 0.85, fontSize: "0.875rem", color: "#ffffff" }}>Total Subjects</p>
                <h2 style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 800, color: "#ffffff" }}>{marks.length}</h2>
              </div>
              <div style={{ flex: "1 1 120px" }}>
                <p style={{ margin: 0, opacity: 0.85, fontSize: "0.875rem", color: "#ffffff" }}>My Rank</p>
                <h2 style={{ margin: "6px 0 0", fontSize: "2rem", fontWeight: 800, color: "#ffffff" }}>{rank !== "—" ? `#${rank}` : "—"}</h2>
              </div>
            </div>
        )}
      </div>
  );
}