import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bell, Loader2, Search } from "lucide-react";

export default function TeacherAnnouncementsView() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/announcements`, config);
        const data = Array.isArray(res.data) ? res.data : [];
        const sorted = data.sort((a, b) => b.id - a.id);
        setAnnouncements(sorted);
      } catch (err) {
        console.error("Failed to load announcements:", err);
        setError("Failed to load announcements. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = (ann.title && ann.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
                          (ann.content && ann.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || ann.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div style={{ display: "flex", height: "60vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <Loader2 size={36} style={{ animation: "spin 1s linear infinite", color: "#2b55cc" }} />
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
        .announcement-card {
          background: #fff;
          border-radius: 1rem;
          border: 1px solid #e2e8f0;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.25s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .announcement-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.07);
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <Bell size={28} color="#2b55cc" />
          <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#1e293b", fontWeight: 700 }}>School Announcements</h1>
        </div>
        <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
          School-wide notices and academic updates.
        </p>
      </div>

      {/* Filter controls */}
      <div style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "1rem",
        padding: "1.25rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "2rem"
      }}>
        <div style={{ position: "relative", width: "300px" }}>
          <input 
            type="text" 
            placeholder="Search announcements..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 16px 10px 40px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              width: "100%",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          <Search size={16} style={{ position: "absolute", left: 14, top: 12, color: "#94a3b8" }} />
        </div>
        
        <div style={{ display: "flex", gap: "8px" }}>
          {["All", "Academic", "Sports", "General"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: selectedCategory === cat ? "none" : "1px solid #cbd5e1",
                backgroundColor: selectedCategory === cat ? "#2b55cc" : "white",
                color: selectedCategory === cat ? "white" : "#64748b",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "40px", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontSize: "15px", margin: 0 }}>No announcements found matching the filter criteria.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {filteredAnnouncements.map((ann) => (
            <div key={ann.id} className="announcement-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
                  padding: "4px 8px",
                  fontSize: "11px",
                  fontWeight: "600",
                  borderRadius: "4px",
                  backgroundColor: ann.category === "Academic" ? "#dbeafe" : ann.category === "Sports" ? "#fef3c7" : "#e2e8f0",
                  color: ann.category === "Academic" ? "#1e40af" : ann.category === "Sports" ? "#d97706" : "#475569",
                  textTransform: "uppercase"
                }}>{ann.category || "General"}</span>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>Audience: {ann.targetAudience || "All"}</span>
              </div>
              <h3 style={{ margin: "4px 0 0", fontSize: "1.1rem", color: "#1e293b", fontWeight: 700 }}>
                {ann.title}
              </h3>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569", lineHeight: "1.5", flex: 1 }}>
                {ann.content}
              </p>
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                <span>Published</span>
                <span>📅 {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
