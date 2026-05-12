import { useEffect, useState } from "react";
import { Radio, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/styles.css";

const getEmbedUrl = (url) => {
  if (!url) return "";

  url = url.trim();

  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
};

export function LiveStream() {
  const { t } = useLanguage();

  const [streams, setStreams] = useState([]);
  const [liveStream, setLiveStream] = useState(null);

  // FETCH DATA
  useEffect(() => {
    fetchStreams();
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

  const convertToEmbedUrl = (url) => {
  if (!url) return "";

  // already embed link
  if (url.includes("embed")) return url;

  // convert watch?v= to embed/
  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
};

const getEmbedUrl = (url) => {
  if (!url) return "";

  // YouTube watch URL
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // YouTube short URL
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
};
  // Convert date + time
  const parseDateTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };

  // LIVE DETECTION
  useEffect(() => {
    if (!streams || streams.length === 0) return;

    const checkLive = () => {
      const now = new Date();

      const live = streams.find((stream) => {
        const streamTime = parseDateTime(stream.date, stream.time);

        // LIVE window ±5 minutes
        const diff = Math.abs(now - streamTime);

        return diff < 5 * 60 * 1000;
      });

      setLiveStream(live || null);
    };

    checkLive();
    const interval = setInterval(checkLive, 10000);

    return () => clearInterval(interval);
  }, [streams]);

  // FIX VIDEO URL (important)
  const formatUrl = (url) => {
    if (!url) return "";

    // YouTube watch → embed fix
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    return url;
  };

  return (
    <div className="live-page">

      {/* HERO */}
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

      {/* LIVE SECTION */}
      <section className="live-current-section">
        <div className="live-container">

          {liveStream ? (

  <iframe
    width="100%"
    height="450"
    src={getEmbedUrl(liveStream.videoURL)}
    title={liveStream.title}
    allowFullScreen
  />

) : (

  <p>No Live Stream</p>



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
              <Radio />
              <p>No Live Stream Now</p>
            </div>
          )}

        </div>
      </section>

      {/* UPCOMING SECTION */}
      <section className="upcoming-section">
        <div className="live-container">

          <div className="upcoming-grid">

            {streams
              .filter((s) => parseDateTime(s.date, s.time) > new Date())
              .map((stream) => (
                <div key={stream.id} className="upcoming-card">

                  <h3>{stream.title}</h3>

                  <div className="info">
                    <Calendar size={16} /> {stream.date}
                  </div>

                  <div className="info">
                    <Clock size={16} /> {stream.time}
                  </div>

                  <p>{stream.description}</p>

                </div>
              ))}

          </div>

        </div>
      </section>

    </div>
  );
}