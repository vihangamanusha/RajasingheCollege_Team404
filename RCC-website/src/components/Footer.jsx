import { Facebook, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/rcc.png";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo-wrapper">
          <img
            src={logo}
            alt="RRCC Logo"
            className="footer-logo"
          />
        </div>

        {/* School Name */}
        <div className="footer-school-info">
          <h3 className="footer-school-name">
            {t("footer.schoolName")}
          </h3>
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social-links">
          <a
            href="https://www.facebook.com/share/1RzCcpjbrY/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Facebook className="footer-icon" />
          </a>
          <a
            href="https://youtube.com/@rrvolleyball?si=2otXYcO2WnxmvrT9"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Youtube className="footer-icon" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Linkedin className="footer-icon" />
          </a>
        </div>
        <div className="footer-nav-links">
          <Link
            to="/about"
            className="footer-nav-link"
          >
            {t("nav.about")}
          </Link>
          <Link
            to="/news"
            className="footer-nav-link"
          >
            {t("nav.news")}
          </Link>
          <Link
            to="/sports"
            className="footer-nav-link"
          >
            {t("nav.sports")}
          </Link>
          <Link
            to="/live-stream"
            className="footer-nav-link"
          >
            {t("nav.liveStream")}
          </Link>
          <a
            href={import.meta.env.VITE_LMS_URL || (import.meta.env.DEV ? "http://localhost:5174/login" : `http://${window.location.hostname}:3000/login`)}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-nav-link"
          >
            {t("nav.lms")}
          </a>
        </div>

        {/* Horizontal Line */}
        <div className="footer-bottom-section">
          {/* Footer Links */}

          {/* Copyright */}
          <div className="footer-copyright">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
