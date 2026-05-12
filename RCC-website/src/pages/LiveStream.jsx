import { Radio, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/index.css";

export function LiveStream() {

  const { t } = useLanguage();

  const upcomingStreams = [
    {
      titleKey: "stream1.title",
      date: "May 25, 2026",
      time: "2:00 PM",
      descriptionKey: "stream1.desc",
    },
    {
      titleKey: "stream2.title",
      date: "May 15, 2026",
      time: "8:00 AM",
      descriptionKey: "stream2.desc",
    },
    {
      titleKey: "stream3.title",
      date: "June 5, 2026",
      time: "10:00 AM",
      descriptionKey: "stream3.desc",
    },
  ];

  return (
    <div className="live-page">

      {/* HERO */}
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

      {/* LIVE SECTION */}
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

      {/* UPCOMING */}
      <section className="upcoming-section">

        <div className="live-container">

          <div className="upcoming-header">

            <h2 className="upcoming-title">
              {t("livestream.upcoming")}
            </h2>

            <div className="upcoming-line"></div>

          </div>

          <div className="upcoming-grid">

            {upcomingStreams.map((stream, index) => (

              <div key={index} className="upcoming-card">

                <div className="upcoming-icon-box">

                  <Calendar className="upcoming-icon" />

                </div>

                <h3 className="upcoming-card-title">
                  {t(stream.titleKey)}
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
                  {t(stream.descriptionKey)}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}