import { BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import "../styles/styles.css";

export function AcademicALevel() {
  const [openStream, setOpenStream] = useState(null);

  const streams = [
    {
      id: "bio",
      name: "Biology Stream",
      description: "Medicine, Bio-science, Nursing, Agriculture fields",
      message: "🔔 New update: Biology practical exams start next week. Check timetable.",
    },
    {
      id: "maths",
      name: "Mathematics Stream",
      description: "Engineering, IT, Data Science, Physical Science",
      message: "🔔 New update: Maths revision classes scheduled on Friday.",
    },
    {
      id: "tech",
      name: "Technology Stream",
      description: "ICT, Engineering Technology, Innovation",
      message: "🔔 New update: Tech lab sessions updated for this month.",
    },
    {
      id: "art",
      name: "Arts Stream",
      description: "Languages, History, Geography, Social Studies",
      message: "🔔 New update: Arts seminar registration is now open.",
    },
    {
      id: "commerce",
      name: "Commerce Stream",
      description: "Business Studies, Accounting, Economics",
      message: "🔔 New update: Commerce mock exam timetable released.",
    },
  ];

  const toggle = (id) => {
    setOpenStream(openStream === id ? null : id);
  };

  return (
    <div className="al-page">

      {/* HERO */}
      <section className="al-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920"
          className="al-hero-img"
        />

        <div className="al-hero-overlay">
          <h1>Advanced Level Streams</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="al-content">
        <div className="al-container">

          <h2 className="al-title">Academic Streams</h2>

          <div className="stream-grid">

            {streams.map((stream) => (
              <div
                key={stream.id}
                className={`stream-card ${openStream === stream.id ? "open" : ""}`}
                onClick={() => toggle(stream.id)}
              >

                {/* CARD HEADER */}
                <div className="stream-header">
                  <div className="stream-icon-box">
                    <BookOpen className="stream-icon" />
                  </div>

                  <div>
                    <h3>{stream.name}</h3>
                    <p>{stream.description}</p>
                  </div>
                </div>

                {/* EXPAND CONTENT */}
                {openStream === stream.id && (
                  <div className="stream-expand">
                    <div className="stream-notification">
                      <h4>Notifications</h4>
                      <p>{stream.message}</p>
                    </div>
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}