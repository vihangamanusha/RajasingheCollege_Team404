import { useEffect, useState } from "react";
import axios from "axios";
//backned api request

export default function AdminAnnouncements() {

  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //control popup form

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    targetAudience: "",
    content: ""
  });

  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8080/api/announcements";
  //backend endpoint

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
  try {
    const response = await axios.get(API_URL);
//sort anncuments by newst id
    const sorted = (response.data || []).sort(
      (a, b) => b.id - a.id
    );

    setAnnouncements(sorted);
  } catch (error) {
    console.log(error);
  }
};
//update only change data  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //handele submit for both add and update
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, formData);//updae existing
    } else {
      await axios.post(API_URL, formData);
    }

    setFormData({
      title: "",
      category: "",
      targetAudience: "",
      content: ""
    });

    setEditingId(null);
    setShowModal(false);

    fetchAnnouncements(); // reload updated data

  } catch (error) {
    console.log(error);
  }
};
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Deleted Successfully");
      fetchAnnouncements();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (announcement) => {
  setEditingId(announcement.id);

  setFormData({
    title: announcement.title || "",
    category: announcement.category || "",
    targetAudience: announcement.targetAudience || "",
    content: announcement.content || ""
  });

  setShowModal(true);
};
  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
      <div className="page feedback-page">
        <div>
          <p className="org">Rajasinghe Central College</p>
          <h1>Announcements & Notices</h1>
          <p className="subtitle" >Manage school-wide announcements</p>
        </div>
       </div>
        <button className="addBtn" onClick={() => setShowModal(true)}>
          + Add Announcement
        </button>

      </div>

     <div className="cardContainer">

  {announcements.map((a) => (

    <div className="announcementCard" key={a.id}>

      {/* TOP ROW */}
      <div className="cardTop">

        <div className="iconBox">
          📢
        </div>

        <div className="cardMain">

          <div className="titleRow">
            <h3>{a.title}</h3>
            <span className={`badge ${a.category.toLowerCase()}`}>
    {a.category}
  </span>
          </div>

          <p className="content">{a.content}</p>

          {/* META INFO */}
          <div className="meta">
            
            <span>📅 {new Date().toLocaleDateString()}</span>
          </div>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="cardActions">

        <button className="editBtn" onClick={() => handleEdit(a)}>
          Edit
        </button>

        <button className="deleteBtn" onClick={() => handleDelete(a.id)}>
          Delete
        </button>

      </div>

    </div>

  ))}

</div>

      {/* MODAL */}
      {showModal && (
        <div className="modalOverlay">

          <div className="modal">

            <button
              className="closeBtn"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setFormData({
                  title: "",
                  category: "",
                  targetAudience: "",
                  content: ""
                });
              }}
            >
              ×
            </button>

            <h2>
              {editingId ? "Update Announcement" : "Create Announcement"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="formGrid">
                
                <input
                  type="text"
                  name="title"
                  placeholder="Announcement Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <br />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Events">Events</option>
                  <option value="Exams">Exams</option>
                </select>
<br />
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Audience</option>
                  <option value="Students">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Parents">Parents</option>
                  <option value="All">All</option>
                </select>

              </div>

              <textarea
                name="content"
                placeholder="Announcement Content"
                value={formData.content}
                onChange={handleChange}
                required
              />

              <div className="modalActions">

                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="saveBtn">
                  {editingId ? "Update" : "Add Announcement"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}