import { Target, Award, History } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import aboutImage from "../assets/about.jpeg";
import principalImage from "../assets/principal.jpeg"


export function About() {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-background">
          <ImageWithFallback
            src={aboutImage}
            alt="About Us"
            className="about-hero-image"
          />
        </div>
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <h1 className="about-hero-title">{t("nav.about")}</h1>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="about-history-section">
        <div className="about-section-wrapper">
          <div className="about-history-wrapper">
            <div className="about-history-heading">
              <div className="about-history-icon">
                <History className="about-history-icon-symbol" />
              </div>
              <h2 className="about-history-title">{t("about.ourHistory")}</h2>
            </div>
            <p className="about-history-text">{t("about.historyDesc")}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-vision">
        <div className="about-section-wrapper">
          <div className="about-card-grid">
            <div className="about-card">
              <div className="about-card-icon">
                <Target className="about-card-icon-symbol" />
              </div>
              <h2 className="about-card-heading">{t("about.ourMission")}</h2>
              <p className="about-card-text">{t("about.missionDesc")}</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">
                <Award className="about-card-icon-symbol" />
              </div>
              <h2 className="about-card-heading">{t("about.ourVision")}</h2>
              <p className="about-card-text">{t("about.visionDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="about-principal-section">
        <div className="about-section-wrapper">
          <div className="about-principal-header">
            <h2 className="about-principal-title">{t("about.principalMessage")}</h2>
            <div className="about-principal-divider"></div>
          </div>
          <div className="about-principal-grid">
            <div className="about-principal-photo-card">
              <ImageWithFallback
                src={principalImage}
                alt="Principal"
                className="about-principal-image"
              />
              <div className="about-principal-meta">
                <h3 className="about-principal-name">Mr. K.P. Jayasinghe</h3>
                <p className="about-principal-role">{t("about.principal")}</p>
              </div>
            </div>
            <div className="about-principal-text-block">
              <p className="about-principal-text">{t("about.principalMsg")}</p>
              <p className="about-principal-text">{t("about.principalMsg2")}</p>
              <p className="about-principal-signature">
                - Mr. K.P. Jayasinghe, {t("about.principal")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
