import { BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/styles.css";

export function AcademicALevel() {
  const { t } = useLanguage();

  return (
    <div className="al-page">

      {/* Hero Banner */}
      <section className="al-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
          alt="Advanced Level"
          className="al-hero-img"
        />

        <div className="al-hero-overlay">
          <h1>Advanced Level</h1>
        </div>
      </section>

      {/* Content */}
      <section className="al-content">
        <div className="al-container">

          <div className="al-center-box">

            <div className="al-icon-wrapper">
              <BookOpen className="al-icon" />
            </div>

            <h2>Advanced Level</h2>

            <p>
              Our A/L program offers specialized streams for students pursuing higher education.
            </p>

          </div>

        </div>
      </section>

    </div>
  );
}