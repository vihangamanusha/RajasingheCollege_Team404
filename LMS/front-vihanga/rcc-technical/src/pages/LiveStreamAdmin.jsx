import { useEffect, useState } from "react";
import "../index.css";

export default function LiveStreamAdmin() {
  const [streams, setStreams] = useState([]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    videoUrl: "",
  });

  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  // LOAD STREAMS
  useEffect(() => {
    loadStreams();
  }, []);

  const loadStreams = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/livestreams");
      const data = await response.json();
      setStreams(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD STREAM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/livestreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage("Live stream added successfully");

        setForm({
          title: "",
          date: "",
          time: "",
          description: "",
          videoUrl: "",
        });

        setShowForm(false);

        loadStreams();
      } else {
        setMessage("Failed to add stream");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server error");
    }
  };

  // DELETE STREAM
  const deleteStream = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/livestreams/${id}`, {
        method: "DELETE",
      });

      loadStreams();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="livestream-admin">

      {/* HEADER */}
      <div className="live-header">
        <div>
          <p className="live-org">Rajasinghe Central College</p>
          <h1>Live Stream Management</h1>
          <p className="live-subtitle">
            Manage school live streams, online events, and video broadcasts.
          </p>
        </div>

        <button
          className="add-stream-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Live Stream
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {/* POPUP FORM */}
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
              <h2>Add Live Stream</h2>

              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="stream-form">

              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Time"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="YouTube / Facebook Embed URL"
                value={form.videoUrl}
                onChange={(e) =>
                  setForm({ ...form, videoUrl: e.target.value })
                }
                required
              />

              <button type="submit" className="submit-btn">
                Save Live Stream
              </button>

            </form>
          </div>
        </div>
      )}

      {/* STREAM CARDS */}
      <div className="stream-list">

        {streams.map((stream) => (
          <div key={stream.id} className="stream-card">

            <div className="stream-video">
              <iframe
                src={stream.videoUrl}
                title={stream.title}
                allowFullScreen
              ></iframe>
            </div>

            <div className="stream-content">
              <h2>{stream.title}</h2>

              <p className="stream-date">
                {stream.date} | {stream.time}
              </p>

              <p className="stream-description">
                {stream.description}
              </p>

              <button
                className="delete-btn"
                onClick={() => deleteStream(stream.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}