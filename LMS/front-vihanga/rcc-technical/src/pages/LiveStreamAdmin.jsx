import { useEffect, useState } from "react";

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

      <h1>Live Stream Admin Panel</h1>

      {message && <p>{message}</p>}

      {/* FORM */}

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

        <button type="submit">
          Add Live Stream
        </button>

      </form>

      {/* STREAM LIST */}

      <div className="stream-list">

        {streams.map((stream) => (
          <div key={stream.id} className="stream-card">

            <h2>{stream.title}</h2>

            <p>{stream.date}</p>

            <p>{stream.time}</p>

            <p>{stream.description}</p>

            <iframe
              width="300"
              height="200"
              src={stream.videoUrl}
              title={stream.title}
              allowFullScreen
            ></iframe>

            <br />

            <button onClick={() => deleteStream(stream.id)}>
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}