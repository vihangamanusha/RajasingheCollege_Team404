import { useEffect, useState } from "react";
import "../index.css";


// CONVERT YOUTUBE URL

const getEmbedUrl = (url) => {
  if (!url) return "";

  url = url.trim();

  // already embed link
  if (url.includes("embed")) return url;

  // youtube watch?v=
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // youtu.be short link
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

  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  // UPDATE MODE
  const [editingId, setEditingId] = useState(null);


  // LOAD STREAMS
 
  useEffect(() => {
    loadStreams();
  }, []);

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

        // ADD
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
          videoURL: "",
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
      videoURL: stream.videoURL,
    });

    setEditingId(stream.id);

    setShowForm(true);
  };

  return (

    <div className="livestream-admin">


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

      {/* POPUP FORM  */}

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

  

            <form
              onSubmit={handleSubmit}
              className="stream-form"
            >

              <label>Title</label>

              <input
                type="text"
                placeholder="Enter stream title"
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
                placeholder="Enter stream description"
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

    

      <div className="stream-list">

        {streams.map((stream) => (

          <div
            key={stream.id}
            className="stream-card"
          >

     

            <div className="stream-video">

              <div className="stream-video">

  <iframe
    width="100%"
    height="450"
    src={getEmbedUrl(stream.videoURL)}
    title={stream.title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    frameBorder="0"
  ></iframe>

</div>

            </div>

            {/*  CONTENT  */}

            <div className="stream-content">

              <h2>{stream.title}</h2>

              <p className="stream-date">
                {stream.date} | {stream.time}
              </p>

              <p className="stream-description">
                {stream.description}
              </p>

              

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