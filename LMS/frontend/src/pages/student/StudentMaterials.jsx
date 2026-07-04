import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Video, Download, Loader2, BookOpen } from "lucide-react";

const BASE_URL = "http://localhost:8080/api/student";

export default function StudentMaterials() {
  const [docs, setDocs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        // Returns List<StudentDocument> from real 'document' table
        // Fields: documentId (String), title, filePath, uploadDate, teacherId, subjectId
        const res = await axios.get(`${BASE_URL}/documents`, config);
        setDocs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Documents fetch error:", err);
        setError("Failed to load study materials. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const isPdf = (filePath) =>
      typeof filePath === "string" && filePath.toLowerCase().endsWith(".pdf");

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
        .material-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8f0; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; transition: all 0.25s; }
        .material-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); border-color: #2563eb; }
        .dl-btn { background: #f1f5f9; color: #1e293b; border: none; width: 40px; height: 40px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
        .dl-btn:hover { background: #2563eb; color: #fff; }
      `}</style>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <BookOpen size={28} color="#2563eb" />
            <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#1e293b", fontWeight: 700 }}>Study Materials</h1>
          </div>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
            Notes and resources uploaded by your teachers.
          </p>
        </div>

        {/* Materials Grid — uses real 'document' table fields */}
        {docs.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {docs.map((doc) => (
                  <div key={doc.documentId} className="material-card">
                    {/* File type icon based on filePath extension */}
                    <div style={{
                      width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      background: isPdf(doc.filePath) ? "#fee2e2" : "#dbeafe",
                      color:      isPdf(doc.filePath) ? "#dc2626"  : "#2563eb",
                    }}>
                      {isPdf(doc.filePath) ? <FileText size={24} /> : <Video size={24} />}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: 0, fontSize: "1rem", color: "#1e293b", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {doc.title}
                      </h3>
                      <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                        {isPdf(doc.filePath) ? "PDF Document" : "Video Resource"}
                      </p>
                      {/* uploadDate from real 'document' table (was uploadedDate — now fixed) */}
                      {doc.uploadDate && (
                          <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "#94a3b8" }}>
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                      )}
                    </div>

                    {/* Download Button */}
                    <button
                        className="dl-btn"
                        onClick={() => window.open(`http://localhost:8080/files/download/${doc.filePath}`, "_blank")}
                        title="Download File"
                    >
                      <Download size={18} />
                    </button>
                  </div>
              ))}
            </div>
        ) : (
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: "1rem", border: "1px solid #e2e8f0" }}>
              <BookOpen size={48} color="#e2e8f0" style={{ marginBottom: "1rem" }} />
              <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>No study materials uploaded yet.</p>
            </div>
        )}
      </div>
  );
}