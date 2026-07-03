import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookCopy, Loader2, ArrowLeft, FileText, Video, Download } from "lucide-react";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/student`;

const MySubjects = ({ studentId }) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [docsLoading, setDocsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch subjects on mount
    useEffect(() => {
        if (!studentId) return;

        const fetchSubjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${BASE_URL}/${studentId}/subjects`);
                setSubjects(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Subjects fetch error:", err);
                setError("Failed to load subjects. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [studentId]);

    // Fetch documents when a subject is selected
    const handleSubjectClick = async (subject) => {
        setSelectedSubject(subject);
        setDocsLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/subjects/${subject.subjectId}/documents`);
            setDocuments(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Documents fetch error:", err);
        } finally {
            setDocsLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedSubject(null);
        setDocuments([]);
    };

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
        <div style={{ fontFamily: "'Inter', sans-serif", animation: "fadeIn 0.3s ease" }}>
            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .subject-card { background: #ffffff; padding: 1.5rem; border-radius: 1rem; border: 1px solid #e2e8f0; transition: all 0.25s; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .subject-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(37,99,235,0.1); border-color: #2563eb; }
        .subject-badge { display: inline-block; background: #eff6ff; color: #2563eb; font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; margin-bottom: 0.75rem; }
        .subject-detail { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 0.875rem; color: #64748b; }
        
        .material-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8f0; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1.25rem; transition: all 0.25s; }
        .material-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); border-color: #2563eb; }
        .dl-btn { background: #f1f5f9; color: #1e293b; border: none; width: 40px; height: 40px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
        .dl-btn:hover { background: #2563eb; color: #fff; }
      `}</style>

            {/* Header / Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
                {selectedSubject ? (
                    <button 
                        onClick={handleBack}
                        style={{ background: "#eff6ff", color: "#2563eb", border: "none", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                ) : (
                    <BookCopy size={28} color="#2563eb" />
                )}
                <div>
                    <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#1e293b", fontWeight: 700 }}>
                        {selectedSubject ? selectedSubject.subjectName : "My Subjects"}
                    </h1>
                    <p style={{ margin: "3px 0 0", color: "#64748b", fontSize: "0.875rem" }}>
                        {selectedSubject 
                            ? `Study materials for ${selectedSubject.subjectId}` 
                            : `${subjects.length} subject${subjects.length !== 1 ? "s" : ""} enrolled`}
                    </p>
                </div>
            </div>

            {/* Content View */}
            {!selectedSubject ? (
                /* View 1: Subjects Grid */
                subjects.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
                        {subjects.map((subject) => (
                            <div key={subject.subjectId} className="subject-card" onClick={() => handleSubjectClick(subject)}>
                                <span className="subject-badge">{subject.subjectId}</span>
                                <h2 style={{ color: "#1e293b", margin: "0 0 0.75rem", fontSize: "1.1rem", fontWeight: 700 }}>
                                    {subject.subjectName}
                                </h2>
                                <div className="subject-detail">
                                    <span style={{ fontWeight: 600, color: "#475569" }}>Class:</span> {subject.classId || "—"}
                                </div>
                                <div className="subject-detail">
                                    <span style={{ fontWeight: 600, color: "#475569" }}>Teacher ID:</span> {subject.teacherId || "—"}
                                </div>
                                <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#2563eb", fontWeight: 600 }}>
                                    View Materials →
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: "1rem", border: "1px solid #e2e8f0" }}>
                        <BookCopy size={48} color="#e2e8f0" style={{ marginBottom: "1rem" }} />
                        <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>No subjects found for your class.</p>
                    </div>
                )
            ) : (
                /* View 2: Materials for Selected Subject */
                docsLoading ? (
                    <div style={{ display: "flex", height: "40vh", alignItems: "center", justifyContent: "center" }}>
                        <Loader2 size={32} style={{ animation: "spin 1s linear infinite", color: "#2563eb" }} />
                    </div>
                ) : documents.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
                        {documents.map((doc) => (
                            <div key={doc.documentId} className="material-card">
                                <div style={{
                                    width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                    background: isPdf(doc.filePath) ? "#fee2e2" : "#dbeafe",
                                    color:      isPdf(doc.filePath) ? "#dc2626"  : "#2563eb",
                                }}>
                                    {isPdf(doc.filePath) ? <FileText size={24} /> : <Video size={24} />}
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{ margin: 0, fontSize: "1rem", color: "#1e293b", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {doc.title}
                                    </h3>
                                    <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                                        {isPdf(doc.filePath) ? "PDF Document" : "Video Resource"}
                                    </p>
                                    {doc.uploadDate && (
                                        <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "#94a3b8" }}>
                                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                <button
                                    className="dl-btn"
                                    onClick={() => window.open(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/files/download/${doc.filePath}`, "_blank")}
                                    title="Download File"
                                >
                                    <Download size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: "1rem", border: "1px solid #e2e8f0" }}>
                        <FileText size={48} color="#e2e8f0" style={{ marginBottom: "1rem" }} />
                        <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>No materials uploaded for this subject yet.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default MySubjects;