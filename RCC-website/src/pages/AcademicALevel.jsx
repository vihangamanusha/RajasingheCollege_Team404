import { BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import "../styles/styles.css";

export function AcademicALevel() {
  const [openStream, setOpenStream] = useState(null);

  const streams = [
    {
      id: "bio",
      name: "Biology",
      message: "Biology stream focuses on Medicine, Bio-science and Health studies.",
    },
    {
      id: "maths",
      name: "Mathematics",
      message: "Maths stream focuses on Engineering, IT and Physical Science fields.",
    },
    {
      id: "tech",
      name: "Technology",
      message: "Technology stream focuses on ICT, Engineering Technology and Innovation.",
    },
    {
      id: "art",
      name: "Arts",
      message: "Arts stream focuses on Languages, History and Social Sciences.",
    },
    {
      id: "commerce",
      name: "Commerce",
      message: "Commerce stream focuses on Business, Accounting and Economics.",
    },
  ];

  const toggleStream = (id) => {
    setOpenStream(openStream === id ? null : id);
  };

  return (
    <div className="al-page">

      {/* HERO */}
      <section className="al-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920"
          alt="Advanced Level"
          className="al-hero-img"
        />

        <div className="al-hero-overlay">
          <h1>Advanced Level Streams</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="al-content">
        <div className="al-container">

          <h2 className="al-title">Choose Your Stream</h2>

          <div className="stream-grid">

            {streams.map((stream) => (
              <div key={stream.id} className="stream-wrapper">

                {/* CARD */}
                <div
                  className={`stream-card ${openStream === stream.id ? "active" : ""}`}
                  onClick={() => toggleStream(stream.id)}
                >
                  <BookOpen className="stream-icon" />
                  <h3>{stream.name}</h3>
                  <p className="stream-sub">Click to view details</p>
                </div>

                {/* DROPDOWN NOTIFICATION */}
                {openStream === stream.id && (
                  <div className="stream-dropdown">
                    <p>{stream.message}</p>
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