import { useEffect, useState } from "react";
import { addNews, deleteNews, getNews } from "../api/newsApi";

export default function NewsList() {
  const tabs = ["News", "Sports", "Live Stream"];
  const [activeTab, setActiveTab] = useState("News");
  const [news, setNews] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", date: "", image: null });
  const [imagePreview, setImagePreview] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    loadNews();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));

    if (!file) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const loadNews = async () => {
    try {
      const data = await getNews();
      console.log("Setting news to:", data);
      setNews(data || []);
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
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("content", form.content);
      payload.append("date", form.date);
      if (form.image) payload.append("image", form.image);

      const result = await addNews(payload);
      console.log("Upload response:", result);
      setForm({ title: "", content: "", date: "", image: null });
      setImagePreview("");
      setStatusMessage("Article added successfully.");
      setShowAddForm(false);
      await loadNews();
    } catch (error) {
      console.error("Upload error:", error);
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const remove = async (id) => {
    await deleteNews(id);
    await loadNews();
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
          <button className="btn secondary">View Feedback</button>
          <button className="btn outline">Preview Website</button>
        </div>
      </div>

      <div className="dashboard-topbar">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={tab === activeTab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
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
                <div className="section-label">Add Article</div>
                <h2 className="section-title">Add New News Article</h2>
              </div>
              <button className="close-modal" type="button" onClick={() => setShowAddForm(false)}>
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
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
              <div className="form-actions">
                <button type="submit" className="btn primary">
                  Save Article
                </button>
                <button type="button" className="btn secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
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
                    <button className="edit" type="button">
                      Edit
                    </button>
                    <button className="delete" type="button" onClick={() => remove(article.id)}>
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
