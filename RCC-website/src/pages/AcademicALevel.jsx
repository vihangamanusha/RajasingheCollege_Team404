import { BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import "../styles/styles.css";
import academicALevelImage from "../assets/Alacademic.jpeg";
import { getAcademicAnnouncements } from "../api/announcementApi";

export function AcademicALevel() {
  const [openStream, setOpenStream] = useState(null);
  const [notifications, setNotifications] = useState({});
  const [loading, setLoading] = useState(false);

  const streams = [
    { id: "bio",      name: "Biology Stream"     },
    { id: "maths",    name: "Mathematics Stream"  },
    { id: "tech",     name: "Technology Stream"   },
    { id: "art",      name: "Arts Stream"         },
    { id: "commerce", name: "Commerce Stream"     },
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const audiences = ["Biology", "Mathematics", "Technology", "Arts", "Commerce"];
    try {
      const result = {};
      for (const audience of audiences) {
        const data = await getAcademicAnnouncements(audience);
        result[audience] = data;
      }
      setNotifications(result);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id) => {
    setOpenStream(openStream === id ? null : id);
  };

  return (
    <div className="al-page">

      {/* HERO */}
      <section className="al-hero">
        <ImageWithFallback
          src={academicALevelImage}
          className="al-hero-img"
        />
        <div className="al-hero-overlay">
          <h1>Advanced Level Streams</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="al-content">
        <div className="al-container">
          <div className="academic-intro-icon">
            <BookOpen className="academic-intro-icon-symbol" />
          </div>
          <h2 className="al-title">Academic Streams Notification</h2>
          <p className="al-description">
            Our Advanced Level program is designed to prepare students for higher
            education and future careers by providing specialized knowledge in selected
            streams. It focuses on developing analytical thinking, subject mastery, and
            practical skills essential for university entry and professional success.
            Students can choose from Biology, Mathematics, Commerce, Technology, and Arts
            streams based on their interests and career goals.
          </p>
        </div>
      </section>

      {/* STREAMS */}
      <section className="al-streams2">
        <div className="al-container">
          <div className="stream-grid">

            {streams.map((stream) => {
              const key = stream.name.replace(" Stream", "");
              const items = notifications[key] || [];

              return (
                <div
                  key={stream.id}
                  className={`stream-card ${openStream === stream.id ? "open" : ""}`}
                  onClick={() => toggle(stream.id)}
                >
                  {/* HEADER */}
                  <div className="stream-header">
                    <div className="stream-icon-box">
                      <BookOpen className="stream-icon" />
                    </div>
                    <div className="stream-text">
                      <h3>{stream.name}</h3>
                    </div>
                  </div>

                  {/* DROPDOWN */}
                  {openStream === stream.id && (
                    <div className="stream-expand">
                      <h4 className="notif-title">Notifications</h4>
                      <div className="notif-list">
                        {loading ? (
                          <div className="notif-item">Loading...</div>
                        ) : items.length > 0 ? (
                          items.map((item) => (
                            <div key={item.id} className="notif-item">
                              🔔 <strong>{item.title}</strong>
                              <br />
                              {item.content}
                            </div>
                          ))
                        ) : (
                          <div className="notif-item">No notifications available.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </div>
  );
}