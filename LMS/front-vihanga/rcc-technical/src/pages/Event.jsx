import { useEffect, useState } from "react";
import {
  getAllEvents,
  addEvent,
  deleteEvent,
  updateEvent,
} from "../api/eventApi";

import "../index.css";

export default function Event() {

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
     const data = await getAllEvents();

  const sorted = (data || []).sort((a, b) => b.id - a.id);

  setEvents(sorted);
  };

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
  const handleEdit = (event) => {

    setForm({
      topic: event.topic,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
    });

    setEditingId(event.id);

    setShowModal(true);
  };

const deleteEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/api/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete event");
  }

  return response;
};

  return (

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

      {/* EVENT CARDS */}

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

      {/* MODAL */}

      {showModal && (

        <div className="event-modal-overlay">

          <div className="event-modal">

            <button
              onClick={() => {
                setShowModal(false);

                setEditingId(null);

                setForm({
                  topic: "",
                  description: "",
                  date: "",
                  time: "",
                  venue: "",
                });
              }}
              className="event-close-btn"
            >
              ×
            </button>

            <h2 className="event-modal-title">

              {editingId
                ? "Update Event"
                : "Create New Event"}

            </h2>

            <form
              onSubmit={handleSubmit}
              className="event-form"
            >

              <input
                type="text"
                placeholder="Event Topic"
                value={form.topic}
                onChange={(e) =>
                  setForm({
                    ...form,
                    topic: e.target.value
                  })
                }
                className="event-input"
                required
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value
                  })
                }
                className="event-textarea"
                required
              />

              <div className="event-row">

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date: e.target.value
                    })
                  }
                  className="event-input"
                  required
                />

                <input
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm({
                      ...form,
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
                value={form.venue}
                onChange={(e) =>
                  setForm({
                    ...form,
                    venue: e.target.value
                  })
                }
                className="event-input"
                required
              />

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
                  {editingId
                    ? "Update Event"
                    : "Add Event"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}