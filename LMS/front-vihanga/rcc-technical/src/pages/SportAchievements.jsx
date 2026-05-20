import { useState } from "react";
import { Trophy, Pencil, Trash2, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import "../styles/index.css";

export function SportAchievements() {

  const navigate = useNavigate();

  const { sportName } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [achievements, setAchievements] = useState([

    {
      id: 1,
      title: "Championship Win 2026",
      description:
        "Won the inter-school championship after an outstanding performance.",
      date: "April 20, 2026",
      image:
        "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&h=600&fit=crop",
    },

    {
      id: 2,
      title: "Tournament Runner-up",
      description:
        "Secured second place in the regional tournament.",
      date: "March 15, 2026",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop",
    },

  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    if (editingId) {

      const updated = achievements.map((item) =>
        item.id === editingId
          ? { ...formData, id: editingId }
          : item
      );

      setAchievements(updated);

    } else {

      const newAchievement = {
        id: Date.now(),
        ...formData,
      };

      setAchievements([newAchievement, ...achievements]);
    }

    setShowModal(false);

    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      date: "",
      image: "",
    });
  };

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    const filtered = achievements.filter(
      (item) => item.id !== id
    );

    setAchievements(filtered);
  };

  const handleEdit = (item) => {

    setEditingId(item.id);

    setFormData({
      title: item.title,
      description: item.description,
      date: item.date,
      image: item.image,
    });

    setShowModal(true);
  };

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  return (

    <div className="achievement-page">

      {/* TOP HEADER */}

      <div className="achievement-header">

        <div className="achievement-left">

          <button
            className="back-btn"
            onClick={() => navigate("/sports")}
          >
            ← Back to Sports
          </button>

          <h1>
            {sportName} Achievements
          </h1>

        </div>

        <button
          className="add-achievement-btn"
          onClick={() => setShowModal(true)}
        >
          Add New Achievement
        </button>

      </div>

      {/* ACHIEVEMENT LIST */}

      <div className="achievement-list">

        {achievements.map((item) => (

          <div
            className="achievement-card"
            key={item.id}
          >

            {/* IMAGE */}

            <div className="achievement-image">

              <img
                src={item.image}
                alt={item.title}
              />

            </div>

            {/* CONTENT */}

            <div className="achievement-content">

              <div className="achievement-top">

                <div>

                  <h2>{item.title}</h2>

                  <p>
                    {item.description}
                  </p>

                  <span>
                    {item.date}
                  </span>

                </div>

                <div className="achievement-actions">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal-container">

            <div className="modal-header">

              <h2>

                {editingId
                  ? "Update Achievement"
                  : "Add New Achievement"}

              </h2>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

              {/* TITLE */}

              <div className="form-group">

                <label>
                  Achievement Title
                </label>

                <input
                  type="text"
                  placeholder="e.g., Championship Win 2026"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Describe the achievement..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* DATE */}

              <div className="form-group">

                <label>
                  Date
                </label>

                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* IMAGE */}

              <div className="form-group">

                <label>
                  Upload Image
                </label>

                <div className="upload-box">

                  <Upload size={50} />

                  <p>
                    Click to upload image
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                </div>

              </div>

              {/* PREVIEW */}

              {formData.image && (

                <div className="preview-image">

                  <img
                    src={formData.image}
                    alt="preview"
                  />

                </div>

              )}

              {/* BUTTONS */}

              <div className="modal-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingId
                    ? "Update Achievement"
                    : "Add Achievement"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}