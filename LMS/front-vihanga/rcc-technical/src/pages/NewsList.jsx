import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNews,
  addNews,
  updateNews,
  deleteNews as apiDeleteNews
} from "../api/newsApi"
import "../index.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  /* ACTIVE TAB */
  const [activeTab, setActiveTab] = useState("News");

  /* NEWS STATES */
const [news, setNews] = useState([]);
const [showNewsForm, setShowNewsForm] = useState(false);
const [editingNewsId, setEditingNewsId] = useState(null);

const [newsForm, setNewsForm] = useState({
  title: "",
  date: "",
  content: "",
  image: null,
});


  /* LIVE STREAM STATES */
  const [streams, setStreams] = useState([]);

  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    videoURL: "",
  });

  /* SPORTS DATA */
  const sports = [

    {
      id: "volleyball",
      name: "Volleyball",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=600&fit=crop",
      description:
        "Develop teamwork, discipline, and leadership through volleyball competitions.",
    },

    {
      id: "cricket",
      name: "Cricket",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&h=600&fit=crop",
      description:
        "Build sportsmanship and competitive spirit with cricket tournaments.",
    },

    {
      id: "rugby",
      name: "Rugby",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&h=600&fit=crop",
      description:
        "Enhance teamwork and leadership through rugby matches.",
    },

    {
      id: "karate",
      name: "Karate",
      image:
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&h=600&fit=crop",
      description:
        "Train students with discipline and self-defense.",
    },

    {
      id: "athletics",
      name: "Athletics",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=600&fit=crop",
      description:
        "Improve speed, endurance, and confidence.",
    },

  ];

  /* LOAD DATA */
  useEffect(() => {

    loadNews();

    loadStreams();

  }, []);

  /* LOAD NEWS */
  const loadNews = async () => {
  try {
    const data = await getNews();
    const sortedNews = (data || []).sort((a, b) => b.id - a.id);
    setNews(sortedNews);
  } catch (error) {
    console.log("Load news error:", error.message);
  }
};

  /* LOAD STREAMS */
  const loadStreams = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/livestreams"
      );

      const data = await response.json();

      setStreams(data);

    } catch (error) {

      console.log(error);

    }
  };
/* =========================
     NEWS HANDLERS
  ========================= */

 const openNewsForm = (newsItem = null) => {
  if (newsItem) {
    setNewsForm({
      title: newsItem.title || "",
      date: newsItem.date || "",
      content: newsItem.content || "",
      image: null, // always reset file input
    });

    setEditingNewsId(newsItem.id);
  } else {
    setNewsForm({
      title: "",
      date: "",
      content: "",
      image: null,
    });

    setEditingNewsId(null);
  }

  setShowNewsForm(true);
};
 const handleNewsSubmit = async (e) => {
  e.preventDefault();

  try {
    let imageUrl = newsForm.image;

    // 1. upload image only if new file selected
    if (newsForm.image instanceof File) {
      const formData = new FormData();
      formData.append("file", newsForm.image);

      const res = await fetch("http://localhost:8080/api/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      imageUrl = await res.text();
    }

    // 2. send JSON to backend (IMPORTANT)
    const payload = {
      title: newsForm.title,
      content: newsForm.content,
      date: newsForm.date,
      image: imageUrl,
    };

    let response;

    if (editingNewsId) {
      response = await fetch(
        `http://localhost:8080/api/news/${editingNewsId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } else {
      response = await fetch("http://localhost:8080/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    setShowNewsForm(false);
    setEditingNewsId(null);

    setNewsForm({
      title: "",
      date: "",
      content: "",
      image: null,
    });

    await loadNews();
  } catch (err) {
    console.log("Submit error:", err.message);
  }
};
const handleDeleteNews = async (id) => {
  try {
    await apiDeleteNews(id);
    await loadNews(); // IMPORTANT
  } catch (err) {
    console.log("Delete error:", err.message);
  }
};
  /* YOUTUBE EMBED URL */
  const getEmbedUrl = (url) => {

    if (!url) return "";

    url = url.trim();

    if (url.includes("embed")) {
      return url;
    }

    if (url.includes("watch?v=")) {

      const id = url
        .split("watch?v=")[1]
        .split("&")[0];

      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtu.be/")) {

      const id = url
        .split("youtu.be/")[1]
        .split("?")[0];

      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  /* START STREAM */
  const startStreaming = async (id) => {

    try {

      await fetch(
        `http://localhost:8080/api/livestreams/${id}/start`,
        {
          method: "PUT",
        }
      );

      loadStreams();

      setMessage("Streaming started");

    } catch (error) {

      console.log(error);

    }
  };

  /* STOP STREAM */
  const stopStreaming = async (id) => {

    try {

      await fetch(
        `http://localhost:8080/api/livestreams/${id}/stop`,
        {
          method: "PUT",
        }
      );

      loadStreams();

      setMessage("Streaming stopped");

    } catch (error) {

      console.log(error);

    }
  };

  /* DELETE STREAM */
  const deleteStream = async (id) => {

    try {

      await fetch(
        `http://localhost:8080/api/livestreams/${id}`,
        {
          method: "DELETE",
        }
      );

      loadStreams();

      setMessage("Stream deleted");

    } catch (error) {

      console.log(error);

    }
  };

  /* EDIT STREAM */
  const editStream = (stream) => {

    setForm({

      title: stream.title,

      date: stream.date,

      time: stream.time,

      description: stream.description,

      videoURL: stream.videoURL,
    });

    setEditingId(stream.id);

    setShowForm(true);
  };

  /* ADD OR UPDATE STREAM */
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let response;

      if (editingId) {

        response = await fetch(
          `http://localhost:8080/api/livestreams/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

      } else {

        response = await fetch(
          "http://localhost:8080/api/livestreams",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
      }

      if (response.ok) {

        setMessage(
          editingId
            ? "Stream updated"
            : "Stream added"
        );

        setForm({
          title: "",
          date: "",
          time: "",
          description: "",
          videoURL: "",
        });

        setEditingId(null);

        setShowForm(false);

        loadStreams();
      }

    } catch (error) {

      console.log(error);

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
            Manage website content, sports,
            and live streams.
          </p>

        </div>

        <div className="page-actions">

          <button
            className="btn secondary"
            onClick={() => navigate("/feedback")}
          >
            View Feedback
          </button>

        </div>

      </div>

      {/* TABS */}
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
            className={
              activeTab === "Live Stream"
                ? "tab active-tab"
                : "tab"
            }
            onClick={() =>
              setActiveTab("Live Stream")
            }
          >
            Live Stream
          </button>

          <button
            className={
              activeTab === "Events"
                ? "tab active-tab"
                : "tab"
            }
            onClick={() =>
              setActiveTab("Events")
            }
          >
            Events
          </button>
          
        </div>

      </div>

      {/* CONTENT PANEL */}
      <div className="section-card content-panel">

       {/* NEWS */}
{activeTab === "News" && (
  <>
    <div className="section-header">
      <div>
        <div className="section-label">Website Content</div>
        <h2 className="section-title">Manage News Articles</h2>
      </div>
    </div>

    {/* ADD BUTTON (FIXED) */}
    <button
      className="btn primary"
      onClick={() => openNewsForm()}
    >
      + Add Article
    </button>

    {/* NEWS LIST */}
    <div className="news-list">
      {news.map((article) => (
        <div key={article.id} className="news-card">

          <div className="news-image-wrapper">
            <img
  src={
    article.image?.startsWith("http")
      ? article.image
      : article.image
      ? `http://localhost:8080${article.image}`
      : "https://via.placeholder.com/400"
  }
  alt={article.title}
  className="news-image"
/>
          </div>

          <div>
            <h2>{article.title}</h2>
            <p className="meta">{article.date}</p>
            <p>{article.content}</p>

            <button
              className="update-btn"
              onClick={() => openNewsForm(article)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDeleteNews(article.id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>

    {/* POPUP FORM  */}
    {showNewsForm && (
      <div
        className="popup-overlay"
        onClick={() => setShowNewsForm(false)}
      >
        <div
          className="popup-form"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="popup-header">
            <h2>
              {editingNewsId ? "Update Article" : "Add Article"}
            </h2>

            <button
              className="close-btn"
              onClick={() => setShowNewsForm(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleNewsSubmit} className="stream-form">

            <input
              type="text"
              placeholder="Title"
              value={newsForm.title}
              onChange={(e) =>
                setNewsForm({ ...newsForm, title: e.target.value })
              }
              required
            />

            <input
              type="date"
              value={newsForm.date}
              onChange={(e) =>
                setNewsForm({ ...newsForm, date: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Content"
              value={newsForm.content}
              onChange={(e) =>
                setNewsForm({ ...newsForm, content: e.target.value })
              }
              required
            />

            <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setNewsForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }))
  }
/>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {editingNewsId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowNewsForm(false)}
              >
                Cancel
              </button>
            </div>

          </form>

        </div>
      </div>
    )}
  </>
)}

        {/* SPORTS */}
        {activeTab === "Sports" && (

          <>
            <div className="section-header">

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

        {/* LIVE STREAM */}
        {activeTab === "Live Stream" && (

          <>
            <div className="section-header section-header-space-between">

              <div>

                <div className="section-label">
                  Live Stream Management
                </div>

                <h2 className="section-title">
                  Manage Live Streams
                </h2>

              </div>

              <button
                className="btn primary"
                onClick={() =>
                  setShowForm(true)
                }
              >
                + Add Stream
              </button>

            </div>

            {message && (
              <p className="message">
                {message}
              </p>
            )}

            {/* FORM */}
            {showForm && (

              <div
                className="popup-overlay"
                onClick={() =>
                  setShowForm(false)
                }
              >

                <div
                  className="popup-form"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  <div className="popup-header">

                    <h2>
                      {editingId
                        ? "Update Stream"
                        : "Add Stream"}
                    </h2>

                    <button
                      className="close-btn"
                      onClick={() =>
                        setShowForm(false)
                      }
                    >
                      ×
                    </button>

                  </div>

                  <form
                    className="stream-form"
                    onSubmit={handleSubmit}
                  >

                    <input
                      type="text"
                      placeholder="Title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          title: e.target.value,
                        })
                      }
                      required
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
                      required
                    />

                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          time: e.target.value,
                        })
                      }
                      required
                    />

                    <textarea
                      placeholder="Description"
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      placeholder="YouTube URL"
                      value={form.videoURL}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          videoURL: e.target.value,
                        })
                      }
                      required
                    />

                    <div className="form-buttons">

                      <button
                        type="submit"
                        className="submit-btn"
                      >
                        {editingId
                          ? "Update"
                          : "Save"}
                      </button>

                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                          setShowForm(false)
                        }
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                </div>

              </div>

            )}

            {/* STREAM LIST */}
            <div className="stream-list">

              {streams.map((stream) => (

                <div
                  key={stream.id}
                  className="stream-card"
                >

                  <div className="stream-video">

                    <iframe
                      width="100%"
                      height="250"
                      src={getEmbedUrl(stream.videoURL)}
                      title={stream.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>

                  </div>

                  <div className="stream-content">

                    <h2>
                      {stream.title}
                    </h2>

                    <p className="stream-date">
                      {stream.date} | {stream.time}
                    </p>

                    <p className="stream-description">
                      {stream.description}
                    </p>

                    <div className="card-buttons">

                      <button
                        className="update-btn"
                        onClick={() =>
                          editStream(stream)
                        }
                      >
                        Update
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteStream(stream.id)
                        }
                      >
                        Delete
                      </button>

                      <button
                        className="live-btn"
                        onClick={() =>
                          startStreaming(stream.id)
                        }
                      >
                        Start
                      </button>

                      <button
                        className="stop-btn"
                        onClick={() =>
                          stopStreaming(stream.id)
                        }
                      >
                        Stop
                      </button>

                    </div>

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