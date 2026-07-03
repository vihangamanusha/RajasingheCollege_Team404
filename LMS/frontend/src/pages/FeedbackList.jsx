import { useEffect, useState } from "react";
import { getFeedback, deleteFeedback } from "../api/feedbackApi";

export default function FeedbackList() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);

      setUsername(decoded.sub);

      const role = localStorage.getItem("role");
      setUserRole(
        role === "ROLE_TECHNICAL_OFFICER" || role === "TECHNICAL_OFFICER"
          ? "Technical Officer"
          : "Admin"
      );
    } catch (error) {
      console.log("Invalid token");
    }
  }

  loadFeedback();
}, []);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
  setLoading(true);

  const data = await getFeedback();

  // NEWEST FIRST (by id or createdAt)
  const sorted = (data || []).sort((a, b) => b.id - a.id);

  setFeedback(sorted);

  setLoading(false);
};

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      const success = await deleteFeedback(id);
      if (success) {
        setFeedback(feedback.filter((item) => item.id !== id));
      }
    }
  };

  const filteredFeedback = feedback.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="page feedback-page">
      <div className="page-header">
        <div>
          <p className="page-org">Rajasinghe Central College</p>
          <h1>User Feedback</h1>
          <p className="page-subtitle">
            Manage and respond to messages submitted via the Contact Us form.
          </p>
        </div>
      </div>

      <div className="dashboard-topbar">
        <div className="search-container" style={{ width: "100%", maxWidth: "400px" }}>
          <input
            type="text"
            placeholder="Search by name, email or subject..."
            className="form-input"
            style={{ 
                width: "100%", 
                padding: "12px 20px", 
                borderRadius: "999px", 
                border: "1px solid rgba(36, 49, 78, 0.12)",
                background: "#ffffff",
                outline: "none"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="page-actions">
          <button className="btn secondary" onClick={loadFeedback}>
            Refresh List
          </button>
        </div>
      </div>

      <div className="section-card">
       
        {loading ? (
           //loading is true
          <div className="empty-state">Loading feedback...</div>
        ) : filteredFeedback.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? "No feedback matches your search." : "No feedback messages found."}
          </div>
        ) : (
          <div className="news-list">
            {filteredFeedback.map((item) => (
              <div key={item.id} className="news-card">
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                    <h2 style={{ margin: 0 }}>{item.subject || "No Subject"}</h2>
                    <span className="status" style={{ height: "24px", minWidth: "auto", padding: "0 10px", fontSize: "0.75rem" }}>
                      New
                    </span>
                  </div>
                  <p className="meta" style={{ margin: "4px 0", color: "#1e3a8a", fontWeight: "600" }}>
                    From: {item.name} ({item.email})
                  </p>
                  <p style={{ marginTop: "12px", color: "#44516a", lineHeight: "1.6" }}>
                    {item.message}
                  </p>
                  <p className="meta" style={{ marginTop: "12px", fontSize: "0.85rem" }}>
                    Received: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Date not available"}
                  </p>
                </div>
                <div className="news-card-actions">
                  <div className="actions">
                    <button 
                      className="delete" 
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
