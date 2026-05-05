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
            src="https://th.bing.com/th/id/OIP.d4KoNDsV2D1TnrarA3MUsQHaEw?w=280&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3="
            alt="School Campus"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overlay">
          <div className="content">
            <h1 className="title">
              {t("home.welcome")} {t("home.schoolName")}
            </h1>
            <Link
              to="/about"
              className="btn btn-secondary"
            >
              <span>{t("home.learnMore")}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎓</span>
              </div>
            </div>
            <p className="text-primary text-2xl md:text-3xl italic mb-6 leading-relaxed">
              "{t("home.motivationQuote")}"
            </p>
            <div className="w-32 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg">
              {t("home.motivationSubtext")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              {t("home.aboutTitle")}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
                alt="Students Learning"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t("home.aboutDesc")}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300"
              >
                <span>{t("common.readMore")}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-gradient-to-b from-muted to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl"></div>
        <div className="container relative">
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-secondary"></div>
                <BookOpen className="w-8 h-8 text-secondary" />
                <div className="w-12 h-0.5 bg-secondary"></div>
              </div>
              <h2 className="text-5xl md:text-6xl text-primary mb-4 font-serif">
                {t("home.latestNews")}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
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
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
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
                    className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300"
                  >
                    <span>{t("home.readMore")}</span>
                    <ArrowRight className="w-5 h-5 group-hover:text-secondary" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/news"
              className="btn btn-primary"
            >
              <span className="text-lg font-semibold">{t("home.viewAll")}</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              {t("home.upcomingEvents")}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-white to-gray-50 border-l-4 border-secondary rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-2xl text-primary mb-3 font-serif">
                  {t(event.titleKey)}
                </h3>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">
                  {t(event.descriptionKey)}
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                      📅
                    </div>
                    <span className="text-gray-700 font-medium">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                      🕐
                    </div>
                    <span className="text-gray-700 font-medium">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                      📍
                    </div>
                    <span className="text-gray-700 font-medium">
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
      <section className="py-20 bg-gradient-to-br from-primary to-[#003366] text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-4xl text-white">{t("home.lmsTitle")}</h2>
              </div>
              <p className="text-base text-gray-300 mb-6 leading-relaxed font-light italic">
                {t("home.lmsDesc")}
              </p>
              <a
                href="https://lms.rrcc.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span>{t("home.accessLMS")}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop"
                alt="Learning Management System"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Academic Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-4xl text-primary">
                  {t("home.academicTitle")}
                </h2>
              </div>
              <p className="text-base text-gray-600 mb-6 leading-relaxed font-light italic">
                {t("home.academicIntro")}
              </p>
              <Link
                to="/academic"
                className="btn btn-primary"
              >
                <span>{t("home.explorePrograms")}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
                alt="Academic Excellence"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop"
                alt="Sports Activities"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-4xl text-primary">
                  {t("home.sportsTitle")}
                </h2>
              </div>
              <p className="text-base text-gray-600 mb-6 leading-relaxed font-light italic">
                {t("home.sportsDesc")}
              </p>
              <Link
                to="/sports"
                className="btn btn-primary"
              >
                <span>View Sports Achievements</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
