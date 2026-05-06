import { BookOpen } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import grade69Image from "../assets/grade69.jpeg";
import gradeOLImage from "../assets/gradeOL.jpeg";
import gradeALImage from "../assets/gradeAL.jpeg";

export function Academic() {
  const { t } = useLanguage();
  const facilities = [
    {
      titleKey: "facility1.title",
      descriptionKey: "facility1.desc",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    },
    {
      titleKey: "facility2.title",
      descriptionKey: "facility2.desc",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop",
    },
    {
      titleKey: "facility3.title",
      descriptionKey: "facility3.desc",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div className="academic-page">
      {/* Hero Banner */}
      <section className="academic-hero">
        <div className="academic-hero-background">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
            alt="Academic Programs"
            className="academic-hero-image"
          />
        </div>
        <div className="academic-hero-overlay">
          <div className="academic-hero-content">
            <h1 className="academic-hero-title">
              {t("academic.title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="academic-intro-section">
        <div className="academic-section-wrapper">
          <div className="academic-intro-card">
            <div className="academic-intro-icon">
              <BookOpen className="academic-intro-icon-symbol" />
            </div>
            <h2 className="academic-intro-title">
              {t("academic.excellence")}
            </h2>
            <p className="academic-intro-text">
              Our comprehensive academic programs are designed to provide
              students with a strong foundation in their chosen fields while
              developing critical thinking, problem-solving, and leadership
              skills. We offer multiple streams to cater to diverse interests
              and career aspirations.
            </p>
          </div>
        </div>
      </section>
      
      

      {/* Academic Levels */}
      <section className="academic-programs-section">
        <div className="academic-section-wrapper">
          <div className="academic-section-header">
            <h2 className="academic-section-heading">
              {t("academic.ourPrograms")}
            </h2>
            <div className="academic-section-divider"></div>
          </div>
          <div className="academic-program-grid">
            {/* Grades 6-9 */}
            <Link
              to="/academic/grades-6-9"
              className="academic-program-card"
            >
              <div className="academic-program-image-wrap">
                <ImageWithFallback
                  src={grade69Image}
                  alt="Grades 6-9"
                  className="academic-program-image"
                />
              </div>
              <div className="academic-program-content">
                <h3 className="academic-program-title">
                  {t("academic.grades69")}
                </h3>
                <p className="academic-program-description">
                  {t("academic.grades69Desc")}
                </p>
              </div>
            </Link>

            {/* Ordinary Level */}
            <Link
              to="/academic/ordinary-level"
              className="academic-program-card"
            >
              <div className="academic-program-image-wrap">
                <ImageWithFallback
                  src={gradeOLImage}
                  alt="Ordinary Level"
                  className="academic-program-image"
                />
              </div>
              <div className="academic-program-content">
                <h3 className="academic-program-title">
                  {t("academic.oLevel")}
                </h3>
                <p className="academic-program-description">
                  {t("academic.oLevelDesc")}
                </p>
              </div>
            </Link>

            {/* Advanced Level */}
            <Link
              to="/academic/advanced-level"
              className="academic-program-card"
            >
              <div className="academic-program-image-wrap">
                <ImageWithFallback
                  src={gradeALImage}
                  alt="Advanced Level"
                  className="academic-program-image"
                />
              </div>
              <div className="academic-program-content">
                <h3 className="academic-program-title">
                  {t("academic.aLevel")}
                </h3>
                <p className="academic-program-description">
                  {t("academic.aLevelDesc")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Examination Results */}
      <section className="academic-stats-section">
        <div className="academic-section-wrapper">
          <div className="academic-section-header">
            <h2 className="academic-section-heading">
              {t("academic.examExcellence")}
            </h2>
            <div className="academic-section-divider"></div>
          </div>
          <div className="academic-stat-grid">
            {[
              {
                title: "O/L Success Rate",
                percentage: "95%",
                description: "Students passing with 6+ subjects",
              },
              {
                title: "A/L Success Rate",
                percentage: "88%",
                description: "Students qualifying for university",
              },
              {
                title: "Distinction Rate",
                percentage: "45%",
                description: "Students achieving A grades",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="academic-stat-card"
              >
                <div className="academic-stat-value">
                  {stat.percentage}
                </div>
                <h3 className="academic-stat-title">{stat.title}</h3>
                <p className="academic-stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="academic-facilities-section">
        <div className="academic-section-wrapper">
          <div className="academic-section-header">
            <h2 className="academic-section-heading">
              {t("academic.facilities")}
            </h2>
            <div className="academic-section-divider"></div>
          </div>
          <div className="academic-facility-grid">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="academic-facility-card"
              >
                <div className="academic-facility-image-wrap">
                  <ImageWithFallback
                    src={facility.image}
                    alt={facility.title}
                    className="academic-facility-image"
                  />
                </div>
                <div className="academic-facility-content">
                  <h3 className="academic-facility-title">
                    {t(facility.titleKey)}
                  </h3>
                  <p className="academic-facility-description">{t(facility.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* LMS Portal Link */}
      <section className="academic-lms-section">
        <div className="academic-section-wrapper academic-lms-content">
          <h2 className="academic-section-heading academic-lms-heading">
            {t("academic.lmsAccess")}
          </h2>
          <p className="academic-lms-text">
            {t("academic.lmsDesc")}
          </p>
          <a
            href="https://lms.rrcc.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="academic-button academic-button-secondary"
          >
            <BookOpen className="academic-button-icon" />
            <span>{t("academic.accessPortal")}</span>
          </a>
        </div>
      </section>
      {/* Academic Staff Section */}
      <section className="academic-staff-section">
        <div className="academic-section-wrapper">
          <div className="academic-staff-grid">
            <div className="academic-staff-image-wrap">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                alt="Academic Staff"
                className="academic-staff-image"
              />
            </div>
            <div>
              <div className="academic-staff-heading-wrap">
                <div className="academic-staff-icon">
                  <BookOpen className="academic-staff-icon-symbol" />
                </div>
                <h2 className="academic-staff-title">
                  {t("academic.staff")}
                </h2>
              </div>
              <p className="academic-staff-description">
                {t("academic.staffDesc")}
              </p>
              <Link
                to="/academic/all-staff"
                className="academic-button"
              >
                <span>{t("academic.seeAllStaff")}</span>
                <BookOpen className="academic-button-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
