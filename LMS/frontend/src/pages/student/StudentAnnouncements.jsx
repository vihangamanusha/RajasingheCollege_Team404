import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Megaphone, ChevronDown, ChevronUp } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/announcements`;

const categoryColors = {
  Academic:   { bg: "#dbeafe", color: "#1d4ed8" },
  Event:      { bg: "#fef3c7", color: "#b45309" },
  General:    { bg: "#f0fdf4", color: "#15803d" },
  Sports:     { bg: "#fce7f3", color: "#be185d" },
  Urgent:     { bg: "#fee2e2", color: "#b91c1c" },
};

export default function StudentAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(API_URL);
        const all = (res.data || []).sort((a, b) => b.id - a.id);
        // Show announcements targeted at Students or All
        const filtered = all.filter((ann) => {
          const audience = (ann.targetAudience || "").toLowerCase();
          return audience === "students" || audience === "all" || audience === "";
        });
        setAnnouncements(filtered);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const categories = ["All", ...Array.from(new Set(announcements.map((a) => a.category).filter(Boolean)))];

  const displayed = filterCategory === "All"
    ? announcements
    : announcements.filter((a) => a.category === filterCategory);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", color: "#64748b" }}>
      Loading announcements...
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", animation: "fadeIn 0.4s ease" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .ann-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; cursor: pointer; transition: all 0.2s ease; }
        .ann-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-color: #c7d2fe; transform: translateY(-2px); }
        .filter-pill { padding: 6px 16px; border-radius: 999px; border: 1px solid #e2e8f0; background: #f8fafc; color: #475569; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
        .filter-pill.active { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
        .filter-pill:hover:not(.active) { border-color: #94a3b8; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", color: "white", padding: "2rem 2.5rem", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1.25rem", boxShadow: "0 10px 25px rgba(30,58,138,0.2)", marginBottom: "2rem" }}>
        <div style={{ background: "rgba(255,255,255,0.2)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bell size={28} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 700 }}>Announcements</h1>
          <p style={{ margin: "4px 0 0", opacity: 0.85, fontSize: "0.95rem" }}>Stay up to date with school news and notices</p>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.15)", padding: "8px 18px", borderRadius: "999px", fontSize: "0.9rem", fontWeight: 600 }}>
          {displayed.length} Notice{displayed.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {categories.map((cat) => (
          <button key={cat} className={`filter-pill ${filterCategory === cat ? "active" : ""}`} onClick={() => setFilterCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements list */}
      {displayed.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "#94a3b8" }}>
          <Megaphone size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p style={{ fontSize: "1.1rem" }}>No announcements found.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {displayed.map((ann) => {
            const isOpen = expandedId === ann.id;
            const colors = categoryColors[ann.category] || { bg: "#f1f5f9", color: "#475569" };
            return (
              <div key={ann.id} className="ann-card" onClick={() => setExpandedId(isOpen ? null : ann.id)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Megaphone size={20} color={colors.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 600, color: "#1e293b" }}>{ann.title}</h3>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {ann.category && (
                          <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: 20, background: colors.bg, color: colors.color }}>
                            {ann.category}
                          </span>
                        )}
                        {ann.targetAudience && (
                          <span style={{ fontSize: "11px", fontWeight: 500, padding: "2px 10px", borderRadius: 20, background: "#f0fdf4", color: "#15803d" }}>
                            {ann.targetAudience}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: "#94a3b8", flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isOpen && ann.content && (
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f1f5f9", fontSize: "14px", color: "#475569", lineHeight: 1.7 }}>
                    {ann.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
