import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAnnouncements() {

  const [announcements, setAnnouncements] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    targetAudience: "",
    content: ""
  });

  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8080/api/announcements";

  // LOAD ALL ANNOUNCEMENTS
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(API_URL);
      setAnnouncements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ADD OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        // UPDATE
        await axios.put(
          `${API_URL}/${editingId}`,
          formData
        );

        alert("Announcement Updated");

      } else {

        // ADD
        await axios.post(API_URL, formData);

        alert("Announcement Added");
      }

      setFormData({
        title: "",
        category: "",
        targetAudience: "",
        content: ""
      });

      setEditingId(null);

      fetchAnnouncements();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API_URL}/${id}`);

      alert("Deleted Successfully");

      fetchAnnouncements();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const handleEdit = (announcement) => {

    setEditingId(announcement.id);

    setFormData({
      title: announcement.title,
      category: announcement.category,
      targetAudience: announcement.targetAudience,
      content: announcement.content
    });
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Announcement Panel
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-10"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="title"
            placeholder="Announcement Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          {/* CATEGORY */}

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Sports">Sports</option>
            <option value="Events">Events</option>
            <option value="Exams">Exams</option>
          </select>

          {/* TARGET */}

          <select
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Audience</option>
            <option value="Students">Students</option>
            <option value="Teachers">Teachers</option>
            <option value="Parents">Parents</option>
            <option value="All">All</option>
          </select>

        </div>

        {/* CONTENT */}

        <textarea
          name="content"
          placeholder="Announcement Content"
          value={formData.content}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4 h-32"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
        >
          {editingId ? "Update Announcement" : "Add Announcement"}
        </button>

      </form>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border-collapse border">

          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Title</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Audience</th>
              <th className="border p-3">Content</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {announcements.map((announcement) => (

              <tr key={announcement.id}>

                <td className="border p-3">
                  {announcement.title}
                </td>

                <td className="border p-3">
                  {announcement.category}
                </td>

                <td className="border p-3">
                  {announcement.targetAudience}
                </td>

                <td className="border p-3">
                  {announcement.content}
                </td>

                <td className="border p-3 flex gap-2">

                  <button
                    onClick={() => handleEdit(announcement)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}