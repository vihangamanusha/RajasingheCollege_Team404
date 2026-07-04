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

import { jwtDecode } from "jwt-decode";
import { FiLock } from "react-icons/fi";
import "../index.css";
import volleyballImage from "../assets/volleyball.jpeg";
import karateImage from "../assets/karathe.jpeg";
import rugbyImage from "../assets/rugby.jpeg";

import cricketImage from "../assets/cricket.jpeg";


import {
    getDocuments,
    uploadDocument,
    deleteDocument
} from "../api/documentApi";




export default function AdminDashboard() {

  const navigate = useNavigate();

  // User Profile & Password modal states
  const [username, setUsername] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });
  const [userRole, setUserRole] = useState("User");

  /* ACTIVE TAB */
  const [activeTab, setActiveTab] = useState("News");

  /* NEWS STATES */
const [news, setNews] = useState([]);
const [showNewsForm, setShowNewsForm] = useState(false);
const [editingNewsId, setEditingNewsId] = useState(null);
const [imageError, setImageError] = useState("");

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
  const [videoUrlError, setVideoUrlError] = useState("");
  const [streamError, setStreamError] = useState("");
const [streamSuccess, setStreamSuccess] = useState("");

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
const [achievementImageError, setAchievementImageError] = useState("");

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
      id:"athletics",
      name: "Athletics",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=600&fit=crop",
      description:
        "Improve speed, endurance, and confidence.",
    },

  ];

  //documetable content states
  const [documents, setDocuments] = useState([]);
const [showDocumentModal, setShowDocumentModal] = useState(false);
const [editingDocumentId, setEditingDocumentId] = useState(null);
const [fileError, setFileError] = useState("");

const [documentForm, setDocumentForm] = useState({
  topic: "",
  file: null,
});
const [deleteConfirm, setDeleteConfirm] = useState({
  open: false,
  id: null,
  type: "",
  title: "this item",
});
const [newsFeedback, setNewsFeedback] = useState({
  open: false,
  type: "success",
  text: "",
});

const loadDocuments = async () => {
    const data = await getDocuments();

    const sorted = (data || []).sort((a, b) => b.id - a.id);

    setDocuments(sorted);
};

  /* LOAD DATA */
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
    loadNews();
    loadStreams();
    loadEvents();
    loadDocuments();
  }, []);

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
      showNewsFeedback("error", "Failed to save achievement. Please try again.");
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
    showNewsFeedback("success", editingAchievementId ? "Sport achievement updated successfully!" : "Sport achievement added successfully!");
  };

  const openDeleteConfirm = (id, type, title = "this item") => {
    setDeleteConfirm({ open: true, id, type, title });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({ open: false, id: null, type: "", title: "this item" });
  };

  const showNewsFeedback = (type, text) => {
    setNewsFeedback({ open: true, type, text });
  };

  const closeNewsFeedback = () => {
    setNewsFeedback({ open: false, type: "success", text: "" });
  };

  const confirmDeleteAction = async () => {
    if (!deleteConfirm.id) return;

    try {
      if (deleteConfirm.type === "news") {
        await apiDeleteNews(deleteConfirm.id);
        await loadNews();
      } else if (deleteConfirm.type === "achievement") {
        const deleted = await deleteSportAchievement(deleteConfirm.id);
        if (deleted) {
          await loadSportAchievements(selectedSport?.id);
        }
      } else if (deleteConfirm.type === "event") {
        const deleted = await deleteEvent(deleteConfirm.id);
        if (deleted) {
          loadEvents();
        }
      } else if (deleteConfirm.type === "stream") {
        await fetch(`http://localhost:8080/api/livestreams/${deleteConfirm.id}`, {
          method: "DELETE",
        });
        loadStreams();
        setMessage("Stream deleted");
      } else if (deleteConfirm.type === "document") {
        await deleteDocument(deleteConfirm.id);
        loadDocuments();
      }
    } catch (error) {
      console.log("Delete error:", error.message || error);
      showNewsFeedback("error", "Failed to delete item. Please try again.");
    } finally {
      closeDeleteConfirm();
    }
  };

  const handleDeleteAchievement = (id) => {
    openDeleteConfirm(id, "achievement", "this achievement");
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

    if (!file) {
      setAchievementImageError("");
      return;
    }

    const maxSize = 1 * 1024 * 1024;

    if (file.size > maxSize) {
      setAchievementImageError("Only image files up to 1 MB are allowed.");
      e.target.value = null;
      return;
    }

    setAchievementImageError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "http://localhost:8080/api/files/upload",
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
    setAchievementImageError("Failed to upload image. Please try again.");
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

  setMessage("");
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
    showNewsFeedback("success", editingNewsId ? "News updated successfully!" : "News added successfully!");
  } catch (err) {
    console.log("Submit error:", err.message);
    showNewsFeedback("error", "Failed to save news. Please try again.");
  }
};
const handleDeleteNews = (id) => {
  openDeleteConfirm(id, "news", "this news article");
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
  const deleteStream = (id) => {
    openDeleteConfirm(id, "stream", "this stream");
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

  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+/;

  // ❌ Validate YouTube URL before submit
  if (!youtubeRegex.test(form.videoURL)) {
    setVideoUrlError("Only YouTube links are allowed.");
    return; // stop submission
  }

  setVideoUrlError(""); // clear error if valid

  console.log("Submitting:", form);

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

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Response:", text);

    if (!response.ok) {
      alert("Save failed");
      return;
    }

    alert("Saved!");

    // Reload data
    loadStreams();

    //Clear form after success
    setForm({
      title: "",
      date: "",
      time: "",
      description: "",
      videoURL: "",
    });

    // Clear error
    setVideoUrlError("");

    setShowForm(false);

  } catch (err) {
    console.log(err);
    alert("Something went wrong!");
  }
};
  //runs when form sybmit
  const handleEventSubmit = async (e) => {
  e.preventDefault();

  if (editingEventId) {
    await updateEvent(editingEventId, eventForm);
    showNewsFeedback("success", "Event updated successfully!");
  } else {
    await addEvent(eventForm);
    showNewsFeedback("success", "Event added successfully!");
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
  const handleDelete = (id) => {
  openDeleteConfirm(id, "event", "this event");
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
//documental content

const handleDocumentSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("topic", documentForm.topic);
      formData.append("file", documentForm.file);

      await uploadDocument(formData);

      setDocumentForm({
          topic: "",
          file: null,
      });

      setShowDocumentModal(false);

      loadDocuments();
      showNewsFeedback("success", "Document uploaded successfully!");
    } catch (error) {
      console.log("Document upload error:", error.message || error);
      showNewsFeedback("error", "Failed to upload document. Please try again.");
    }
};


const handleDeleteDocument = (id) => {
    openDeleteConfirm(id, "document", "this document");
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

      {/* MAIN CONTENT AREA */}
      <div className="page-content page dashboard-page">
        {/* HEADER */}
        <div className="page-header">
          <div>
            <h1>Website Content Management</h1>
            <p className="page-subtitle" style={{ marginLeft: "10px" }}>
              Manage website content, sports, and live streams.
            </p>
          </div>

          <div className="page-actions">
            <button
              className="btn secondary"
              onClick={() => navigate("/to/feedback")}
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

          <button
            className={
              activeTab === "Downloadable Content"
                ? "tab active-tab"
                : "tab"
            }
            onClick={() =>
              setActiveTab("Downloadable Content")
            }
          >
            Downloadable Content
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
       
        <h1 style={{ fontSize: "22px", fontWeight: "700",marginTop:"15px",marginleft:"30px" }}>Manage News Articles</h1>
        <h2 style={{ fontSize: "16px", fontWeight: "400", color: "#64748b", marginTop:"5px" }}>Manage and publish school news, announcements, and important updates.</h2>
      </div>
    </div>

    {/* ADD BUTTON (FIXED) */}
    <button 
      className="btn primary"
      style={{ marginLeft: "1000px" , marginTop: "-82px", position: "absolute",borderRadius: "10px", padding: "5px 20px",fontStyle: "normal" }}
      onClick={() => openNewsForm()}
    
    >
      + Add Article
    </button>

    <div className="section-header" >
    {/* NEWS LIST */}
<div className="news-list">
  {news.length > 0 ? (
    news.map((article) => (
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

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          <div style={{ flex: 1 }}>
            <h2>{article.title}</h2>
            <p className="meta">{article.date}</p>
            <p>{article.content}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "8px", borderTop: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "13px", color: "#64748b" }}>Manage article</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="update-btn"
                onClick={() => openNewsForm(article)}
                style={{ padding: "7px 12px", borderRadius: "8px", minWidth: "72px" }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDeleteNews(article.id)}
                style={{ padding: "7px 12px", borderRadius: "8px", minWidth: "72px" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

      </div>
    ))
  ) : (
    <div className="empty-state">
      <div className="empty-icon">📰</div>
      <h3>No News Articles Available</h3>
      <p>
        There are currently no news articles to display.
        Click <strong>"Add Article"</strong> to publish your first news article.
      </p>
    </div>
  )}
</div>
</div>
    {/* POPUP FORM  */}
    {showNewsForm && (
      <div
        className="popup-overlay"
        
        onClick={() => setShowNewsForm(false)}
      >
        <div
          className="popup-form"
          style={{ height: "550px" }}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="popup-header">
            <h2 style={{marginBottom:"-10px"}}>
              {editingNewsId ? "Update Article" : "Add Article"}
            </h2>

            
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
  required={!editingNewsId}
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1 MB

    if (file.size > maxSize) {
      setImageError("Image size must be less than or equal to 1 MB.");
      setNewsForm((prev) => ({
        ...prev,
        image: null,
      }));

      e.target.value = ""; // Clear the selected file
      return;
    }

    setImageError("");
    setNewsForm((prev) => ({
      ...prev,
      image: file,
    }));
  }}
/>
<div>
  <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
    Do not allow image size greater than 1 MB.
  </p>
</div>  

            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                style={{ width: "240px" }}
                onClick={() => setShowNewsForm(false)}
              >
                Cancel
              </button>

              <button type="submit" 
              className="submit-btn"
              style={{ width: "240px" }}>
                {editingNewsId ? "Update" : "Save"}
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
      <>
      <div>
            <h1 style={{ fontSize: "22px", fontWeight: "700",marginTop:"15px",marginleft:"30px" }}>Manage Sports Achievements</h1>
            <h2 style={{ fontSize: "16px", fontWeight: "400", color: "#64748b", marginTop:"5px" }}>Manage and publish achievements for each sport.</h2>
          </div>
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
      </>
    ) : (
      <div className="achievement-page">

        <div className="achievement-header">

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
             <h1 style={{ fontSize: "24px", fontWeight: "700" }}>
                {selectedSport.name} Achievements
             </h1>

             <p style={{ fontSize: "16px", color: "#64748b" }}>
                 Manage and publish achievements for {selectedSport.name}.
            </p>
           </div>
          <div className="achievement-left">

            
          </div>
          <button
  className="back-btn"
  onClick={handleSportBack}
             style={{
                   borderRadius: "18px",
                   width: "170px",
                   height: "50px",
                   fontSize: "18px",
                   marginLeft: "215px",
                   marginRight: "10px",
                   backgroundColor: "#faf3f3",
                   border: "1px solid #dd0e0e",
                   cursor: "pointer",
                   fontWeight: "600",
            }}
         >
             Back to Sports
         </button>
          <button
            className="add-achievement-btn"
            onClick={() => openAchievementModal()}
          >
            Add New Achievement
          </button>
          
            
            
        </div>
  
        <div className="achievement-list">
          
          {sportAchievements.length === 0 ? (
            <>
            
            <div className="empty-state" style={{ fontSize: "17px", color: "#00040b" ,fontWeight:"500"}}>
              <div className="empty-icon">📰</div>
              No Achievements Found For {selectedSport.name} yet.
              <p style={{ fontSize: "14px", color: "#64748b", marginTop: "5px", fontWeight: "400" }}>
                There are currently no achievements to display. Click "Add Achievement" to create your first achievement.
              </p>
            </div>
            
            </>
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
                        style={{ width: "100px", minWidth: "100px", justifyContent: "center" }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteAchievement(item.id)}
                        style={{ width: "100px", minWidth: "100px", justifyContent: "center" }}
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
              style={{height:"530px"}}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-header">
                <h2 style={{marginBottom:"-10px"}}  >
                  {editingAchievementId
                    ? "Update Achievement"
                    : "Add New Achievement"}
                </h2>
                {/*<button
                  className="close-btn"
                  onClick={() => setShowAchievementModal(false)}
                >
                  ×
                </button>*/}
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
                  <label style={{ marginBottom: "-8px", marginTop: "15px" }}>Upload Image</label>
                  <input
  type="file"
  accept="image/*"
  required={!editingAchievementId}
  onChange={handleAchievementImageUpload}
/>
{achievementImageError && (
<p
  style={{
    color: "#dc2626",
    fontSize: "13px",
    fontWeight: "500",
    marginTop: "5px",
    marginBottom: "-15px",
  }}
>
  Only image files up to 1 MB are allowed.
</p>
)}
                </div>

                {/* {achievementForm.image && (
                  <div className="preview-image">
                    <img
                      src={achievementForm.image}
                      alt="preview"
                    />
                  </div>
                )} */}

                <div className="form-buttons">
                  <button type="button" 
                  className="cancel-btn" 
                  style={{ width: "440px" }}
                  onClick={() => setShowAchievementModal(false)}>
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

                <h1 style={{ fontSize: "22px", fontWeight: "700",marginTop:"15px",marginleft:"30px" }}>Manage Live Streams</h1>

                <h2 style={{ fontSize: "16px", fontWeight: "400", color: "#64748b", marginTop:"5px" }}>Manage and broadcast live school events, ceremonies, sports, and special programs.</h2>

              </div>

              <button
                className="btn primary"
                style={{ marginLeft: "1000px" , marginTop: "-82px", position: "absolute",borderRadius: "10px", padding: "5px 20px",fontStyle: "normal" }}
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
                  style={{ height: "620px" }}
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

                    {/*<button
                      className="close-btn"
                      onClick={() =>
                        setShowForm(false)
                      }
                    >
                      ×
                    </button>*/}

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
                       min={new Date().toISOString().split("T")[0]}
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
  onChange={(e) => {
    const url = e.target.value;

    setForm({
      ...form,
      videoURL: url,
    });

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+/;

    if (url === "" || youtubeRegex.test(url)) {
      setVideoUrlError("");
    } else {
      setVideoUrlError("Only YouTube links are allowed.");
    }
  }}
  required
/>
{videoUrlError && (
  <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
    {videoUrlError}
  </p>
)}
                    <div className="form-buttons">

                      <button
                        type="button"
                        className="cancel-btn"
                        style={{width: "440px"}}
                        onClick={() =>
                          setShowForm(false)
                        }
                      >
                        Cancel
                      </button>


                      <button
                        type="submit"
                        className="submit-btn"
                      >
                        {editingId
                          ? "Update"
                          : "Save"}
                      </button>

                      

                    </div>

                  </form>

                </div>

              </div>

            )}

            {/* STREAM LIST */}
            <div className="stream-list">
 {streams.length === 0 ? (

    <div className="empty-state" style={{  marginTop: "10px"}}>

      <div className="empty-icon">
        📺
      </div>

      <h3>No Live Streams Available</h3>

      <p>
        There are currently no live streams available.
        <br />
        Add a new live stream to get started.
      </p>

    </div>

  ) : (
              streams.map((stream) => (

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

              ))
            )}
          
            </div>
          </>
        )}
     

{/* EVENTS */}

{activeTab === "Events" && (
  <div>
    <div className="event-header">
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: "700px", marginTop: "18px" }}>Manage Events</h1>
        <p style={{ marginTop: "5px" }}>Manage and publish school events, ceremonies, and special programs.</p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="event-add-btn"
      >
        + Add Event
      </button>
    </div>

    <div className="event-card-container">
      {events.length === 0 ? (
        <div className="empty-state" style={{ marginTop: "25px" }}>
          <div className="empty-icon">📅</div>
          <h3>No Events Available</h3>
          <p>
            There are currently no upcoming events available.
            <br />
            Create a new event to keep students and staff informed.
          </p>
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="event-card-title">{event.topic}</h2>
            <p className="event-card-description">{event.description}</p>

            <div className="event-details">
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
            </div>

            <div className="event-card-buttons">
              <button onClick={() => handleEdit(event)} className="event-edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(event.id)} className="event-delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

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
            {editingEventId ? "Update Event" : "Create New Event"}
          </h2>

          <form onSubmit={handleEventSubmit} className="event-form">
            <input
              type="text"
              placeholder="Event Topic"
              value={eventForm.topic}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  topic: e.target.value,
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
                  description: e.target.value,
                })
              }
              className="event-textarea"
              required
            />

            <div className="event-row">
              <input
  type="date"
  value={eventForm.date}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) =>
    setEventForm({
      ...eventForm,
      date: e.target.value,
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
                    time: e.target.value,
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
                  venue: e.target.value,
                })
              }
              className="event-input"
              required
            />

            <select
              value={eventForm.announcementAudience || ""}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  announcementAudience: e.target.value,
                })
              }
              className="event-input"
            >
              <option value="">Do Not Show in Announcements</option>
              <option value="Students">Show for Students</option>
              <option value="Teachers">Show for Teachers</option>
              <option value="All">Show for All</option>
            </select>

            <div className="event-form-buttons">
              <button type="button" 
              style={{ width: "240px",backgroundColor: "white" ,color: "#1e293b",border: "1px solid #cbd5e1"}}
              onClick={() => setShowModal(false)} className="event-cancel-btn">
                Cancel
              </button>
              <button type="submit" 
              style={{ width: "240px" }}
              className="event-save-btn">
                {editingEventId ? "Update Event" : "Add Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)}

{activeTab === "Downloadable Content" && (
  <div className="document-section">
    <div className="document-header">
      <div>
        <h1>Manage Downloadable Documents</h1>
        <p>Upload PDF documents that visitors can download.</p>
      </div>

      <button
          className="btn primary"
          style={{ borderRadius: "10px",marginRight:"-20px" }}
         onClick={() => setShowDocumentModal(true)}
       >
           + Add Document
      </button>
    </div>

    <div className="document-list">
  {documents.length === 0 ? (

    <div className="empty-state" style={{ marginTop: "20px"}}>

      <div className="empty-icon">
        📄
      </div>

      <h3>No Documents Uploaded</h3>

      <p>
        There are currently no documents available.
        <br />
        Upload your first PDF document to get started.
      </p>

    </div>

  ) : (
        documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <div className="document-info">
              <h2>{doc.topic}</h2>
              <p>{doc.fileName}</p>
            </div>

            <div className="document-actions">
              <button className="document-delete-btn" onClick={() => handleDeleteDocument(doc.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}
      </div>
    </div>

    {showDocumentModal && (
      <div className="popup-overlay">
        <div className="popup-form" style={{ height: "340px" }}>
          <h2>Upload Document</h2>

          <form onSubmit={handleDocumentSubmit}>
            <input
              type="text"
              placeholder="Document Topic"
              value={documentForm.topic}
              onChange={(e) =>
                setDocumentForm({
                  ...documentForm,
                  topic: e.target.value,
                })
              }
              required
            />
            
 
            <input
  type="file"
  accept="application/pdf"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes

      if (file.size > maxSize) {
        setFileError("File size exceeds 1MB. Please upload a smaller PDF.");
        e.target.value = null; // reset input
        return;
      }

      setFileError(""); // clear error if valid

      setDocumentForm({
        ...documentForm,
        file: file,
      });
    }
  }}
  required
/>
{fileError && (
  <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
    {fileError}
  </p>
)}
            <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
               Maximum file size allowed is 1MB (PDF only)
            </p>
            <div className="form-buttons">
              <button type="button" 
              className="cancel-btn" 
              style={{ width: "240px" }}
              onClick={() => setShowDocumentModal(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-btn"
               style={{ width: "240px" }}>
                Upload
              </button>

              
            </div>
          </form>
        </div>
      </div>
    )}

    {deleteConfirm.open && (
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
        zIndex: 2100
      }}>
        <div className="modal-box" style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{ marginBottom: "10px", color: "#1e293b" }}>Delete Confirmation</h3>
          <p style={{ marginBottom: "20px", color: "#475569" }}>
            Are you sure you want to delete {deleteConfirm.title}?
          </p>
          <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button type="button" className="cancel-btn" onClick={closeDeleteConfirm} style={{
              padding: "8px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              backgroundColor: "white",
              cursor: "pointer"
            }}>Cancel</button>
            <button type="button" className="confirm-delete-btn" onClick={confirmDeleteAction} style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#dc2626",
              color: "white",
              cursor: "pointer"
            }}>Delete</button>
          </div>
        </div>
      </div>
    )}

    {newsFeedback.open && (
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
        zIndex: 2200
      }}>
        <div className="modal-box" style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "380px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{ marginBottom: "10px", color: "#1e293b" }}>
            {newsFeedback.type === "success" ? "Success" : "Error"}
          </h3>
          <p style={{ marginBottom: "20px", color: "#475569" }}>
            {newsFeedback.text}
          </p>
          <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" className="confirm-delete-btn" onClick={closeNewsFeedback} style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: newsFeedback.type === "success" ? "#2b55cc" : "#dc2626",
              color: "white",
              cursor: "pointer"
            }}>OK</button>
          </div>
        </div>
      </div>
    )}

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