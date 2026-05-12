import { useEffect, useState } from "react";
import { Radio, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/styles.css";

export function LiveStream() {
  const { t } = useLanguage();

  const [streams, setStreams] = useState([]);
  const [liveStream, setLiveStream] = useState(null);

  useEffect(() => {
    fetchStreams();
  }, []);

  // FETCH DATA
  const fetchStreams = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/livestreams");
      const data = await res.json();
      setStreams(data);
    } catch (err) {
      console.log(err);
    }
  };

  // FIX: convert properly
  const parseDateTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };

  //  AUTO LIVE DETECTION (FIXED)
  useEffect(() => {
    if (!streams || streams.length === 0) return;

    const checkLive = () => {
      const now = new Date();

      const live = streams.find((stream) => {
        const streamTime = parseDateTime(stream.date, stream.time);

        const diff = Math.abs(now - streamTime);

        // LIVE WINDOW = 5 minutes (better than 1 min)
        return diff < 5 * 60 * 1000;
      });

      setLiveStream(live || null);
    };

    checkLive(); // run immediately

    const interval = setInterval(checkLive, 10000); // every 10 sec

    return () => clearInterval(interval);
  }, [streams]);

  return (
    <div className="live-page">

      {/* HERO */}
      <section className="live-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&h=1080&fit=crop"
          className="live-hero-image"
        />
        <div className="live-hero-overlay">
          <h1 className="live-hero-title">
            {t("livestream.title")}
          </h1>
        </div>
      </section>

      {/* LIVE */}
      <section className="live-current-section">
        <div className="live-container">

          {liveStream ? (
            <div className="live-card">

            
              <iframe
                width="100%"
                height="400"
                src={liveStream.videoUrl}
                title={liveStream.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />

              <div className="live-details">
                <div className="live-status">
                  <span className="live-dot"></span>
                  <span>LIVE NOW</span>
                </div>

                <h2>{liveStream.title}</h2>
                <p>{liveStream.description}</p>
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

      {/* UPCOMING */}
      <section className="upcoming-section">
        <div className="live-container">

          <div className="upcoming-grid">

            {streams
              .filter((s) => {
                const now = new Date();
                return parseDateTime(s.date, s.time) > now;
              })
              .map((stream) => (
                <div key={stream.id} className="upcoming-card">

                  <h3>{stream.title}</h3>

                  <div>
                    <Calendar size={16} /> {stream.date}
                  </div>

                  <div>
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