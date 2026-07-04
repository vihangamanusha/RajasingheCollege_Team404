import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Download, User, GraduationCap, Calendar, Award,
  Loader2, CheckCircle, FileText, BarChart2,
} from "lucide-react";

const BASE_URL = "http://localhost:8080/api/student";

export default function StudentReport({ studentId }) {
  const [report, setReport]   = useState(null);
  const [student, setStudent] = useState(null);
  const [marks, setMarks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rank, setRank]       = useState("—");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const loggedInUsername = localStorage.getItem("username");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Resolve studentId dynamically
        const profileRes = await axios.get(`http://localhost:8080/admin/users/student/${loggedInUsername}`, config);
        const realStudentId = profileRes.data.studentId;

        // 2. Fetch student details and marks
        const [studentRes, marksRes] = await Promise.all([
          axios.get(`${BASE_URL}/${realStudentId}`, config),        // → StudentProfileDTO
          axios.get(`${BASE_URL}/${realStudentId}/marks`, config),  // → List<StudentMarksDTO>
        ]);

        setStudent(studentRes.data);
        const fetchedMarks = Array.isArray(marksRes.data) ? marksRes.data : [];
        setMarks(fetchedMarks);

        // 3. Fetch report details (optional, don't crash if it fails or is not generated yet)
        try {
          const reportRes = await axios.get(`${BASE_URL}/${realStudentId}/report`, config);
          const reports = Array.isArray(reportRes.data) ? reportRes.data : [];
          setReport(reports.length > 0 ? reports[reports.length - 1] : null);
        } catch (reportErr) {
          console.error("Optional report fetch failed:", reportErr);
          setReport(null);
        }

        // 4. Fetch dynamic class rank (optional, don't crash if it fails)
        try {
          const currentTerm = fetchedMarks.length > 0 ? fetchedMarks[0].term : "Term 1";
          const rankRes = await axios.get(`${BASE_URL}/${realStudentId}/rank?term=${currentTerm}`, config);
          setRank(rankRes.data.rank || "—");
        } catch (rankErr) {
          console.error("Optional dynamic rank fetch failed:", rankErr);
          setRank("—");
        }
      } catch (err) {
        console.error("Report fetch error:", err);
        setError("Failed to load report data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate average from real marks data
  const marksAverage =
      marks.length > 0
          ? (marks.reduce((sum, m) => sum + (m.assignmentMark || 0), 0) / marks.length).toFixed(1)
          : null;

  const handleDownload = () => {
    window.open(`${BASE_URL}/${student?.studentId}/report/pdf`, "_blank");
    setShowModal(true);
  };

  if (loading) return (
      <div style={{ display: "flex", height: "60vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <Loader2 size={40} style={{ animation: "spin 1s linear infinite", color: "#2563eb" }} />
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
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem; }
        .stat-row { display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; background: #f8fafc; border-radius: 12px; margin-bottom: 10px; border: 1px solid #f1f5f9; }
        @media (max-width: 768px) { .info-grid { grid-template-columns: 1fr; } }
      `}</style>

        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Academic Report</h1>
            <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "0.95rem" }}>Official performance summary</p>
          </div>
          <button
              onClick={handleDownload}
              style={{
                background: "#2563eb", color: "white", border: "none",
                padding: "12px 24px", borderRadius: 10, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                fontWeight: 600, fontSize: "0.95rem",
                boxShadow: "0 4px 12px rgba(37,99,235,0.25)", transition: "all 0.2s"
              }}
          >
            <Download size={18} /> Download PDF
          </button>
        </div>

        {/* Report Card */}
        <div style={{ background: "#fff", borderRadius: "1rem", padding: "3rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>

          {/* School Header */}
          <div style={{ textAlign: "center", borderBottom: "2px solid #f1f5f9", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#2563eb", fontSize: "1.4rem", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>
              Rajasinghe Central College
            </h2>
            <h3 style={{ fontSize: "1rem", color: "#1e293b", margin: 0, fontWeight: 600 }}>Student Progress Report</h3>
            {report && (
                <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "8px 0 0" }}>
                  Academic Term: {report.term}
                </p>
            )}
          </div>

          {/* Student Info Grid — uses StudentProfileDTO flat fields */}
          <div className="info-grid">
            {[
              { icon: <User size={20} />,          label: "Student Name",  value: student?.fullName },
              { icon: <GraduationCap size={20} />, label: "Grade & Class", value: student?.className },
              { icon: <Calendar size={20} />,      label: "Student ID",    value: student?.studentId },
              { icon: <Award size={20} />,          label: "Medium",        value: student?.medium },
            ].map((cell, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <div style={{ background: "#eff6ff", width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
                    {cell.icon}
                  </div>
                  <div>
                    <p style={{ color: "#94a3b8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>{cell.label}</p>
                    <p style={{ color: "#1e293b", fontWeight: 700, fontSize: "1rem", margin: "3px 0 0" }}>{cell.value || "—"}</p>
                  </div>
                </div>
            ))}
          </div>

          {/* Performance Summary — uses real report table columns from DB */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.25rem" }}>
              <FileText size={20} color="#2563eb" /> Performance Summary
            </h3>

            {/* total_marks */}
            <div className="stat-row">
              <span style={{ fontWeight: 500, color: "#475569" }}>Total Marks</span>
              <span style={{ fontWeight: 800, color: "#2563eb", fontSize: "1.05rem" }}>
                {report?.totalMarks != null ? report.totalMarks : marks.reduce((sum, m) => sum + (m.assignmentMark || 0), 0)}
              </span>
            </div>

            {/* average */}
            <div className="stat-row">
              <span style={{ fontWeight: 500, color: "#475569" }}>Average</span>
              <span style={{ fontWeight: 800, color: "#2563eb", fontSize: "1.05rem" }}>
                {report?.average != null ? `${report.average}%` : (marksAverage != null ? `${marksAverage}%` : "0.0%")}
              </span>
            </div>

            {/* class rank */}
            <div className="stat-row">
              <span style={{ fontWeight: 500, color: "#475569" }}>Class Rank</span>
              <span style={{ fontWeight: 800, color: "#16a34a", fontSize: "1.05rem" }}>
                {report?.rankPosition != null ? `#${report.rankPosition}` : (rank !== "—" ? `#${rank}` : "—")}
              </span>
            </div>

            {/* Derived from marks DTO */}
            <div className="stat-row">
              <span style={{ fontWeight: 500, color: "#475569" }}>Total Subjects</span>
              <span style={{ fontWeight: 800, color: "#2563eb", fontSize: "1.05rem" }}>{marks.length}</span>
            </div>
          </div>

          {/* Term-by-Term Marks Table */}
          <div style={{ marginTop: "2.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.25rem" }}>
              <Award size={20} color="#2563eb" /> Term-by-Term Marks
            </h3>
            <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Subject</th>
                    <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Term</th>
                    <th style={{ textAlign: "right", padding: "12px 16px", color: "#64748b", fontWeight: 600 }}>Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.length > 0 ? (
                    marks.map((m, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < marks.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 500, color: "#1e293b" }}>{m.subjectName || "—"}</td>
                        <td style={{ padding: "12px 16px", color: "#64748b" }}>{m.term || "—"}</td>
                        <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700, color: "#2563eb" }}>
                          {m.assignmentMark != null ? `${m.assignmentMark}%` : "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center", padding: "24px", color: "#94a3b8" }}>No marks recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {marks.length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8", background: "#f8fafc", borderRadius: 12, marginTop: "1.5rem" }}>
                No report details or marks recorded yet.
              </div>
          )}
        </div>

        {/* Download Success Modal */}
        {showModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
              <div style={{ background: "white", padding: "2.5rem", borderRadius: "1.5rem", width: 360, textAlign: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}>
                <div style={{ background: "#dcfce7", color: "#15803d", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <CheckCircle size={32} />
                </div>
                <h2 style={{ fontSize: "1.4rem", marginBottom: 8 }}>Download Started</h2>
                <p style={{ color: "#64748b", marginBottom: "2rem" }}>
                  Your report PDF is being generated and will download shortly.
                </p>
                <button
                    onClick={() => setShowModal(false)}
                    style={{ width: "100%", background: "#2563eb", color: "white", border: "none", padding: "12px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: "0.95rem" }}
                >
                  Close
                </button>
              </div>
            </div>
        )}
      </div>
  );
}