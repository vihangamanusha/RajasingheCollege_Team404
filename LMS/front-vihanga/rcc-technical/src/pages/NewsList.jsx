import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function NewsList() {

  const navigate = useNavigate();

  /* ACTIVE TAB */

  const [activeTab, setActiveTab] = useState("News");

  /* NEWS STATES */

  const [news, setNews] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    date: "",
    image: null,
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const [articleToDelete, setArticleToDelete] =
    useState(null);

  /* SPORTS DATA */

  const sports = [

    {
      id: "volleyball",
      name: "Volleyball",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=600&fit=crop",
      description:
        "Develop teamwork, discipline, and leadership through volleyball competitions and training.",
    },

    {
      id: "cricket",
      name: "Cricket",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&h=600&fit=crop",
      description:
        "Build sportsmanship and competitive spirit with school cricket tournaments and coaching.",
    },

    {
      id: "rugby",
      name: "Rugby",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&h=600&fit=crop",
      description:
        "Enhance strength, teamwork, and leadership through rugby practices and matches.",
    },

    {
      id: "karate",
      name: "Karate",
      image:
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&h=600&fit=crop",
      description:
        "Train students with discipline, focus, and self-defense through karate programs.",
    },

    {
      id: "athletics",
      name: "Athletics",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=600&fit=crop",
      description:
        "Improve speed, endurance, and confidence through athletics training and competitions.",
    },

  ];

  /* LOAD NEWS */

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/news"
      );

      const data = await response.json();

      const sortedNews = (data || []).sort(
        (a, b) => b.id - a.id
      );

      setNews(sortedNews);

    } catch (error) {

      console.error(error);

      setStatusMessage(
        "Failed to load articles"
      );
    }
  };

  /* SAVE ARTICLE */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.title || !form.content) {

      setStatusMessage(
        "Please enter title and content."
      );

      return;
    }

    try {

      let imageUrl = "";

      /* IMAGE UPLOAD */

      if (form.image instanceof File) {

        const formData = new FormData();

        formData.append("file", form.image);

        const uploadResponse = await fetch(
          "http://localhost:8080/api/files/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {

          setStatusMessage(
            "Image upload failed"
          );

          return;
        }

        imageUrl = await uploadResponse.text();
      }

      const payload = {

        title: form.title,

        content: form.content,

        date:
          form.date ||
          new Date()
            .toISOString()
            .split("T")[0],

        image: imageUrl,
      };

      let response;

      /* UPDATE */

      if (editingArticle) {

        response = await fetch(
          `http://localhost:8080/api/news/${editingArticle.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

      } else {

        /* CREATE */

        response = await fetch(
          "http://localhost:8080/api/news",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      }

      if (!response.ok) {

        setStatusMessage(
          "Failed to save article"
        );

        return;
      }

      setStatusMessage(
        editingArticle
          ? "Updated successfully"
          : "Created successfully"
      );

      setShowAddForm(false);

      setEditingArticle(null);

      setForm({
        title: "",
        content: "",
        date: "",
        image: null,
      });

      loadNews();

    } catch (error) {

      console.error(error);

      setStatusMessage(
        "Server error"
      );
    }
  };

  /* EDIT */

  const editArticle = (article) => {

    setForm({

      title: article.title || "",

      content: article.content || "",

      date: article.date || "",

      image: article.image || null,
    });

    setEditingArticle(article);

    setShowAddForm(true);
  };

  /* DELETE */

  const confirmDelete = (article) => {

    setArticleToDelete(article);

    setShowDeleteConfirm(true);
  };

  const remove = async () => {

    if (!articleToDelete) return;

    try {

      const response = await fetch(
        `http://localhost:8080/api/news/${articleToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        setStatusMessage(
          "Delete failed"
        );

        return;
      }

      setShowDeleteConfirm(false);

      setArticleToDelete(null);

      loadNews();

      setStatusMessage(
        "Deleted successfully"
      );

    } catch (error) {

      console.error(error);

      setStatusMessage(
        "Delete error"
      );
    }
  };

  return (

    <div className="page dashboard-page">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <p className="page-org">
            Rajasinghe Central College
          </p>

          <h1>
            Website Content Management
          </h1>

          <p className="page-subtitle">
            Update and manage the public school website.
          </p>

        </div>

        <div className="page-actions">

          <button
            className="btn secondary"
            onClick={() =>
              navigate("/feedback")
            }
          >
            View Feedback
          </button>

          <button className="btn outline">
            Preview Website
          </button>

        </div>

      </div>

      {/* TOPBAR */}

      <div className="dashboard-topbar">

        <div className="tabs">

          <button
            className={
              activeTab === "News"
                ? "tab active-tab"
                : "tab"
            }
            onClick={() =>
              setActiveTab("News")
            }
          >
            News
          </button>

          <button
            className={
              activeTab === "Sports"
                ? "tab active-tab"
                : "tab"
            }
            onClick={() =>
              setActiveTab("Sports")
            }
          >
            Sports
          </button>

          <button
            className="tab"
          >
            Live Stream
          </button>

          <button
            className="tab"
          >
            Events
          </button>

        </div>

        <button
          className="btn primary"
          onClick={() =>
            setShowAddForm(true)
          }
        >
          Add New Article
        </button>

      </div>

      {/* ADD MODAL */}

      {showAddForm && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddForm(false)
          }
        >

          <div
            className="modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <div className="section-label">
                  {editingArticle
                    ? "Edit Article"
                    : "Add Article"}
                </div>

                <h2 className="section-title">
                  {editingArticle
                    ? "Edit News Article"
                    : "Add News Article"}
                </h2>

              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowAddForm(false)
                }
              >
                ×
              </button>

            </div>

            <form
              className="form"
              onSubmit={handleSubmit}
            >

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({
                    ...form,
                    image:
                      e.target.files[0],
                  })
                }
              />

              <div className="form-actions">

                <button
                  type="submit"
                  className="btn primary"
                >
                  {editingArticle
                    ? "Update"
                    : "Save"}
                </button>

                <button
                  type="button"
                  className="btn secondary"
                  onClick={() =>
                    setShowAddForm(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* CONTENT PANEL */}

      <div className="section-card content-panel">

        {/* NEWS CONTENT */}

        {activeTab === "News" && (

          <>
            <div className="section-header section-header-space-between">

              <div>

                <div className="section-label">
                  Website Content
                </div>

                <h2 className="section-title">
                  Manage News Articles
                </h2>

              </div>

            </div>

            <div className="news-list">

              {news.length === 0 ? (

                <div className="empty-state">
                  No news articles found.
                </div>

              ) : (

                news.map((article) => (

                  <div
                    key={
                      article.id ??
                      article.title
                    }
                    className="news-card"
                  >

                    <div className="news-image-wrapper">

                      <img
                        src={
                          article.image?.startsWith(
                            "http"
                          )
                            ? article.image
                            : article.image
                            ? `http://localhost:8080${
                                article.image.startsWith(
                                  "/"
                                )
                                  ? ""
                                  : "/"
                              }${article.image}`
                            : "https://via.placeholder.com/400"
                        }
                        alt={article.title}
                        className="news-image"
                      />

                    </div>

                    <div>

                      <h2>
                        {article.title}
                      </h2>

                      <p className="meta">
                        {article.date}
                      </p>

                      <p>
                        {article.content}
                      </p>

                    </div>

                    <div className="news-card-actions">

                      <div className="actions">

                        <button
                          className="edit"
                          onClick={() =>
                            editArticle(
                              article
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete"
                          onClick={() =>
                            confirmDelete(
                              article
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>
          </>

        )}

        {/* SPORTS CONTENT */}

        {activeTab === "Sports" && (

          <>

            <div className="section-header section-header-space-between">

              <div>

                <div className="section-label">
                  Sports Management
                </div>

                <h2 className="section-title">
                  Manage Sports Activities
                </h2>

              </div>

            </div>

            <div className="sports-grid">

              {sports.map((sport) => (

                <div
                  key={sport.id}
                  className="sport-card"
                >

                  <div className="sport-image-box">

                    <img
                      src={sport.image}
                      alt={sport.name}
                      className="sport-image"
                    />

                  </div>

                  <div className="sport-content">

                    <h2>
                      {sport.name}
                    </h2>

                    <p>
                      {sport.description}
                    </p>

                    <button className="sport-manage-btn">
                      Manage Achievements
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>
  );
}