import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Video, Download, Loader2, BookOpen, Calendar, ClipboardList } from "lucide-react";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/assignments`;

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const loggedInUsername = localStorage.getItem("username");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Resolve student profile to get classId
        const profileRes = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/users/student/${loggedInUsername}`, config);
        const studentData = profileRes.data;

        if (studentData && studentData.classEntity && studentData.classEntity.classId) {
          const classId = studentData.classEntity.classId;
          // 2. Fetch assignments for this class
          const res = await axios.get(`${BASE_URL}/class/${classId}`, config);
          setAssignments(Array.isArray(res.data) ? res.data : []);
        } else {
          setAssignments([]);
        }
      } catch (err) {
        console.error("Assignments fetch error:", err);
        setError("Failed to load assignments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const isPdf = (filePath) =>
      typeof filePath === "string" && filePath.toLowerCase().endsWith(".pdf");

  return (
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <style>{`
        .assignment-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8f0; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; transition: all 0.25s; }
        .assignment-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); border-color: #2563eb; }
        .dl-btn { background: #f1f5f9; color: #1e293b; border: none; width: 40px; height: 40px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
        .dl-btn:hover { background: #2563eb; color: #fff; }
      `}</style>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <ClipboardList size={28} color="#2563eb" />
            <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#1e293b", fontWeight: 700 }}>Class Assignments</h1>
          </div>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
            Assignments uploaded by your teachers for your class.
          </p>
        </div>

        {/* Assignments Loader */}
        {loading ? (
            <div style={{ display: "flex", height: "40vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
              <Loader2 size={36} style={{ animation: "spin 1s linear infinite", color: "#2563eb" }} />
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        ) : error ? (
            <div style={{ display: "flex", height: "40vh", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", color: "#ef4444", background: "#fef2f2", padding: "2rem", borderRadius: "1rem", border: "1px solid #fecaca" }}>
                <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>{error}</p>
              </div>
            </div>
        ) : assignments.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {assignments.map((asm) => (
                  <div key={asm.assignmentId} className="assignment-card">
                    {/* File type icon based on filePath extension */}
                    <div style={{
                      width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      background: isPdf(asm.filePath) ? "#fee2e2" : "#dbeafe",
                      color:      isPdf(asm.filePath) ? "#dc2626"  : "#2563eb",
                    }}>
                      {isPdf(asm.filePath) ? <FileText size={24} /> : <Video size={24} />}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: 0, fontSize: "1rem", color: "#1e293b", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {asm.title}
                      </h3>
                      <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                        Subject: <span style={{ fontWeight: 600 }}>{asm.subjectId}</span>
                      </p>
                      {asm.dueDate && (
                          <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#e11d48", fontWeight: 600 }}>
                            Due Date: {new Date(asm.dueDate).toLocaleDateString()}
                          </p>
                      )}
                      {asm.note && (
                          <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "#475569", fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            Note: {asm.note}
                          </p>
                      )}
                      {asm.uploadDate && (
                          <p style={{ margin: "4px 0 0", fontSize: "0.74rem", color: "#94a3b8" }}>
                            Uploaded: {new Date(asm.uploadDate).toLocaleDateString()}
                          </p>
                      )}
                    </div>

                    {/* Download Button */}
                    {asm.filePath && (
                        <button
                            className="dl-btn"
                            onClick={() => {
                              const url = asm.filePath.startsWith("http") ? asm.filePath : `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/uploads/${asm.filePath}`;
                              window.open(url, "_blank");
                            }}
                            title="Download Assignment File"
                        >
                          <Download size={18} />
                        </button>
                    )}
                  </div>
              ))}
            </div>
        ) : (
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: "1rem", border: "1px solid #e2e8f0" }}>
              <BookOpen size={48} color="#e2e8f0" style={{ marginBottom: "1rem" }} />
              <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>No assignments uploaded for your class yet.</p>
            </div>
        )}
      </div>
  );
}
