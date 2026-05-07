import { useEffect, useState } from "react";
import { addNews, deleteNews, getNews } from "../api/newsApi";

export default function NewsList() {
  const tabs = ["News", "Sports", "Live Stream"];
  const [activeTab, setActiveTab] = useState("News");
  const [news, setNews] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", date: "", image: "" });
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await getNews();
    setNews(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      setStatusMessage("Please enter a title and content.");
      return;
    }

    await addNews(form);
    setForm({ title: "", content: "", date: "", image: "" });
    setStatusMessage("Article added successfully.");
    setShowAddForm(false);
    await loadNews();
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
              <input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
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
