import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNews,
  addNews,
  updateNews,
  deleteNews as apiDeleteNews
} from "../api/newsApi";

import {
  getAllEvents,
  addEvent,
  deleteEvent,
  updateEvent,
} from "../api/eventApi";
import { addSportAchievement, getBySportType, updateSportAchievement, deleteSportAchievement } from "../api/sportApi";

import "../index.css";
import volleyballImage from "../assets/volleyball.jpeg";
import karateImage from "../assets/karathe.jpeg";
import rugbyImage from "../assets/rugby.jpeg";

import cricketImage from "../assets/cricket.jpeg";


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

  /* event STATES */

const [events, setEvents] = useState([]);
const [showModal, setShowModal] = useState(false);

const [eventForm, setEventForm] = useState({
  topic: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  announcementAudience: "",
});

const [editingEventId, setEditingEventId] = useState(null);

/* SPORT STATE */
const [selectedSport, setSelectedSport] = useState(null);
const [sportAchievements, setSportAchievements] = useState([]);
const [showAchievementModal, setShowAchievementModal] = useState(false);
const [editingAchievementId, setEditingAchievementId] = useState(null);
const [achievementForm, setAchievementForm] = useState({
  title: "",
  description: "",
  date: "",
  image: "",
});

  const sports = [

    {
      id: "volleyball",
      name: "Volleyball",
      image:
        volleyballImage,
      
      description:
        "Develop teamwork, discipline, and leadership through volleyball competitions.",
    },

    {
      id: "cricket",
      name: "Cricket",
      image:
         cricketImage,
      description:
        "Build sportsmanship and competitive spirit with cricket tournaments.",
    },

    {
      id: "rugby",
      name: "Rugby",
      image:
        rugbyImage,
      description:
        "Enhance teamwork and leadership through rugby matches.",
    },

    {
      id: "karate",
      name: "Karate",
      image:
         karateImage,
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

    loadEvents();

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
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams`
      );

      const data = await response.json();

      setStreams(data);

    } catch (error) {

      console.log(error);

    }
  };

  /* LOAD events */
   const loadEvents = async () => {
     const data = await getAllEvents();

  const sorted = (data || []).sort((a, b) => b.id - a.id);

  setEvents(sorted);
  };

  const loadSportAchievements = async (sportType) => {
    try {
      const data = await getBySportType(sportType);
      setSportAchievements(data || []);
    } catch (error) {
      console.log("Load achievements error:", error.message || error);
      setSportAchievements([]);
    }
  };

  const openSportAchievements = async (sport) => {
    setSelectedSport(sport);
    await loadSportAchievements(sport.id);
  };

  const openAchievementModal = (achievement = null) => {
    if (achievement) {
      setEditingAchievementId(achievement.id);
      setAchievementForm({
        title: achievement.topic,
        description: achievement.description,
        /*date: achievement.date,*/ 
        image: achievement.image || null,
      });
    } else {
      setEditingAchievementId(null);
      setAchievementForm({
        title: "",
        description: "",
        /*date: "",*/
        image: null,
      });
    }

    setShowAchievementModal(true);
  };

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSport) {
      alert("Please select a sport first.");
      return;
    }

    try {
      if (editingAchievementId) {
        await updateSportAchievement(editingAchievementId, {
            typesport: selectedSport.name,
            topic: achievementForm.title,
            description: achievementForm.description,
            image: achievementForm.image,
      });
      } else {
        await addSportAchievement({
            typesport: selectedSport.name,
            topic: achievementForm.title,
            description: achievementForm.description,
            image: achievementForm.image,
       });;
      }

      await loadSportAchievements(selectedSport.id);
    } catch (error) {
      console.log("Save achievement error:", error.message || error);
      alert("Failed to save achievement");
      return;
    }

    setShowAchievementModal(false);
    setEditingAchievementId(null);
    setAchievementForm({
      title: "",
      description: "",
      /*date: "",*/
      image: "",
    });
  };

  const handleDeleteAchievement = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this achievement?"
    );
    if (!confirmDelete) return;

    try {
      await deleteSportAchievement(id);
      await loadSportAchievements(selectedSport.id);
    } catch (error) {
      console.log("Delete achievement error:", error.message || error);
      alert("Failed to delete achievement");
    }
  };

  const handleSportBack = () => {
    setSelectedSport(null);
    setSportAchievements([]);
    setShowAchievementModal(false);
    setEditingAchievementId(null);
    setAchievementForm({
      title: "",
      description: "",
      /*date: "",*/
      image: null,
    });
  };
{/**/ }
  const handleAchievementImageUpload = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/files/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Image upload failed");

    const imageUrl = await res.text();

    setAchievementForm((prev) => ({
      ...prev,
      image: imageUrl, // store REAL URL, not file
    }));
  } catch (error) {
    console.log("Upload error:", error);
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

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/files/upload`, {
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
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/news/${editingNewsId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } else {
      response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/news`, {
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
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams/${id}/start`,
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
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams/${id}/stop`,
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
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams/${id}`,
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
          `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams/${editingId}`,
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
          `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams`,
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

  //runs when form sybmit
  const handleEventSubmit = async (e) => {
  e.preventDefault();

  if (editingEventId) {
    await updateEvent(editingEventId, eventForm);
    alert("Event Updated!");
  } else {
    await addEvent(eventForm);
    alert("Event Added!");
  }

  setEventForm({
    topic: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    announcementAudience: "",
  });

  setEditingEventId(null);
  setShowModal(false);

  loadEvents();
};
  const handleDelete = async (id) => {
  console.log("Deleting ID:", id);

  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  try {
    await deleteEvent(id);   //api  call

    console.log("Deleted successfully");

    alert("Event Deleted!");

    loadEvents(); // refresh list
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Delete failed! Check backend or API.");
  }
};

//runs when edit button click
 const handleEdit = (event) => {
  setEventForm({
    topic: event.topic,
    description: event.description,
    date: event.date,
    time: event.time,
    venue: event.venue,
    announcementAudience: event.announcementAudience,
  });

  setEditingEventId(event.id);
  setShowModal(true);
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
      ? `${import.meta.env.VITE_API_URL || "http://localhost:8080"}${article.image}`
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
    {!selectedSport ? (
      <div className="sports-grid">

        {sports.map((sport) => (
          <div key={sport.id} className="sport-card">

            <div className="sport-image-box">
              <img
                src={sport.image}
                alt={sport.name}
                className="sport-image"
              />
            </div>

            <div className="sport-content">

              <h2>{sport.name}</h2>

              <p>{sport.description}</p>

              <button
                className="sport-manage-btn"
                onClick={() => openSportAchievements(sport)}
              >
                Manage Achievements
              </button>

            </div>
          </div>
        ))}

      </div>
    ) : (
      <div className="achievement-page">

        <div className="achievement-header">

          <div className="achievement-left">

            <button
              className="back-btn"
              onClick={handleSportBack}
            >
              ← Back to Sports
            </button>

            <h1>{selectedSport.name} Achievements</h1>

          </div>

          <button
            className="add-achievement-btn"
            onClick={() => openAchievementModal()}
          >
            Add New Achievement
          </button>

        </div>

        <div className="achievement-list">
          {sportAchievements.length === 0 ? (
            <div className="empty-state">
              No achievements found for {selectedSport.name} yet.
            </div>
          ) : (
            sportAchievements.map((item) => (
              <div
                className="achievement-card"
                key={item.id}
              >
              <div className="achievement-image">
                  {item.image ? (
                    <img src={item.image} alt={item.topic} />
                  ) : (
                    <div className="image-placeholder">
                      No Image
                    </div>

                    
                  )}
                </div>
                

                <div className="achievement-content">
                  <div className="achievement-top">
                    <div>
                     <h2>{item.topic}</h2>
                      <p>{item.description}</p>
                      <span>{item.date}</span>
                    </div>

                    <div className="achievement-actions">
                      <button
                        className="edit-btn"
                        onClick={() => openAchievementModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteAchievement(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showAchievementModal && (
          <div
            className="popup-overlay"
            onClick={() => setShowAchievementModal(false)}
          >
            <div
              className="popup-form"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-header">
                <h2>
                  {editingAchievementId
                    ? "Update Achievement"
                    : "Add New Achievement"}
                </h2>
                <button
                  className="close-btn"
                  onClick={() => setShowAchievementModal(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAchievementSubmit} className="stream-form">
                <input
                  type="text"
                  placeholder="Achievement Title"
                  value={achievementForm.title}
                  onChange={(e) =>
                    setAchievementForm({
                      ...achievementForm,
                      title: e.target.value,
                    })
                  }
                  required
                />

                <textarea
                  placeholder="Description"
                  value={achievementForm.description}
                  onChange={(e) =>
                    setAchievementForm({
                      ...achievementForm,
                      description: e.target.value,
                    })
                  }
                  required
                />

                

                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAchievementImageUpload}
                  />
                </div>

                {achievementForm.image && (
                  <div className="preview-image">
                    <img
                      src={achievementForm.image}
                      alt="preview"
                    />
                  </div>
                )}

                <div className="form-buttons">
                  <button type="button" className="cancel-btn" onClick={() => setShowAchievementModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingAchievementId ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )}
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

{/* EVENTS */}

{activeTab === "Events" && (
  

<div className="event-page">

      {/* HEADER */}

      <div className="event-header">

        <div>
          <p className="event-school-name">
            Rajasinghe Central College
          </p>

          <h1 className="event-main-title">
            Upcoming Events
          </h1>

          <p className="event-subtitle">
            Manage and display upcoming events,
            workshops, and school functions.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="event-add-btn"
        >
          + Add Event
        </button>

      </div>

      {/* EVENT CARDS //loops through events and display each event in a card format with edit and delete buttons*/}

      <div className="event-card-container">

        {events.map((event) => (

          <div
            key={event.id}
            className="event-card"
          >

            <h2 className="event-card-title">
              {event.topic}
            </h2>

            <p className="event-card-description">
              {event.description}
            </p>

            <div className="event-details">

              <p>
                <strong>Date:</strong> {event.date}
              </p>

              <p>
                <strong>Time:</strong> {event.time}
              </p>

              <p>
                <strong>Venue:</strong> {event.venue}
              </p>

            </div>

            <div className="event-card-buttons">

              <button
                onClick={() => handleEdit(event)}
                className="event-edit-btn"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(event.id)}
                className="event-delete-btn"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* if true show MODAL */}

      {showModal && (

        <div className="event-modal-overlay">

          <div className="event-modal">

            <button
              onClick={() => {
                setShowModal(false);

                setEditingEventId(null);

                setEventForm({
                  topic: "",
                  description: "",
                  date: "",
                  time: "",
                  venue: "",
                  announcementAudience: "",
                });
              }}
              className="event-close-btn"
            >
              ×
            </button>

            <h2 className="event-modal-title">

              {editingEventId
                ? "Update Event"
                : "Create New Event"}

            </h2>

            <form
             onSubmit={handleEventSubmit}
              className="event-form"
            >

              <input
                type="text"
                placeholder="Event Topic"
                value={eventForm.topic}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    topic: e.target.value
                  })
                }
                className="event-input"
                required
              />

              <textarea
                placeholder="Description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    description: e.target.value
                  })
                }
                className="event-textarea"
                required
              />

              <div className="event-row">

                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      date: e.target.value
                    })
                  }
                  className="event-input"
                  required
                />

                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      time: e.target.value
                    })
                  }
                  className="event-input"
                  required
                />

              </div>

              <input
                type="text"
                placeholder="Venue"
                value={eventForm.venue}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    venue: e.target.value
                  })
                }
                className="event-input"
                required
              />
            {/*  select announcement audience */}
              <select
                  value={eventForm.announcementAudience || ""}
                  onChange={(e) =>
                       setEventForm({
                       ...eventForm,
                       announcementAudience: e.target.value
                      })
                   }
                  className="event-input"
              >
              <option value="">Do Not Show in Announcements</option>

              <option value="Students">
                     Show for Students
              </option>

              <option value="Teachers">
                     Show for Teachers
              </option>


              <option value="All">
                     Show for All
               </option>
              </select>
              <div className="event-form-buttons">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="event-cancel-btn"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="event-save-btn"
                >
                  {editingEventId
                    ? "Update Event"
                    : "Add Event"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
 )}
      </div>
      
    </div>
    
  );
 
}