import { useEffect, useState } from "react";
import {
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent,
} from "../api/eventApi";

export default function Event() {
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    topic: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  // SAVE EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateEvent(editingId, form);
      alert("Event Updated!");
    } else {
      await addEvent(form);
      alert("Event Added!");
    }

    setForm({
      topic: "",
      description: "",
      date: "",
      time: "",
      venue: "",
    });

    setEditingId(null);

    loadEvents();
  };

  // DELETE EVENT
  const handleDelete = async (id) => {
    await deleteEvent(id);
    alert("Event Deleted!");
    loadEvents();
  };

  // EDIT EVENT
  const handleEdit = (event) => {
    setForm({
      topic: event.topic,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
    });

    setEditingId(event.id);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Upcoming Events Admin Panel</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Event Topic"
          value={form.topic}
          onChange={(e) =>
            setForm({ ...form, topic: e.target.value })
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
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) =>
            setForm({ ...form, time: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Venue"
          value={form.venue}
          onChange={(e) =>
            setForm({ ...form, venue: e.target.value })
          }
          required
        />

        <button type="submit">
          {editingId ? "Update Event" : "Save Event"}
        </button>
      </form>

      {/* EVENT LIST */}
      <div style={{ marginTop: "40px" }}>
        <h2>All Events</h2>

        {events.map((event) => (
          <div key={event.id} style={styles.card}>
            <h3>{event.topic}</h3>

            <p>{event.description}</p>

            <p>
              <strong>Date:</strong> {event.date}
            </p>

            <p>
              <strong>Time:</strong> {event.time}
            </p>

            <p>
              <strong>Venue:</strong> {event.venue}
            </p>

            <button
              onClick={() => handleEdit(event)}
              style={styles.editBtn}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(event.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px",
  },

  card: {
    border: "1px solid #ccc",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
  },

  editBtn: {
    marginRight: "10px",
    background: "orange",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
  },
};