import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Globe, LucideDivide } from "lucide-react";
import logo from "../assets/rcc.png";
import { useLanguage } from "../contexts/LanguageContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.academic"), path: "/academic" },
    { name: t("nav.clubs-societies"), path: "/clubs-societies" },
    { name: t("nav.news"), path: "/news" },
    { name: t("nav.sports"), path: "/sports" },
    { name: t("nav.liveStream"), path: "/live-stream" },
    { name: t("nav.contact"), path: "/contact" },
    { name: t("nav.lms"), path: "#lms" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-flex">
            {/* Logo and School Name - Left */}
            <div className="header-logo-link">
              <img
                src={logo}
                alt="RRCC Logo"
                className="logo"
              />

              <div className="header-title-wrapper">
                <h2 className="school-name">
                  Rajasinghe Central College
                </h2>
                <p className="school-location">Ruwanwella</p>
              </div>
            </div>

            {/* Desktop Navigation - Right */}
            <nav className="header-desktop-nav">
              {navItems.map((item) => {
                if (item.path === "#lms") {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      className="nav-link"
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Language Switch 
              <button
                onClick={toggleLanguage}
                className="language-btn"
              >
                <Globe className="header-icon" />
                <span>{language === "en" ? "සිං" : "EN"}</span>
              </button>*/}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="header-mobile-menu-btn"
            >
              {isMenuOpen ? (
                <X className="header-icon-large" />
              ) : (
                <Menu className="header-icon-large" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="mobile-nav">
              {navItems.map((item) => {
                if (item.path === "#lms") {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="mobile-nav-link"
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={toggleLanguage}
                className="header-language-btn-mobile language-btn"
              >
                <Globe className="header-icon" />
                <span>{language === "en" ? "සිංහල" : "English"}</span>
              </button>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
