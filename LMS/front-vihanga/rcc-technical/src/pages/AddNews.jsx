import { useState } from "react";
import { addNews } from "../api/newsApi";

export default function AddNews() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    date: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("content", form.content);
      payload.append("date", form.date);
      if (form.image) payload.append("image", form.image);

      const result = await addNews(payload);
      console.log("Upload response:", result);
      alert("News Added!");
      setForm({ title: "", content: "", date: "", image: null });
      setImagePreview("");
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
    if (!file) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Add News</h2>

      <form onSubmit={submit} className="form">
        <input placeholder="Title" onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        } />

        <textarea placeholder="Content" onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        } />

        <input type="date" onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        } />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}