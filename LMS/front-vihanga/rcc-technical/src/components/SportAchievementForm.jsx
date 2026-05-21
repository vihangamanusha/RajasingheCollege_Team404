import { useState } from "react";
import { addSportAchievement } from "../api/sportApi";

export default function SportAchievementForm({ sportType }) {

  const [form, setForm] = useState({
    topic: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      typesport: sportType,
      topic: form.topic,
      description: form.description,
      image: form.image,
    };

    try {
      await addSportAchievement(payload);

      alert("Achievement Added!");

      setForm({
        topic: "",
        description: "",
        image: "",
      });

    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div className="sport-form-container">

      <h2>{sportType} Achievements</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Achievement Topic"
          value={form.topic}
          onChange={(e) =>
            setForm({
              ...form,
              topic: e.target.value,
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
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
        />

        <button type="submit">
          Add Achievement
        </button>

      </form>
    </div>
  );
}