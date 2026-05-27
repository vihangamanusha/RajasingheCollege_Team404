import { BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import "../styles/styles.css";

export function AcademicALevel() {
  const { t } = useLanguage();

  const [selectedStream, setSelectedStream] = useState(null);

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

  return (
    <div className="al-page">

      {/* HERO */}
      <section className="al-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
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

          <h2 className="al-title">Select Your Stream</h2>

          <div className="stream-grid">

            {streams.map((stream) => (
              <div
                key={stream.id}
                className={`stream-card ${selectedStream?.id === stream.id ? "active" : ""}`}
                onClick={() => setSelectedStream(stream)}
              >
                <BookOpen className="stream-icon" />
                <h3>{stream.name}</h3>
              </div>
            ))}

          </div>

          {/* MESSAGE BOX */}
          {selectedStream && (
            <div className="stream-message">
              <h3>{selectedStream.name}</h3>
              <p>{selectedStream.message}</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}