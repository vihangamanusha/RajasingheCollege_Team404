import { useEffect, useState } from "react";
import { Radio, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import LiveStreamImage from "../assets/livestream.jpeg";
import "../styles/styles.css";

// Yt url - EMBED URL
const getEmbedUrl = (url) => {
  if (!url) return "";

  url = url.trim();

  // already embed
  if (url.includes("embed")) return url;

  // watch?v=
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // youtu.be
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
};

export function LiveStream() {

  const { t } = useLanguage();

  const [streams, setStreams] = useState([]);

  // FETCH STREAMS
  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {

    try {

      const res = await fetch(
        "http://localhost:8080/api/livestreams"
      );

      const data = await res.json();

      setStreams(data);

    } catch (err) {
      console.log(err);
    }
  };

  // live stream
  
  // backend should return "live" OR "isLive"

  const liveStream = streams.find(
    (stream) => stream.live === true
  );

  return (

    <div className="live-page">

      {/* HERO SECTION */}

      <section className="live-hero">

        <ImageWithFallback
          src={LiveStreamImage}
          className="live-hero-image"
          alt="Live Stream"
        />

        <div className="live-hero-overlay">

          <h1 className="live-hero-title">
            {t("livestream.title")}
          </h1>

        </div>

      </section>

      {/* Live stream section */}

      <section className="live-current-section">

        <div className="live-container">

          {liveStream ? (

            <div className="live-card">

              {/* VIDEO */}

              <div className="live-video-box">

                <iframe
                  width="100%"
                  height="450"
                  src={getEmbedUrl(liveStream.videoURL)}
                  title={liveStream.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>

              </div>

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

            <div className="live-card offline-card">

              <div className="live-video-content">

                <Radio className="live-radio-icon" />

                <p className="live-offline-text">
                  No Live Stream Now
                </p>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* UPCOMING STREAMS */}

      <section className="upcoming-section">

        <div className="live-container">

          <div className="upcoming-header">

            <h2 className="upcoming-title">
              Upcoming Streams
            </h2>

            <div className="upcoming-line"></div>

          </div>

          <div className="upcoming-grid">

            {streams
              .filter((stream) => !stream.live)
              .map((stream) => (

                <div
                  key={stream.id}
                  className="upcoming-card"
                >

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