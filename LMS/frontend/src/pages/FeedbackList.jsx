import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getFeedback, deleteFeedback } from "../api/feedbackApi";

export default function FeedbackList() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("User");
  const [userRole, setUserRole] = useState("Admin");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub || "User");

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

  const loadFeedback = async () => {
    setLoading(true);

    try {
      const data = await getFeedback();
      const sorted = (data || []).sort((a, b) => b.id - a.id);
      setFeedback(sorted);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    const success = await deleteFeedback(deleteTargetId);
    if (success) {
      setFeedback((prev) => prev.filter((item) => item.id !== deleteTargetId));
    }

    setShowDeleteModal(false);
    setDeleteTargetId(null);
  };

  const filteredFeedback = feedback.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentMessages = feedback.filter((item) => {
    if (!item.createdAt) return false;
    const diff = Date.now() - new Date(item.createdAt).getTime();
    return diff <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div style={styles.page}>
      <div style={styles.headerBlock}>
        <div>
          <p style={styles.orgText}>Rajasinghe Central College</p>
          <h1 style={styles.title}>User Feedback</h1>
          <p style={styles.subtitle}>
            Manage messages submitted through the Contact Us form in a clear and professional view.
          </p>
        </div>

        <div style={styles.profileCard}>
          <div>
            <div style={styles.roleText}>{userRole}</div>
            <div style={styles.userText}>{username}</div>
          </div>
          <div style={styles.avatar}>{(username || "U").slice(0, 2).toUpperCase()}</div>
        </div>
      </div>

      <div style={styles.summaryRow}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Total Messages</div>
          <div style={styles.summaryValue}>{feedback.length}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Recent This Week</div>
          <div style={styles.summaryValue}>{recentMessages}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Search Results</div>
          <div style={styles.summaryValue}>{filteredFeedback.length}</div>
        </div>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔎</span>
          <input
            type="text"
            placeholder="Search by name, email, subject, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
        </div>
        <button style={styles.refreshBtn} onClick={loadFeedback}>
          Refresh List
        </button>
      </div>

      <div style={styles.card}>
        {loading ? (
          <div style={styles.emptyState}>Loading feedback...</div>
        ) : filteredFeedback.length === 0 ? (
          <div style={styles.emptyState}>
            {searchTerm ? "No feedback matches your search." : "No feedback messages found."}
          </div>
        ) : (
          <div style={styles.list}>
            {filteredFeedback.map((item) => (
              <div key={item.id} style={styles.feedbackCard}>
                <div style={{ flex: 1 }}>
                  <div style={styles.cardHeader}>
                    <h2 style={styles.subjectText}>{item.subject || "No Subject"}</h2>
                    <span style={styles.badge}>New</span>
                  </div>
                  <p style={styles.senderText}>
                    From: {item.name || "Unknown"} ({item.email || "No email"})
                  </p>
                  <p style={styles.messageText}>{item.message}</p>
                  <p style={styles.metaText}>
                    Received: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Date not available"}
                  </p>
                </div>

                <button style={styles.deleteBtn} onClick={() => handleDeleteClick(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div style={styles.overlay}>
          <div style={styles.modalBox}>
            <h3 style={{ margin: "0 0 8px", color: "#0f172a" }}>Delete Feedback</h3>
            <p style={{ margin: "0 0 20px", color: "#64748b", lineHeight: 1.6 }}>
              Are you sure you want to delete this feedback message?
            </p>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button style={styles.confirmBtn} onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "24px"
  },
  headerBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  orgText: {
    margin: 0,
    fontSize: "13px",
    color: "#64748b",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase"
  },
  title: {
    margin: "4px 0 6px",
    fontSize: "28px",
    color: "#0f172a",
    fontWeight: 700
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    color: "#64748b",
    maxWidth: "720px",
    lineHeight: 1.6
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "10px 14px",
    boxShadow: "0 6px 16px rgba(15, 23, 42, 0.06)"
  },
  roleText: {
    fontSize: "12px",
    color: "#2563eb",
    fontWeight: 700,
    textTransform: "uppercase"
  },
  userText: {
    fontSize: "14px",
    color: "#0f172a",
    fontWeight: 600
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: 700
  },
  summaryRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "18px"
  },
  summaryCard: {
    background: "white",
    borderRadius: "16px",
    padding: "16px 18px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 6px 16px rgba(15, 23, 42, 0.04)"
  },
  summaryLabel: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "6px"
  },
  summaryValue: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#0f172a"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
    flexWrap: "wrap"
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: "280px",
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "999px",
    padding: "10px 14px",
    boxShadow: "0 6px 16px rgba(15, 23, 42, 0.04)"
  },
  searchIcon: {
    marginRight: "8px",
    fontSize: "16px"
  },
  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    background: "transparent"
  },
  refreshBtn: {
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "999px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600
  },
  card: {
    background: "white",
    borderRadius: "18px",
    padding: "18px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  feedbackCard: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
    padding: "16px",
    borderRadius: "14px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0"
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
    flexWrap: "wrap"
  },
  subjectText: {
    margin: 0,
    fontSize: "18px",
    color: "#0f172a"
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: 700
  },
  senderText: {
    margin: "0 0 8px",
    color: "#1d4ed8",
    fontWeight: 600,
    fontSize: "14px"
  },
  messageText: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.7,
    fontSize: "14px"
  },
  metaText: {
    margin: "10px 0 0",
    fontSize: "13px",
    color: "#64748b"
  },
  deleteBtn: {
    border: "none",
    background: "#ef4444",
    color: "white",
    borderRadius: "10px",
    padding: "9px 14px",
    cursor: "pointer",
    fontWeight: 600,
    alignSelf: "center"
  },
  emptyState: {
    padding: "40px 16px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "15px"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modalBox: {
    background: "white",
    borderRadius: "16px",
    padding: "24px",
    width: "min(92vw, 380px)",
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.2)"
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px"
  },
  cancelBtn: {
    border: "1px solid #cbd5e1",
    background: "white",
    color: "#334155",
    borderRadius: "10px",
    padding: "8px 14px",
    cursor: "pointer"
  },
  confirmBtn: {
    border: "none",
    background: "#dc2626",
    color: "white",
    borderRadius: "10px",
    padding: "8px 14px",
    cursor: "pointer"
  }
};
