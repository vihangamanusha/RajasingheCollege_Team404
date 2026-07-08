import { useEffect, useState } from "react";
import "../index.css";

// convert normla yt urls into embeded urls
const getEmbedUrl = (url) => {
  if (!url) return "";

  url = url.trim();//remove spaces

  // already embed
  if (url.includes("embed")) return url;

  // watch?v=
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];//extract link id
    return `https://www.youtube.com/embed/${id}`;
  }

  // youtu.be
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
};

export default function LiveStreamAdmin() {

  const [streams, setStreams] = useState([]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    videoURL: "",
  });

  //store succes/error msg
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  // LOAD STREAMS
  useEffect(() => {
    loadStreams();
  }, []);

  const loadStreams = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams`
      );

      const data = await response.json();
      if (Array.isArray(data)) {
        setStreams(data);
      } else {
        setStreams([]);
      }
    } catch (error) {
      console.log(error);
      setStreams([]);
    }
  };

  // START STREAMING
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

  // STOP STREAMING
  const stopStreaming = async (id) => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams/${id}/stop`,
        {
          method: "PUT",
        }
      );

      loadStreams();//update stream stuat

      setMessage("Streaming stopped");

    } catch (error) {
      console.log(error);
    }
  };

  // add or update stream
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
            ? "Stream updated successfully"
            : "Stream added successfully"
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

      } else {
        const errorText = await response.text();
        setMessage("Operation failed: " + errorText);
        alert("Operation failed: " + errorText);
      }

    } catch (error) {

      console.log(error);

      setMessage("Server error");
    }
  };

  // DELETE STREAM
  const deleteStream = async (id) => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/livestreams/${id}`,
        {
          method: "DELETE",
        }
      );

      loadStreams();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT STREAM
  const editStream = (stream) => {

    setForm({
      title: stream.title,
      date: stream.date,
      time: stream.time,
      description: stream.description,
      videoURL: stream.videoURL,
    });

    setEditingId(stream.id);//store editing streaam id

    setShowForm(true);
  };

  return (

    <div className="livestream-admin">

      {/* HEADER */}
      <div className="live-header">

        <div>

          <p className="live-org">
            Rajasinghe Central College
          </p>

          <h1>
            Live Stream Management
          </h1>

          <p className="live-subtitle">
            Manage school live streams,
            online events, and broadcasts.
          </p>

        </div>

        <button
          className="add-stream-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Live Stream
        </button>

      </div>

      {/* MESSAGE */}
      {message && (
        <p className="message">
          {message}
        </p>
      )}

      {/* POPUP */}
      {showForm && (

        <div
          className="popup-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="popup-form"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="popup-header">

              <h2>
                {editingId
                  ? "Update Stream"
                  : "Add Stream"}
              </h2>

              <button
                className="close-btn"
                onClick={() => {

                  setShowForm(false);

                  setEditingId(null);
                }}
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="stream-form"
            >

              <label>Title</label>

              <input
                type="text"
                placeholder="Enter title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                required
              />

              <label>Date</label>

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

              <label>Time</label>

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

              <label>Description</label>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                required
              />

              <label>Video URL</label>

              <input
                type="text"
                placeholder="Paste YouTube URL"
                value={form.videoURL}
                onChange={(e) =>
                  setForm({
                    ...form,
                    videoURL: e.target.value,
                  })
                }
                required
              />

              {/* BUTTONS */}
              <div className="form-buttons">

                <button
                  type="submit"
                  className="submit-btn"
                >
                  {editingId
                    ? "Update Stream"
                    : "Save Stream"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {

                    setShowForm(false);

                    setEditingId(null);

                    setForm({
                      title: "",
                      date: "",
                      time: "",
                      description: "",
                      videoURL: "",
                    });

                  }}
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

            {/* VIDEO */}
            <div className="stream-video">

              <iframe
                width="100%"
                height="250"
                src={getEmbedUrl(stream.videoURL)}
                title={stream.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>

            </div>

            {/* CONTENT */}
            <div className="stream-content">

              <h2>{stream.title}</h2>

              <p className="stream-date">
                {stream.date} | {stream.time}
              </p>

              <p className="stream-description">
                {stream.description}
              </p>

              {/* BUTTONS */}
              <div className="card-buttons">

              <button
                 className="update-btn"
                 onClick={() => editStream(stream)}
             >
                 Update
              </button>

              <button
                 className="delete-btn"
                 onClick={() => deleteStream(stream.id)}
              >
                  Delete
              </button>

              <button
                 className="live-btn"
                 onClick={() => startStreaming(stream.id)}
             >
                 Start Streaming
              </button>

              <button
                 className="stop-btn"
                 onClick={() => stopStreaming(stream.id)}
              >
                 Stop Streaming
              </button>

            </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}