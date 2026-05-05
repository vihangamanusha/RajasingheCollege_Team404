import { Link } from "react-router";
import {
  ArrowRight,
  Calendar,
  BookOpen,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import school from "../assets/school.webp";
import schoolimg from "../assets/schoolimg.jpeg";

export function Home() {
  const { t } = useLanguage();
  const newsItems = [
    {
      id: 1,
      titleKey: "news.item1.title",
      date: "April 28, 2026",
      excerptKey: "news.item1.excerpt",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      titleKey: "news.item2.title",
      date: "April 20, 2026",
      excerptKey: "news.item2.excerpt",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      titleKey: "news.item3.title",
      date: "April 15, 2026",
      excerptKey: "news.item3.excerpt",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      titleKey: "news.item4.title",
      date: "April 10, 2026",
      excerptKey: "news.item4.excerpt",
      image:
        "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      titleKey: "event1.title",
      date: "May 15, 2026",
      time: "8:00 AM",
      locationKey: "event1.location",
      descriptionKey: "event1.desc",
      icon: "🏆",
    },
    {
      id: 2,
      titleKey: "event2.title",
      date: "May 20, 2026",
      time: "2:00 PM",
      locationKey: "event2.location",
      descriptionKey: "event2.desc",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      id: 3,
      titleKey: "event3.title",
      date: "June 1-10, 2026",
      time: "9:00 AM",
      locationKey: "event3.location",
      descriptionKey: "event3.desc",
      icon: "📝",
    },
  ];

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
        {/*<div className="home-news-bg-decor"></div>*/}
        <div className="home-news-container">
          <div className="home-section-header">
            <div className="home-news-title-wrapper">
              <div className="home-news-icon-wrapper">
                <div className="home-news-icon-line"></div>
                <BookOpen className="home-news-icon" />
                <div className="home-news-icon-line"></div>
              </div>
              <h2 className="home-section-title">
                {t("home.latestNews")}
              </h2>
              <div className="home-news-divider"></div>
            </div>
          </div>
          <div className="news-grid">
            {newsItems.slice(0, 3).map((news, index) => (
              <div
                key={news.id}
                className="news-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="news-image">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="home-news-img"
                  />
                </div>
                <div className="news-content">
                  <div className="news-date">
                    {news.date.split(",")[0]}
                  </div>
                  <h3 className="news-title">
                    {t(news.titleKey)}
                  </h3>
                  <p className="news-excerpt">
                    {t(news.excerptKey)}
                  </p>
                  <Link
                    to="/news"
                    className="home-link-news group"
                  >
                    <span>{t("home.readMore")}</span>
                    <ArrowRight className="btn-icon home-link-news-icon" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="home-news-footer">
            <Link
              to="/news"
              className="btn btn-primary"
            >
              <span className="btn-text">{t("home.viewAll")}</span>
              <ArrowRight className="icon-lg" />
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
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="home-event-card"
              >
                <h3 className="home-event-title">
                  {t(event.titleKey)}
                </h3>

                <p className="home-event-desc">
                  {t(event.descriptionKey)}
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
                      {t(event.locationKey)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* LMS Section */}
      <section className="home-lms-section">
        <div className="container">
          <div className="home-lms-grid">
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
                className="btn btn-secondary"
              >
                <span>{t("home.accessLMS")}</span>
                <ArrowRight className="btn-icon" />
              </a>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop"
                alt="Learning Management System"
                className="home-lms-img"
              />
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
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
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
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop"
                alt="Sports Activities"
                className="home-feature-img"
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
