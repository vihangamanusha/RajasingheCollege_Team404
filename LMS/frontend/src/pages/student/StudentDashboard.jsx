import React, { useState, useEffect } from "react";
import axios from "axios";
import { Award, ClipboardList, Download, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/student";

export default function StudentDashboard({ studentId }) {
  const [student, setStudent] = useState(null);
  const [marks, setMarks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileRes, marksRes] = await Promise.all([
          axios.get(`${BASE_URL}/${studentId}`),
          axios.get(`${BASE_URL}/${studentId}/marks`),
        ]);
        setStudent(profileRes.data);
        // Show only the 3 most recent marks
        setMarks(Array.isArray(marksRes.data) ? marksRes.data.slice(0, 3) : []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  if (loading) return (
      <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <Loader2 size={40} style={{ animation: "spin 1s linear infinite", color: "#2563eb" }} />
        <p style={{ color: "#64748b" }}>Loading dashboard...</p>
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
      <div style={{ fontFamily: "'Inter', sans-serif", animation: "fadeIn 0.5s ease" }}>
        <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .action-card { background: #fff; padding: 1.5rem; border-radius: 1rem; border: 1px solid #e2e8f0; text-decoration: none; display: block; transition: all 0.25s; cursor: pointer; }
        .action-card:hover { transform: translateY(-4px); border-color: #2563eb; box-shadow: 0 8px 20px rgba(37,99,235,0.1); }
        .list-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f8fafc; border-radius: 10px; margin-bottom: 10px; }
      `}</style>

        {/* Welcome Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
          color: "white", padding: "2.5rem", borderRadius: "1rem",
          display: "flex", alignItems: "center", gap: "1.5rem",
          boxShadow: "0 10px 25px rgba(30,58,138,0.2)", marginBottom: "2rem"
        }}>
          <div style={{ background: "rgba(255,255,255,0.2)", width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Award size={35} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.75rem" }}>
              Welcome Back, {student?.fullName || "Student"}!
            </h1>
            {/* StudentProfileDTO returns flat className field — no nested classEntity */}
            <p style={{ margin: "6px 0 0 0", opacity: 0.85, fontSize: "0.95rem" }}>
              {student?.className || "—"} &nbsp;|&nbsp; Student ID: {student?.studentId || "—"}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          <Link to="/student/marks" className="action-card">
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "white" }}>
              <ClipboardList size={22} />
            </div>
            <h3 style={{ margin: "0 0 4px", color: "#1e293b", fontSize: "1rem" }}>View My Marks</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Check your exam results.</p>
          </Link>

          <div
              className="action-card"
              onClick={() => window.open(`${BASE_URL}/${studentId}/report/pdf`, "_blank")}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "white" }}>
              <Download size={22} />
            </div>
            <h3 style={{ margin: "0 0 4px", color: "#1e293b", fontSize: "1rem" }}>Download Report</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Get your progress report PDF.</p>
          </div>

          <Link to="/student/materials" className="action-card">
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "white" }}>
              <BookOpen size={22} />
            </div>
            <h3 style={{ margin: "0 0 4px", color: "#1e293b", fontSize: "1rem" }}>Study Materials</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Access lesson resources.</p>
          </Link>
        </div>

        {/* Recent Marks — m.subjectName comes from StudentMarksDTO */}
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "1rem", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 1.25rem" }}>Recent Performance</h2>
          {marks.length > 0 ? marks.map((m) => (
              <div key={m.markId} className="list-item">
                <span style={{ fontWeight: 500, color: "#1e293b" }}>{m.subjectName || "—"}</span>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>
              {m.assignmentMark != null ? `${m.assignmentMark}%` : "—"}
            </span>
              </div>
          )) : (
              <p style={{ color: "#94a3b8", textAlign: "center", padding: "1.5rem 0" }}>No marks recorded yet.</p>
          )}
        </div>
      </div>
  );
}