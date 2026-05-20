import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { addNews, deleteNews, getNews, updateNews } from "../api/newsApi";


export default function NewsList() {
  const navigate = useNavigate();
  const tabs = [
  { name: "News", path: "/news" },
  { name: "Sports", path: "/SportsList" },
  { name: "Live Stream", path: "/livestream-admin" },
  { name: "Events", path: "/events" }
];
  const [activeTab, setActiveTab] = useState("News");
  const [news, setNews] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", date: "", image: null });
  const [statusMessage, setStatusMessage] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);


  const loadNews = async () => {
  try {
    const data = await getNews();

    const sortedNews = (data || [])
      .sort((a, b) => b.id - a.id); // newest first

    setNews(sortedNews);
  } catch (error) {
    console.error("Error loading news:", error);
    setStatusMessage("Failed to load articles");
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.title || !form.content) {
    setStatusMessage("Please enter a title and content.");
    return;
  }

  try {
    let imageUrl = "";

    // upload image
    if (form.image instanceof File) {
      const formData = new FormData();
      formData.append("file", form.image);

      const res = await fetch("http://localhost:8080/api/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        setStatusMessage("Image upload failed: " + err);
        return;
      }
      const data = await res.text();
      imageUrl = data;
    }
//creates data object to send to backend
    const payload = {
      title: form.title,
      content: form.content,
      date: form.date || new Date().toISOString().split("T")[0],
      image: imageUrl,
    };

    let response;

    if (editingArticle) {
      response = await fetch(`http://localhost:8080/api/news/${editingArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      response = await fetch("http://localhost:8080/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    //  IMPORTANT CHECK
    if (!response.ok) {
      const errorText = await response.text();
      setStatusMessage("Save failed: " + errorText);
      return;
    }

    // SUCCESS ONLY HERE
    setForm({ title: "", content: "", date: "", image: null });
    setShowAddForm(false);
    setEditingArticle(null);

    await loadNews();

    setStatusMessage(
      editingArticle ? "Updated successfully" : "Created successfully"
    );

  } catch (error) {
    console.error(error);
    setStatusMessage("Server error: " + error.message);
  }
};

  const editArticle = (article) => {
    console.log("Editing article:", article);
    setForm({
      title: article.title || "",
      content: article.content || "",
      date: article.date || "",
      image: article.image || null,
    });
    setEditingArticle(article);
    setShowAddForm(true);
    setStatusMessage("");
  };

  const confirmDelete = (article) => {
    console.log("Confirming delete for article:", article);
    setArticleToDelete(article);
    setShowDeleteConfirm(true);
  };

  const remove = async () => {
    if (!articleToDelete) return;
    
    try {
      console.log("Deleting article:", articleToDelete.id);
      
      const response = await fetch(`http://localhost:8080/api/news/${articleToDelete.id}`, {
        method: "DELETE",
      });
      
      console.log("Delete response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }
      
      setShowDeleteConfirm(false);
      setArticleToDelete(null);
      await loadNews();
      setStatusMessage("Article deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      setStatusMessage("Failed to delete article.");
    }
  };

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <p className="page-org">Rajasinghe Central College</p>
          <h1>Website Content Management</h1>
          <p className="page-subtitle">Update and manage the public school website.</p>
        </div>

        <div className="page-actions">
          <button className="btn secondary" onClick={() => navigate("/feedback")}>View Feedback</button>
          <button className="btn outline">Preview Website</button>
        </div>
      </div>

      <div className="dashboard-topbar">
        <div className="tabs">
          {tabs.map((tab) => (
           <button
             key={tab.name}
             type="button"
             className="tab"
             onClick={() => navigate(tab.path)}
           >
             {tab.name}
           </button>
          ))}
        </div>

        <button className="btn primary" type="button" onClick={() => setShowAddForm(true)}>
          Add New Article
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="section-label">{editingArticle ? "Edit Article" : "Add Article"}</div>
                <h2 className="section-title">{editingArticle ? "Edit News Article" : "Add New News Article"}</h2>
              </div>
              <button className="close-modal" type="button" onClick={() => {
                setShowAddForm(false);
                setEditingArticle(null);
                setForm({ title: "", content: "", date: "", image: "" });
              }}>
                ×
              </button>
            </div>

            {statusMessage && <p className="status-text">{statusMessage}</p>}

            <form className="form" onSubmit={handleSubmit}>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
             <input
                key={form.image ? "file-selected" : "file-empty"}
                type="file"
                accept="image/*"
                onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
               }
              />
              <div className="form-actions">
                <button type="submit" className="btn primary">
                  {editingArticle ? "Update Article" : "Save Article"}
                </button>
                <button type="button" className="btn secondary" onClick={() => {
                  setShowAddForm(false);
                  setEditingArticle(null);
                  setForm({ title: "", content: "", date: "", image: null });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="section-label">Confirm Delete</div>
                <h2 className="section-title">Delete Article</h2>
              </div>
              <button className="close-modal" type="button" onClick={() => setShowDeleteConfirm(false)}>
                ×
              </button>
            </div>

            <div style={{ padding: "1rem" }}>
              <p>Are you sure you want to delete the article "<strong>{articleToDelete?.title}</strong>"?</p>
              <p style={{ color: "#721c24", marginTop: "0.5rem" }}>This action cannot be undone.</p>
            </div>

            <div className="form-actions">
              <button type="button" className="btn primary" onClick={remove} style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}>
                Delete Article
              </button>
              <button type="button" className="btn secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="section-card content-panel">
        <div className="section-header section-header-space-between">
          <div>
            <div className="section-label">Website Content</div>
            <h2 className="section-title">Manage News Articles</h2>
          </div>
        </div>

        <div className="news-list">
          {news.length === 0 ? (
            <div className="empty-state">No news articles found.</div>
          ) : (
            news.map((article) => (
              <div key={article.id ?? article.title} className="news-card">
                <div className="news-image-wrapper">
  <img
    src={
      article.image?.startsWith("http")
        ? article.image
        : article.image
        ? `http://localhost:8080${article.image.startsWith("/") ? "" : "/"}${article.image}`
        : "https://via.placeholder.com/400"
    }
    alt={article.title}
    className="news-image"
  />
</div>
                <div>
                  <h2>{article.title}</h2>
                  <p className="meta">{article.date || "No date provided"}</p>
                  <p>{article.content}</p>
                </div>
                <div className="news-card-actions">
                  <div className={article.status === "Draft" ? "status draft" : "status"}>
                    {article.status || "Published"}
                  </div>
                  <div className="actions">
                    <button className="edit" type="button" onClick={() => editArticle(article)}>
                      Edit
                    </button>
                    <button className="delete" type="button" onClick={() => confirmDelete(article)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
