import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Calendar,
  BookOpen,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import school from "../assets/homeImage.jpeg";
import schoolimg from "../assets/schoolimg.jpeg";
import LMS from "../assets/LMS.png";
import academic from "../assets/academic.jpeg";
import sport from "../assets/sport.jpeg";
import { getAllEvents } from "../api/eventApi";
import { getNews } from "../api/newsApi";



export function Home() {
  const { t } = useLanguage();
  
  const [events, setEvents] = useState([]);
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
  const loadNews = async () => {
    try {
      const data = await getNews();

      const latest = (data || [])
        .sort((a, b) => b.id - a.id)
        .slice(0, 3);

      setNewsItems(latest);
    } catch (err) {
      console.error("News load error:", err);
    }
  };

  loadNews();
}, []);

  /*pagination componenet*/
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  useEffect(() => {
  const loadEvents = async () => {
    const data = await getAllEvents();
    setEvents(data);
  };

  loadEvents();
}, []);

  

  const upcomingEvents = [
    
  ];
const indexOfLastEvent = currentPage * eventsPerPage;
const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

const totalPages = Math.ceil(events.length / eventsPerPage);
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="background">
          <ImageWithFallback
            src={school}
            alt="School Campus"
            className="hero-bg-img"
          />
        </div>
        <div className="overlay">
          <div className="content">
            <h1 className="title">
              {t("home.welcome")}<br />
              <p className="school-name">
                {t("home.schoolName")}
              </p>
            </h1>
            <Link
              to="/about"
              className="btn btn-secondary"
            >
              <span>{t("home.learnMore")}</span>
              <ArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="home-motivation-section">
        <div className="container">
          <div className="home-motivation-container">
            <div className="mb-6">
              <div className="home-motivation-icon-bg">
                <span className="home-motivation-icon">🎓</span>
              </div>
            </div>
            <p className="home-motivation-quote">
              "{t("home.motivationQuote")}"
            </p>
            <div className="home-motivation-divider"></div>
            <p className="home-motivation-subtext">
              {t("home.motivationSubtext")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-section-white">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-title">
              {t("home.aboutTitle")}
            </h2>
            <div className="home-section-divider"></div>
          </div>
          <div className="home-about-grid">
            <div>
              <ImageWithFallback
                src={schoolimg}
                alt="Students Learning"
                className="home-about-img"
              />
            </div>
            <div>
              <p className="home-about-desc">
                {t("home.aboutDesc")}
              </p>
              <Link
                to="/about"
                className="home-link-primary"
              >
                <span>{t("common.readMore")}</span>
                <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

     {/* Latest News */}
<section className="home-news-section">
  <div className="home-news-container">

    <div className="home-section-header">
      <h2 className="home-section-title">
        Latest News
      </h2>
      <div className="home-news-divider"></div>
    </div>

    <div className="news-grid">
      {newsItems.slice(0, 3).map((news) => (
        <div key={news.id} className="news-card">

          <div className="news-image">
            <img
              src={
                news.image
                  ? `http://localhost:8080${news.image}`
                  : "https://via.placeholder.com/400x250"
              }
              alt={news.title}
              className="home-news-img"
            />
          </div>

          <div className="news-content">

            <div className="news-date">
              {news.date}
            </div>

            <h3 className="news-title">
              {news.title}
            </h3>

            <p className="news-excerpt">
              {news.content?.substring(0, 120)}...
            </p>

          </div>

        </div>
      ))}
    </div>

    <div className="home-news-footer">
      <Link to="/news" className="btn btn-primary">
        View All
      </Link>
    </div>

  </div>
</section>

      {/* Upcoming Events */}
      <section className="home-section-white">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-title">
              {t("home.upcomingEvents")}
            </h2>
            <div className="home-section-divider home-section-divider-mb4"></div>
          </div>
          <div className="home-events-grid">
            {currentEvents.map((event) => (
    <div
      key={event.id}
      className="home-event-card"
    >
      <h3 className="home-event-title">
        {event.topic}
      </h3>

      <p className="home-event-desc">
        {event.description}
      </p>

      <div className="home-event-details">

        <div className="home-event-detail-item">
          <div className="home-event-icon">
            📅
          </div>

          <span className="home-event-text">
            {event.date}
          </span>
        </div>

        <div className="home-event-detail-item">
          <div className="home-event-icon">
            🕐
          </div>

          <span className="home-event-text">
            {event.time}
          </span>
        </div>

        <div className="home-event-detail-item">
          <div className="home-event-icon">
            📍
          </div>

          <span className="home-event-text">
            {event.venue}
          </span>
        </div>

      </div>
    </div>
  ))}
          </div>
          <div className="pagination">

  <button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    disabled={currentPage === 1}
    className="page-btn"
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="page-btn"
  >
    Next
  </button>

</div>
 
</div>
        
        
      </section>
      {/* LMS Section */}
      <section className="home-lms-section">
        <div className="container">
          <div className="home-lms-grid">
            <div>
              <ImageWithFallback
                src={LMS}
                alt="Learning Management System"
                className="home-lms-img"
              />
            </div>
            <div>
              <div className="home-lms-header">
                <div className="home-lms-icon-bg">
                  <GraduationCap className="home-lms-icon" />
                </div>
                <h2 className="home-lms-title">{t("home.lmsTitle")}</h2>
              </div>
              <p className="home-lms-desc">
                {t("home.lmsDesc")}
              </p>
              <a
                href="https://lms.rrcc.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary-lms"
              >
                <span>{t("home.accessLMS")}</span>
                <ArrowRight className="btn-icon" />
              </a>
            </div>

          </div>
        </div>
      </section>
      {/* Academic Section */}
      <section className="home-section-muted">
        <div className="container">
          <div className="home-feature-grid">
            <div className="home-order-text-left">
              <div className="home-feature-header">
                <div className="home-feature-icon-bg">
                  <BookOpen className="home-feature-icon" />
                </div>
                <h2 className="home-feature-title">
                  {t("home.academicTitle")}
                </h2>
              </div>
              <p className="home-feature-desc">
                {t("home.academicIntro")}
              </p>
              <Link
                to="/academic"
                className="btn btn-primary"
              >
                <span>{t("home.explorePrograms")}</span>
                <ArrowRight className="btn-icon" />
              </Link>
            </div>
            <div className="home-order-img-right">
              <ImageWithFallback
                src={academic}
                alt="Academic Excellence"
                className="home-feature-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="home-section-white">
        <div className="container">
          <div className="home-feature-grid">
            <div>
              <ImageWithFallback
                src={sport}
                alt="Sports Activities"
                className="home-feature-imgsport"
              />
            </div>
            <div>
              <div className="home-feature-header">
                <div className="home-feature-icon-bg">
                  <Trophy className="home-feature-icon" />
                </div>
                <h2 className="home-feature-title">
                  {t("home.sportsTitle")}
                </h2>
              </div>
              <p className="home-feature-desc">
                {t("home.sportsDesc")}
              </p>
              <Link
                to="/sports"
                className="btn btn-primary"
              >
                <span>View Sports Achievements</span>
                <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
