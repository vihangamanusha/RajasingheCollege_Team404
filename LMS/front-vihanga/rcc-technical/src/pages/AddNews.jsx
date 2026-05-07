import { useState } from "react";
import { addNews } from "../api/newsApi";

export default function AddNews() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    date: "",
    image: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await addNews(form);
    alert("News Added!");
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

        <input placeholder="Image URL" onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        } />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}