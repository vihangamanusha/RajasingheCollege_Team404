import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiLock } from "react-icons/fi";
import axios from "axios";

export default function AdminAnnouncements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    targetAudience: "",
    content: ""
  });

  // User Profile & Password modal states
  const [username, setUsername] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });
  const [userRole, setUserRole] = useState("User");

  const API_URL = "http://localhost:8080/api/announcements";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub);
        const role = localStorage.getItem("role");
        setUserRole(role ? (role === "ROLE_TECHNICAL_OFFICER" || role === "TECHNICAL_OFFICER" ? "Technical Officer" : "Admin") : "User");
      } catch (error) {
        console.log("Invalid token");
      }
    }
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(API_URL);
      const sorted = (response.data || []).sort((a, b) => b.id - a.id);
      setAnnouncements(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }

      setFormData({
        title: "",
        category: "",
        targetAudience: "",
        content: ""
      });

      setEditingId(null);
      setShowModal(false);
      fetchAnnouncements();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  try {
    await axios.delete(`${API_URL}/${deleteId}`);
    fetchAnnouncements();
  } catch (error) {
    console.log(error);
  } finally {
    setShowDeleteModal(false);
    setDeleteId(null);
  }
};

  const handleEdit = (announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title || "",
      category: announcement.category || "",
      targetAudience: announcement.targetAudience || "",
      content: announcement.content || ""
    });
    setShowModal(true);
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
    <div className="main-page-container">
      {/* TOP HEADER */}
      <header className="top-header">
        <div className="header-title">
          <h3>Rajasinghe Central College</h3>
        </div>
        <div className="user-profile">
          <div className="user-info">
            <p className="user-role">{userRole}</p>
            <p className="user-name" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {username || "User"}
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

      {/* MAIN CONTENT */}
      <div className="page-content">
        {/* HEADER */}
        <div className="header page-header">
          <div>
            <h1>Announcements & Notices</h1>
            <p className="subtitle">Manage school-wide announcements</p>
          </div>
          <button className="addBtn" onClick={() => setShowModal(true)}>
            + Add Announcement
          </button>
        </div>

        <div className="cardContainer">
          {announcements.length === 0 ? (
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #f8fafc, #eef2f7)",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    color: "#475569",
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
    
  }}
>
  <div style={{ fontSize: "42px", marginBottom: "12px" }}>📭</div>

  <h3
    style={{
      margin: "0 0 6px 0",
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b"
    }}
  >
    No Announcements Found
  </h3>

  <p
    style={{
      margin: 0,
      fontSize: "14px",
      color: "#64748b"
    }}
  >
    There are currently no announcements available.  
    Create a new one to get started.
  </p>
</div>
  ) : (
          announcements.map((a) => (
            <div className="announcementCard" key={a.id}>
              {/* TOP ROW */}
              <div className="cardTop">
                <div className="iconBox">📢</div>
                <div className="cardMain">
                  <div className="titleRow">
                    <h3>{a.title}</h3>
                    <span className={`badge ${(a.category || "uncategorized").toLowerCase()}`}>
                      {a.category || "Uncategorized"}
                    </span>
                  </div>
                  <p className="content">{a.content}</p>
                  {/* META INFO */}
                  <div className="meta">
                    <span>📅 {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="cardActions">
                <button className="editBtn" onClick={() => handleEdit(a)}>
                  Edit
                </button>
                <button className="deleteBtn" onClick={() => handleDeleteClick(a.id)}>
                    Delete
                </button>
              </div>
            </div>
          ))
        )}
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
      {showDeleteModal && (
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
    zIndex: 3000
  }}>
    <div className="modal-box" style={{
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "12px",
      width: "350px",
      textAlign: "center"
    }}>
      
      <h3 style={{ marginBottom: "10px" }}>Delete Announcement</h3>
      <p style={{ color: "#64748b", marginBottom: "20px" }}>
        Are you sure you want to delete this announcement?
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={() => setShowDeleteModal(false)}
          style={{
            padding: "8px 16px",
            border: "1px solid #cbd5e1",
            background: "white",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: "#2d75bc",
          }}
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          style={{
            padding: "8px 16px",
            border: "none",
            background: "#dc2626",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}

      {/* MODAL */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modal">
            <button
              className="closeBtn"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setFormData({
                  title: "",
                  category: "",
                  targetAudience: "",
                  content: ""
                });
              }}
            >
              ×
            </button>
            <h2>{editingId ? "Update Announcement" : "Create Announcement"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="formGrid">
                <input
                  type="text"
                  name="title"
                  placeholder="Announcement Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{
                         width: "550px",
                  }}
                />
                <br />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Events">Events</option>
                  <option value="Exams">Exams</option>
                </select>
                <br />
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Audience</option>
                  <option value="Students">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Parents">Parents</option>
                  <option value="All">All</option>
                </select>
              </div>
              <textarea
                name="content"
                placeholder="Announcement Content"
                value={formData.content}
                onChange={handleChange}
                required
                
              />
              <div className="modalActions">
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setShowModal(false)}
                  style={{
                 
                }}
                >
                  Cancel
                </button>
                <button type="submit" className="saveBtn">
                  {editingId ? "Update" : "Add Announcement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    
  );
}