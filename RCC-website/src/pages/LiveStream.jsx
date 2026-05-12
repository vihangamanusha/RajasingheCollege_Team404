import { useEffect, useState } from "react";
import { Radio, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/styles.css";

export function LiveStream() {
  const { t } = useLanguage();

  const [streams, setStreams] = useState([]);
  const [liveStream, setLiveStream] = useState(null);

  // LOAD DATA
  useEffect(() => {
    fetchStreams();

    // auto check every 30 sec
    const interval = setInterval(() => {
      detectLiveStream();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchStreams = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/livestreams");
      const data = await res.json();
      setStreams(data);
    } catch (err) {
      console.log(err);
    }
  };

  //  Convert date + time properly
  const parseDateTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };

  //  LIVE DETECTION
  const detectLiveStream = () => {
    const now = new Date();

    const live = streams.find((stream) => {
      const streamTime = parseDateTime(stream.date, stream.time);

      // LIVE WINDOW (±1 minute tolerance)
      const diff = Math.abs(now - streamTime);

      return diff < 60000; // 1 minute
    });

    setLiveStream(live || null);
  };

  useEffect(() => {
    detectLiveStream();
  }, [streams]);

  return (
    <div className="live-page">

      {/* ================= HERO ================= */}
      <section className="live-hero">

        <ImageWithFallback
          src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&h=1080&fit=crop"
          className="live-hero-image"
          alt="Live Stream"
        />

        <div className="live-hero-overlay">
          <h1 className="live-hero-title">
            {t("livestream.title")}
          </h1>
        </div>

      </section>

      {/* ================= LIVE SECTION ================= */}
      <section className="live-current-section">
        <div className="live-container">

          {liveStream ? (
            <div className="live-card">

              {/* VIDEO */}
              <iframe
                width="100%"
                height="400"
                src={liveStream.videoUrl}
                title={liveStream.title}
                allowFullScreen
              ></iframe>

              {/* DETAILS */}
              <div className="live-details">

                <div className="live-status">
                  <span className="live-dot"></span>
                  <span>LIVE NOW</span>
                </div>

                <h2 className="live-heading">
                  {liveStream.title}
                </h2>

                <p className="live-description">
                  {liveStream.description}
                </p>

              </div>

            </div>
          ) : (
            <div className="live-card">

              <div className="live-video-box">
                <Radio className="live-radio-icon" />
                <p className="live-offline-text">
                  {t("livestream.noLive")}
                </p>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ================= UPCOMING ================= */}
      <section className="upcoming-section">
        <div className="live-container">

          <div className="upcoming-header">
            <h2 className="upcoming-title">
              {t("livestream.upcoming")}
            </h2>
            <div className="upcoming-line"></div>
          </div>

          <div className="upcoming-grid">

            {streams
              .filter((s) => {
                const now = new Date();
                const time = parseDateTime(s.date, s.time);
                return time > now; // ONLY FUTURE
              })
              .map((stream) => (
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

                </div>
              ))}

          </div>

        </div>
      </section>

    </div>
  );
}