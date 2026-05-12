import { useEffect, useState } from "react";
import { Radio, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/styles.css";

export function LiveStream() {
  const { t } = useLanguage();

  // DB STATE
  const [streams, setStreams] = useState([]);

  // LOAD FROM SPRING BOOT
  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/livestreams");
      const data = await res.json();
      setStreams(data);
    } catch (err) {
      console.log("Error loading livestreams:", err);
    }
  };

  return (
    <div className="live-page">

      {/* ================= HERO ================= */}
      <section className="live-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&h=1080&fit=crop"
          alt="Live Stream"
          className="live-hero-image"
        />

        <div className="live-hero-overlay">
          <h1 className="live-hero-title">
            {t("livestream.title")}
          </h1>
        </div>
      </section>

      {/* ================= CURRENT LIVE ================= */}
      <section className="live-current-section">
        <div className="live-container">

          <div className="live-card">

            <div className="live-video-box">
              <div className="live-video-content">
                <Radio className="live-radio-icon" />
                <p className="live-offline-text">
                  {t("livestream.noLive")}
                </p>
              </div>
            </div>

            <div className="live-details">

              <div className="live-status">
                <span className="live-dot"></span>
                <span>OFFLINE</span>
              </div>

              <h2 className="live-heading">
                School Events Live Stream
              </h2>

              <p className="live-description">
                Stay connected with RRCC by watching our live streams of major
                school events, ceremonies, and competitions.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= UPCOMING STREAMS (DB) ================= */}
      <section className="upcoming-section">
        <div className="live-container">

          <div className="upcoming-header">
            <h2 className="upcoming-title">
              {t("livestream.upcoming")}
            </h2>
            <div className="upcoming-line"></div>
          </div>

          <div className="upcoming-grid">

            {streams.length === 0 ? (
              <p>No live streams available.</p>
            ) : (
              streams.map((stream) => (
                <div key={stream.id} className="upcoming-card">

                  <div className="upcoming-icon-box">
                    <Calendar className="upcoming-icon" />
                  </div>

                  <h3 className="upcoming-card-title">
                    {stream.title}
                  </h3>

                  <div className="upcoming-info">

                    <div className="upcoming-info-row">
                      <Calendar className="small-icon" />
                      <span>{stream.date}</span>
                    </div>

                    <div className="upcoming-info-row">
                      <Clock className="small-icon" />
                      <span>{stream.time}</span>
                    </div>

                  </div>

                  <p className="upcoming-description">
                    {stream.description}
                  </p>

                  {/* OPTIONAL VIDEO PREVIEW */}
                  {stream.videoUrl && (
                    <div style={{ marginTop: "10px" }}>
                      <iframe
                        width="100%"
                        height="180"
                        src={stream.videoUrl}
                        title={stream.title}
                        allowFullScreen
                        style={{ borderRadius: "10px", border: "none" }}
                      ></iframe>
                    </div>
                  )}

                </div>
              ))
            )}

          </div>

        </div>
      </section>

    </div>
  );
}