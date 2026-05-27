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
     
      notifications: [
        "Practical exam starts next Monday",
        "Field visit registration is open",
      ],
    },
    {
      id: "maths",
      name: "Mathematics Stream",
     
      notifications: [
        "Revision class on Friday 2:00 PM",
        "Past paper discussion uploaded",
      ],
    },
    {
      id: "tech",
      name: "Technology Stream",
     
      notifications: [
        "New lab schedule updated",
        "Robotics workshop next week",
      ],
    },
    {
      id: "art",
      name: "Arts Stream",
      
      notifications: [
        "Arts seminar registration open",
        "Essay competition announced",
      ],
    },
    {
      id: "commerce",
      name: "Commerce Stream",
      
      notifications: [
        "Mock exam timetable released",
        "Business quiz competition announced",
      ],
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
        
            <div className="academic-intro-icon">
              <BookOpen className="academic-intro-icon-symbol" />
            </div>
          <h2 className="al-title">Academic Streams Notification</h2>
          <p className="al-description">Our Advanced Level program is designed to prepare students for higher 
            education and future careers by providing specialized knowledge in selected 
            streams. It focuses on developing analytical thinking, subject mastery, and 
            practical skills essential for university entry and professional success. 
            Students can choose from Biology, Mathematics, Commerce, Technology, and Arts 
            streams based on their interests and career goals.</p>
      
         </div>
         </section>

      {/* STREAMS */}
      <section className="al-streams2">
        <div className="al-container">
          <div className="stream-grid">
 
            {streams.map((stream) => (
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
                    <p>{stream.description}</p>
                  </div>

                </div>

                {/* DROPDOWN */}
                {openStream === stream.id && (
                  <div className="stream-expand">

                    <h4 className="notif-title">Notifications</h4>

                    <div className="notif-list">
                      {stream.notifications.map((note, i) => (
                        <div key={i} className="notif-item">
                          🔔 {note}
                        </div>
                      ))}
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