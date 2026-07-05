import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiUsers, FiBook, FiGrid, FiLock } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { getNews } from "../api/newsApi";
import "./ToDashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });

  const [stats, setStats] = useState({
    totalStudents: 1284,
    totalTeachers: 87,
    totalClasses: 42,
    totalSubjects: 24,
  });

  const [news, setNews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub);
        fetchDashboardStats(token);
      } catch (error) {
        console.log("Invalid token");
      }
    }
    loadNews();
  }, []);

  const fetchDashboardStats = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/admin/dashboard/stats", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalStudents: data.totalStudents ?? 1284,
          totalTeachers: data.totalTeachers ?? 87,
          totalClasses: data.totalClasses ?? 42,
          totalSubjects: data.totalSubjects ?? 24,
        });
      }
    } catch (error) {
      console.error("Failed to load live statistics, using default values:", error);
    }
  };

  const loadNews = async () => {
    const data = await getNews();
    setNews(data || []);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage({ text: "", type: "" });

    if (newPassword.length < 8) {
      setPasswordMessage({ text: "Password must be at least 8 characters long.", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/user/change-password?username=${encodeURIComponent(username)}&newPassword=${encodeURIComponent(newPassword)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setPasswordMessage({ text: "Password changed successfully! Redirecting to login...", type: "success" });
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 1500);
      } else {
        const errText = await response.text();
        setPasswordMessage({ text: `Failed: ${errText}`, type: "error" });
      }
    } catch (error) {
      setPasswordMessage({ text: "Server error during password update.", type: "error" });
    }
  };

  const getInitials = (name) => {
    if (!name) return "TO";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="to-dashboard-page">
      {/* TOP HEADER */}
      <header className="top-header">
        <div className="header-title">
          <h3>Rajasinghe Central College</h3>
        </div>
        <div className="user-profile">
          <div className="user-info">
            <p className="user-role">Technical Officer</p>
            <p className="user-name" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {username || "TO Officer"}
              <FiLock 
                style={{ cursor: "pointer", color: "#64748b", fontSize: "14px" }} 
                title="Change Password"
                onClick={() => {
                  setPasswordMessage({ text: "", type: "" });
                  setNewPassword("");
                  setConfirmPassword("");
                  setShowPasswordModal(true);
                }} 
              />
            </p>
          </div>
          <div className="user-avatar">
            {getInitials(username)}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="dashboard-content">
        <div className="page-header">
          <h1>Dashboard Overview</h1>
          <p className="page-subtitle">Quick insight into students, teachers, and class activity.</p>
        </div>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-info">
              <p>Total Students</p>
              <h3>{stats.totalStudents.toLocaleString()}</h3>
            </div>
            <div className="stat-icon blue">
              <FiUsers />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <p>Total Teachers</p>
              <h3>{stats.totalTeachers.toLocaleString()}</h3>
            </div>
            <div className="stat-icon yellow">
              <FaGraduationCap />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <p>Total Classes</p>
              <h3>{stats.totalClasses.toLocaleString()}</h3>
            </div>
            <div className="stat-icon green">
              <FiBook />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <p>Total Subjects</p>
              <h3>{stats.totalSubjects.toLocaleString()}</h3>
            </div>
            <div className="stat-icon purple">
              <FiGrid />
            </div>
          </div>
        </div>

        {/* LOWER GRID */}
        <div className="dashboard-lower-grid">
          <div className="section-card recent-works-card">
            <div className="section-header section-header-space-between">
              <div>
                <div className="section-label">Recent Works</div>
                <h2 className="section-title">Latest Articles</h2>
              </div>
            </div>

            {news.length === 0 ? (
              <div className="empty-state">No news articles found.</div>
            ) : (
              <div className="summary-list">
                {news.slice(0, 4).map((article) => (
                  <div key={article.id ?? article.title} className="summary-item">
                    <div>
                      <h3>{article.title}</h3>
                      <p className="meta">{article.date || "No date provided"}</p>
                    </div>
                    <span className={article.status === "Draft" ? "status draft" : "status"}>
                      {article.status || "Published"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section-card quick-actions-card">
            <div className="section-header section-header-space-between">
              <div>
                <div className="section-label">Quick Actions</div>
                <h2 className="section-title">Dashboard Controls</h2>
              </div>
            </div>

            <div className="quick-actions-list">
              <button 
                className="btn secondary quick-action-button" 
                type="button"
                onClick={() => navigate("/to/feedback")}
              >
                View Feedback
              </button>
              <button className="btn outline quick-action-button" type="button">
                Preview Website
              </button>
            </div>

            <div className="quick-action-metrics">
              <div className="metric-item">
                <p className="metric-label">Published</p>
                <p className="metric-value">{news.filter((article) => article.status !== "Draft").length}</p>
              </div>
              <div className="metric-item">
                <p className="metric-label">Drafts</p>
                <p className="metric-value">{news.filter((article) => article.status === "Draft").length}</p>
              </div>
              <div className="metric-item">
                <p className="metric-label">Total Articles</p>
                <p className="metric-value">{news.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}>
          <div className="modal-box" style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            width: "400px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
          }}>
            <div className="modal-header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <FiLock className="warning-icon" style={{color: "#2b55cc", fontSize: "24px"}} />
              <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "700", color: "#1e293b" }}>Change Password</h2>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="modal-form-group" style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    backgroundColor: "white"
                  }}
                />
              </div>
              <div className="modal-form-group" style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    backgroundColor: "white"
                  }}
                />
              </div>

              {/* INLINE MESSAGE */}
              {passwordMessage.text && (
                <div className={`inline-form-message ${passwordMessage.type}`} style={{
                  padding: "10px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  marginBottom: "15px",
                  backgroundColor: passwordMessage.type === "success" ? "#f0fdf4" : "#fef2f2",
                  color: passwordMessage.type === "success" ? "#15803d" : "#b91c1c",
                  border: passwordMessage.type === "success" ? "1px solid #bbf7d0" : "1px solid #fecaca"
                }}>
                  {passwordMessage.text}
                </div>
              )}

              <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" className="cancel-btn" onClick={() => setShowPasswordModal(false)} style={{
                  padding: "8px 16px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  backgroundColor: "white",
                  cursor: "pointer"
                }}>Cancel</button>
                <button type="submit" className="confirm-delete-btn" style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#2b55cc",
                  color: "white",
                  cursor: "pointer"
                }}>Change Password</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
