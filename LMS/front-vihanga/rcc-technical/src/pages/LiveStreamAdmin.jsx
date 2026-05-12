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

  // UPDATE STATE
  const [editingId, setEditingId] = useState(null);

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

  // ADD OR UPDATE STREAM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let response;

      // UPDATE
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

        // ADD NEW
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
            ? "Live stream updated successfully"
            : "Live stream added successfully"
        );

        setForm({
          title: "",
          date: "",
          time: "",
          description: "",
          videoUrl: "",
        });

        setEditingId(null);

        setShowForm(false);

        loadStreams();

      } else {
        setMessage("Operation failed");
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
        `http://localhost:8080/api/livestreams/${id}`,
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
      videoUrl: stream.videoUrl,
    });

    setEditingId(stream.id);

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
            online events, and video broadcasts.
          </p>
        </div>

        <button
          className="add-stream-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Live Stream
        </button>

      </div>

      {message && (
        <p className="message">
          {message}
        </p>
      )}

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

              <h2>
                {editingId
                  ? "Update Live Stream"
                  : "Add Live Stream"}
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
                type="text"
                placeholder="Time"
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
                required
              />

              <input
                type="text"
                placeholder="YouTube / Facebook Embed URL"
                value={form.videoUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    videoUrl: e.target.value,
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
                    : "Save Live Stream"}
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
                      videoUrl: "",
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
                src={stream.videoUrl}
                title={stream.title}
                allowFullScreen
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

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}