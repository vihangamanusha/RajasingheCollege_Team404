import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNews } from "../api/newsApi";

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    { label: "Total Students", value: "1,284" },
    { label: "Total Teachers", value: "87" },
    { label: "Active Classes", value: "42" },
  ];

  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await getNews();
    setNews(data || []);
  };

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <p className="page-org">Rajasinghe Central College</p>
          <h1>Dashboard Overview</h1>
          <p className="page-subtitle">Quick insight into students, teachers, and class activity.</p>
        </div>
      </div>

      <div className="top-cards">
        {stats.map((item) => (
          <div key={item.label} className="status-card">
            <p className="status-card-label">{item.label}</p>
            <p className="status-card-value">{item.value}</p>
          </div>
        ))}
      </div>

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
              onClick={() => navigate("/feedback")}
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
  );
}
